'use client';

import { Box, VStack, Heading, Text, SimpleGrid } from '@chakra-ui/react';
import { BranchCard } from './BranchCard';
import { Branch } from '@/types';


interface BranchesSectionProps {
  branches: Branch[];
  onExploreBranch?: (id: string) => void;
}

export const BranchesSection = ({ branches, onExploreBranch }: BranchesSectionProps) => {
  return (
    <Box as="section" py={32} px={6} bg="luxuryBlack">
      <Box maxW="7xl" mx="auto">
        <VStack textAlign="center" mb={20} spacing={4}>
          <Text
            color="primaryRed"
            fontWeight="black"
            textTransform="uppercase"
            letterSpacing="0.3em"
            fontSize="xs"
          >
          Visit our
          </Text>
          <Heading
            as="h3"
            fontSize={{ base: '4xl', md: '6xl' }}
            fontFamily="heading"
            fontWeight="bold"
            color="primaryRed"
          >
           Iconic Branches
          </Heading>
        </VStack>

        <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={8}>
          {branches.map((branch) => (
            <BranchCard
              key={branch.id}
              {...branch}
              onExplore={onExploreBranch}
            />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};
