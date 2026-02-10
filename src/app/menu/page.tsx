"use client";

import { useEffect } from "react";
import { Box, Button, Container, Heading, Text, VStack } from "@chakra-ui/react";

const menuRedirectUrl = process.env.NEXT_PUBLIC_MENU_REDIRECT_URL || "";

export default function MenuPage() {
  useEffect(() => {
    if (menuRedirectUrl) {
      window.location.replace(menuRedirectUrl);
    }
  }, []);

  return (
    <Box bg="luxuryBlack" minH="100vh" display="flex" alignItems="center">
      <Container maxW="container.md" py={{ base: 16, md: 24 }}>
        <Box
          bg="surfaceBlack"
          border="1px"
          borderColor="whiteAlpha.100"
          borderRadius="2xl"
          px={{ base: 6, md: 12 }}
          py={{ base: 10, md: 14 }}
          textAlign="center"
          boxShadow="0 20px 60px rgba(0,0,0,0.35)"
        >
          <VStack spacing={5}>
            <Text
              color="primaryRed"
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing="widest"
              fontSize="xs"
            >
              Parktonian Hotels
            </Text>
            <Heading
              as="h1"
              color="white"
              fontSize={{ base: "3xl", md: "5xl" }}
              fontFamily="heading"
              fontWeight="black"
            >
              Restaurant Menu
            </Heading>
            <Text color="whiteAlpha.700" fontSize={{ base: "md", md: "lg" }} maxW="2xl">
              {menuRedirectUrl
                ? "We’re opening the menu for you now. If it doesn’t open automatically, use the button below."
                : "The menu link is not configured yet. Please contact the hotel front desk."}
            </Text>

            {menuRedirectUrl && (
              <Button
                as="a"
                href={menuRedirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                bg="primaryRed"
                color="white"
                size="lg"
                px={10}
                h={12}
                fontWeight="bold"
                _hover={{ bg: "red.600" }}
              >
                Open Menu
              </Button>
            )}
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}
