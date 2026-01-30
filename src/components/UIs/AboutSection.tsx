'use client';

import { Box, Container, VStack, Heading, Text, Button } from '@chakra-ui/react';

interface AboutSectionProps {
  onBookRoom?: () => void;
}

export const AboutSection = ({ onBookRoom }: AboutSectionProps) => {
  return (
    <Box
      as="section"
      py={{ base: 20, md: 32 }}
      px={6}
      bg="surfaceBlack"
      position="relative"
    >
      <Container maxW="4xl">
        <VStack spacing={8} textAlign="center">
          <Box>
            <Text
              color="primaryRed"
              fontWeight="black"
              textTransform="uppercase"
              letterSpacing="0.3em"
              fontSize="xs"
              mb={4}
            >
              Welcome
            </Text>
            <Heading
              as="h2"
              fontSize={{ base: '3xl', md: '5xl' }}
              fontFamily="heading"
              fontWeight="bold"
              mb={8}
              lineHeight="1.2"
            >
              Parktonian Hotels
            </Heading>
          </Box>

          <VStack spacing={6} maxW="3xl">
            <Text
              fontSize={{ base: 'lg', md: 'xl' }}
              color="white"
              lineHeight="relaxed"
              fontWeight="medium"
            >
              Parktonian Hotels is a world class destination for individuals who
              desire a luxurious environment to rest, relax and refresh.
            </Text>

            <Text
              fontSize={{ base: 'md', md: 'lg' }}
              color="white"
              lineHeight="relaxed"
              fontWeight="medium"
            >
              We provide every amenity necessary for a pleasurable stay. Enjoy our
              serene environment with optimal security, luxurious rooms, wifi
              internet, room service, exquisite lounge, swimming pool, gym and much
              more.
            </Text>

            <Text
              fontSize={{ base: 'md', md: 'lg' }}
              color="white"
              fontWeight="semibold"
              lineHeight="relaxed"
              pt={4}
            >
              Book a room today and experience comfort, hospitality and luxury!
            </Text>
          </VStack>
        </VStack>
      </Container>

      {/* Decorative elements */}
      <Box
        position="absolute"
        top="50%"
        left="10%"
        w="150px"
        h="150px"
        border="1px"
        borderColor="whiteAlpha.50"
        transform="translateY(-50%) rotate(45deg)"
        display={{ base: 'none', lg: 'block' }}
      />
      <Box
        position="absolute"
        top="50%"
        right="10%"
        w="150px"
        h="150px"
        border="1px"
        borderColor="whiteAlpha.50"
        transform="translateY(-50%) rotate(45deg)"
        display={{ base: 'none', lg: 'block' }}
      />
    </Box>
  );
};
