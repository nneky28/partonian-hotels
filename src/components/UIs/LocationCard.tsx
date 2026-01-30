'use client';

import { VStack, Box, Heading, Text, Icon, Flex } from '@chakra-ui/react';
import { IconType } from 'react-icons';

interface LocationCardProps {
  name: string;
  description: string;
  distance: string;
  icon: IconType;
}

export const LocationCard = ({ name, description, distance, icon }: LocationCardProps) => {
  return (
    <VStack
      p={6}
      textAlign="center"
      borderRadius="xl"
      bg="white"
      border="1px"
      borderColor="gray.200"
      _hover={{ transform: 'translateY(-4px)' }}
      transition="all 0.3s"
      spacing={4}
      sx={{
        '.chakra-ui-dark &': {
          bg: 'luxuryBlack',
          borderColor: 'rgba(255, 255, 255, 0.1)',
        },
      }}
    >
      <Flex
        w={14}
        h={14}
        borderRadius="full"
        bg="rgba(234, 42, 51, 0.1)"
        align="center"
        justify="center"
      >
        <Icon as={icon} color="primaryRed" boxSize={8} />
      </Flex>
      <Heading
        as="h3"
        fontSize="lg"
        fontWeight="bold"
        color="gray.900"
        sx={{
          '.chakra-ui-dark &': {
            color: 'white',
          },
        }}
      >
        {name}
      </Heading>
      <Text
        color="gray.500"
        fontSize="xs"
        lineHeight="relaxed"
        sx={{
          '.chakra-ui-dark &': {
            color: '#b89d9f',
          },
        }}
      >
        {description}
      </Text>
      <Text
        fontSize="10px"
        fontWeight="black"
        color="primaryRed"
        textTransform="uppercase"
        letterSpacing="widest"
        mt={4}
      >
        {distance}
      </Text>
    </VStack>
  );
};
