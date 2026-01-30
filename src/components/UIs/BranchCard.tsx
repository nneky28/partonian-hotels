'use client';

import { Box, Image, Heading, Text, Button, HStack, Icon } from '@chakra-ui/react';
import { MdArrowRightAlt } from 'react-icons/md';
import { Branch } from '@/types';
import Link from 'next/link';

interface BranchCardProps extends Branch {
  onExplore?: (id: string) => void;
}

export const BranchCard = ({
  id,
  title,
  description,
  imageUrl,
  onExplore,
}: BranchCardProps) => {
  return (
    <Link href={`/branches/${id}`} passHref>
      <Box
        position="relative"
        bg="surfaceBlack"
        role="group"
        border="1px"
        borderColor="whiteAlpha.50"
        overflow="hidden"
        transition="all 0.3s"
        cursor="pointer"
        _hover={{
          borderColor: 'rgba(230, 30, 42, 0.5)',
        }}
      >
        <Box aspectRatio={4 / 5} overflow="hidden">
          <Image
            src={imageUrl}
            alt={title}
            w="full"
            h="full"
            objectFit="cover"
            // filter="grayscale(100%)"
            transition="all 0.7s"
            _groupHover={{
              filter: 'grayscale(0%)',
              transform: 'scale(1.1)',
            }}
          />
          <Box
            position="absolute"
            inset={0}
            bgGradient="linear(to-t, luxuryBlack, transparent, transparent)"
            opacity={0.9}
          />
        </Box>

        <Box position="absolute" bottom={0} p={8} w="full">
          <Heading
            as="h4"
            fontSize="3xl"
            fontFamily="heading"
            fontWeight="bold"
            mb={3}
          >
            {title}
          </Heading>
          <Text
            color="textMuted"
            fontSize="sm"
            mb={6}
            noOfLines={2}
          >
            {description}
          </Text>
          <Button
            variant="link"
            color="primaryRed"
            fontWeight="black"
            textTransform="uppercase"
            letterSpacing="widest"
            fontSize="xs"
            rightIcon={<Icon as={MdArrowRightAlt} />}
            _hover={{
              '& svg': {
                transform: 'translateX(8px)',
              },
            }}
            onClick={(e) => {
              e.preventDefault();
              onExplore?.(id);
            }}
          >
            Explore Branch
          </Button>
        </Box>
      </Box>
    </Link>
  );
};
