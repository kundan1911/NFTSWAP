import { Box, Flex, HStack, IconButton, useDisclosure, useColorModeValue, Stack,Text } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useNavigate } from 'react-router';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  FormErrorMessage
  
} from '@chakra-ui/react';
import {useToast} from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect, useState ,useRef} from "react";
import axios from "axios";
import { useAccount } from "wagmi";
import Sidebar from './Sidebar';
import { AiOutlineVerticalAlignMiddle } from "react-icons/ai";
import ProfileModal from './ProfileModal';
// import { ethers , BrowserProvider} from 'ethers';

const Links = [
  { N: "Create Post", L: "/create-post" },
  { N: "Direct Swap", L: "/DirectTrade" },
  { N: "Posts", L: "/Posts" },
  { N: "Orders", L: "/Orders" },
 
];

// function DrawerExample(props) {
//   const {address, isConnected, connect} = props;
//   return (
//     <div style={{ width: "100%", margin: "auto", textAlign: "end", padding: "2%" }}>
//       <Button colorScheme='teal' onClick={connect}>
//       {isConnected ? (address.slice(0,4) +"..." +address.slice(38)) : "Connect"}
//       </Button>
//     </div>
//   );
// }


function DrawerExample(props) {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const toast=useToast()
  const btnRef = useRef();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    bio: '',
  });

  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [bioError, setBioError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validation for email
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailError(emailRegex.test(value) ? '' : 'Invalid email format');
    }

    // Validation for username
    if (name === 'username') {
      setUsernameError(
        value.length >= 8 && value.length <= 15 ? '' : 'Username must be 8 to 15 characters long'
      );
    }

    // Validation for bio
    if (name === 'bio') {
      setBioError(value.length <= 150 ? '' : 'Bio must be less than 150 characters');
    }
  };

  const handleSubmit = () => {
    // Check if there are any validation errors before submitting
    if (emailError || usernameError || bioError) {
  
      return;
    }

    // Implement your logic to submit the form data (e.g., send to backend)
    // Close the sidebar after submission

    console.log(formData);
    axios.post('https://nftbackend-2p4r.onrender.com/createUserAccount', {
      username:formData.username,
      email:formData.email,
      walletAddr:props.addr?props.addr:"not known", 
      bio :formData.bio
})
  .then(response => {
    console.log(response.data); // Assuming the server sends back a success message

    toast({
        title: "Your Accout Created",
        description: "Start Swapping Now",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
  })
  .catch(error => {
    console.error(error);
  });

  
    props.onClose();
  };

  return (
    <div>
      <Drawer isOpen={props.isOpen} placement="right" onClose={props.onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent color="black">
          <DrawerCloseButton />
          <DrawerHeader>Create Profile</DrawerHeader>

          <DrawerBody>
            <FormControl mb={4} isInvalid={!!emailError}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
              <FormErrorMessage>{emailError}</FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!usernameError}>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
              />
              <FormErrorMessage>{usernameError}</FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!bioError}>
              <FormLabel>Bio</FormLabel>
              <Textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Enter your bio"
              />
              <FormErrorMessage>{bioError}</FormErrorMessage>
            </FormControl>

            <Button colorScheme="teal" onClick={handleSubmit}>
              Save
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}




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

export default function Navbar(props) {
  const { isOpen, onOpen: onMainOpen, onClose: onMainClose } = useDisclosure(); // Renamed for clarity
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
  const toast=useToast()
  const { address, connector, isConnected } = useAccount();
  const navigate = useNavigate();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  // const [username, setUsername] = useState('JohnDoe'); // Replace with actual username
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    bio: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // Implement your logic to submit the form data (e.g., send to backend)
    // Close the sidebar after submission
    console.log(formData)
    onModalClose();
  };

  const handleProfileClick = () => {
    // Implement navigation logic to your profile page
    if(isConnected===false){
      toast({
        title: "WALLET NOT CONNECTED",
        description: "please connect wallet to view profile",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }else
    navigate('/Profile');
    console.log('Viewing profile...');
  };

  useEffect(() => {
    const checkUser = async () => {
      // if(isConnected){
        console.log(address);
      // address="fdfd"
        const userDetails = await axios.get('https://nftbackend-2p4r.onrender.com/getUserAccountDetail', {
          params: { walletAddr:address} , // Use the updated chain value here
        });
        console.log(userDetails.data[0]);
          console.log(userDetails.data.length);


          if(userDetails.data.length===0){
            onModalOpen();
          
          }
          else{
            setFormData(userDetails.data[0])
          }
        // setUser(userDetails);

      // }
    };

   
    if (isConnected) {
      checkUser();
    }
  }, [address,isConnected]);


  return (
    <>
     
      <Box px={4} my={4}>
        <Flex h={16} alignItems={"center"} justifyContent={{ base: "space-between", lg: "center" }}>
          <HStack spacing={8} alignItems={"center"}>
          <a href='/'>
            <span className='Logo'>TUSKERS</span>
            </a>
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
            onClick={isOpen ? onMainClose : onMainOpen}
          />


        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ lg: "none" }}>
            <Stack as={"nav"} spacing={4}>
            
              {
              
              Links.map((link) => (
                <NavLink X={link.L} key={link.N}>
                  {link.N}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}


      </Box>
      <DrawerExample isOpen={isModalOpen} onOpen={onModalOpen} onClose={onModalClose} addr={address}  />
      <div style={{ display: "inline-flex" }}>
      <ConnectButton />
      <Button
        onClick={() => setIsProfileModalOpen(true)}
        _hover={{ bgColor: 'teal.500' }}
        _active={{ bgColor: 'teal.700' }}
       style={{position:"absolute",
      right:"20px"}}
      >
        Your Profile
      </Button>
      <ProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} username={formData.username} onProfileClick={handleProfileClick} />
      </div>
    </>
  );
}
