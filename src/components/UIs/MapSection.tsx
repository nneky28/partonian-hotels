'use client';

import { Box, VStack, Heading, Text, Icon } from '@chakra-ui/react';
import { MdLocationOn } from 'react-icons/md';

interface MapSectionProps {
  branchName: string;
  address: string;
  mapImageUrl: string;
}

export const MapSection = ({ branchName, address, mapImageUrl }: MapSectionProps) => {
  return (
    <Box
      as="section"
      w="full"
      position="relative"
    >
      <Box maxW="1200px" mx="auto" h="400px" position="relative">
        <Box
          position="absolute"
          inset={0}
          filter="grayscale(100%)"
          opacity={0.4}
          sx={{
            '.chakra-ui-dark &': {
              filter: 'grayscale(100%) invert(100%)',
            },
          }}
        >
          <Box
            w="full"
            h="full"
            bgImage={mapImageUrl}
            bgSize="cover"
            bgPosition="center"
            bgRepeat="no-repeat"
          />
        </Box>
        <Box
          position="absolute"
          inset={0}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <VStack
            bg="luxuryBlack"
            p={6}
            borderRadius="xl"
            border="1px"
            borderColor="rgba(234, 42, 51, 0.3)"
            shadow="2xl"
            textAlign="center"
            spacing={2}
          >
            <Icon as={MdLocationOn} color="primaryRed" boxSize={10} mb={2} />
            <Heading as="h4" color="white" fontWeight="bold" fontSize="lg">
              {branchName}
            </Heading>
            <Text color="whiteAlpha.700" fontSize="sm">
              {address}
            </Text>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};
