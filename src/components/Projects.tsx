import React from 'react';
import { Box, Text } from 'ink';
import { Lang, content } from '../data/content.js';

interface Props { lang: Lang }

export default function Projects({ lang }: Props) {
  const { projects, nav } = content[lang];
  const title = nav.tabs[3];

  return (
    <Box flexDirection="column" paddingTop={1}>
      <Box marginBottom={2}>
        <Text color="#FF7A00" bold>{'█'.repeat(3)} {title}</Text>
      </Box>

      <Box flexDirection="row" gap={3} flexWrap="wrap">
        {projects.map((project, i) => (
          <Box
            key={i}
            flexDirection="column"
            borderStyle="single"
            borderColor="#333333"
            padding={1}
            width={36}
            gap={0}
          >
            <Text color="#FF7A00" bold>{project.name}</Text>
            <Text color="#555555">{project.tech}</Text>
            <Box marginTop={1}>
              <Text color="#AAAAAA" wrap="wrap">{project.description}</Text>
            </Box>
            {project.url ? (
              <Box marginTop={1}>
                <Text color="#444444">↗ </Text>
                <Text color="#666666">{project.url}</Text>
              </Box>
            ) : (
              <Box marginTop={1}>
                <Text color="#333333">⊘ private</Text>
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
