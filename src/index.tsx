#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import App from './App.js';

// Alternate screen buffer: fullscreen render, no scrollback, restores the
// user's terminal on exit.
process.stdout.write('\x1b[?1049h');
const { waitUntilExit } = render(<App />);
waitUntilExit().then(() => {
  process.stdout.write('\x1b[?1049l');
});
