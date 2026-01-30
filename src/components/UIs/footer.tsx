"use client";

import {
  Box,
  Flex,
  Grid,
  GridItem,
  VStack,
  HStack,
  Heading,
  Text,
  Link,
  Icon,
  Image,
} from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { FooterSection } from "@/types";


interface FooterProps {
  sections: FooterSection[];
}

export const Footer = ({ sections }: FooterProps) => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <Box
      as="footer"
      bg="luxuryBlack"
      pt={24}
      pb={12}
      px={6}
      borderTop="1px"
      borderColor="whiteAlpha.50"
    >
      <Box maxW="7xl" mx="auto">
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(12, 1fr)" }}
          gap={12}
          mb={20}
        >
          <GridItem colSpan={{ base: 1, md: 5 }}>
            <Box>
              <Image
                srcSet="https://res.cloudinary.com/djmwqkcw5/image/upload/v1769628785/Parktonian_Black_ttdw7p.png"
                objectFit={"contain"}
                width={"8%"}
                mb={4}
              />
            </Box>
            <Text
              color="textMuted"
              fontSize="lg"
              maxW="md"
              lineHeight="relaxed"
            >
              Setting the benchmark for high-end hospitality in Nigeria. A
              legacy of excellence, comfort, and sophisticated living.
            </Text>
            <HStack spacing={6} mt={10}>
              <Link
                href="#"
                _hover={{ color: "primaryRed" }}
                transition="colors 0.2s"
              >
                <Icon as={FaFacebook} boxSize={5} />
              </Link>
              <Link
                href="#"
                _hover={{ color: "primaryRed" }}
                transition="colors 0.2s"
              >
                <Icon as={FaInstagram} boxSize={5} />
              </Link>
              <Link
                href="#"
                _hover={{ color: "primaryRed" }}
                transition="colors 0.2s"
              >
                <Icon as={FaTwitter} boxSize={5} />
              </Link>
            </HStack>
          </GridItem>

          {sections.map((section) => (
            <GridItem key={section.title} colSpan={{ base: 1, md: 2 }}>
              <Heading
                as="h6"
                fontWeight="black"
                textTransform="uppercase"
                letterSpacing="widest"
                fontSize="xs"
                color="primaryRed"
                mb={6}
              >
                {section.title}
              </Heading>
              <VStack align="flex-start" spacing={4}>
                {section.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    color="textMuted"
                    fontSize="sm"
                    fontWeight="medium"
                    _hover={{ color: "white" }}
                    transition="colors 0.2s"
                  >
                    {link.label}
                  </Link>
                ))}
              </VStack>
            </GridItem>
          ))}

          <GridItem colSpan={{ base: 1, md: 3 }}>
            <Heading
              as="h6"
              fontWeight="black"
              textTransform="uppercase"
              letterSpacing="widest"
              fontSize="xs"
              color="primaryRed"
              mb={6}
            >
              Contact
            </Heading>
            <VStack align="flex-start" spacing={4}>
              <Text color="textMuted" fontSize="sm">
                info@parktonianhotels.com
              </Text>
              <Text color="textMuted" fontSize="sm">
                +234 (0) 800 PARKTONIAN
              </Text>
            </VStack>
          </GridItem>
        </Grid>

        <Flex
          pt={8}
          borderTop="1px"
          borderColor="whiteAlpha.50"
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
          gap={6}
        >
          <Text
            color="textMuted"
            fontSize="10px"
            textTransform="uppercase"
            letterSpacing="widest"
          >
            © {year} Parktonian Hotels & Suites. All Rights Reserved.
          </Text>
          <HStack
            spacing={8}
            fontSize="10px"
            textTransform="uppercase"
            letterSpacing="widest"
            color="textMuted"
          >
            <Link href="#" _hover={{ color: "white" }}>
              Privacy
            </Link>
            <Link href="#" _hover={{ color: "white" }}>
              Terms
            </Link>
            <Link href="#" _hover={{ color: "white" }}>
              Legal
            </Link>
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
};
