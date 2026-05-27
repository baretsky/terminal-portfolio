import React from 'react';
import { Box, Text } from 'ink';
import { Lang, content } from '../data/content.js';

interface Props { lang: Lang }

export default function Experience({ lang }: Props) {
  const { experience, nav } = content[lang];
  const title = nav.tabs[1];

  return (
    <Box flexDirection="column" paddingTop={1} gap={0}>
      <Box marginBottom={1}>
        <Text color="#FF7A00" bold>{'█'.repeat(3)} {title}</Text>
      </Box>

      {experience.map((job, i) => (
        <Box key={i} flexDirection="column" marginBottom={2}>
          <Box gap={2}>
            <Box width={2} flexDirection="column" alignItems="flex-end">
              <Text color="#FF7A00">●</Text>
            </Box>
            <Box flexDirection="column" gap={0}>
              <Box gap={2}>
                <Text color="white" bold>{job.role}</Text>
                <Text color="#555555">—</Text>
                <Text color="#888888">{job.company}</Text>
              </Box>
              <Text color="#555555">{job.period}</Text>
              <Box marginTop={1}>
                <Text color="#AAAAAA" wrap="wrap">{job.description}</Text>
              </Box>
            </Box>
          </Box>
          {i < experience.length - 1 && (
            <Box marginLeft={2}>
              <Text color="#333333">{'│'}</Text>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}
