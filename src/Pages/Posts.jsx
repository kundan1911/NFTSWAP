import React from "react";
import MarketCard from "../Components/MarketCards";
import { Grid } from "@chakra-ui/react";
import { Box, Button, Select, Stack , useDisclosure} from "@chakra-ui/react";
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
} from '@chakra-ui/react';

import { useState ,useRef} from "react";
import axios from 'axios';

// import { ethers } from 'ethers';
// import { Web3ReactProvider } from '@web3-react/core';
// import { FaWolfPackBattalion } from "react-icons/fa";

// const getEtherData= async ()=>{
//   let signer = null;
//   console.log("getEtherData")
// let provider;
// if (window.ethereum == null) {

//     // If MetaMask is not installed, we use the default provider,
//     // which is backed by a variety of third-party services (such
//     // as INFURA). They do not have private keys installed so are
//     // only have read-only access
//     console.log("MetaMask not installed; using read-only defaults")
//     provider = ethers.getDefaultProvider()

// } else {

//     // Connect to the MetaMask EIP-1193 object. This is a standard
//     // protocol that allows Ethers access to make all read-only
//     // requests through MetaMask.
//     provider = new ethers.BrowserProvider(window.ethereum)

    
//     // It also provides an opportunity to request access to write
//     // operations, which will be performed by the private key
//     // that MetaMask manages for the user.
//     signer = await provider.getSigner();
//     console.log(signer.address)
// }
// }

// function DrawerExample() {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const btnRef = useRef();
//   const [formData, setFormData] = useState({
//     email: '',
//     username: '',
//     bio: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = () => {
//     // Implement your logic to submit the form data (e.g., send to backend)
//     // Close the sidebar after submission
//     console.log(for)
//     onClose();
//   };



//   /* ATTENTION 

//   if you wann understand how the not showing logic work then check Navabar.jsx 66-76 lines
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⡷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⡿⠋⠀⠀⠀⠀⢀⣴⣷⣄⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⢴⣿⣿⣿⣿⣿⣏⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⣷⣄⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠈⠿⣿⣿⣿⣿⣷⣄⢀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄⠀⠀⠀
// ⠀⢀⣴⣧⣄⠀⠀⠀⠀⠙⢻⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋⠉⠿⣿⣿⣿⣿⣷⣄⠀
// ⢴⣿⣿⣿⣿⣶⣀⠀⠀⠀⠀⢘⣿⣿⣿⣿⣿⣿⣏⠀⠀⠀⠀⠉⠿⣿⣿⣿⣿⡷
// ⠀⠙⠿⣿⣿⣿⣿⣶⣄⢀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄⠀⠀⠀⠀⠉⠻⡿⠋⠀
// ⠀⠀⠀⠉⢿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋⠘⢻⣿⣿⣿⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠙⢿⣿⣿⣿⣿⡿⠋⠀⠀⠀⠀⢉⣿⣿⣿⣿⣿⡷⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠉⢿⡿⠋⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⡿⠋⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢴⣿⣿⣿⣿⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀

// */

//   return (
//     <div style={{ width: "100%", margin: "auto", textAlign: "end", padding: "2%" }}>
//       <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
//         Connect wallet
//       </Button>
//       <Drawer isOpen={isOpen} placement="right" onClose={onClose} >
//       <DrawerOverlay />
//       <DrawerContent color={"black"}>
//         <DrawerCloseButton />
//         <DrawerHeader>Create Profile</DrawerHeader>

//         <DrawerBody>
//           <FormControl mb={4}>
//             <FormLabel>Email</FormLabel>
//             <Input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Enter your email"
//             />
//           </FormControl>

//           <FormControl mb={4}>
//             <FormLabel>Username</FormLabel>
//             <Input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               placeholder="Enter your username"
//             />
//           </FormControl>

//           <FormControl mb={4}>
//             <FormLabel>Bio</FormLabel>
//             <Textarea
//               name="bio"
//               value={formData.bio}
//               onChange={handleChange}
//               placeholder="Enter your bio"
//             />
//           </FormControl>

//           <Button colorScheme="teal" onClick={handleSubmit}>
//             Save
//           </Button>
//         </DrawerBody>
//       </DrawerContent>
//     </Drawer>
//     </div>
//   );
// }

const Posts = (props) => {
  const [postData, setPostData] = useState([]);
  const [callonce, setCall] = useState(1);
  const [selectedOption, setSelectedOption] = useState("");

  const handleSubmit=()=>{
    console.log(selectedOption)
   if(selectedOption!==""){
    var chainId;
    if(selectedOption==="ethereum")chainId=1;
    else chainId=2
    axios.get('http://localhost:5001/displayChainIdPost', {
      params: { chainId} , // Use the updated chain value here
    }).then(response => {
      setPostData(response.data);
    })
    .catch(error => {
      console.error(error);
    });
   }else{
    axios.get('http://localhost:5001/displayPostData')
      .then(response => {
        setPostData(prevData => response.data);
      })
      .catch(error => {
        console.error(error);
      });
   }
  }
  const  extractBeforePattern=(inputString)=> {
    const match = inputString.match(/^[a-zA-Z]+(?: [a-zA-Z]+)?/);
  return match ? match[0] : '';
  }
  const DisplayPostData = () => {
    console.log("axios post data")
    axios.get('http://localhost:5001/displayPostData')
      .then(response => {
        setPostData(prevData => response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  if (callonce === 1) {
    DisplayPostData();
    setCall(2);
  }

  console.log(postData);

  return (
    <>
    <Box width="100%" p={8} >
      <form>
        <Stack direction="row" spacing={4} align="center">
          <Select
            flex="1"
            rounded="md"
            size="lg"
            bg="black"
            borderColor="white"
            variant="filled"
            placeholder="Select blockchain"
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="polygon">Polygon</option>
            <option value="ethereum">Ethereum</option>
          </Select>
          <Button
            onClick={handleSubmit}
            colorScheme="teal"
            size="lg"
            borderRadius="md"
            w="auto" // Set width to auto to adjust based on content
          >
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
      <Grid p={6} gap={5} templateColumns={{ base: "repeat(1,1fr)", md: "repeat(2,1fr)", lg: "repeat(3,1fr)" }}>
        {postData.map((nft) => (
          <MarketCard
            // key={nft._id}  {/* Add a unique key for each element in the array */}
            title={"This NFT/collection is available to cop! 👀"}
            des={"Anyone interested in these NFTs?"}
            imgs={[nft.imageUrl1]}
            ExpiryDate={nft.expiryDate}
            author={nft.SenderNft}
            value={"$ 1,000"}
            status={true}
            acceptTance={{ name: extractBeforePattern(nft.ReceiverNft), img: nft.imageUrl2 }}
            chainId={nft.chainId}
          />
        ))}
      </Grid>
    </>
  );
};

export default Posts;
