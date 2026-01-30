'use client';

import { Box, Flex, Heading, Text, IconButton, HStack, VStack, Icon } from '@chakra-ui/react';
import { MdChevronLeft, MdChevronRight, MdSquareFoot } from 'react-icons/md';
import { IoBed } from 'react-icons/io5';

interface Room {
  name: string;
  price: string;
  image: string;
  size: string;
  bed: string;
}

interface FeaturedRoomsCarouselProps {
  rooms: Room[];
}

export const FeaturedRoomsCarousel = ({ rooms }: FeaturedRoomsCarouselProps) => {
  return (
    <Box py={20} bgGradient="linear(to-b, transparent, rgba(234, 42, 51, 0.05))">
      <Flex px={{ base: 6, md: 16 }} mb={10} align="flex-end" justify="space-between">
        <VStack align="flex-start" spacing={2}>
          <Text color="primaryRed" fontWeight="bold" letterSpacing="widest" textTransform="uppercase" fontSize="xs">
            Stay in Comfort
          </Text>
          <Heading as="h2" fontSize="4xl" fontWeight="bold">
            Featured Rooms
          </Heading>
        </VStack>

        <HStack spacing={2}>
          <IconButton
            aria-label="Previous"
            icon={<MdChevronLeft />}
            size="lg"
            borderRadius="full"
            border="1px"
            borderColor="whiteAlpha.100"
            bg="transparent"
            _hover={{ bg: 'whiteAlpha.100' }}
          />
          <IconButton
            aria-label="Next"
            icon={<MdChevronRight />}
            size="lg"
            borderRadius="full"
            border="1px"
            borderColor="whiteAlpha.100"
            bg="transparent"
            _hover={{ bg: 'whiteAlpha.100' }}
          />
        </HStack>
      </Flex>

      <Flex
        gap={6}
        overflowX="auto"
        px={{ base: 6, md: 16 }}
        pb={12}
        css={{
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none',
          scrollSnapType: 'x mandatory',
        }}
      >
        {rooms.map((room, idx) => (
          <Box
            key={idx}
            minW="380px"
            scrollSnapAlign="start"
            role="group"
          >
            <Box position="relative" overflow="hidden" borderRadius="3xl" h="450px">
              <Box
                as="img"
                src={room.image}
                alt={room.name}
                w="full"
                h="full"
                objectFit="cover"
                _groupHover={{ transform: 'scale(1.1)' }}
                transition="transform 0.7s"
              />
              <Box position="absolute" inset={0} bgGradient="linear(to-t, blackAlpha.900, blackAlpha.200, transparent)" />

              <VStack position="absolute" bottom={0} left={0} right={0} p={8} align="flex-start" spacing={4}>
                <Text color="primaryRed" fontWeight="bold" fontSize="xs" textTransform="uppercase" letterSpacing="widest">
                  Starting from {room.price}
                </Text>
                <Heading as="h3" fontSize="2xl" fontWeight="bold" color="white">
                  {room.name}
                </Heading>
                <HStack spacing={4} color="whiteAlpha.600" fontSize="xs">
                  <HStack spacing={1}>
                    <Icon as={MdSquareFoot} boxSize={4} />
                    <Text>{room.size}</Text>
                  </HStack>
                  <HStack spacing={1}>
                    <Icon as={IoBed} boxSize={4} />
                    <Text>{room.bed}</Text>
                  </HStack>
                </HStack>

                <Box
                  as="button"
                  mt={6}
                  w="full"
                  py={3}
                  bg="whiteAlpha.100"
                  backdropFilter="blur(12px)"
                  borderRadius="xl"
                  border="1px"
                  borderColor="whiteAlpha.100"
                  fontSize="sm"
                  fontWeight="bold"
                  opacity={0}
                  transform="translateY(16px)"
                  _groupHover={{ opacity: 1, transform: 'translateY(0)' }}
                  transition="all 0.3s"
                >
                  View Details
                </Box>
              </VStack>
            </Box>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};
