import React from 'react';
import { Box, Text } from 'ink';
import { Lang, content } from '../data/content.js';

export type Section = 'home' | 'experience' | 'skills' | 'projects' | 'contact';

export const SECTION_IDS: Section[] = ['home', 'experience', 'skills', 'projects', 'contact'];

interface Props {
  active: Section;
  lang: Lang;
}

export default function NavBar({ active, lang }: Props) {
  const { tabs, hint } = content[lang].nav;

  return (
    <Box borderStyle="single" borderColor="#333333" paddingX={1} marginTop={1}>
      {SECTION_IDS.map((id, i) => (
        <React.Fragment key={id}>
          {i > 0 && <Text color="#444444"> · </Text>}
          {id === active ? (
            <Text color="#FF7A00" bold>{'[ '}{tabs[i]}{' ]'}</Text>
          ) : (
            <Text color="#555555">{tabs[i]}</Text>
          )}
        </React.Fragment>
      ))}
      <Box flexGrow={1} />
      <Text color="#333333">{hint}</Text>
    </Box>
  );
}
