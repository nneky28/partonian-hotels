'use client';

import { Box, VStack, Heading, Text, Button, HStack } from '@chakra-ui/react';

interface BranchHeroProps {
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  onBookNow?: () => void;
  onViewRooms?: () => void;
}

export const BranchHero = ({
  title,
  subtitle,
  description,
  backgroundImage,
  onBookNow,
  onViewRooms,
}: BranchHeroProps) => {
  return (
    <Box px={{ base: 4, md: 20, lg: 40 }} py={6}>
      <Box
        position="relative"
        overflow="hidden"
        borderRadius="xl"
        minH="520px"
        bgImage={`linear-gradient(to top, rgba(24, 17, 17, 0.95) 0%, rgba(24, 17, 17, 0.4) 50%, rgba(24, 17, 17, 0.1) 100%), url(${backgroundImage})`}
        bgSize="cover"
        bgPosition="center"
        display="flex"
        alignItems="flex-end"
        px={{ base: 6, md: 12 }}
        pb={12}
      >
        <VStack align="flex-start" spacing={{ base: 3, md: 4 }} maxW="2xl">
          <Text
            color="primaryRed"
            fontWeight="bold"
            letterSpacing="widest"
            textTransform="uppercase"
            fontSize="xs"
          >
            {subtitle}
          </Text>
          <Heading
            as="h1"
            fontSize={{ base: '4xl', md: '6xl' }}
            fontFamily="heading"
            fontWeight="black"
            color="white"
            lineHeight="tight"
            letterSpacing="tight"
          >
            {title}
          </Heading>
          <Text
            color="whiteAlpha.800"
            fontSize={{ base: 'base', md: 'lg' }}
            lineHeight="relaxed"
          >
            {description}
          </Text>
          <HStack spacing={4} pt={4}>
            <Button
              minW="140px"
              h={12}
              px={8}
              bg="primaryRed"
              color="white"
              fontSize="base"
              fontWeight="bold"
              boxShadow="0 10px 40px rgba(234, 42, 51, 0.3)"
              _hover={{ transform: 'scale(1.05)' }}
              transition="transform 0.3s"
              onClick={onBookNow}
            >
              Book Now
            </Button>
            <Button
              minW="140px"
              h={12}
              px={8}
              bg="whiteAlpha.100"
              backdropFilter="blur(10px)"
              color="white"
              border="1px"
              borderColor="whiteAlpha.200"
              fontSize="base"
              fontWeight="bold"
              _hover={{ bg: 'whiteAlpha.200' }}
              transition="all 0.3s"
              onClick={onViewRooms}
            >
              View Rooms
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};
