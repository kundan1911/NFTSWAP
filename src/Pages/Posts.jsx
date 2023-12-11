import React from "react";
import MarketCard from "../Components/MarketCards";
import { Grid } from "@chakra-ui/react";
import { Box, Button, Select, Stack} from "@chakra-ui/react";
// import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton } from "@chakra-ui/react";
import { useState } from "react";
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
    axios.get('https://nftbackend-2p4r.onrender.com/displayChainIdPost', {
      params: { chainId} , // Use the updated chain value here
    }).then(response => {
      setPostData(response.data);
    })
    .catch(error => {
      console.error(error);
    });
   }else{
    axios.get('https://nftbackend-2p4r.onrender.com/displayPostData')
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
    axios.get('https://nftbackend-2p4r.onrender.com/displayPostData')
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
