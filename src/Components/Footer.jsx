"use client";

import { ReactNode } from "react";
import { Box, Container, Stack, SimpleGrid, Text, VisuallyHidden, chakra, useColorModeValue } from "@chakra-ui/react";
import { FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import {RiTwitterXFill} from 'react-icons/ri'
import {BiLogoDiscord} from 'react-icons/bi'
import {AiFillLinkedin} from 'react-icons/ai'
import {LiaTelegramPlane}  from 'react-icons/lia'

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      border={"1px solid white"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function LargeWithAppLinksAndSocial() {
  return (
    <Box bg={"rgb(6, 21, 50)"} color={"white"} padding={'5%'}>
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={"flex-start"} gap={5}>
            <ListHeader>Menu</ListHeader>
            <Box as='a' href={"#"}>
              About Us
            </Box>
            <Box as='a' href={"#"}>
              Collection
            </Box>
            <Box as='a' href={"#"}>
              Work
            </Box>
          </Stack>

          <Stack align={"flex-start"}>
            <Box as='a' href={"#"}>
              Roadmap
            </Box>
            <Box as='a' href={"#"}>
              Contact Us
            </Box>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Policy</ListHeader>
            <Box as='a' href={"#"}>
              Terms of Services
            </Box>
            <Box as='a' href={"#"}>
              Privacy Policy
            </Box>
            <Box as='a' href={"#"}>
            Accessibility
            </Box>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader>Utility Pages</ListHeader>
            <Box as='a' href={"#"}>
              Contact
            </Box>
            <Box as='a' href={"#"}>
              404 not found
            </Box>
            <Box as='a' href={"#"}>
              Support
            </Box>
          </Stack>
        </SimpleGrid>
      </Container>

      <Box borderTopWidth={1} borderStyle={"solid"} borderColor={useColorModeValue("gray.200", "gray.700")}>
        <Container my={5} 
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ md: "space-between" }}
          align={{ md: "center" }}>
          <Text>© 2023 By Creator. All rights reserved</Text>
          <Stack direction={"row"} spacing={6}>
            <Text fontWeight={'bold'} fontSize={'xl'}>Follow Us</Text>
            <SocialButton  label={"Twitter"} href={"#"}>
              <RiTwitterXFill />
            </SocialButton>
            <SocialButton label={"YouTube"} href={"#"}>
              <BiLogoDiscord />
            </SocialButton>
            <SocialButton label={"Instagram"} href={"#"}>
              <LiaTelegramPlane />
            </SocialButton>
            <SocialButton label={"Instagram"} href={"#"}>
              <AiFillLinkedin />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
