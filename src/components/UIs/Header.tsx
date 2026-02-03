'use client';

import { Box, Flex, HStack, Link, Image, IconButton, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, VStack, useDisclosure } from '@chakra-ui/react';
import { NavLink } from '@/types';
import { usePathname, useRouter } from 'next/navigation';
import NextLink from 'next/link';
import { GiHamburgerMenu } from "react-icons/gi";


interface HeaderProps {
  navLinks: NavLink[];
  onBookNow?: () => void;
}

export const Header = ({ navLinks }: HeaderProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isActiveLink = (href: string) => {
    if (href === '/' && pathname === '/') {
      return true;
    }
    if (href !== '/' && pathname.startsWith(href)) {
      return true;
    }
    return false;
  };

  const handleGoHome = () => {
    router.push('/');
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
        <Box cursor="pointer" onClick={handleGoHome}>
            <Image
             src='https://res.cloudinary.com/djmwqkcw5/image/upload/v1769628785/Parktonian_Black_ttdw7p.png'
             srcSet='https://res.cloudinary.com/djmwqkcw5/image/upload/w_200,q_auto,f_auto/v1769628785/Parktonian_Black_ttdw7p.png 200w, https://res.cloudinary.com/djmwqkcw5/image/upload/w_400,q_auto,f_auto/v1769628785/Parktonian_Black_ttdw7p.png 400w'
             sizes="(max-width: 768px) 100px, 150px"
             alt="Parktonian Hotels Logo"
             objectFit={'contain'}
             width={{ base: '20%', md: '25%' }}
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

        <IconButton
          aria-label="Open menu"
          icon={<GiHamburgerMenu size={'40%'} />}
          display={{ base: 'flex', md: 'none' }}
          onClick={onOpen}
          variant="ghost"
          color="white"
          _hover={{ bg: 'whiteAlpha.200' }}
          size="lg"
        />

        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay bg="rgba(0, 0, 0, 0.8)" backdropFilter="blur(8px)" />
          <DrawerContent bg="luxuryBlack" borderLeft="1px" borderColor="whiteAlpha.100">
            <DrawerCloseButton color="white" size="lg" />
            <DrawerHeader borderBottom="1px" borderColor="whiteAlpha.100">
              <Image
                src='https://res.cloudinary.com/djmwqkcw5/image/upload/v1769628785/Parktonian_Black_ttdw7p.png'
                objectFit={'contain'}
                width={'30%'}
              />
            </DrawerHeader>

            <DrawerBody pt={8}>
              <VStack spacing={6} align="stretch">
                {navLinks.map((link) => (
                  <Link
                    as={NextLink}
                    key={link.href}
                    href={link.href}
                    fontSize="lg"
                    fontWeight="bold"
                    textTransform="uppercase"
                    letterSpacing="wider"
                    color={isActiveLink(link.href) ? 'primaryRed' : 'white'}
                    _hover={{ color: 'primaryRed' }}
                    transition="colors 0.2s"
                    onClick={onClose}
                    py={3}
                    px={4}
                    borderRadius="md"
                    bg={isActiveLink(link.href) ? 'whiteAlpha.100' : 'transparent'}
                  >
                    {link.label}
                  </Link>
                ))}
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>

      </Flex>
    </Box>
  );
};
