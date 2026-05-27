# SSH Setup: portfolio.baretsky.net

Run these steps on your **home server** (Linux). After completing them, anyone can run:
```
ssh portfolio@portfolio.baretsky.net
```

---

## 1. Install Node.js (if not present)

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## 2. Install the portfolio globally

```bash
sudo npm install -g baretsky
```

Verify it works:
```bash
baretsky
```

## 3. Create a dedicated `portfolio` user

```bash
sudo useradd -m -s /bin/bash portfolio
sudo passwd -l portfolio   # disable password login
```

## 4. Create the ForceCommand script

```bash
sudo tee /usr/local/bin/portfolio-run << 'EOF'
#!/bin/bash
baretsky
exit 0
EOF
sudo chmod +x /usr/local/bin/portfolio-run
```

## 5. Configure SSH to force-run the portfolio

Add to `/etc/ssh/sshd_config` (or create `/etc/ssh/sshd_config.d/portfolio.conf`):

```
Match User portfolio
    ForceCommand /usr/local/bin/portfolio-run
    PermitTTY yes
    AllowAgentForwarding no
    AllowTcpForwarding no
    X11Forwarding no
    AuthorizedKeysFile none
    PasswordAuthentication no
    PubkeyAuthentication no
    PermitEmptyPasswords no
    # Allow connecting without a key (read-only portfolio)
    AuthenticationMethods none
```

> **Note:** `AuthenticationMethods none` lets anyone SSH in without a key or password.
> This is safe because ForceCommand prevents shell access.

Reload SSH:
```bash
sudo systemctl reload sshd
```

Test locally:
```bash
ssh portfolio@localhost
```

---

## 6. Set up Cloudflare Tunnel

### Install cloudflared

```bash
curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb -o cloudflared.deb
sudo dpkg -i cloudflared.deb
```

### Authenticate with Cloudflare

```bash
cloudflared tunnel login
```
(Opens a browser — follow the prompts, select the baretsky.net zone)

### Create the tunnel

```bash
cloudflared tunnel create portfolio
```

Note the **Tunnel ID** in the output.

### Configure the tunnel

Create `~/.cloudflared/config.yml`:

```yaml
tunnel: <TUNNEL_ID>
credentials-file: /root/.cloudflared/<TUNNEL_ID>.json

ingress:
  - hostname: portfolio.baretsky.net
    service: ssh://localhost:22
  - service: http_status:404
```

### Route DNS

```bash
cloudflared tunnel route dns portfolio portfolio.baretsky.net
```

This creates a CNAME in Cloudflare DNS: `portfolio.baretsky.net → <tunnel>.cfargotunnel.com`

> In Cloudflare dashboard: make sure the record is **DNS only** (grey cloud), not proxied.
> SSH over TCP doesn't work through the HTTP proxy.

### Run cloudflared as a service

```bash
sudo cloudflared service install
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
```

### Verify

From an external machine (not the home server):
```bash
ssh portfolio@portfolio.baretsky.net
```

---

## Updating the portfolio

When you publish a new version to npm:
```bash
sudo npm install -g baretsky@latest
```

No tunnel restart needed — the SSH server stays running.
