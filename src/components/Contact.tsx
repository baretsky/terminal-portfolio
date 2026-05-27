import React from 'react';
import { Box, Text } from 'ink';
import { Lang, content } from '../data/content.js';

interface Props { lang: Lang }

export default function Contact({ lang }: Props) {
  const { contact, contactNote, nav, profile } = content[lang];
  const title = nav.tabs[4];

  const links = [
    { icon: '✉', label: 'Email', value: contact.email },
    { icon: '⌥', label: 'GitHub', value: contact.github },
    { icon: 'in', label: 'LinkedIn', value: contact.linkedin },
    { icon: '◈', label: 'Website', value: contact.website },
    { icon: '◎', label: 'Location', value: profile.location },
  ];

  return (
    <Box flexDirection="column" paddingTop={1}>
      <Box marginBottom={2}>
        <Text color="#FF7A00" bold>{'█'.repeat(3)} {title}</Text>
      </Box>

      <Box flexDirection="column" gap={1}>
        {links.map((link) => (
          <Box key={link.label} gap={3}>
            <Box width={12}>
              <Text color="#555555">{link.icon}  {link.label}</Text>
            </Box>
            <Text color="#444444">·</Text>
            <Text color="#CCCCCC">{link.value}</Text>
          </Box>
        ))}
      </Box>

      <Box marginTop={3} borderStyle="single" borderColor="#222222" padding={1} width={50}>
        <Text color="#555555" italic>{contactNote}</Text>
      </Box>
    </Box>
  );
}
