'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  HStack,
  VStack,
  Icon,
  IconButton,
  Flex,
} from '@chakra-ui/react';
import { MdChevronLeft, MdChevronRight, MdGridView } from 'react-icons/md';
import { useRouter } from 'next/navigation';

interface BranchSlide {
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

interface BranchHeroSliderProps {
  slides: BranchSlide[];
  galleryUrl?: string;
  onBookNow?: () => void;
  autoPlayInterval?: number;
}

export const BranchHeroSlider = ({
  slides,
  galleryUrl,
  onBookNow,
  autoPlayInterval = 5000,
}: BranchHeroSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [currentSlide, autoPlayInterval]);

  const handleNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsAnimating(false), 700);
    }
  };

  const handlePrev = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => setIsAnimating(false), 700);
    }
  };

  const handleGalleryClick = () => {
    if (galleryUrl) {
      router.push(galleryUrl);
    }
  };

  return (
    <Box position="relative" h={{ base: '80vh', md: '90vh' }} overflow="hidden">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <Box
          key={index}
          position="absolute"
          inset={0}
          opacity={currentSlide === index ? 1 : 0}
          transition="opacity 1s ease-in-out"
          bgImage={`url(${slide.image})`}
          bgSize="cover"
          bgPosition="center"
          _after={{
            content: '""',
            position: 'absolute',
            inset: 0,
            bgGradient:
              'linear(to-t, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.3) 100%)',
          }}
        />
      ))}

      {/* Content */}
      <Container
        maxW="1300px"
        h="full"
        position="relative"
        zIndex={1}
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        pb={20}
      >
        <VStack
          align="flex-start"
          spacing={6}
          maxW="3xl"
          opacity={isAnimating ? 0 : 1}
          transform={isAnimating ? 'translateY(20px)' : 'translateY(0)'}
          transition="all 0.7s ease-in-out"
        >
          <Text
            color="primaryRed"
            fontWeight="black"
            letterSpacing="widest"
            textTransform="uppercase"
            fontSize="xs"
          >
            {slides[currentSlide].subtitle}
          </Text>

          <Heading
            as="h1"
            fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }}
            fontFamily="heading"
            fontWeight="black"
            lineHeight="0.95"
            letterSpacing="-0.02em"
          >
            {slides[currentSlide].title}
          </Heading>

          <Text
            fontSize={{ base: 'lg', md: 'xl' }}
            color="whiteAlpha.800"
            maxW="2xl"
            lineHeight="relaxed"
          >
            {slides[currentSlide].description}
          </Text>

          <HStack spacing={4} pt={4}>

            {galleryUrl && (
              <Button
                size="lg"
                h={14}
                px={8}
                bg="whiteAlpha.100"
                backdropFilter="blur(10px)"
                color="white"
                border="1px"
                borderColor="whiteAlpha.200"
                fontSize="md"
                fontWeight="bold"
                leftIcon={<Icon as={MdGridView} />}
                _hover={{ bg: 'whiteAlpha.200' }}
                transition="all 0.3s"
                onClick={handleGalleryClick}
              >
                View Gallery
              </Button>
            )}
          </HStack>
        </VStack>

        {/* Navigation Arrows */}
        <HStack
          position="absolute"
          bottom={20}
          right={0}
          spacing={3}
        >
          <IconButton
            aria-label="Previous slide"
            icon={<MdChevronLeft />}
            onClick={handlePrev}
            size="lg"
            bg="whiteAlpha.100"
            backdropFilter="blur(10px)"
            color="white"
            border="1px"
            borderColor="whiteAlpha.200"
            _hover={{ bg: 'whiteAlpha.200' }}
            isDisabled={isAnimating}
          />
          <IconButton
            aria-label="Next slide"
            icon={<MdChevronRight />}
            onClick={handleNext}
            size="lg"
            bg="whiteAlpha.100"
            backdropFilter="blur(10px)"
            color="white"
            border="1px"
            borderColor="whiteAlpha.200"
            _hover={{ bg: 'whiteAlpha.200' }}
            isDisabled={isAnimating}
          />
        </HStack>

        {/* Slide Indicators */}
        <HStack
          position="absolute"
          bottom={8}
          left="50%"
          transform="translateX(-50%)"
          spacing={3}
        >
          {slides.map((_, index) => (
            <Box
              key={index}
              w={currentSlide === index ? 10 : 2}
              h={2}
              bg={currentSlide === index ? 'primaryRed' : 'whiteAlpha.400'}
              borderRadius="full"
              transition="all 0.3s"
              cursor="pointer"
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true);
                  setCurrentSlide(index);
                  setTimeout(() => setIsAnimating(false), 700);
                }
              }}
            />
          ))}
        </HStack>
      </Container>
    </Box>
  );
};
