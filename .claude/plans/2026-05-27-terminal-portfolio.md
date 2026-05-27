# Plan: Terminal Portfolio

## Goal
Full-screen Ink app with Home + 4 sections (Experience, Skills, Projects, Contact),
dark theme with orange accents, ASCII art portrait. Accessible via both
`ssh portfolio@portfolio.baretsky.net` (home server + Cloudflare Tunnel) and `npx baretsky`.
"Done" = both commands work from a machine that has never seen this project.

## Constraints
- Must use Ink (React for CLI)
- ASCII art pre-generated from IMG_2660-no-bg.png (not at runtime)
- All content is Lorem Ipsum placeholder
- SSH must work without special client software (plain `ssh`, no cloudflared install)
- npx must work on macOS, Linux, WSL

## Assumptions
- Home = landing screen (ASCII art + name/title/bio) — always the first thing shown
- Navigation: left/right arrows or h/l to move between tabs, q to quit
- SSH: dedicated `portfolio` user on the home server, Cloudflare Tunnel exposes port 22
- npx package name: `npx baretsky`
- SSH hostname: `portfolio.baretsky.net`
- Terminal minimum width: 100 columns (warn if narrower)
- No authentication on SSH — anyone can connect, read-only
- Color: dark background, orange accents for headers/active tab

## Steps

1. **Project scaffold**
   - `npm init`, install ink, react, typescript, @types/react, @types/node
   - Entry point: `src/index.tsx` with a shebang, renders <App />
   - tsconfig targeting Node 18, compiles to `dist/`
   - Verify: `npx tsx src/index.tsx` prints "Hello" in terminal

2. **Generate ASCII art**
   - Install `ascii-image-converter` globally or as devDep
   - Run against IMG_2660-no-bg.png at ~55 chars wide, with color
   - Save as `src/assets/portrait.ts` — exported string constant
   - Verify: `console.log(portrait)` prints recognizable face

3. **Home screen**
   - Two-column <Box flexDirection="row">:
     Left: portrait string rendered in <Text>
     Right: name (large), title, subtitle, 2-line bio (all Lorem)
   - Orange color on name and title
   - Verify: looks correct in a 120-col terminal

4. **Navigation shell**
   - Bottom tab bar: [Home] [Experience] [Skills] [Projects] [Contact]
   - useInput: ← / → or h/l to switch, q to quit
   - Active tab highlighted in orange, inactive dimmed
   - useState<Section> drives which screen renders
   - Verify: tabs cycle correctly, q exits cleanly

5. **Section screens (placeholder content)**
   - Experience: timeline list (company, role, dates — all Lorem)
   - Skills: two-column grid of skill names with dot-rating
   - Projects: 3 cards (title + 2-line lorem description)
   - Contact: links list (email, GitHub, LinkedIn — lorem handles)
   - Verify: each section renders, navigation returns home

6. **Responsive + polish**
   - Read process.stdout.columns, warn if < 100
   - Handle terminal resize (SIGWINCH) without crash
   - Verify: resize terminal while running, no crash

7. **npx packaging**
   - Add "bin" to package.json pointing to dist/index.js
   - `npm run build` → `npm pack` → test with `npx ./package.tgz`
   - Verify: npx from a temp directory launches the app

8. **npm publish**
   - `npm publish --access public`
   - Verify: `npx baretsky` works on a fresh machine (or fresh shell)

9. **SSH server setup (home server)**
   - Create `portfolio` user: `useradd -m -s /bin/bash portfolio`
   - Add `ForceCommand /usr/local/bin/portfolio-run` to sshd_config for that user
   - `portfolio-run` script: runs the installed node app, then exits
   - Disable password auth for that user (key-only or allow any — read-only so safe)
   - Verify: `ssh portfolio@localhost` launches the portfolio

10. **Cloudflare Tunnel**
    - Install `cloudflared` on home server, authenticate with Cloudflare account
    - Create tunnel: `cloudflared tunnel create portfolio`
    - Config: route TCP for `portfolio.baretsky.net:22` through the tunnel
    - Run cloudflared as a systemd service
    - Verify: `ssh portfolio@portfolio.baretsky.net` from external network launches the app

## Rollback
- npm: `npm unpublish baretsky` within 72h, or deprecate the package
- SSH: remove ForceCommand from sshd_config, delete the portfolio user
- Cloudflare: delete the tunnel in dashboard, remove the DNS record

## Out of scope
- Animations or real-time updates
- Any form of user input beyond navigation
- HTTPS web version
- Auth / rate limiting on SSH (acceptable for a read-only portfolio)
- CI/CD pipeline
