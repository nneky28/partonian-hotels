'use client';

import { Box, VStack, Heading, Text, HStack, Button } from '@chakra-ui/react';

interface CTASectionProps {
  title: string;
  description: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export const CTASection = ({
  title,
  description,
  primaryButtonText = 'Book Now',
  secondaryButtonText = 'Contact Sales',
  onPrimaryClick,
  onSecondaryClick,
}: CTASectionProps) => {
  return (
    <Box
      as="section"
      w="full"
      px={{ base: 4, md: 20, lg: 40 }}
      py={20}
      textAlign="center"
    >
      <Box maxW="1200px" mx="auto">
        <VStack maxW="3xl" mx="auto" spacing={6}>
          <Heading
            as="h2"
            fontSize={{ base: '3xl', md: '4xl' }}
            fontWeight="black"
            lineHeight="tight"
          >
            {title}
          </Heading>
          <Text
            color="gray.600"
            sx={{
              '.chakra-ui-dark &': {
                color: '#b89d9f',
              },
            }}
            fontSize="lg"
          >
            {description}
          </Text>
          <HStack
            spacing={4}
            mt={4}
            flexDirection={{ base: 'column', sm: 'row' }}
            w={{ base: 'full', sm: 'auto' }}
          >
            <Button
              minW="200px"
              h={14}
              px={10}
              bg="primaryRed"
              color="white"
              fontSize="lg"
              fontWeight="bold"
              boxShadow="0 25px 50px -12px rgba(234, 42, 51, 0.4)"
              _hover={{ transform: 'scale(1.05)' }}
              transition="all 0.3s"
              onClick={onPrimaryClick}
            >
              {primaryButtonText}
            </Button>
            <Button
              minW="200px"
              h={14}
              px={10}
              bg="transparent"
              border="2px"
              borderColor="gray.300"
              fontSize="lg"
              fontWeight="bold"
              _hover={{ bg: 'gray.200' }}
              transition="all 0.3s"
              onClick={onSecondaryClick}
              sx={{
                '.chakra-ui-dark &': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  '&:hover': {
                    bg: 'rgba(255, 255, 255, 0.1)',
                  },
                },
              }}
            >
              {secondaryButtonText}
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};
