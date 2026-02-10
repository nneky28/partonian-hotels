'use client';

import { Box, VStack, Heading, Text, Grid, Flex, Icon, Button } from '@chakra-ui/react';
import { MdInfo, } from 'react-icons/md';
import { IconType } from 'react-icons';

interface Amenity {
  icon: IconType;
  label: string;
}

interface Attraction {
  icon: IconType;
  name: string;
  distance: string;
}

interface BranchInfoSectionProps {
  subtitle: string;
  title: string;
  description: string[];
  stats: { value: string; label: string }[];
  amenities: Amenity[];
  attractions: Attraction[];
  onBookBranch?: () => void;
}

export const BranchInfoSection = ({
  subtitle,
  title,
  description,
  stats,
  amenities,
  attractions,
  onBookBranch,
}: BranchInfoSectionProps) => {
  return (
    <Box w="full" px={{ base: 6, md: 16 }} py={16}>
      <Box  maxW="1300px" mx="auto">
        <Flex direction={{ base: 'column', lg: 'row' }} gap={16}>
          {/* Main Content */}
          <Box flex="2" >
            <VStack align="flex-start" spacing={4} >
              <Text color="primaryRed" fontWeight="bold" letterSpacing="widest" textTransform="uppercase" fontSize="xs">
                {subtitle}
              </Text>
              <Heading
                as="h1"
                fontSize={{ base: '4xl', md: '5xl' }}
                fontWeight="black"
                lineHeight="1.1"
                dangerouslySetInnerHTML={{ __html: title }}
              />
              <Box h={1} w={20} bg="primaryRed" />
            </VStack>

            <VStack spacing={6} align={['center',"flex-start"]} mt={8} >
              {description.map((para, idx) => (
                <Text key={idx} color="whiteAlpha.700" fontSize={["16px",'lg']} lineHeight="relaxed" maxW="2xl">
                  {para}
                </Text>
              ))}

              <Flex gap={8} pt={8} borderTop="1px" borderColor="whiteAlpha.100" w="full" maxW="2xl"
            
               >
                {stats.map((stat, idx) => (
                  <Flex key={idx} align="center" gap={4}>
                    <Text fontSize={["2xl","4xl"]} fontWeight="bold" color="primaryRed">
                      {stat.value}
                    </Text>
                    <Text
                      fontSize="sm"
                      textTransform="uppercase"
                      letterSpacing="wider"
                      fontWeight="semibold"
                      color="whiteAlpha.500"
                      dangerouslySetInnerHTML={{ __html: stat.label }}
                    />
                  </Flex>
                ))}
              </Flex>
              
            </VStack>
          </Box>

          {/* Sidebar */}
          <Box flex="1">
            <VStack
              bg="whiteAlpha.50"
              backdropFilter="blur(12px)"
              p={8}
              borderRadius="32px"
              border="1px"
              borderColor="whiteAlpha.100"
              position="sticky"
              top="8rem"
              spacing={10}
              align="stretch"
            >
              {/* At a Glance */}
              <VStack align="stretch" spacing={6}>
                <Heading as="h4" fontSize="xl" fontWeight="bold" display="flex" alignItems="center" gap={2}>
                  <Icon as={MdInfo} color="primaryRed" />
                  At a Glance
                </Heading>

                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  {amenities.map((amenity, idx) => (
                    <Flex
                      key={idx}
                      direction="column"
                      gap={2}
                      p={4}
                      borderRadius="2xl"
                      bg="whiteAlpha.50"
                      border="1px"
                      borderColor="whiteAlpha.50"
                      _hover={{ bg: 'whiteAlpha.100' }}
                      transition="all 0.2s"
                    >
                      <Icon as={amenity.icon} color="primaryRed" boxSize={6} />
                      <Text fontSize="sm" fontWeight="semibold">
                        {amenity.label}
                      </Text>
                    </Flex>
                  ))}
                </Grid>
              </VStack>

              {/* Nearby Attractions */}
              <VStack align="stretch" spacing={6}>
                <Text fontSize="sm" fontWeight="bold" textTransform="uppercase" letterSpacing="widest" color="whiteAlpha.500">
                  Nearby Attractions
                </Text>

                <VStack spacing={4} align="stretch">
                  {attractions.map((attraction, idx) => (
                    <Flex key={idx} align="center" gap={4} cursor="pointer" role="group">
                      <Flex
                        w={10}
                        h={10}
                        borderRadius="full"
                        bg="rgba(234, 42, 51, 0.1)"
                        align="center"
                        justify="center"
                        color="primaryRed"
                        _groupHover={{ bg: 'primaryRed', color: 'white' }}
                        transition="all 0.2s"
                      >
                        <Icon as={attraction.icon} boxSize={5} />
                      </Flex>
                      <Box>
                        <Text fontSize="sm" fontWeight="bold">
                          {attraction.name}
                        </Text>
                        <Text fontSize="10px" color="whiteAlpha.400" textTransform="uppercase" letterSpacing="tight">
                          {attraction.distance}
                        </Text>
                      </Box>
                    </Flex>
                  ))}
                </VStack>
              </VStack>

              <Button
                w="full"
                bg="primaryRed"
                py={6}
                borderRadius="xl"
                fontWeight="bold"
                shadow="xl"
                boxShadow="0 25px 50px -12px rgba(234, 42, 51, 0.4)"
                _hover={{ transform: 'scale(1.02)' }}
                transition="all 0.2s"
                onClick={onBookBranch}
              >
                Book a room
              </Button>
            </VStack>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
