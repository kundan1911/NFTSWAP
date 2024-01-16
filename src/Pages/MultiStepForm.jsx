"use client";
import { useNavigate } from 'react-router';
import { useEffect, useState } from "react";
import GetNfts from "../Components/GetNft";
import axios from 'axios';
import OnlyCard from '../Components/OnlyCard'; 
import { useAccount } from "wagmi";

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
  {
    title: "Tokens",
    Des: "ETH",
    Icon: "https://framerusercontent.com/images/85l3B9qKcsJZISndCTY83iZik.png",
  },
  {
    title: "Tokens",
    Des: "MATIC",
    Icon: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=026",
  },
  {
    title: "Tokens",
    Des: "GOERLI",
    Icon: "https://framerusercontent.com/images/85l3B9qKcsJZISndCTY83iZik.png",
  },
];
const PostStarts = [
  "Hey Everyone",
  "Whats up Traders",
  "Anyone Looking to trade?",
  "This NFT/Collection is available to cop",
];

const NFT = [
  {
    title: "ON1 Force",
    img: "https://framerusercontent.com/images/6p3PmBbdFWowGQOWqSaac5v97LQ.png",
  },
  {
    title: "10KTF",
    img: "https://framerusercontent.com/images/HVmYVaGEFQdxhhipLcgra1hkHzs.png",
  },
];
const offers = ["Only specifix collections/tokens", "Im open to proposals"];
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
      justifyItems={"center"}
    >
      <GridItem>
        <img width={"60px"} alt="x" src={icon} />
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
      justifyItems={"center"}
    >
      <GridItem>
        <img width={"60px"} alt="x" src={icon} />
      </GridItem>
      <GridItem>
        <Button bg={""}>
          <Stack>
            <Text fontSize={"sm"} color={"white"}>
              {title}
            </Text>
            <Text fontWeight={"semibold"} color={"gray.200"}>
              {description}
            </Text>
          </Stack>
        </Button>
      </GridItem>
      <IconButton position={"absolute"} bottom={2} right={2} width={"30px"}>
        <StarIcon />
      </IconButton>
    </Grid>
  );
};

const Form1 = ({ formData, setFormData }) => {
  const [frm1data, setfrm1data] = new useState(0);
  const [opt2, setOpt2] = useState(null);
  const [opt4, setOpt4] = useState(null);
  const handleButtonClick = (data) => {
    // Update frm1data by merging the existing data with the new datac
    const key = data.index.toString();
    if (frm1data === 0) setfrm1data({ [key]: data });
    else setfrm1data((prevData) => ({ ...prevData, [key]: data.data }));

    if (data.index === 1) setOpt2(data.bttn);
    else setOpt4(data.bttn);

    setFormData((prevData) => ({ ...prevData, frm1: frm1data }));
    console.log(formData);
  };

  return (
    <>
      <Grid
        key={1}
        templateColumns={{ base: "1fr", md: "1fr 2fr" }}
        background={"rgb(6, 21, 50)"}
        border={"2px solid rgb(27, 128, 182)"}
        height={"auto"}
        borderRadius={"30px"}
      >
        <GridItem borderRadius={"20px"} padding={"5%"}>
          <Heading w="100%" textAlign={"center"} fontWeight="semibold" mb="2%">
            Create And Set up your post in trading center
          </Heading>
        </GridItem>
        <GridItem
          background={"rgb(27, 128, 182)"}
          borderRadius={"20px"}
          padding={"5%"}
        >
          <Text mt={2} fontWeight={"semibold"}>
            Im Looking for
          </Text>
          <Text fontSize={"sm"} color={"black"} mb={5}>
            What kind of offer you want to recieve
          </Text>
          <Grid
            gap={5}
            templateColumns={{ base: "repeat(1,1fr)", lg: "repeat(2,1fr)" }}
          >
            {offers.map((item, index) => {
              return (
                <Button
                  key={index}
                  overflowWrap={"break-word"}
                  bg={opt2 === index ? "white" : "transparent"}
                  border={"2px dotted"}
                  onClick={() =>
                    handleButtonClick({ index: 1, data: item, bttn: index })
                  }
                >
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
          <Grid
            gap={5}
            templateColumns={{ base: "repeat(1,1fr)", lg: "repeat(2,1fr)" }}
          >
            {Expiration.map((item, index) => {
              return (
                <Button
                  key={index}
                  overflowWrap={"break-word"}
                  bg={opt4 === index ? "white" : "transparent"}
                  border={"2px dotted"}
                  onClick={() =>
                    handleButtonClick({ index: 3, data: item, bttn: index })
                  }
                >
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
  const toast = useToast();
  const { address ,isConnected} = useAccount();
  const [counterAddress, setCounterAddress] = useState("");
  const [loadCounterNft, setLoadCounterNft] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const handleSubmit = (event) => {
    event.preventDefault();
    const isValidAddress = /^0x[a-fA-F0-9]{40}$/.test(counterAddress);

    if (isValidAddress) {
      // Increment the key to force a re-render of the GetNfts component
      setFormKey((prevKey) => prevKey + 1);
      setLoadCounterNft(true);
    } else {
      // Set the state to false if the address is not valid
      setLoadCounterNft(false);
      toast({
        title: "Invalid Contract Address",
        description: "Change the address and submit again",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Stack
        gap={0}
        bg={"rgb(6, 21, 50)"}
        borderRadius={"30px"}
        border={"5px solid rgb(27, 128, 182)"}
      >
        <Grid
          gap={3}
          p={3}
          bg={"rgb(27, 128, 182)"}
          //   justify={{ sm: "block", lg: "space-between" }}
          justifyItems={{ base: "center", lg: "space-between" }}
          templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }}
          borderRadius={"20px"}
          borderBottomRightRadius={0}
        >
          <HStack>
            <Stack>
              <Text fontSize={"sm"}>{formData.frm1[1]}</Text>
              <Text fontSize={"sm"}>{formData.frm1[2]}</Text>
            </Stack>
            <Button
              border={"2px solid blue"}
              color={"white"}
              bg={"blackAlpha.200"}
            >
              Change
            </Button>
          </HStack>

          <Heading fontSize={{ base: "lg", lg: "2xl" }}>
            What NFT are you looking for?
          </Heading>
          <HStack justifyContent={{ lg: "flex-end" }}>
            <Stack>
              <Text>Your Wallet</Text>
              <Text>{isConnected ? (address.slice(0,4) +"..." +address.slice(38)) : "0xB2...9890"}</Text>
            </Stack>
            <img
              width={"50px"}
              src="https://framerusercontent.com/images/85l3B9qKcsJZISndCTY83iZik.png"
              alt="x"
            />
          </HStack>
        </Grid>
        {/* <Grid templateColumns={{ base: "1fr", lg: "1fr 2fr" }}> */}
          {/* <GridItem p={5} > */}
          <Grid templateColumns={{ base: "1fr", lg: "1fr 2fr" }}>
          <input
            type="text"
            // width={150}
            value={counterAddress}
            placeholder="Enter Counter Address"
            onChange={(e) => setCounterAddress(e.target.value)}
            border={"1px solid white"}
            _hover={{ border: "none" }}
            borderradius={"20px"}
            p={2}
            my={5}
            style={{ width: "75%", color: "black", marginBottom: "3%" }}
          />

          <button type="button" onClick={handleSubmit}>
            Submit
          </button>
          </Grid>
          {/* </form> */}
          {loadCounterNft === false ? (
            <div>
              <Grid
                gap={5}
                justifyItems={"center"}
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  lg: "repeat(4, 1fr)",
                }}
              >
                {cards.map((item, index) => (
                  // <Button key={index}  >
                  <Cards
                    title={item.title}
                    description={item.Des}
                    icon={item.Icon}
                  />
                  // </Button>
                ))}
              </Grid>
              <Stack width={"100%"} my={5} textAlign={"center"}>
                <Button width={"20vw"} margin="auto">
                  Load More
                </Button>
              </Stack>
            </div>
          ) : (
            <Grid
              gap={5}
              justifyItems={"center"}
              templateColumns={{ base: "repeat(1, 1fr)", md:"repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
            >
              <GetNfts
                key={formKey}
                loadCounterNFt={loadCounterNft}
                address={counterAddress}
                setFormData={setFormData}
                type={2}
              />
            </Grid>
          )}
          {/* </GridItem> */}
        {/* </Grid> */}
      </Stack>
    </>
  );
};

const Form3 = ({ formData, setFormData }) => {
  const { address } = useAccount();
  const [value, setValue] = useState("1");
  return (
    <>
      {/* <Stack
        gap={0}
        bg={"rgb(6, 21, 50)"}
        borderRadius={"30px"}
        border={"5px solid rgb(27, 128, 182)"}
      >
        <Grid
          gap={3}
          p={3}
          bg={"rgb(27, 128, 182)"}
          //   justify={{ sm: "block", lg: "space-between" }}
          justifyItems={{ base: "center", lg: "space-between" }}
          templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }}
          borderRadius={"20px"}
          borderBottomRightRadius={0}
        >
          <HStack>
            <Stack>
              <Text fontSize={"sm"}>{formData.frm1[1]}</Text>
              <Text fontSize={"sm"}>{formData.frm1[2]}</Text>
            </Stack>
            <Button
              border={"2px solid blue"}
              color={"white"}
              bg={"blackAlpha.200"}
            >
              Change
            </Button>
          </HStack>

          <Heading fontSize={{ base: "lg", lg: "2xl" }}>
            Select What you want to offer for this post
          </Heading>
          <HStack justifyContent={{ lg: "flex-end" }}>
            <Stack>
              <Text>Your Wallet</Text>
              <Text>{address.slice(0, 4) + "..." + address.slice(38)}</Text>
            </Stack>
            <img
              width={"50px"}
              src="https://framerusercontent.com/images/85l3B9qKcsJZISndCTY83iZik.png"
              alt="x"
            />
          </HStack>
        </Grid>
        <Grid templateColumns={{ base: "1fr", lg: "1fr 2fr" }}>
          <GridItem p={5}>
            <GetNfts loadCounterNFt={false} />
          </GridItem>
        </Grid>
      </Stack> */}



      <Stack
        gap={0}
        bg={"rgb(6, 21, 50)"}
        borderRadius={"30px"}
        border={"5px solid rgb(27, 128, 182)"}
      >
        <Grid
          gap={3}
          p={3}
          bg={"rgb(27, 128, 182)"}
          //   justify={{ sm: "block", lg: "space-between" }}
          justifyItems={{ base: "center", lg: "space-between" }}
          templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }}
          borderRadius={"20px"}
          borderBottomRightRadius={0}
        >
          <HStack>
            <Stack>
              <Text fontSize={"sm"}>{formData.frm1[1]}</Text>
              <Text fontSize={"sm"}>{formData.frm1[2]}</Text>
            </Stack>
            <Button
              border={"2px solid blue"}
              color={"white"}
              bg={"blackAlpha.200"}
            >
              Change
            </Button>
          </HStack>

          <Heading fontSize={{ base: "lg", lg: "2xl" }}>
          Select What you want to offer for this post
          </Heading>
          <HStack justifyContent={{ lg: "flex-end" }}>
            <Stack>
              <Text>Your Wallet</Text>
              <Text>{address.slice(0, 4) + "..." + address.slice(38)}</Text>
            </Stack>
            <img
              width={"50px"}
              src="https://framerusercontent.com/images/85l3B9qKcsJZISndCTY83iZik.png"
              alt="x"
            />
          </HStack>
        </Grid>
            <Grid
              gap={5}
              justifyItems={"center"}
              templateColumns={{ base: "repeat(1, 1fr)", md:"repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
            >
              <GetNfts
                loadCounterNFt={false}
                setFormData={setFormData}
                type={1}
              />
            </Grid>
      </Stack>
    </>
  );
};

const Form4 = ({ formData, setFormData }) => {
  const { address } = useAccount();
  console.log(typeof address);
  const calculateExpiryDate=(selectedOption)=> {
    const currentDate = new Date();
    
    // Define the time duration based on the selected option
    let timeDuration;
    switch (selectedOption) {
      case '1 day':
        timeDuration = 1;
        break;
      case '3 days':
        timeDuration = 3;
        break;
      case '7 days':
        timeDuration = 7;
        break;
      case '15 days':
        timeDuration = 15;
        break;
      default:
        // Handle default case or provide a default duration
        timeDuration = 1;
    }
        const expiryDate = new Date(currentDate);
        expiryDate.setDate(currentDate.getDate() + timeDuration);
      
        // Return the formatted expiry date
        const formattedExpiryDate = `${expiryDate.getDate()}/${expiryDate.getMonth() + 1}/${expiryDate.getFullYear()}`;
        console.log(formattedExpiryDate)
        return formattedExpiryDate;
    }

  return (
    <Stack width={"100%"}>
      <Flex
        display={{ base: "block", md: "flex" }}
        alignItems={"center"}
        justify={{ base: "center", lg: "space-between" }}
      >
        <HStack>
           <Stack textAlign={"center"} w={{ base: "70vw", lg: "15vw" }} m={"auto"}>
        <Text border={"2px solid blue"} borderRadius={"20px"} p={3}>
          This post will expire in{" "}
          <span className="BoldPoints" style={{ color: "lightblue" }}>
            {" "}
            {formData.frm1[3]}
          </span>
        </Text>
        <Text>Expirary Date {calculateExpiryDate(formData.frm1[3])}</Text>
      </Stack>
        </HStack>
        <HStack my={5}>
          <Text>What are you Sending</Text>
        </HStack>
        <BiTransfer />
        <HStack>
          <Text>What you will receive</Text>
        </HStack>
      </Flex>
     

      {/* <HStack
        w={{ base: "70vw", lg: "20vw" }}
        border={"1px solid white"}
        p={2}
        borderRadius={"40px"}
        color={"blue"}
        justify={"space-between"}
        m={"auto"}
      > */}
        {/* <HStack bg={"white"} p={2} borderRadius={"20px"}>
          <Text fontWeight={"semibold"}>4 Collections</Text>
          <BsCurrencyPound />
        </HStack> */}
        {/* <Text fontWeight={"semibold"} p={2} borderRadius={"20px"}>
          Edit Choice
        </Text> */}
      {/* </HStack> */}
      <Grid
        gap={5}
        width={"50vw"}
        m={"auto"}
        justifyItems={"center"}
        templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }}
      >
         <OnlyCard name={formData.frm3.name} Image={formData.frm3.nftImage}/>
      <OnlyCard name={formData.frm2.name} Image={formData.frm2.nftImage}/>
     
      </Grid>
    </Stack>
  );
};

export default function Multistep() {
  const toast = useToast();
  const navigate = useNavigate();
  const { address ,isConnected} = useAccount();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  console.log(formData, "FORMDATA");
  const [progress, setProgress] = useState(25);
  const Page = ["01 Create Post", "02 Add NFTs", "03 Your Offer", "04 Verify"];

  useEffect(()=>{console.log(Object.keys(formData).length)

    const num=Object.keys(formData).length
  if(num===3){
  toast({
    title: "Counter NFT selected",
    description: "You have Selected " + formData.frm2.name,
    status: "success",
    duration: 1000,
    isClosable: true,
  });
  console.log("whyyyyy")
}

  if(num===4){
    toast({
      title: "Your NFT selected",
      description: "You have Selected " + formData.frm3.name,
      status: "success",
      duration: 1000,
      isClosable: true,
    });
  }

},[formData])
  const handleSubmit = () => {
    const allFormData = formData;
    console.log("all form data");
    console.log(allFormData);
    // Perform any action with the complete form data

    axios.post('http://localhost:5001/savePostData', {
      SenderNft: formData.frm3.name,
      ReceiverNft: formData.frm2.name,
      expiryDate: formData.frm1[3],
      imageUrl1: formData.frm3.nftImage,
      imageUrl2: formData.frm2.nftImage,
      chainId:(formData.chain==="0x1"?1:2)
    })
      .then(response => {
        console.log(response.data); // Assuming the server sends back a success message
        setTimeout(() => {
          navigate('/Posts');
        }, 3000);
      })
      .catch(error => {
        console.error(error);
      });

  };

  return (
    <>
      <Flex
        justify={"space-around"}
        w={"90vw"}
        height={"10vh"}
        p={6}
        m="10px auto"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        as="form"
      >
        <HStack width={{ base: "100%", md: "70%", lg: "30%" }}>
          <Progress
            width={{ base: "40%", md: "70%" }}
            value={progress}
            size="xs"
            colorScheme="pink"
          />
          <Text fontSize={"lg"} fontWeight={"semibold"}>
            {Page[step - 1]}
          </Text>
        </HStack>
        x
        {step === 4 ? null : (
          <Button
            w="7rem"
            onClick={() => {
              if(step===1 ){
                if(isConnected===false){
                toast({
                  title: "Connect Wallet First",
                  // description: "Ask taker to Complete it",
                  status: "error",
                  duration: 4000,
                  isClosable: true,
                });
              }
              else if(Object.keys(formData?.frm1).length <2){
                toast({
                  title: "option not select",
                  // description: "Ask taker to Complete it",
                  status: "error",
                  duration: 4000,
                  isClosable: true,
                });
              }
                else{
                  setStep(step + 1);
                }
              }
              else{
              setStep(step + 1);
              console.log(step);
              if (step >= 4) {
                setProgress(100);
              } else {
                setProgress(progress + 25);
              }
            }
            }
          }
            colorScheme="teal"
            variant="outline"
          >
            Proceed
          </Button>
        )}
        {step === 4 ? (
          <Button
            w="7rem"
            colorScheme="red"
            variant="solid"
            onClick={() => {
              handleSubmit();
              toast({
                title: "Post created.",
                description: "Can see on Largest Posts Page.",
                status: "success",
                duration: 3000,
                isClosable: true,
              });
            }}
          >
            Submit
          </Button>
        ) : null}
      </Flex>
      <Box
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={"90%"}
        p={6}
        m="10px auto"
        as="form"
      >
        {step === 1 ? (
          <Form1 formData={formData} setFormData={setFormData} />
        ) : step === 2 ? (
          <Form2 formData={formData} setFormData={setFormData} />
        ) : step === 3 ? (
          <Form3 formData={formData} setFormData={setFormData} />
        ) : (
          <Form4 formData={formData} setFormData={setFormData} />
        )}
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
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
