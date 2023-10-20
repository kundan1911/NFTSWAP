import { Box, Flex, HStack, IconButton, useDisclosure, useColorModeValue, Stack } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Links = [
  { N: "About", L: "/About" },
  { N: "Collection", L: "/Collection" },
  { N: "Work", L: "/Work" },
  { N: "Roadmap", L: "/Roadmap" },
  { N: "Create Post", L: "/create-post" },
  { N: "Marketplace", L: "/Marketplace" },
];

const NavLink = (props) => {
  const { children } = props;
  console.log(props);

  return (
    <Box
      as='a'
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        color: "black",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={props.X}>
      {children}
    </Box>
  );
};

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box px={4} my={4}>
        <Flex h={16} alignItems={"center"} justifyContent={{ base: "space-between", lg: "center" }}>
          <HStack spacing={8} alignItems={"center"}>
            <span className='Logo'>TUSKERS</span>

            <HStack as={"nav"} spacing={4} display={{ base: "none", md: "none", lg: "flex" }}>
              {Links.map((link) => (
                <NavLink X={link.L} key={link.N}>
                  {link.N}
                </NavLink>
              ))}
              <a href='/'>
                <button className='bn30'>Contact Us</button>
              </a>
            </HStack>
          </HStack>
          <IconButton
            bg={"transparent"}
            color={"white"}
            size={"lg"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ lg: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ lg: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink X={link.L} key={link.N}>
                  {link.N}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
