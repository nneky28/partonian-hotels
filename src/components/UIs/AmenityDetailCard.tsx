'use client';

import { Box, VStack, Heading, Text, HStack, Icon } from '@chakra-ui/react';
import { IconType } from 'react-icons';

interface AmenityDetailCardProps {
  title: string;
  description: string;
  imageUrl: string;
  icon: IconType;
}

export const AmenityDetailCard = ({
  title,
  description,
  imageUrl,
  icon,
}: AmenityDetailCardProps) => {
  return (
    <VStack
      role="group"
      spacing={4}
      pb={4}
      bg="white"
      borderRadius="xl"
      overflow="hidden"
      border="1px"
      borderColor="gray.200"
      _hover={{ borderColor: 'rgba(234, 42, 51, 0.5)' }}
      transition="all 0.3s"
      align="stretch"
      shadow="sm"
      sx={{
        '.chakra-ui-dark &': {
          bg: 'rgba(255, 255, 255, 0.05)',
          borderColor: 'rgba(255, 255, 255, 0.1)',
        },
      }}
    >
      <Box overflow="hidden" w="full" aspectRatio={16 / 9}>
        <Box
          w="full"
          h="full"
          bgImage={imageUrl}
          bgSize="cover"
          bgPosition="center"
          transition="transform 0.5s"
          _groupHover={{ transform: 'scale(1.1)' }}
        />
      </Box>
      <Box px={5} pb={2}>
        <HStack spacing={2} mb={1}>
          <Icon as={icon} color="primaryRed" boxSize={5} />
          <Heading
            as="h3"
            fontSize="xl"
            fontWeight="bold"
            color="gray.900"
            sx={{
              '.chakra-ui-dark &': {
                color: 'white',
              },
            }}
          >
            {title}
          </Heading>
        </HStack>
        <Text
          color="gray.600"
          fontSize="sm"
          lineHeight="relaxed"
          sx={{
            '.chakra-ui-dark &': {
              color: '#b89d9f',
            },
          }}
        >
          {description}
        </Text>
      </Box>
    </VStack>
  );
};
