import React from 'react';
import { Box, Text } from 'ink';
import { Lang, content } from '../data/content.js';

interface Props { lang: Lang }

export default function Skills({ lang }: Props) {
  const { skills, nav } = content[lang];
  const title = nav.tabs[2];

  return (
    <Box flexDirection="column" paddingTop={1}>
      <Box marginBottom={2}>
        <Text color="#FF7A00" bold>{'█'.repeat(3)} {title}</Text>
      </Box>

      <Box flexDirection="row" gap={6} flexWrap="wrap">
        {skills.map((group) => (
          <Box key={group.category} flexDirection="column" gap={0} minWidth={24}>
            <Box marginBottom={1}>
              <Text color="#FF7A00" bold>{group.category}</Text>
            </Box>
            {group.items.map((skill) => (
              <Text key={skill} color="#CCCCCC">{skill}</Text>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
