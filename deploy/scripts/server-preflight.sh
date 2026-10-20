#!/usr/bin/env bash
# 阿里云 ECS 上线前只读自检。
# 用法：
#   bash deploy/scripts/server-preflight.sh
#   EXPECTED_PUBLIC_IP=203.0.113.10 bash deploy/scripts/server-preflight.sh

set -u

SITE_HOSTS=("abonatech.com" "www.abonatech.com")
EXPECTED_PUBLIC_IP="${EXPECTED_PUBLIC_IP:-}"
failures=0
warnings=0

color_enabled=false
if [[ -t 1 && "${TERM:-}" != "dumb" ]]; then
  color_enabled=true
fi

print_status() {
  local level=$1
  shift
  if $color_enabled; then
    case "$level" in
      PASS) printf '\033[32m[PASS]\033[0m %s\n' "$*" ;;
      WARN) printf '\033[33m[WARN]\033[0m %s\n' "$*" ;;
      FAIL) printf '\033[31m[FAIL]\033[0m %s\n' "$*" ;;
      INFO) printf '\033[36m[INFO]\033[0m %s\n' "$*" ;;
    esac
  else
    printf '[%s] %s\n' "$level" "$*"
  fi
}

pass() { print_status PASS "$@"; }
info() { print_status INFO "$@"; }
warn() {
  warnings=$((warnings + 1))
  print_status WARN "$@"
}
fail() {
  failures=$((failures + 1))
  print_status FAIL "$@"
}

have_command() {
  command -v "$1" >/dev/null 2>&1
}

command_version() {
  local name=$1
  shift
  if have_command "$name"; then
    pass "$name 已安装：$("$@" 2>/dev/null | head -n 1)"
  else
    fail "缺少必需命令：$name"
  fi
}

resolve_ipv4() {
  local host=$1
  if have_command getent; then
    getent ahostsv4 "$host" 2>/dev/null | awk '{print $1}' | sort -u
  elif have_command dig; then
    dig +short A "$host" 2>/dev/null | awk '/^[0-9]+(\.[0-9]+){3}$/'
  elif have_command host; then
    host -t A "$host" 2>/dev/null | awk '/has address/ {print $NF}'
  else
    return 2
  fi
}

is_non_public_ipv4() {
  local ip=$1
  local first second
  IFS=. read -r first second _ <<<"$ip"
  [[ "$first" == "0" || "$first" == "10" || "$first" == "127" ]] && return 0
  [[ "$first" == "169" && "$second" == "254" ]] && return 0
  [[ "$first" == "172" && "$second" -ge 16 && "$second" -le 31 ]] && return 0
  [[ "$first" == "192" && "$second" == "168" ]] && return 0
  [[ "$first" == "100" && "$second" -ge 64 && "$second" -le 127 ]] && return 0
  [[ "$first" == "198" && ("$second" == "18" || "$second" == "19") ]] && return 0
  [[ "$first" -ge 224 ]] && return 0
  return 1
}

check_port() {
  local port=$1
  local listeners=""
  if have_command ss; then
    listeners=$(ss -H -ltn "sport = :$port" 2>/dev/null || true)
  elif have_command lsof; then
    listeners=$(lsof -nP -iTCP:"$port" -sTCP:LISTEN 2>/dev/null || true)
  elif have_command netstat; then
    listeners=$(netstat -lnt 2>/dev/null | awk -v suffix=":$port" '$4 ~ suffix "$"')
  else
    warn "无法检查 TCP ${port}：缺少 ss、lsof 或 netstat"
    return
  fi

  if [[ -z "$listeners" ]]; then
    pass "TCP $port 当前空闲"
  else
    warn "TCP $port 已被进程占用；首次启动前请确认不是冲突服务"
  fi
}

check_url() {
  local label=$1
  local url=$2
  local code
  code=$(curl -sSIL --connect-timeout 5 --max-time 12 -o /dev/null -w '%{http_code}' "$url" 2>/dev/null || true)
  if [[ "$code" =~ ^[1-5][0-9][0-9]$ ]]; then
    pass "$label 可达（HTTP ${code}）"
  else
    warn "$label 不可达；请检查 ECS 出方向规则、DNS 或镜像加速配置"
  fi
}

printf 'Abona 阿里云生产服务器自检\n'
printf '================================\n'

if [[ -r /etc/os-release ]]; then
  # shellcheck disable=SC1091
  . /etc/os-release
  info "系统：${PRETTY_NAME:-${NAME:-unknown}}"
else
  info "系统：$(uname -s) $(uname -r)"
fi
info "架构：$(uname -m)"
info "CPU：$(getconf _NPROCESSORS_ONLN 2>/dev/null || sysctl -n hw.ncpu 2>/dev/null || printf 'unknown') 核"

memory_mb=""
if [[ -r /proc/meminfo ]]; then
  memory_mb=$(awk '/MemTotal:/ {printf "%d", $2 / 1024}' /proc/meminfo)
elif have_command sysctl; then
  memory_bytes=$(sysctl -n hw.memsize 2>/dev/null || true)
  if [[ "$memory_bytes" =~ ^[0-9]+$ ]]; then
    memory_mb=$((memory_bytes / 1024 / 1024))
  fi
fi
if [[ "$memory_mb" =~ ^[0-9]+$ ]]; then
  if ((memory_mb < 1024)); then
    fail "内存仅 ${memory_mb} MiB；本机 Docker 构建至少准备 1 GiB，建议 2 GiB 以上或配置交换空间"
  elif ((memory_mb < 2048)); then
    warn "内存为 ${memory_mb} MiB；生产构建可能紧张，建议 2 GiB 以上并配置交换空间"
  else
    pass "内存：${memory_mb} MiB"
  fi
else
  warn "无法读取物理内存容量"
fi

disk_kb=$(df -Pk . 2>/dev/null | awk 'NR == 2 {print $4}')
if [[ "$disk_kb" =~ ^[0-9]+$ ]]; then
  disk_gb=$((disk_kb / 1024 / 1024))
  if ((disk_kb < 5 * 1024 * 1024)); then
    fail "当前分区仅剩约 ${disk_gb} GiB；镜像构建与回滚至少预留 5 GiB"
  elif ((disk_kb < 10 * 1024 * 1024)); then
    warn "当前分区剩余约 ${disk_gb} GiB；建议预留 10 GiB 以上"
  else
    pass "磁盘可用空间：约 ${disk_gb} GiB"
  fi
else
  warn "无法读取当前分区可用空间"
fi

command_version git git --version
command_version curl curl --version
command_version docker docker --version

if have_command docker; then
  if docker compose version >/dev/null 2>&1; then
    pass "Docker Compose 已安装：$(docker compose version | head -n 1)"
  else
    fail "缺少 Docker Compose v2 插件（命令应为 docker compose）"
  fi

  if docker info >/dev/null 2>&1; then
    pass "当前用户可访问 Docker daemon"
  else
    fail "当前用户无法访问 Docker daemon；确认服务已启动，且发布用户属于 docker 组"
  fi
fi

printf '\n端口检查\n'
for port in 80 443 3000; do
  check_port "$port"
done

printf '\nDNS 检查\n'
for host_name in "${SITE_HOSTS[@]}"; do
  resolved=$(resolve_ipv4 "$host_name")
  resolve_status=$?
  if ((resolve_status == 2)); then
    warn "无法解析 ${host_name}：缺少 getent、dig 或 host"
  elif [[ -z "$resolved" ]]; then
    warn "$host_name 尚无可用 A 记录"
  else
    resolved_one_line=$(printf '%s\n' "$resolved" | paste -sd ',' -)
    non_public=false
    while IFS= read -r resolved_ip; do
      if is_non_public_ipv4 "$resolved_ip"; then
        non_public=true
      fi
    done <<<"$resolved"
    if $non_public; then
      warn "$host_name 解析为非公网地址 ${resolved_one_line}；请在公网 DNS 或指定 ECS 上再次核验"
    elif [[ -n "$EXPECTED_PUBLIC_IP" ]] && ! printf '%s\n' "$resolved" | grep -Fxq "$EXPECTED_PUBLIC_IP"; then
      warn "$host_name 当前解析为 ${resolved_one_line}，未包含期望公网 IP $EXPECTED_PUBLIC_IP"
    else
      pass "$host_name → $resolved_one_line"
    fi
  fi
done

printf '\n外网依赖检查\n'
if have_command curl; then
  check_url "GitHub" "https://github.com/"
  check_url "npm 官方仓库" "https://registry.npmjs.org/-/ping"
  check_url "npmmirror" "https://registry.npmmirror.com/-/ping"
  check_url "Docker Hub Registry" "https://registry-1.docker.io/v2/"
fi

printf '\n汇总\n'
if ((failures > 0)); then
  print_status FAIL "$failures 个阻断项，$warnings 个提醒项；请先解决阻断项再部署"
  exit 1
fi

if ((warnings > 0)); then
  print_status WARN "无阻断项，$warnings 个提醒项；确认提醒项后可以继续"
else
  pass "全部检查通过，可以进入首次部署"
fi
