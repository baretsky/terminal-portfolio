import React from 'react';
import { Box, Text } from 'ink';
import { portrait } from '../assets/portrait.js';
import { Lang, content } from '../data/content.js';

interface Props { lang: Lang }

export default function Home({ lang }: Props) {
  const { profile, nav } = content[lang];

  return (
    <Box flexDirection="row" gap={6} paddingTop={1}>
      <Box flexDirection="column" flexShrink={0}>
        <Text color="#888888">{portrait}</Text>
      </Box>

      <Box flexDirection="column" justifyContent="center" gap={1}>
        <Text color="#FF7A00" bold>{'█'.repeat(3)} {profile.name}</Text>
        <Text color="white" bold>{profile.title}</Text>
        <Text color="#888888">{profile.subtitle}</Text>

        <Box marginTop={1}>
          <Text color="#555555">{'─'.repeat(40)}</Text>
        </Box>

        <Box marginTop={1}>
          <Text color="#CCCCCC" wrap="wrap">{profile.bio}</Text>
        </Box>

        <Box marginTop={2}>
          <Text color="#555555">📍 {profile.location}</Text>
        </Box>

        <Box marginTop={2} flexDirection="column" gap={0}>
          <Text color="#FF7A00" bold>{nav.quickNavLabel}</Text>
          <Text color="#666666">{nav.quickNavHint}</Text>
        </Box>
      </Box>
    </Box>
  );
}
