'use client';

import { useState } from 'react';
import {
  Box,
  Grid,
  Heading,
  Text,
  HStack,
  Link as ChakraLink,
  Image,
  Container,
} from '@chakra-ui/react';
import { MdArrowBack } from 'react-icons/md';
import Link from 'next/link';

interface GalleryImage {
  id: string;
  url: string;
  category: 'all' | 'rooms' | 'dining' | 'wellness';
  alt: string;
}

interface GalleryPageProps {
  branchName: string;
  images: GalleryImage[];
  backUrl: string;
}

type FilterCategory = 'all' | 'rooms' | 'dining' | 'wellness';

export const GalleryPage = ({ branchName, images, backUrl }: GalleryPageProps) => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const year = new Date()
  const filteredImages = activeFilter === 'all' 
    ? images 
    : images.filter(img => img.category === activeFilter);

  const filters: { label: string; value: FilterCategory }[] = [
    { label: 'All', value: 'all' },
    { label: 'Rooms', value: 'rooms' },
    { label: 'Dining', value: 'dining' },
    { label: 'Wellness', value: 'wellness' },
  ];

  return (
    <Box bg="black" minH="100vh" color="white">
      {/* Navigation */}
      <Box as="nav" w="full" px={12} py={12}>
        <HStack justify="space-between" align="center">
          <Link href={backUrl} passHref>
            <HStack
              as="a"
              spacing={3}
              color="whiteAlpha.500"
              _hover={{ color: 'white' }}
              transition="colors 0.3s"
              cursor="pointer"
            >
              <MdArrowBack size={18} />
              <Text fontSize="11px" letterSpacing="0.2em" textTransform="uppercase" fontWeight="medium">
                Back
              </Text>
            </HStack>
          </Link>

          <HStack spacing={12}>
            {filters.map((filter) => (
              <ChakraLink
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                fontSize="11px"
                letterSpacing="0.2em"
                textTransform="uppercase"
                fontWeight="medium"
                color={activeFilter === filter.value ? 'white' : 'whiteAlpha.400'}
                _hover={{ color: 'white' }}
                transition="color 0.3s"
                cursor="pointer"
                position="relative"
                sx={{
                  '&::after': {
                    content: activeFilter === filter.value ? '""' : 'none',
                    position: 'absolute',
                    bottom: '-8px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '12px',
                    height: '1px',
                    bg: 'primaryRed',
                  },
                }}
              >
                {filter.label}
              </ChakraLink>
            ))}
          </HStack>

          <Box w="80px" />
        </HStack>
      </Box>

      {/* Header */}
      <Box as="header" textAlign="center" pt={8} pb={20}>
        <Text
          fontSize="10px"
          letterSpacing="0.8em"
          textTransform="uppercase"
          fontWeight="light"
          color="whiteAlpha.300"
          mb={4}
        >
          {branchName}
        </Text>
        <Heading
          as="h2"
          fontSize="2xl"
          fontWeight="light"
          letterSpacing="0.1em"
          textTransform="uppercase"
        >
          The Gallery
        </Heading>
      </Box>

      {/* Gallery Grid */}
      <Container as="main" maxW="7xl" px={12} pb={40}>
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }}
          gap={8}
        >
          {filteredImages.map((image) => (
            <Box
              key={image.id}
              // aspectRatio={4 / 5}
              overflow="hidden"
              bg="#0D0D0D"
              cursor="pointer"
              role="group"
              borderRadius={'10px'}
            >
              <Image
                src={image.url}
                alt={image.alt}
                w="full"
                h="full"
                objectFit="cover"
                opacity={0.9}
                transition="opacity 0.5s"
                _groupHover={{ opacity: 1 }}
              />
            </Box>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <Box
        as="footer"
        borderTop="1px"
        borderColor="whiteAlpha.50"
        py={12}
        px={12}
      >
        <HStack justify="space-between" opacity={0.3}>
          <Text fontSize="9px" letterSpacing="0.3em" textTransform="uppercase">
            Parktonian Luxury Hotel Group
          </Text>
          <Text fontSize="9px" letterSpacing="0.3em" textTransform="uppercase">
            {branchName} © {year.getFullYear()}
          </Text>
        </HStack>
      </Box>
    </Box>
  );
};
