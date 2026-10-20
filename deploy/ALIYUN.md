# abonatech.com 阿里云首次上线手册

本手册对应当前仓库的生产结构：Next.js 容器只监听服务器本机端口，Nginx 容器对外监听 80/443 并负责 HTTPS。默认正式地址是 `https://www.abonatech.com`，裸域 `https://abonatech.com` 会跳转到 `www`。

> 不要把 ECS 密码、SSH 私钥、证书私钥或 `.env` 提交到 Git。生产环境不要向公网开放 3000 端口。

## 0. 先确认服务器地域与备案状态

1. 在 ECS 控制台确认实例地域、公网 IPv4/EIP、操作系统和实例到期时间。
2. 如果 ECS 位于中国内地，网站对外提供服务前必须完成 ICP 备案；若原备案不在阿里云，还需要按实际情况办理接入备案。域名实名认证信息应与备案主体一致。
3. 各省规则可能要求备案期间暂停解析。先按阿里云备案系统给出的本省要求操作，再决定何时添加正式 A 记录。
4. ICP 备案通过后，把真实备案号写入 `data/site.ts`；开站后的公安联网备案按主管部门与阿里云提示办理。

当前依据：

- [阿里云 ICP 备案流程](https://help.aliyun.com/zh/icp-filing/basic-icp-service/user-guide/icp-filing-application-overview)
- [域名、企业和服务器备案条件](https://help.aliyun.com/zh/icp-filing/basic-icp-service/support/for-the-record-process-faq)
- [备案域名准备与核验](https://help.aliyun.com/zh/icp-filing/basic-icp-service/user-guide/prepare-and-check-the-domain-name)

## 1. 配置 DNS 与安全组

备案流程允许解析后，在阿里云云解析 DNS 中添加：

| 主机记录 | 类型 | 记录值 |
| --- | --- | --- |
| `@` | `A` | ECS 公网 IPv4/EIP |
| `www` | `A` | ECS 公网 IPv4/EIP |

初次切换可先用较短 TTL；上线稳定后再调大。不要把 A 记录填成 ECS 私网 IP。

ECS 安全组入方向只开放：

| 端口 | 来源 | 用途 |
| --- | --- | --- |
| TCP 22 | 管理员固定公网 IP/32 | SSH；不要长期开放给所有来源 |
| TCP 80 | `0.0.0.0/0` | HTTP 跳转与证书验证 |
| TCP 443 | `0.0.0.0/0` | HTTPS |

有公网 IPv6 时同步配置 `::/0` 的 80/443 和受限来源的 SSH。不要开放 3000、数据库端口或 Docker daemon 端口。阿里云的安全组是有状态规则，通常只需配置入方向；若修改过出方向规则，要允许 HTTPS、DNS 和软件仓库访问。参见[阿里云安全组官方说明](https://help.aliyun.com/zh/ecs/user-guide/start-using-security-groups)。

## 2. 准备登录与发布用户

先用 ECS 创建时配置的管理员账号和 SSH 密钥登录。以下示例创建专用发布用户 `deploy`；Docker 组拥有接近 root 的权限，因此只给受信任的发布账号使用。

```bash
sudo useradd --create-home --shell /bin/bash deploy
sudo install -d -m 700 -o deploy -g deploy /home/deploy/.ssh
sudo cp /root/.ssh/authorized_keys /home/deploy/.ssh/authorized_keys
sudo chown deploy:deploy /home/deploy/.ssh/authorized_keys
sudo chmod 600 /home/deploy/.ssh/authorized_keys
```

如果管理员账号不是 `root`，把现有公钥内容追加到 `/home/deploy/.ssh/authorized_keys`，不要复制私钥。新开一个终端确认 `ssh deploy@服务器公网IP` 可用后，再继续。

## 3. 安装 Docker、Compose、Git 与 cURL

只执行与你的系统匹配的一组命令。

### Alibaba Cloud Linux 3

以下流程来自阿里云当前的[安装 Docker 与 Docker Compose 指南](https://help.aliyun.com/zh/ecs/user-guide/install-and-use-docker)：

```bash
sudo dnf -y install git curl wget
sudo wget -O /etc/yum.repos.d/docker-ce.repo http://mirrors.cloud.aliyuncs.com/docker-ce/linux/centos/docker-ce.repo
sudo sed -i 's|https://mirrors.aliyun.com|http://mirrors.cloud.aliyuncs.com|g' /etc/yum.repos.d/docker-ce.repo
sudo dnf -y install dnf-plugin-releasever-adapter --repo alinux3-plus
sudo dnf -y install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo systemctl enable --now docker
```

### Ubuntu 22.04 / 24.04

使用 Docker 官方 apt 仓库；完整说明见 [Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)：

```bash
sudo apt-get update
sudo apt-get install -y ca-certificates curl git
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

sudo tee /etc/apt/sources.list.d/docker.sources >/dev/null <<EOF
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}")
Components: stable
Architectures: $(dpkg --print-architecture)
Signed-By: /etc/apt/keyrings/docker.asc
EOF

sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo systemctl enable --now docker
```

把发布用户加入 Docker 组并重新登录：

```bash
sudo usermod -aG docker deploy
exit
```

重新 SSH 登录为 `deploy` 后验证：

```bash
docker version
docker compose version
git --version
curl --version
```

## 4. 把仓库放到服务器

推荐将代码托管在 GitHub 私有仓库，并给服务器配置只读 Deploy Key。先在服务器以 `deploy` 用户生成仓库拉取密钥：

```bash
ssh-keygen -t ed25519 -N '' -C abona-server-readonly -f /home/deploy/.ssh/abona_repo
cat /home/deploy/.ssh/abona_repo.pub
```

把输出的公钥加入 GitHub 仓库 `Settings → Deploy keys`，不要勾选写权限。然后配置 SSH：

```bash
ssh-keyscan github.com > /tmp/github_known_hosts
ssh-keygen -lf /tmp/github_known_hosts
```

先把显示的指纹与 [GitHub 官方公布的 SSH 主机密钥指纹](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/githubs-ssh-key-fingerprints)逐项核对；一致后再安装：

```bash
install -m 600 /tmp/github_known_hosts /home/deploy/.ssh/known_hosts
rm /tmp/github_known_hosts

tee /home/deploy/.ssh/config >/dev/null <<'EOF'
Host github.com
  HostName github.com
  User git
  IdentityFile /home/deploy/.ssh/abona_repo
  IdentitiesOnly yes
EOF
chmod 600 /home/deploy/.ssh/config
```

创建部署目录并克隆当前仓库：

```bash
sudo install -d -m 755 -o deploy -g deploy /opt/abona-website
export ABONA_REPO_URL='git@github.com:Ronanswift13/abonaweb.git'
git clone "$ABONA_REPO_URL" /opt/abona-website
cd /opt/abona-website
git switch main
```

如果仓库尚未推送到 GitHub，先在本机完成远端仓库初始化与首次推送，再执行服务器克隆。

## 5. 运行只读服务器自检

在服务器项目目录运行；把示例 IP 换成 ECS 公网 IP：

```bash
cd /opt/abona-website
EXPECTED_PUBLIC_IP=203.0.113.10 bash deploy/scripts/server-preflight.sh
```

`FAIL` 是部署阻断项；`WARN` 需要人工确认。常见提醒包括 DNS 尚未生效、80/443 已被宝塔或系统 Nginx 占用、Docker Hub 无法访问。若已有服务占用 80/443，先确认其用途，不要直接停止或删除未知服务。

## 6. 创建生产环境配置

```bash
cd /opt/abona-website
cp .env.example .env
chmod 600 .env
```

确认 `.env` 至少包含：

```dotenv
NEXT_PUBLIC_SITE_URL=https://www.abonatech.com
NPM_REGISTRY=https://registry.npmmirror.com
WEB_BIND=127.0.0.1
WEB_PORT=3000
NEXT_PUBLIC_BAIDU_TONGJI_ID=
```

不要把 `WEB_BIND` 改成 `0.0.0.0`。如果服务器 3000 已被可信应用占用，可把 `WEB_PORT` 改为另一个仅供本机使用的端口；GitHub 发布脚本会读取 Compose 的实际映射端口进行健康检查。

## 7. 准备 HTTPS 证书

推荐在阿里云数字证书管理服务申请/上传证书，并下载 **Nginx** 格式。证书必须覆盖 `abonatech.com` 和 `www.abonatech.com`；单域名证书不够时，应申请包含两个名称的 SAN 证书或通配符证书。官方流程参见[阿里云 Nginx 证书部署说明](https://help.aliyun.com/zh/ssl-certificate/product-overview/get-started-with-ssl-certificates-service)。

把下载包中的证书链 `.pem` 与私钥 `.key` 安全上传到服务器临时目录，然后安装为项目约定的文件名：

```bash
cd /opt/abona-website
install -d -m 700 deploy/nginx/certs
install -m 644 /安全临时目录/下载的证书.pem deploy/nginx/certs/fullchain.pem
install -m 600 /安全临时目录/下载的私钥.key deploy/nginx/certs/privkey.pem
```

验证证书时间、域名和证书/私钥是否匹配：

```bash
openssl x509 -in deploy/nginx/certs/fullchain.pem -noout -dates -subject -ext subjectAltName
openssl x509 -in deploy/nginx/certs/fullchain.pem -pubkey -noout | openssl sha256
openssl pkey -in deploy/nginx/certs/privkey.pem -pubout | openssl sha256
```

后两行哈希必须相同。上传完成后删除临时目录中的证书副本，私钥不要通过聊天、邮件或 Git 传输。证书续期时原位替换这两个文件，然后执行：

```bash
docker exec abona-nginx nginx -t
docker exec abona-nginx nginx -s reload
```

如果改用 ACME/Let's Encrypt，仓库已把 `deploy/nginx/acme` 映射为 Webroot；但首次证书签发、自动续期与续期钩子必须按你的证书客户端单独配置，未配置前不要假设会自动续期。

## 8. 首次构建与启动

先构建 Web 容器并验证本机健康检查：

```bash
cd /opt/abona-website
docker compose up -d --build web
docker compose ps
curl -fsS http://127.0.0.1:3000/api/health
```

然后验证 Nginx 配置并启动 HTTPS：

```bash
install -d -m 755 deploy/nginx/acme deploy/nginx/logs
docker compose --profile nginx run --rm --no-deps nginx nginx -t
docker compose --profile nginx up -d
docker compose ps
```

从服务器和外部电脑分别检查：

```bash
curl -I http://abonatech.com
curl -I https://abonatech.com
curl -I https://www.abonatech.com
curl -fsS https://www.abonatech.com/api/health
```

预期结果：HTTP 跳转到 `https://www.abonatech.com`，裸域 HTTPS 也跳转到 `www`，正式域名返回成功，健康检查 JSON 中 `status` 为 `ok`。

再检查浏览器首页、移动端导航、以下公开文件：

- `https://www.abonatech.com/robots.txt`
- `https://www.abonatech.com/sitemap.xml`
- `https://www.abonatech.com/images/og-default.png`

## 9. 配置 GitHub Actions 自动发布

仓库 `Settings → Secrets and variables → Actions` 中配置：

| 名称 | 类型 | 值 |
| --- | --- | --- |
| `DEPLOY_HOST` | Secret | ECS 公网 IP/EIP |
| `DEPLOY_USER` | Secret | `deploy` |
| `DEPLOY_SSH_KEY` | Secret | GitHub Actions 专用登录私钥全文 |
| `DEPLOY_PATH` | Secret | `/opt/abona-website` |
| `DEPLOY_PORT` | Secret，可选 | SSH 端口，默认 22 |
| `DEPLOY_KNOWN_HOSTS` | Secret，推荐 | 本机执行 `ssh-keyscan -p 22 ECS公网IP` 的输出，人工核对指纹后保存 |
| `AUTO_DEPLOY` | Variable | 首次人工发布验证后再设为 `true` |

Actions 登录密钥应与服务器拉取 GitHub 仓库的只读 Deploy Key 分开。生成登录密钥：

```bash
ssh-keygen -t ed25519 -N '' -C github-actions-deploy -f abona_actions_deploy
```

把 `abona_actions_deploy.pub` 追加到服务器 `/home/deploy/.ssh/authorized_keys`，私钥内容放入 `DEPLOY_SSH_KEY`。建议在 GitHub `Environments → production` 配置 Required reviewers，先手动运行一次 `Deploy` 工作流；确认成功后再打开 `AUTO_DEPLOY`。

## 10. 日常检查与回滚

```bash
cd /opt/abona-website
docker compose ps
docker compose logs --tail=100 web
docker compose logs --tail=100 nginx
docker stats --no-stream
df -h
```

发布后出现业务问题时，不要在服务器强制重置分支，也不要在服务器创建无法推回远端的提交。应在本地对问题提交执行 `git revert`，把回滚提交推送到 `main`，让 CI 完整验证后再通过 Deploy 工作流发布：

```bash
git log --oneline -10
git revert --no-edit 问题提交SHA
git push origin main
```

这种做法保留完整历史，后续自动发布不会因为分支被强制回退而失败。如果线上已经不可用，可先在 GitHub 暂停 `AUTO_DEPLOY` 并保留容器日志，再由有权限的维护者执行回滚提交；不要用 `git reset --hard` 覆盖服务器状态。

## 上线门禁清单

- [ ] ECS 在正确地域，公网 IP/EIP 固定且实例不会近期到期
- [ ] 中国内地 ECS 已按主体和省份要求完成 ICP/接入备案
- [ ] `@` 与 `www` 的 A 记录均指向 ECS 公网 IP
- [ ] 安全组仅公开 80/443，SSH 仅允许管理员来源，3000 不公开
- [ ] `deploy/scripts/server-preflight.sh` 无 `FAIL`
- [ ] `.env` 中正式域名、npm 镜像和本机绑定正确
- [ ] 证书覆盖裸域与 `www`，私钥权限正确，并已设置续期提醒
- [ ] `data/site.ts` 的备案号、公司地址、邮箱、成立年份已替换
- [ ] 示例团队、案例、新闻和占位指标已确认、替换或删除
- [ ] `docker compose ps` 中 Web 为 `healthy`，Nginx 正常运行
- [ ] HTTP、HTTPS、裸域跳转、健康接口、sitemap、robots 均已外网验证
- [ ] GitHub Actions 手动发布成功后才启用 `AUTO_DEPLOY`
