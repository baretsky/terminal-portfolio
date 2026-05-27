# terminal-portfolio

A personal portfolio that lives in the terminal — accessible via `npx`, SSH, or a browser-embedded terminal at [portfolio.baretsky.net](https://portfolio.baretsky.net).

## Access

```bash
# Run anywhere with Node.js
npx baretsky

# Connect via SSH (no install required)
ssh portfolio@portfolio.baretsky.net
```

Or open [portfolio.baretsky.net](https://portfolio.baretsky.net) and click **Open in browser**.

---

## What's inside

This repo is a monorepo with two independent pieces:

```
terminal-portfolio/
├── src/                  # CLI portfolio (Ink / React for terminal)
│   ├── index.tsx         # Entry point + shebang
│   ├── App.tsx           # Root component, keyboard nav, section routing
│   ├── components/       # One file per section + NavBar
│   │   ├── NavBar.tsx
│   │   ├── Home.tsx
│   │   ├── Experience.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   └── Contact.tsx
│   ├── assets/
│   │   └── portrait.ts   # Pre-generated ASCII art from photo
│   └── data/
│       └── content.ts    # All portfolio content (EN + FR)
├── website/              # Landing page (Vite + vanilla TS)
│   ├── index.html
│   └── src/
│       ├── main.ts       # GSAP animations, theme toggle, xterm.js
│       └── style.css     # Gzhel palette, light/dark custom properties
└── .claude/
    └── server-setup/     # nginx config, ttyd service, deploy guide
```

---

## CLI portfolio

Built with [Ink](https://github.com/vadimdemedes/ink) (React for the terminal).

### Sections

| Key | Section |
|-----|---------|
| `←` / `h` | Previous section |
| `→` / `l` | Next section |
| `t` | Toggle language (EN / FR) |
| `q` | Quit |

Sections: **Home** · **Experience** · **Skills** · **Projects** · **Contact**

### Tech stack

| Layer | Tool |
|-------|------|
| UI framework | [Ink 5](https://github.com/vadimdemedes/ink) + React 18 |
| Language | TypeScript (ESM, NodeNext) |
| ASCII art | Pre-generated with `jp2a` from a PNG with removed background |
| Distribution | npm (`npx baretsky`) |

### Development

```bash
npm install
npm run dev       # Run with tsx (hot-reload)
npm run build     # Compile to dist/
```

### Customising content

All content lives in `src/data/content.ts`. It exports a bilingual object:

```ts
export const content = {
  en: {
    profile:     { name, title, subtitle, bio, location },
    experience:  [{ company, role, period, description }],
    skills:      [{ category, items[] }],
    projects:    [{ name, tech, description, url }],
    contact:     { email, github, linkedin, website },
    contactNote: string,
    nav:         { tabs, hint, quickNavLabel, quickNavHint },
  },
  fr: { /* same shape */ },
};
```

**Note:** use double-quoted strings for any value containing an apostrophe (`'`), especially in French.

### Regenerating the ASCII portrait

The portrait is pre-generated and stored in `src/assets/portrait.ts`. To regenerate it from a new photo:

```bash
# Install jp2a
brew install jp2a

# Composite your PNG onto a black background (handles transparency)
python3 - <<'EOF'
from PIL import Image
img = Image.open("your-photo.png").convert("RGBA")
bg = Image.new("RGBA", img.size, (0, 0, 0, 255))
bg.paste(img, mask=img.split()[3])
bg.convert("RGB").save("/tmp/portrait.jpg")
EOF

# Generate ASCII art (tune --width to fit your layout)
jp2a /tmp/portrait.jpg --width=54 > /tmp/portrait.txt

# Write to TypeScript
python3 - <<'EOF'
with open('/tmp/portrait.txt') as f:
    art = f.read().replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')
with open('src/assets/portrait.ts', 'w') as f:
    f.write(f'export const portrait = `\n{art}`;\n')
EOF
```

### Publishing to npm

```bash
npm run build
npm publish          # publishes as 'baretsky', makes npx baretsky work globally
```

---

## Landing page (`website/`)

A single-screen site in the [Gzhel](https://en.wikipedia.org/wiki/Gzhel) aesthetic — cobalt blue on porcelain white, with a complementary dark mode (deep navy + gold).

### Design

| Mode | Background | Accent |
|------|-----------|--------|
| Light | `#FAFAF8` porcelain | `#2952A3` cobalt blue |
| Dark | `#0A1628` deep navy | `#C8A96E` warm gold |

The botanical SVG motif in the top-right corner is hand-crafted and adapts its stroke colour with the theme.

### Features

- One-click copy for both commands
- Light / dark toggle with GSAP colour transitions, persisted in `localStorage`
- "Open in browser" button opens a modal with a live xterm.js terminal connected to the home server via WebSocket (falls back gracefully if the server is unreachable)
- Mobile-aware: commands are fully usable; terminal shows a "use desktop" message on narrow screens

### Tech stack

| Layer | Tool |
|-------|------|
| Build | [Vite 8](https://vite.dev) |
| Language | TypeScript |
| Animations | [GSAP 3](https://gsap.com) |
| Terminal | [xterm.js 5](https://xtermjs.org) + FitAddon |
| Terminal backend | [ttyd](https://github.com/tsl0922/ttyd) over WebSocket |

### Development

```bash
cd website
npm install
npm run dev       # Vite dev server at localhost:5173
npm run build     # Output to website/dist/
```

---

## Self-hosting

The portfolio is served from a home server behind a [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/), exposing both HTTPS and SSH on the same subdomain.

### Architecture

```
Internet
  │
  ├── HTTPS  portfolio.baretsky.net ──► Cloudflare Tunnel ──► nginx :80
  │                                                               │
  │                                                     serves website/dist/
  │                                                     proxies /ws → ttyd :7681
  │                                                     ttyd spawns `baretsky`
  │
  └── SSH    portfolio.baretsky.net ──► Cloudflare Tunnel (TCP) ──► sshd :22
                                                                     ForceCommand → baretsky
```

### Deploy

All server config files are in `.claude/server-setup/`. See [`DEPLOY.md`](.claude/server-setup/DEPLOY.md) for the full step-by-step guide. In summary:

**One-time server setup:**
```bash
# 1. Init bare git repo
git init --bare /repos/terminal-portfolio.git
cp .claude/server-setup/post-receive /repos/terminal-portfolio.git/hooks/post-receive
chmod +x /repos/terminal-portfolio.git/hooks/post-receive

# 2. Install and configure nginx
cp .claude/server-setup/nginx.conf /etc/nginx/sites-available/portfolio
ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

# 3. Install ttyd and start service
wget https://github.com/tsl0922/ttyd/releases/latest/download/ttyd.x86_64 \
     -O /usr/local/bin/ttyd && chmod +x /usr/local/bin/ttyd
cp .claude/server-setup/ttyd.service /etc/systemd/system/ttyd.service
systemctl enable --now ttyd
```

**Add remote and push:**
```bash
git remote add homeserver user@YOUR_SERVER_IP:/repos/terminal-portfolio.git
git push homeserver main
```

The `post-receive` hook runs `npm ci && npm run build` in `website/` and rsyncs the output to `/var/www/portfolio` automatically on every push.

**Updating the CLI portfolio after publishing a new npm version:**
```bash
# On the server
npm install -g baretsky@latest
```

---

## Requirements

| Requirement | Version |
|-------------|---------|
| Node.js | ≥ 18 |
| Terminal width | ≥ 100 columns (warned otherwise) |

The CLI works on macOS, Linux, and Windows (WSL). The landing page works in all modern browsers.
