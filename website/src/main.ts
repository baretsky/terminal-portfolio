import './style.css';
import gsap from 'gsap';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';

// ── Theme ────────────────────────────────────────────────

const root = document.documentElement;
const themeBtn = document.getElementById('themeToggle')!;

function getTheme(): 'light' | 'dark' {
  return (root.getAttribute('data-theme') as 'light' | 'dark') || 'light';
}

function applyTheme(theme: 'light' | 'dark', animate = true) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  if (!animate) return;

  // Animate the toggle icon swap
  const sun  = themeBtn.querySelector('.icon-sun') as SVGElement;
  const moon = themeBtn.querySelector('.icon-moon') as SVGElement;
  const hideIcon = theme === 'dark' ? sun : moon;
  const showIcon = theme === 'dark' ? moon : sun;

  gsap.to(hideIcon, { opacity: 0, rotate: 90, duration: 0.25, ease: 'power2.in' });
  gsap.fromTo(showIcon,
    { opacity: 0, rotate: -90 },
    { opacity: 1, rotate: 0, duration: 0.3, ease: 'power2.out', delay: 0.1 }
  );

  // Animate the toggle button border
  gsap.to(themeBtn, { scale: 0.88, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.inOut' });
}

themeBtn.addEventListener('click', () => {
  applyTheme(getTheme() === 'light' ? 'dark' : 'light');
});

// ── Entrance animations ──────────────────────────────────

window.addEventListener('DOMContentLoaded', () => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.to('#eyebrow',   { opacity: 1, y: 0, duration: 0.6, from: { y: 16 } })
    .to('#name',      { opacity: 1, y: 0, duration: 0.7, from: { y: 24 } }, '-=0.35')
    .to('#tagline',   { opacity: 1, y: 0, duration: 0.6, from: { y: 16 } }, '-=0.4')
    .to('#commands',  { opacity: 1, y: 0, duration: 0.6, from: { y: 20 } }, '-=0.35')
    .to('.terminal-btn', { opacity: 1, y: 0, duration: 0.5, from: { y: 14 } }, '-=0.3')
    .to('.terminal-btn', { scale: 1.04, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.inOut' }, '+=0.1');

  // Botanical motif draw-in
  gsap.fromTo('.botanical', { opacity: 0 }, { opacity: 'var(--botanical-o)' as unknown as number, duration: 1.4, delay: 0.3, ease: 'power2.out' });
});

// ── Copy to clipboard ────────────────────────────────────

document.querySelectorAll<HTMLElement>('.command-card').forEach(card => {
  const btn = card.querySelector<HTMLButtonElement>('.copy-btn')!;
  const label = btn.querySelector<HTMLSpanElement>('.copy-text')!;
  const cmd = card.dataset.cmd!;

  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(cmd);
    } catch {
      // fallback for HTTP contexts
      const ta = document.createElement('textarea');
      ta.value = cmd;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }

    const orig = label.textContent;
    label.textContent = 'Copied!';
    gsap.fromTo(btn, { scale: 0.92 }, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.5)' });

    setTimeout(() => {
      label.textContent = orig;
    }, 1500);
  });

  // Hover animations
  card.addEventListener('mouseenter', () => {
    gsap.to(card, { y: -2, scale: 1.01, duration: 0.2, ease: 'power2.out' });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, { y: 0, scale: 1, duration: 0.25, ease: 'power2.out' });
  });
});

// Terminal button hover
const termBtn = document.getElementById('terminalBtn')!;
termBtn.addEventListener('mouseenter', () => gsap.to(termBtn, { scale: 1.03, duration: 0.18, ease: 'power2.out' }));
termBtn.addEventListener('mouseleave', () => gsap.to(termBtn, { scale: 1, duration: 0.2, ease: 'power2.out' }));

// ── Terminal modal ───────────────────────────────────────

const overlay   = document.getElementById('modalOverlay')!;
const modal     = document.getElementById('modal')!;
const closeBtn  = document.getElementById('modalClose')!;
const container = document.getElementById('terminalContainer')!;

let term: Terminal | null = null;
let fitAddon: FitAddon | null = null;
let socket: WebSocket | null = null;

function openModal() {
  overlay.style.visibility = 'visible';
  gsap.to(overlay, { opacity: 1, duration: 0.25, ease: 'power2.out' });
  gsap.to(modal, { y: 0, duration: 0.4, ease: 'power3.out' });

  if (window.innerWidth < 768) {
    document.getElementById('mobileMessage')!.style.display = 'flex';
    return;
  }

  initTerminal();
}

function closeModal() {
  gsap.to(modal, { y: 32, duration: 0.28, ease: 'power2.in' });
  gsap.to(overlay, {
    opacity: 0, duration: 0.3, ease: 'power2.in',
    onComplete: () => {
      overlay.style.visibility = 'hidden';
      disposeTerminal();
    }
  });
}

function initTerminal() {
  term = new Terminal({
    fontFamily: "'JetBrains Mono', 'Courier New', monospace",
    fontSize: 12,
    lineHeight: 1.2,
    theme: {
      background: '#0D1117',
      foreground: '#e6edf3',
      cursor:     '#C8A96E',
      selectionBackground: '#2952A340',
      black:   '#0D1117', brightBlack:   '#6e7681',
      red:     '#ff7b72', brightRed:     '#ffa198',
      green:   '#3fb950', brightGreen:   '#56d364',
      yellow:  '#d29922', brightYellow:  '#e3b341',
      blue:    '#58a6ff', brightBlue:    '#79c0ff',
      magenta: '#bc8cff', brightMagenta: '#d2a8ff',
      cyan:    '#39d353', brightCyan:    '#56d364',
      white:   '#b1bac4', brightWhite:   '#f0f6fc',
    },
    cursorBlink: true,
    allowTransparency: true,
  });

  fitAddon = new FitAddon();
  term.loadAddon(fitAddon);
  term.open(container);
  fitAddon.fit();
  term.resize(term.cols, Math.min(term.rows, 16));

  const wsUrl = `wss://wsportfolio.baretsky.net/ws`;
  socket = new WebSocket(wsUrl);

  socket.onopen = () => {
    socket!.send(JSON.stringify({ AuthToken: '' }));
  };

  socket.onmessage = (e: MessageEvent) => {
    if (typeof e.data === 'string') {
      // ttyd sends JSON at the start, then raw terminal data
      try {
        const msg = JSON.parse(e.data);
        if (msg.Arguments) return; // initial handshake
      } catch { /* raw data */ }
    }
    term!.write(typeof e.data === 'string' ? e.data : new Uint8Array(e.data));
  };

  socket.onerror = () => {
    term!.write('\r\n\x1b[33mCould not connect to live terminal.\x1b[0m\r\n');
    term!.write('\x1b[2mRun \x1b[0m\x1b[36mnpx baretsky\x1b[0m\x1b[2m in your own terminal instead.\x1b[0m\r\n');
  };

  term.onData((data: string) => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ Input: data }));
    }
  });

  const ro = new ResizeObserver(() => {
    fitAddon?.fit();
    if (term && term.rows > 16) term.resize(term.cols, 16);
  });
  ro.observe(container);
}

function disposeTerminal() {
  socket?.close();
  socket = null;
  term?.dispose();
  term = null;
  fitAddon = null;
}

termBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
