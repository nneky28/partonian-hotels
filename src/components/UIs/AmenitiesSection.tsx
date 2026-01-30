import { Box, SimpleGrid } from '@chakra-ui/react';
import { AmenityCard } from './AmenityCard';
import { MdRestaurant, MdPool, MdFitnessCenter } from 'react-icons/md';
import { PiHandshakeBold } from "react-icons/pi";


const amenities = [
  {
    icon: MdRestaurant,
    title: 'Fine Dining',
    description: 'Curated culinary journeys at every branch.',
  },
  {
    icon: MdPool,
    title: 'Infinity Pools',
    description: 'Luxury relaxation in our temperature-controlled pools.',
  },
  {
    icon: MdFitnessCenter,
    title: 'Elite Gyms',
    description: 'State-of-the-art wellness and fitness facilities.',
  },
  {
    icon: PiHandshakeBold,
    title: 'Concierge',
    description: 'Dedicated 24/7 bespoke service for every guest.',
  },
];

export const AmenitiesSection = () => {
  return (
    <Box
      as="section"
      py={24}
      bg="surfaceBlack"
      borderY="1px"
      borderColor="whiteAlpha.50"
    >
      <Box maxW="7xl" mx="auto" px={6}>
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={12}>
          {amenities.map((amenity) => (
            <AmenityCard key={amenity.title} {...amenity} />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};
