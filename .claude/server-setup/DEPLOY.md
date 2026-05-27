# Server Setup: portfolio.baretsky.net

Run all commands on your home server as root unless noted.

---

## 1. Create web root and working tree

```bash
mkdir -p /var/www/portfolio
mkdir -p /repos/terminal-portfolio     # working tree (not public)
chown -R www-data:www-data /var/www/portfolio
```

## 2. Init bare git repo + post-receive hook

```bash
git init --bare /repos/terminal-portfolio.git

cp /path/to/post-receive /repos/terminal-portfolio.git/hooks/post-receive
chmod +x /repos/terminal-portfolio.git/hooks/post-receive
```

## 3. Add home server as git remote (run on your Mac)

```bash
git remote add homeserver user@YOUR_SERVER_IP:/repos/terminal-portfolio.git
git push homeserver main
```

The hook runs automatically on each push.

---

## 4. Install Node.js (if not present)

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs
```

## 5. Install and configure nginx

```bash
apt-get install -y nginx

cp /path/to/nginx.conf /etc/nginx/sites-available/portfolio
ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

## 6. Install ttyd

```bash
wget https://github.com/tsl0922/ttyd/releases/latest/download/ttyd.x86_64 \
     -O /usr/local/bin/ttyd
chmod +x /usr/local/bin/ttyd
```

## 7. Create portfolio-run script (if not already done for SSH)

```bash
cat > /usr/local/bin/portfolio-run << 'EOF'
#!/bin/bash
npx baretsky
exit 0
EOF
chmod +x /usr/local/bin/portfolio-run
```

## 8. Install ttyd systemd service

```bash
cp /path/to/ttyd.service /etc/systemd/system/ttyd.service
systemctl daemon-reload
systemctl enable ttyd
systemctl start ttyd

# Verify
curl -I http://localhost:7681   # should return 200
```

## 9. Cloudflare Tunnel — update config

Add to `~/.cloudflared/config.yml`:

```yaml
ingress:
  - hostname: portfolio.baretsky.net
    service: http://localhost:80
  # SSH TCP tunnel stays separate (keep existing rule)
  - service: http_status:404
```

```bash
systemctl restart cloudflared
```

## 10. Verify everything

```bash
# Website loads
curl -I https://portfolio.baretsky.net

# WebSocket endpoint reachable
curl -I https://portfolio.baretsky.net/ws   # 400 is correct (expects WS upgrade)

# SSH still works
ssh portfolio@portfolio.baretsky.net
```

---

## Deploying updates

From your Mac:
```bash
git push homeserver main
```

The post-receive hook rebuilds the website and syncs to nginx automatically.
To also update the CLI portfolio:
```bash
# On the server
npm install -g baretsky@latest
```
