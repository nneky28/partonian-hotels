'use client';

import { Box, Grid, GridItem, Text, Button, Icon, Image } from '@chakra-ui/react';
import { MdGridView } from 'react-icons/md';
import { useRouter } from 'next/navigation';

interface BranchPageHeroProps {
  photos: {
    main: string;
    lounge: string;
    dining: string;
    pool: string;
  };
  galleryUrl?: string;
}

export const BranchPageHero = ({ photos, galleryUrl }: BranchPageHeroProps) => {
  const router = useRouter();

  const handleViewAllPhotos = () => {
    if (galleryUrl) {
      router.push(galleryUrl);
    }
  };

  return (
    <Box w="full" px={{ base: 6, md: 16 }} pt={{ base: 24, md: 28 }} pb={8}>
      <Box maxW="1200px" mx="auto">
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }}
          templateRows={{ base: 'repeat(5, 200px)', md: 'repeat(2, 300px)' }}
          gap={4}
          h={{ base: 'auto', md: '600px' }}
        >
          {/* Main Large Image */}
          <GridItem colSpan={{ base: 1, md: 2 }} rowSpan={{ base: 1, md: 2 }} position="relative" overflow="hidden" borderRadius="3xl" role="group">
            <Box position="absolute" inset={0} bgGradient="linear(to-t, blackAlpha.600, transparent)" zIndex={1} />
            <Image
              src={photos.main}
              alt="Main Lobby"
              w="full"
              h="full"
              objectFit="cover"
              _groupHover={{ transform: 'scale(1.05)' }}
              transition="transform 0.7s"
            />
            <Box position="absolute" bottom={8} left={8} zIndex={2}>
              <Text bg="primaryRed" px={3} py={1} borderRadius="md" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="widest" color="white">
                Featured
              </Text>
              <Text fontSize="3xl" fontWeight="bold" color="white" mt={2}>
                Main Lobby & Lounge
              </Text>
            </Box>
          </GridItem>

          {/* Small Image 1 */}
          <GridItem position="relative" overflow="hidden" borderRadius="3xl" role="group">
            <Image
              src={photos.lounge}
              alt="Lounge Area"
              w="full"
              h="full"
              objectFit="cover"
              _groupHover={{ transform: 'scale(1.05)' }}
              transition="transform 0.7s"
            />
          </GridItem>

          {/* Small Image 2 */}
          <GridItem position="relative" overflow="hidden" borderRadius="3xl" role="group">
            <Image
              src={photos.dining}
              alt="Dining Room"
              w="full"
              h="full"
              objectFit="cover"
              _groupHover={{ transform: 'scale(1.05)' }}
              transition="transform 0.7s"
            />
          </GridItem>

          {/* Wide Image with View All Button */}
          <GridItem colSpan={{ base: 1, md: 2 }} position="relative" overflow="hidden" borderRadius="3xl" role="group">
            <Image
              src={photos.pool}
              alt="Pool Area"
              w="full"
              h="full"
              objectFit="cover"
            />
            <Box
              position="absolute"
              inset={0}
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg="blackAlpha.200"
              _groupHover={{ bg: 'blackAlpha.400' }}
              transition="all 0.3s"
            >
              <Button
                bg="whiteAlpha.100"
                backdropFilter="blur(12px)"
                px={6}
                py={3}
                borderRadius="full"
                color="white"
                fontWeight="semibold"
                border="1px"
                borderColor="whiteAlpha.100"
                leftIcon={<Icon as={MdGridView} />}
                _hover={{ bg: 'whiteAlpha.200' }}
                onClick={handleViewAllPhotos}
              >
                View All Photos
              </Button>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};
