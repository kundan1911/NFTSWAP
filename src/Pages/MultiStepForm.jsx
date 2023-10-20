"use client";

import { useState } from "react";
import {
  Text,
  HStack,
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  GridItem,
  Grid,
  Stack,
  IconButton,
  Editable,
  EditablePreview,
  EditableInput,
} from "@chakra-ui/react";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { LockIcon, StarIcon } from "@chakra-ui/icons";
import { BiRefresh, BiTransfer } from "react-icons/bi";
import { BsCurrencyPound } from "react-icons/bs";

const cards = [
  { title: "Tokens", Des: "ETH", Icon: "https://framerusercontent.com/images/85l3B9qKcsJZISndCTY83iZik.png" },
  { title: "Tokens", Des: "ETH", Icon: "https://framerusercontent.com/images/85l3B9qKcsJZISndCTY83iZik.png" },
  { title: "Tokens", Des: "ETH", Icon: "https://framerusercontent.com/images/85l3B9qKcsJZISndCTY83iZik.png" },
];
const PostStarts = ["Hey Everyone", "Whats up Traders", "Anyone Looking to trade?", "This NFT/Collection is available to cop"];

const NFT = [
  { title: "ON1 Force", img: "https://framerusercontent.com/images/6p3PmBbdFWowGQOWqSaac5v97LQ.png" },
  { title: "10KTF", img: "https://framerusercontent.com/images/HVmYVaGEFQdxhhipLcgra1hkHzs.png" },
];
const offers = ["Only specifix collections/tokens", "I've preference, but im flexible", "Im open to proposals"];
const OffersToMake = ["Only Nfts I choose", "Im open to proposals"];
const Expiration = ["1 day", "3 days", "7 days", "15 days"];

const VerifCards = ({ title, description, icon }) => {
  return (
    <Grid
      border={"2px solid white"}
      width={{ base: "60vw", md: "20vw" }}
      p={5}
      borderRadius={"20px"}
      templateColumns={"1fr 1fr"}
      alignItems={"center"}
      justifyContent={"center"}
      justifyItems={"center"}>
      <GridItem>
        <img width={"60px"} alt='x' src={icon} />
      </GridItem>
      <GridItem>
        <Stack>
          <Text fontSize={"sm"} color={"white"}>
            {title}
          </Text>
          <Text fontWeight={"semibold"} color={"gray.200"}>
            {description}
          </Text>
        </Stack>
      </GridItem>
    </Grid>
  );
};

const Cards = ({ title, description, icon }) => {
  return (
    <Grid
      pos={"relative"}
      width={{ base: "60vw", md: "20vw" }}
      bg={"rgb(27, 128, 182)"}
      p={5}
      borderRadius={"20px"}
      templateColumns={"1fr 1fr"}
      alignItems={"center"}
      justifyContent={"center"}
      justifyItems={"center"}>
      <GridItem>
        <img width={"60px"} alt='x' src={icon} />
      </GridItem>
      <GridItem>
        <Stack>
          <Text fontSize={"sm"} color={"white"}>
            {title}
          </Text>
          <Text fontWeight={"semibold"} color={"gray.200"}>
            {description}
          </Text>
        </Stack>
      </GridItem>
      <IconButton position={"absolute"} bottom={2} right={2} width={"30px"}>
        <StarIcon />
      </IconButton>
    </Grid>
  );
};

const Form1 = ({ formData, setFormData }) => {
  
  return (
    <>
      <Grid
        key={1}
        templateColumns={{ base: "1fr", md: "1fr 2fr" }}
        background={"rgb(6, 21, 50)"}
        border={"2px solid rgb(27, 128, 182)"}
        height={"auto"}
        borderRadius={"30px"}>
        <GridItem borderRadius={"20px"} padding={"5%"}>
          <Heading w='100%' textAlign={"center"} fontWeight='semibold' mb='2%'>
            Create And Set up your post in trading center
          </Heading>
        </GridItem>
        <GridItem background={"rgb(27, 128, 182)"} borderRadius={"20px"} padding={"5%"}>
          <Text fontWeight={"semibold"}>Let's start with a Hello</Text>
          <Text fontSize={"sm"} color={"black"} mb={5}>
            Choose a way to start your post
          </Text>
          <Grid gap={5} templateColumns={{ base: "repeat(1,1fr)", lg: "repeat(2,1fr)" }}>
            {PostStarts.map((item, index) => {
              return (
                <Button key={index} overflowWrap={"break-word"} bg={"transparent"} border={"2px dotted"}>
                  {item}
                </Button>
              );
            })}
          </Grid>
          <Text mt={2} fontWeight={"semibold"}>
            Im Lookign for
          </Text>
          <Text fontSize={"sm"} color={"black"} mb={5}>
            What kind of offer you want to recieve
          </Text>
          <Grid gap={5} templateColumns={{ base: "repeat(1,1fr)", lg: "repeat(2,1fr)" }}>
            {offers.map((item, index) => {
              return (
                <Button key={index} overflowWrap={"break-word"} bg={"transparent"} border={"2px dotted"}>
                  {item}
                </Button>
              );
            })}
          </Grid>
          <Text mt={2} fontWeight={"semibold"}>
            I will offer
          </Text>
          <Text fontSize={"sm"} color={"black"} mb={5}>
            Which nft in your possession you want to trade
          </Text>
          <Grid gap={5} templateColumns={{ base: "repeat(1,1fr)", lg: "repeat(2,1fr)" }}>
            {OffersToMake.map((item, index) => {
              return (
                <Button key={index} overflowWrap={"break-word"} bg={"transparent"} border={"2px dotted"}>
                  {item}
                </Button>
              );
            })}
          </Grid>
          <Text mt={2} fontWeight={"semibold"}>
            How long should this post last?
          </Text>
          <Text fontSize={"sm"} color={"black"} mb={5}>
            For how long would you like to make these post appear in the hall?
          </Text>
          <Grid gap={5} templateColumns={{ base: "repeat(1,1fr)", lg: "repeat(2,1fr)" }}>
            {Expiration.map((item, index) => {
              return (
                <Button key={index} overflowWrap={"break-word"} bg={"transparent"} border={"2px dotted"}>
                  {item}
                </Button>
              );
            })}
          </Grid>
        </GridItem>
      </Grid>
    </>
  );
};

const Form2 = ({ formData, setFormData }) => {
  return (
    <>
      <Grid key={2} templateColumns={{ base: "1fr", lg: "1fr 3fr" }} height={"auto"}>
        <GridItem padding={"5%"}>
          <Flex
            width={"100%"}
            justifyContent={"space-between"}
            alignItems={"center"}
            background={"white"}
            borderRadius={"10px"}
            padding={"5%"}>
            <Stack>
              <Text fontSize={"sm"} color={"black"}>
                Im looking for...
              </Text>
              <HStack>
                <IconButton>
                  <LockIcon />
                </IconButton>
                <Text fontSize={"md"} fontWeight={"semibold"} color={"black"}>
                  Specific Selection
                </Text>
              </HStack>
            </Stack>
            <Button bg={"transparent"} border={"1px solid blue"} borderRadius={"20px"}>
              Change
            </Button>
          </Flex>
          <Grid templateColumns={"1fr"} my={5} justifyItems={"center"}>
            <Stack width={"100%"}>
              <Text color={"lightblue"} fontWeight={"semibold"}>
                Favorite Collections
              </Text>
            </Stack>
            <IconButton>
              <BiRefresh size={"100%"} />
            </IconButton>
            <Text>These are your favorite bookmarked collections</Text>
          </Grid>
        </GridItem>
        <GridItem padding={"5%"}>
          <IconButton padding={2}>
            <Text>0 Collection Selected</Text>
          </IconButton>

          <Editable
            border={"1px solid white"}
            _hover={{ border: "none" }}
            borderRadius={"20px"}
            p={2}
            my={5}
            defaultValue='Enter Something'>
            <EditablePreview />
            <EditableInput />
          </Editable>

          <Grid gap={5} justifyItems={"center"} templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(4, 1fr)" }}>
            {cards.map((item, index) => {
              return <Cards title={item.title} description={item.Des} icon={item.Icon} />;
            })}
          </Grid>

          <Stack width={"100%"} my={5} textAlign={"center"}>
            <Button width={"20vw"} margin='auto'>
              Load More
            </Button>
          </Stack>
        </GridItem>
      </Grid>
    </>
  );
};

const Form3 = ({ formData, setFormData }) => {
  const [value, setValue] = useState("1");
  return (
    <>
      <Stack gap={0} bg={"rgb(6, 21, 50)"} borderRadius={"30px"} border={"5px solid rgb(27, 128, 182)"}>
        <Grid
          gap={3}
          p={3}
          bg={"rgb(27, 128, 182)"}
          //   justify={{ sm: "block", lg: "space-between" }}
          justifyItems={{ base: "center", lg: "space-between" }}
          templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }}
          borderRadius={"20px"}
          borderBottomRightRadius={0}>
          <HStack>
            <Stack>
              <Text fontSize={"sm"}>I will offer...</Text>
              <Text fontSize={"sm"}>I'm open to proposals</Text>
            </Stack>
            <Button border={"2px solid blue"} color={"white"} bg={"blackAlpha.200"}>
              Change
            </Button>
          </HStack>

          <Heading fontSize={{ base: "lg", lg: "2xl" }}>Select What you want to offer for this post</Heading>
          <HStack justifyContent={{ lg: "flex-end" }}>
            <Stack>
              <Text>Your Wallet</Text>
              <Text>0x8344mcd8</Text>
            </Stack>
            <img width={"50px"} src='https://framerusercontent.com/images/85l3B9qKcsJZISndCTY83iZik.png' alt='x' />
          </HStack>
        </Grid>
        <Grid templateColumns={{ base: "1fr", lg: "1fr 2fr" }}>
          <GridItem p={5}>
            <Text>Filter collections or assets</Text>

            <Editable
              border={"1px solid white"}
              _hover={{ border: "none" }}
              borderRadius={"20px"}
              p={2}
              my={5}
              defaultValue='Enter Something'>
              <EditablePreview />
              <EditableInput />
            </Editable>

            <Text my={5} color={"gray.200"}>
              Add NFT Collection
            </Text>
            <RadioGroup onChange={setValue} value={value}>
              <Stack>
                {NFT.map((item, index) => {
                  return (
                    <Radio size={"lg"} value={++index}>
                      <HStack width={{ base: "40vw", lg: "20vw" }} justify={"space-between"}>
                        <Text fontSize={"lg"} fontWeight={"semibold"} color={"gray.500"}>
                          {item.title}
                        </Text>
                        <img src={item.img} width={"25px"} style={{ borderRadius: "20px" }} alt='x' />
                      </HStack>
                    </Radio>
                  );
                })}
                {/* // <Radio value='1'>First</Radio>
                // <Radio value='2'>Second</Radio>
                // <Radio value='3'>Third</Radio> */}
              </Stack>
            </RadioGroup>
          </GridItem>
          <GridItem
            alignContent={"center"}
            justifyItems={"center"}
            bg={"rgb(27, 128, 182)"}
            borderRadius={"20px"}
            borderTopRightRadius={0}
            borderTopLeftRadius={0}>
            <Stack textAlign={"center"}>
              <img
                style={{ margin: "auto" }}
                width={"100px"}
                src='https://framerusercontent.com/images/uS4ZmsINKOsEfdSmO9KSnvxEI.svg'
                alt='x'
              />
              <Text>Open Proposal for traders</Text>
              <Text>Customize NFT/Tokens</Text>
            </Stack>
          </GridItem>
        </Grid>
      </Stack>
    </>
  );
};

const Form4 = ({ formData, setFormData }) => {
  return (
    <Stack width={"100%"}>
      <Flex display={{ base: "block", md: "flex" }} alignItems={"center"} justify={{ base: "center", lg: "space-between" }}>
        <HStack>
          <img width={"40px"} src='https://framerusercontent.com/images/85l3B9qKcsJZISndCTY83iZik.png' alt='x' />
          <Stack mx={4}>
            <Text>Your Wallet</Text>
            <Text>od0wdwad8ad7wa</Text>
          </Stack>
        </HStack>
        <HStack my={5}>
          <Text>What are you trading</Text>
          <img width={"20px"} src='https://framerusercontent.com/images/85l3B9qKcsJZISndCTY83iZik.png' alt='x' />
        </HStack>
        <BiTransfer />
        <HStack>
          <Text>What you will recieve</Text>
          <img width={"20px"} src='https://framerusercontent.com/images/85l3B9qKcsJZISndCTY83iZik.png' alt='x' />
        </HStack>
      </Flex>
      <Stack textAlign={"center"} w={{ base: "70vw", lg: "15vw" }} m={"auto"}>
        <Text border={"2px solid blue"} borderRadius={"20px"} p={3}>
          This post will expire in{" "}
          <span className='BoldPoints' style={{ color: "lightblue" }}>
            {" "}
            {Expiration[1]}
          </span>
        </Text>
        <Text>Expirary Date 13/3/24</Text>
      </Stack>

      <HStack
        w={{ base: "70vw", lg: "20vw" }}
        border={"1px solid white"}
        p={2}
        borderRadius={"40px"}
        color={"blue"}
        justify={"space-between"}
        m={"auto"}>
        <HStack bg={"white"} p={2} borderRadius={"20px"}>
          <Text fontWeight={"semibold"}>4 Collections</Text>
          <BsCurrencyPound />
        </HStack>
        <Text fontWeight={"semibold"} p={2} borderRadius={"20px"}>
          Edit Choice
        </Text>
      </HStack>
      <Grid gap={5} width={"50vw"} m={"auto"} justifyItems={"center"} templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }}>
        {cards.map((item, index) => {
          return <VerifCards title={item.title} description={item.Des} icon={item.Icon} />;
        })}
      </Grid>
    </Stack>
  );
};

export default function Multistep() {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [progress, setProgress] = useState(25);
  const Page = ["01 Create Post", "02 Add NFTs", "03 Your Offer", "04 Verify"];

  const handleSubmit = () => {
    const allFormData = formData;
    console.log(allFormData);
    // Perform any action with the complete form data
    toast({
      title: "Account created.",
      description: "We've created your account for you.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <>
      <Flex
        justify={"space-around"}
        w={"90vw"}
        height={"10vh"}
        p={6}
        m='10px auto'
        rounded='lg'
        shadow='1px 1px 3px rgba(0,0,0,0.3)'
        as='form'>
        <HStack width={{ base: "100%", md: "70%", lg: "30%" }}>
          <Progress width={{ base: "40%", md: "70%" }} value={progress} size='xs' colorScheme='pink' />
          <Text fontSize={"lg"} fontWeight={"semibold"}>
            {Page[step - 1]}
          </Text>
        </HStack>
        {step === 4 ? null : (
          <Button
            w='7rem'
            onClick={() => {
              setStep(step + 1);
              console.log(step);
              if (step >= 4) {
                setProgress(100);
              } else {
                setProgress(progress + 25);
              }
            }}
            colorScheme='teal'
            variant='outline'>
            Proceed
          </Button>
        )}
        {step === 4 ? (
          <Button
            w='7rem'
            colorScheme='red'
            variant='solid'
            onClick={() => {
              handleSubmit();
              toast({
                title: "Account created.",
                description: "We've created your account for you.",
                status: "success",
                duration: 3000,
                isClosable: true,
              });
            }}>
            Submit
          </Button>
        ) : null}
      </Flex>
      <Box rounded='lg' shadow='1px 1px 3px rgba(0,0,0,0.3)' maxWidth={"90%"} p={6} m='10px auto' as='form'>
        {step === 1 ? (
          <Form1 formData={formData} setFormData={setFormData} />
        ) : step === 2 ? (
          <Form2 formData={formData} setFormData={setFormData} />
        ) : step === 3 ? (
          <Form3 formData={formData} setFormData={setFormData} />
        ) : (
          <Form4 formData={formData} setFormData={setFormData} />
        )}
        <ButtonGroup mt='5%' w='100%'>
          <Flex w='100%' justifyContent='space-between'>
            <Flex>
              {/* <Button
                onClick={() => {
                  setStep(step - 1);
                  setProgress(progress - 33.33);
                }}
                isDisabled={step === 1}
                colorScheme='teal'
                variant='solid'
                w='7rem'
                mr='5%'>
                Back
              </Button> */}
            </Flex>
          </Flex>
        </ButtonGroup>
      </Box>
    </>
  );
}
