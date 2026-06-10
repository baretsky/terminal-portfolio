import React, { useEffect, useState } from 'react';
import { Box, Text, useInput, useApp, useStdout } from 'ink';
import NavBar, { Section, SECTION_IDS } from './components/NavBar.js';
import Home from './components/Home.js';
import Experience from './components/Experience.js';
import Skills from './components/Skills.js';
import Projects from './components/Projects.js';
import Contact from './components/Contact.js';
import { Lang } from './data/content.js';

function SectionContent({ section, lang }: { section: Section; lang: Lang }) {
  switch (section) {
    case 'home': return <Home lang={lang} />;
    case 'experience': return <Experience lang={lang} />;
    case 'skills': return <Skills lang={lang} />;
    case 'projects': return <Projects lang={lang} />;
    case 'contact': return <Contact lang={lang} />;
  }
}

export default function App() {
  const [section, setSection] = useState<Section>('home');
  const [lang, setLang] = useState<Lang>('en');
  const { exit } = useApp();
  const { stdout } = useStdout();
  // Use || instead of ?? so that 0 (PTY size not yet set) also falls back.
  const [size, setSize] = useState(() => ({
    cols: stdout?.columns || 120,
    rows: stdout?.rows || 40,
  }));
  const { cols, rows } = size;

  useEffect(() => {
    if (!stdout) return;
    const onResize = () => setSize({ cols: stdout.columns || 120, rows: stdout.rows || 40 });
    stdout.on('resize', onResize);
    return () => { stdout.off('resize', onResize); };
  }, [stdout]);

  useInput((input: any, key: any) => {
    if (input === 'q' || (key.ctrl && input === 'c')) {
      exit();
      return;
    }
    if (input === 't') {
      setLang((l: Lang) => l === 'en' ? 'fr' : 'en');
      return;
    }

    const idx = SECTION_IDS.findIndex(id => id === section);
    if (key.rightArrow || input === 'l') {
      setSection(SECTION_IDS[(idx + 1) % SECTION_IDS.length]);
    }
    if (key.leftArrow || input === 'h') {
      setSection(SECTION_IDS[(idx - 1 + SECTION_IDS.length) % SECTION_IDS.length]);
    }
  });

  if (cols < 60) {
    return (
      <Box flexDirection="column" padding={2}>
        <Text color="#FF7A00" bold>Terminal too narrow</Text>
        <Text color="#888888">Please resize to at least 60 columns (currently {cols}).</Text>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" paddingX={3} height={rows}>
      <Box paddingY={1} borderStyle="single" borderColor="#1A1A1A" marginBottom={0} flexShrink={0}>
        <Text color="#FF7A00" bold>▸ portfolio</Text>
        <Text color="#333333">  ·  </Text>
        <Text color="#444444">baretsky.net</Text>
        <Box flexGrow={1} />
        <Text color={lang === 'en' ? '#FF7A00' : '#555555'} bold={lang === 'en'}>EN</Text>
        <Text color="#333333"> · </Text>
        <Text color={lang === 'fr' ? '#FF7A00' : '#555555'} bold={lang === 'fr'}>FR</Text>
      </Box>

      <Box flexGrow={1} paddingX={1} overflow="hidden">
        <SectionContent section={section} lang={lang} />
      </Box>

      <NavBar active={section} lang={lang} />
    </Box>
  );
}
