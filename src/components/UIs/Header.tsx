'use client';

import { Box, Flex, HStack, Link, Image } from '@chakra-ui/react';
import { NavLink } from '@/types';
import { usePathname } from 'next/navigation';
import NextLink from 'next/link';

interface HeaderProps {
  navLinks: NavLink[];
  onBookNow?: () => void;
}

export const Header = ({ navLinks }: HeaderProps) => {
  const pathname = usePathname();

  const isActiveLink = (href: string) => {
    if (href === '/' && pathname === '/') {
      return true;
    }
    if (href !== '/' && pathname.startsWith(href)) {
      return true;
    }
    return false;
  };

  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      w="full"
      zIndex={50}
      bg="luxuryBlack"
      backdropFilter="blur(20px)"
      borderBottom="1px"
      borderColor="whiteAlpha.50"
      px={{ base: 6, lg: 20 }}
      py={4}
    >
      <Flex maxW="7xl" mx="auto" align="center" justify="space-between">
        <Box>
            <Image
             srcSet='https://res.cloudinary.com/djmwqkcw5/image/upload/v1769628785/Parktonian_Black_ttdw7p.png'
             objectFit={'contain'}
             width={'8%'}
            />
        </Box>

        <HStack spacing={12} display={{ base: 'none', md: 'flex' }}>
          {navLinks.map((link) => (
            <Link
              as={NextLink}
              key={link.href}
              href={link.href}
              fontSize="sm"
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing="widest"
              color={isActiveLink(link.href) ? 'primaryRed' : 'white'}
              _hover={{ color: 'primaryRed' }}
              transition="colors 0.2s"
            >
              {link.label}
            </Link>
          ))}
        </HStack>

      </Flex>
    </Box>
  );
};
