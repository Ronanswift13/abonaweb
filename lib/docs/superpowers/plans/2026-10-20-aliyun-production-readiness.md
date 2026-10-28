# Alibaba Cloud Production Readiness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the existing Next.js website reproducibly deployable to an Alibaba Cloud Linux server at `abonatech.com` and `www.abonatech.com`, with safe preflight checks and an operator-ready first-deployment guide.

**Architecture:** Keep the current multi-stage Docker image and Docker Compose topology: Next.js binds only to loopback, while the optional Nginx profile exposes ports 80/443 and terminates TLS. Add a read-only server preflight script, strengthen container health and production configuration checks, and document DNS, ICP filing, TLS certificate, firewall, first boot, and GitHub Actions setup without embedding credentials.

**Tech Stack:** Next.js 16, Node.js 24, Docker Engine, Docker Compose v2, Nginx, Bash, GitHub Actions, Alibaba Cloud ECS/DNS/ICP/SSL services.

---

### Task 1: Baseline verification and configuration audit

**Files:**
- Inspect: `package.json`
- Inspect: `Dockerfile`
- Inspect: `docker-compose.yml`
- Inspect: `deploy/nginx/conf.d/abona.conf`
- Inspect: `.github/workflows/deploy.yml`

- [x] **Step 1: Run the application quality gate**

Run: `npm run check`

Expected: TypeScript, ESLint, and the production build all exit successfully.

- [x] **Step 2: Validate Compose rendering**

Run: `docker compose config --quiet`

Expected: exit code 0. If Docker is unavailable locally, record that limitation and validate YAML syntax separately.

- [x] **Step 3: Audit production placeholders**

Run: `rg -n '【占位】|TODO|CHANGEME' data content app components deploy README.md`

Expected: every hit is either intentionally retained and listed in the launch checklist, or replaced before public launch.

### Task 2: Add a safe Alibaba Cloud server preflight

**Files:**
- Create: `deploy/scripts/server-preflight.sh`

- [x] **Step 1: Implement read-only checks**

The script must use `set -u`, report the OS, CPU architecture, memory, disk space, Docker/Compose/Git/cURL availability, Docker daemon access, ports 80/443/3000, DNS resolution for both hostnames, and outbound access to required registries. It must not install packages, edit the firewall, or print secrets.

- [x] **Step 2: Validate shell syntax**

Run: `bash -n deploy/scripts/server-preflight.sh`

Expected: exit code 0.

- [x] **Step 3: Exercise the script locally**

Run: `bash deploy/scripts/server-preflight.sh`

Expected: a readable PASS/WARN/FAIL report and a non-zero exit only for blocking prerequisites.

### Task 3: Harden production deployment configuration

**Files:**
- Modify: `docker-compose.yml`
- Modify: `deploy/nginx/conf.d/abona.conf`
- Modify: `.env.example`
- Modify: `.github/workflows/deploy.yml`

- [x] **Step 1: Make the application health endpoint explicit**

Configure Compose healthcheck timing and make the GitHub deployment workflow derive the health URL from `WEB_PORT`, while preserving loopback-only binding.

- [x] **Step 2: Complete proxy and static-asset behavior**

Add forwarded-host/port headers, WebSocket upgrade support, safe request limits, and long-lived caching only for immutable Next.js assets.

- [x] **Step 3: Render and inspect Compose config**

Run: `docker compose config`

Expected: `web` binds `127.0.0.1:3000` by default and no secret value is included in the rendered config.

### Task 4: Write the first-production-deployment runbook

**Files:**
- Create: `deploy/ALIYUN.md`
- Modify: `README.md`

- [x] **Step 1: Document Alibaba Cloud control-plane preparation**

Cover ECS public IP/EIP, A records for apex and `www`, mainland-China ICP filing requirement, security-group rules for 22/80/443, SSH key login, and the choice between Alibaba Cloud-issued and ACME certificates.

- [x] **Step 2: Document server bootstrap and first release**

Provide exact commands for Ubuntu/Debian and Alibaba Cloud Linux/RHEL-family hosts, creation of a non-root deploy user, Docker installation verification, repository checkout under `/opt/abona-website`, `.env` creation, certificate placement, first Compose start, and health/TLS checks.

- [x] **Step 3: Document continuous deployment and rollback**

List required GitHub secrets/variables, enablement of the production environment, manual deployment verification, log inspection, and a non-destructive rollback procedure using a previously verified Git commit.

### Task 5: Final verification

**Files:**
- Verify: all modified deployment files

- [x] **Step 1: Run repository checks**

Run: `npm run check`

Expected: exit code 0.

- [x] **Step 2: Run deployment-file checks**

Run: `bash -n deploy/scripts/server-preflight.sh && docker compose config --quiet`

Expected: exit code 0, or Docker unavailability explicitly reported with the remaining checks passing.

- [x] **Step 3: Review the final diff**

Run: `git diff --check && git status --short`

Expected: no whitespace errors; only the intended deployment-readiness changes plus the user's pre-existing work are present.
