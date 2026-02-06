'use client';

import { useState, useEffect } from 'react';
import { Box, VStack, Heading, Text, HStack, IconButton } from '@chakra-ui/react';
import { TbChevronLeft } from "react-icons/tb";
import { TbChevronRight } from "react-icons/tb";

interface Slide {
  backgroundImage: string;
  srcSet?: string; // Add this
  title: string;
  highlightedText: string;
  description: string;
}

interface HeroSliderProps {
  slides: Slide[];
  autoPlayInterval?: number;
}

export const HeroSlider = ({ slides, autoPlayInterval = 5000 }: HeroSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalSlides = slides.length;

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isPaused && autoPlayInterval > 0) {
      const interval = setInterval(() => {
        goToNext();
      }, autoPlayInterval);

      return () => clearInterval(interval);
    }
  }, [currentSlide, isPaused, autoPlayInterval]);

  const currentSlideData = slides[currentSlide];

  return (
    <Box
      position="relative"
      minH="60vh"
      overflow="hidden"
      mt={16}
      display="flex"
      alignItems="center"
      justifyContent="center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Images - All slides */}
      {slides.map((slide, index) => (
        <Box
          key={index}
          as="img"
          src={slide.backgroundImage}
          srcSet={slide.srcSet}
          sizes="100vw"
          alt={`${slide.title} ${slide.highlightedText}`}
          position="absolute"
          inset={0}
          w="100%"
          h="100%"
          objectFit={'cover'}
          bgPosition="center"
          bgRepeat={'no-repeat'}
          filter="brightness(0.7)"
          opacity={currentSlide === index ? 1 : 0}
          transition="opacity 1s ease-in-out"
          loading={index === 0 ? 'eager' : 'lazy'}
        />
      ))}

      {/* Gradient Overlay */}
      <Box
        position="absolute"
        inset={0}
        bgGradient="linear(to-b, transparent, rgba(0,0,0,0.4))"
      />

      {/* Navigation Arrows */}
      <IconButton
        aria-label="Previous slide"
         icon={<TbChevronLeft  />}   
        position="absolute"
        left={{ base: 4, md: 8 }}
        top="50%"
        transform="translateY(-50%)"
        zIndex={20}
        bg="whiteAlpha.200"
        color="white"
        size="lg"
        _hover={{ bg: 'primaryRed' }}
        onClick={goToPrevious}
      />

      <IconButton
        aria-label="Next slide"
        icon={<TbChevronRight />}
        position="absolute"
        right={{ base: 4, md: 8 }}
        top="50%"
        transform="translateY(-50%)"
        zIndex={20}
        bg="whiteAlpha.200"
        color="white"
        size="lg"
        _hover={{ bg: 'primaryRed' }}
        onClick={goToNext}
      />

      {/* Content */}
      <VStack
        position="relative"
        zIndex={10}
        textAlign="center"
        maxW="4xl"
        px={6}
        spacing={8}
        key={currentSlide}
        animation="fadeIn 0.8s ease-in-out"
        sx={{
          '@keyframes fadeIn': {
            from: { opacity: 0, transform: 'translateY(20px)' },
            to: { opacity: 1, transform: 'translateY(0)' },
          },
        }}
      >
    
        <Heading
          as="h1"
          fontSize={{ base: '4xl', md: '8xl' }}
          fontFamily="heading"
          fontWeight="bold"
          lineHeight={1.1}
        >
          {currentSlideData.title} <br />
          <Text as="span" color="primaryRed">
            {currentSlideData.highlightedText}
          </Text>{' '}
          
        </Heading>

        <Text
          color="textMuted"
          fontSize={{ base: 'lg', md: 'xl' }}
          maxW="2xl"
          mx="auto"
          fontWeight="light"
          lineHeight="relaxed"
        >
          {currentSlideData.description}
        </Text>
      </VStack>

      {/* Slider Indicators */}
      <HStack
        position="absolute"
        bottom={12}
        left={0}
        right={0}
        zIndex={20}
        justify="center"
        spacing={4}
      >
        {slides.map((_, index) => (
          <Box
            key={index}
            w={currentSlide === index ? 8 : 2}
            h={2}
            bg={currentSlide === index ? 'primaryRed' : 'whiteAlpha.300'}
            cursor="pointer"
            transition="all 0.3s"
            borderRadius="full"
            _hover={{ bg: currentSlide === index ? 'primaryRed' : 'whiteAlpha.500' }}
            onClick={() => goToSlide(index)}
          />
        ))}
      </HStack>
    </Box>
  );
};
