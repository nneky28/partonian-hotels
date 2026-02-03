'use client';

import {
  Box,
  Grid,
  VStack,
  Heading,
  Text,
  Button,
  HStack,
  Flex,
  Icon,
  Image,
} from '@chakra-ui/react';
import { MdArrowForward} from 'react-icons/md';
import { IconType } from 'react-icons';
import { useState, useMemo } from 'react';

type RoomCategory = 'all' | 'deluxe' | 'alcove' | 'suite';

interface RoomAmenity {
  icon: IconType;
  label: string;
}

interface Room {
  id: string;
  name: string;
  price: string;
  image: string;
  badge?: {
    text: string;
    color: 'primary' | 'gold';
  };
  description: string;
  amenities: RoomAmenity[];
}

interface RoomsSectionProps {
  rooms: Room[];
  onBookRoom?: (roomId: string) => void;
  onToggleFavorite?: (roomId: string) => void;
}

export const RoomsSection = ({ rooms, onBookRoom, onToggleFavorite }: RoomsSectionProps) => {
  const [activeFilter, setActiveFilter] = useState<RoomCategory>('all');

  // Dynamically determine available filters based on room names
  const availableFilters = useMemo(() => {
    const filters: { label: string; value: RoomCategory; count: number }[] = [
      { label: 'All Rooms', value: 'all', count: rooms.length },
    ];

    const deluxeCount = rooms.filter(r => 
      r.name.toLowerCase().includes('deluxe')
    ).length;
    
    const alcoveCount = rooms.filter(r => 
      r.name.toLowerCase().includes('alcove')
    ).length;
    
    const suiteCount = rooms.filter(r => 
      r.name.toLowerCase().includes('suite') || 
      r.name.toLowerCase().includes('executive') ||
      r.name.toLowerCase().includes('presidential') ||
      r.name.toLowerCase().includes('ambassadorial')
    ).length;

    if (deluxeCount > 0) {
      filters.push({ label: 'Deluxe Rooms', value: 'deluxe', count: deluxeCount });
    }
    
    if (alcoveCount > 0) {
      filters.push({ label: 'Alcove Rooms', value: 'alcove', count: alcoveCount });
    }
    
    if (suiteCount > 0) {
      filters.push({ label: 'Suites', value: 'suite', count: suiteCount });
    }

    return filters;
  }, [rooms]);

  // Filter rooms based on selected category
  const filteredRooms = useMemo(() => {
    if (activeFilter === 'all') return rooms;

    return rooms.filter(room => {
      const nameLower = room.name.toLowerCase();
      
      switch (activeFilter) {
        case 'deluxe':
          return nameLower.includes('deluxe');
        case 'alcove':
          return nameLower.includes('alcove');
        case 'suite':
          return nameLower.includes('suite') || 
                 nameLower.includes('executive') ||
                 nameLower.includes('presidential') ||
                 nameLower.includes('ambassadorial');
        default:
          return true;
      }
    });
  }, [rooms, activeFilter]);

  return (
    <Box as="section" w="full" px={{ base: 6, md: 1 }} py={16}>
      <Box maxW="1300px" mx="auto">
        <VStack align="stretch" spacing={8}>
          {/* Header with Filters */}
          <Box>
  
            <Flex
              bg="rgba(56, 41, 41, 0.3)"
              p={2}
              borderRadius="xl"
              border="1px"
              borderColor="whiteAlpha.50"
              justify="space-between"
              align="center"
              flexWrap="wrap"
              gap={4}
            >
              <HStack 
                spacing={2} 
                overflowX="auto" 
                pb={1}
                sx={{
                  '&::-webkit-scrollbar': {
                    height: '4px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: 'whiteAlpha.300',
                    borderRadius: 'full',
                  },
                }}
                w="full"
              >
                {availableFilters.map((filter) => (
                  <Button
                    key={filter.value}
                    h={10}
                    px={{ base: 4, md: 5 }}
                    bg={activeFilter === filter.value ? 'primaryRed' : '#382929'}
                    color={activeFilter === filter.value ? 'white' : 'whiteAlpha.800'}
                    fontWeight={activeFilter === filter.value ? 'bold' : 'medium'}
                    fontSize={{ base: 'xs', md: 'sm' }}
                    _hover={{ bg: activeFilter === filter.value ? 'red.600' : '#4a3939' }}
                    onClick={() => setActiveFilter(filter.value)}
                    flexShrink={0}
                    whiteSpace="nowrap"
                  >
                    {filter.label} 
                  </Button>
                ))}
              </HStack>
    
            </Flex>
          </Box>

          {/* Rooms Grid */}
          <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={8}>
            {filteredRooms.map((room) => (
              <VStack
                key={room.id}
                role="group"
                bg="#2a1d1d"
                borderRadius="2xl"
                overflow="hidden"
                border="1px"
                borderColor="whiteAlpha.50"
                _hover={{ borderColor: 'rgba(234, 42, 51, 0.3)' }}
                transition="all 0.3s"
                align="stretch"
                spacing={0}
              >
                {/* Room Image */}
                <Box position="relative" w="full" aspectRatio={16 / 9} overflow="hidden">
                  <Image
                    src={room.image}
                    alt={room.name}
                    w="full"
                    h="full"
                    objectFit="cover"
                    transition="transform 0.7s"
                    _groupHover={{ transform: 'scale(1.05)' }}
                  />

                  <Flex
                    position="absolute"
                    bottom={4}
                    right={4}
                    bg="rgba(24, 17, 17, 0.8)"
                    backdropFilter="blur(10px)"
                    px={4}
                    py={2}
                    borderRadius="lg"
                    border="1px"
                    borderColor="whiteAlpha.100"
                  >
                    <Text color="primaryRed" fontSize="lg" fontWeight="black">
                      {room.price}{' '}
        
                    </Text>
                  </Flex>
                </Box>

                {/* Room Details */}
                <VStack p={6} align="stretch" spacing={4} flex={1}>
                  <Box>
                    <Heading as="h3" fontSize="2xl" fontWeight="bold" mb={2}>
                      {room.name}
                    </Heading>

                    <HStack spacing={4} flexWrap="wrap">
                      {room.amenities.map((amenity, idx) => (
                        <HStack key={idx} spacing={1} color="whiteAlpha.700">
                          <Icon as={amenity.icon} boxSize={4} />
                          <Text fontSize="xs">{amenity.label}</Text>
                        </HStack>
                      ))}
                    </HStack>
                  </Box>

                  <Text color="whiteAlpha.700" fontSize="sm" lineHeight="relaxed" noOfLines={2}>
                    {room.description}
                  </Text>

                  <HStack spacing={3} mt="auto">
                    <Button
                      flex={1}
                      bg="primaryRed"
                      color="white"
                      fontWeight="bold"
                      py={6}
                      borderRadius="lg"
                      rightIcon={<Icon as={MdArrowForward} />}
                      _hover={{ bg: 'red.600' }}
                      onClick={() => onBookRoom?.(room.id)}
                    >
                      Book Now
                    </Button>

               
                  </HStack>
                </VStack>
              </VStack>
            ))}
          </Grid>

          {/* No results message */}
          {filteredRooms.length === 0 && (
            <Box textAlign="center" py={16}>
              <Text fontSize="xl" color="whiteAlpha.600">
                No rooms found in this category.
              </Text>
            </Box>
          )}
        </VStack>
      </Box>
    </Box>
  );
};
