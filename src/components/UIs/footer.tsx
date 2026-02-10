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
      px={{ base: 6, lg: 1 }}
      borderTop="1px"
      borderColor="whiteAlpha.50"
    >
      <Box maxW="7xl" mx="auto">
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          gap={{ base: 8, md: 8 }}
          mb={20}
        >


          <Box flex={{ base: "1", md: "0 0 25%" }}>
            
            <Box>
              <Image
                src="https://res.cloudinary.com/djmwqkcw5/image/upload/v1769628785/Parktonian_Black_ttdw7p.png"
                srcSet='https://res.cloudinary.com/djmwqkcw5/image/upload/w_200,q_auto,f_auto/v1769628785/Parktonian_Black_ttdw7p.png 200w, https://res.cloudinary.com/djmwqkcw5/image/upload/w_400,q_auto,f_auto/v1769628785/Parktonian_Black_ttdw7p.png 400w'
                sizes="(max-width: 768px) 60px, 120px"
                alt="Parktonian Hotels Logo"
                objectFit={"contain"}
                width={{ base: "25%", md: "20%", lg: "15%" }}
                mb={4}
              />
            </Box>
            <Text
              color="textMuted"
              fontSize="md"
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
          </Box>

          {sections.map((section) => (
            <Box key={section.title} >
              <Heading
                as="h6"
                fontWeight="bold"
                textTransform="uppercase"
                letterSpacing="wider"
                fontSize="sm"
                color="primaryRed"
                mb={2}
                fontFamily="body"
              >
                {section.title}
              </Heading>
              <VStack align="flex-start" spacing={1}>
                {section.description.map((link) => (
                  <Text
                    key={link.label}
                    color="textMuted"
                    fontSize="sm"
                    fontWeight="medium"
                    _hover={{ color: "white" }}
                    transition="colors 0.2s"
                  >
                    {link.label}
                  </Text>
                ))}
              </VStack>
            </Box>
          ))}
        </Flex>

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
            textAlign={{sm:'center', base:'center'}}
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
