import React, { useState, useRef, useEffect } from 'react';
// import Moralis from 'moralis';
import { Box, Flex, Text, Button, Input } from '@chakra-ui/react';
import Dialog from 'rc-dialog';
import { Jazzicon } from '@ukstv/jazzicon-react';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsArrowLeft } from 'react-icons/bs';
import 'rc-dialog/assets/bootstrap.css';
import OnlyCard from '../Components/OnlyCard'; 
import GetNFts from './GetNft';
import { useToast,Grid } from "@chakra-ui/react";
// import NFT from 'components/NFT';

const NewRight = (props) => {
    const toast = useToast();
    const addressInput = useRef(null);
    const [ nfts, setNfts ] = useState([]);
    const [ selected, setSelected ] = useState([]);
    const [ isOpen, setOpen ] = useState(false);
    const [ isAddressOpen, setAddressOpen ] = useState(false);
    const [ address, setAddress ] = useState('');
    const [formData, setFormData] = useState({});
    

    useEffect(()=>{
        
        // console.log(formData)
        props.setTakerData(
            {
                tokenAddress: formData.contractAddr,
                tokenId: formData.tokenId,
                type: formData.type, // 'ERC721' or 'ERC1155'
            }
        )
        props.setTakerAddrNFt(
            (prevData) => ({ ...prevData, "takerNftImg" :formData.nftImage})
        )
        if(formData.contractAddr)
        setOpen(false);
    },[formData])
    const openModal = () => {
        if(address===''){
            toast({
                title: "Counter Address Not Provided",
                description: "Enter the address and Confirm again",
                status: "error",
                duration: 3000,
                isClosable: true,
              });
        }
        else
        setOpen(true);
    };
    const openAddressModal = () => setAddressOpen(true);
    const closeModal = () => setOpen(false);
    const closeAddressModal = () => setAddressOpen(false);
    const onClickNFT = (i: number) => {
        return () => {
            selected.indexOf(nfts[i]) === -1 && setSelected([ ...selected, nfts[i]]);
        }
    }
    const onClickCard = (val: any) => {
        let index = selected.indexOf(val);
        index > -1 && setSelected(selected.slice(0, index).concat(selected.slice(index + 1, selected.length)));
    }
    const setCounterAddress = () => {
       
        console.log(addressInput.current.value)
        const isValidAddress = /^0x[a-fA-F0-9]{40}$/.test(addressInput.current.value);
        
        setAddressOpen(false);
        if(!isValidAddress){
            toast({
                title: "Invalid Contract Address",
                description: "Enter the address and submit again",
                status: "error",
                duration: 3000,
                isClosable: true,
              });
        }
        else{
            console.log('valid')
            setAddress(addressInput.current ? addressInput.current.value : '');

            props.setTakerAddrNFt((prevData) => ({ ...prevData, "takerAddr" :addressInput.current.value}))
        }
       
    }
    
    return (
        <Box position={"relative"} width={"50%"}>
        <Flex alignItems="center" gap={3}>
          <Text fontSize="xl" borderBottom="4px" borderBottomColor="green.400" fontFamily="futura">
            Counterparty Assets
          </Text>
          <Flex alignItems="center" gap={3} px={5} bg="green.400" rounded="md">
            <BsArrowLeft color='white' size={25} />
            <Text fontSize="lg" fontWeight="bold" color="white">
              IN
            </Text>
          </Flex>
        </Flex>
        {formData ? (
            <OnlyCard name={formData.name} Image={formData.nftImage}/>
        //   <Flex alignItems="center" gap={3} pt={5}>
        //     {/* Replace Jazzicon with Chakra UI styles */}
        //     {/* <Jazzicon address={address} className='w-8 h-8 border-2 border-black rounded-full' /> */}
        //     <Text>{address}</Text>
        //   </Flex>
        ) : (
            <Text>no counterAddr</Text>
        //   <OnlyCard name={formData.frm3.name} Image={formData.frm3.nftImage}/>
        )}
        <Flex flexWrap="wrap" alignItems="start" gap={3} pt={5} overflowY="auto">
          {/* {selected.map((val, key) => <NFT nft={val} onClick={onClickCard} key={key} />)} */}
        </Flex>
        <Button
          onClick={openAddressModal}
          style={{position: 'absolute',width:"2.5rem", height:"2.5rem", right: " 0.75rem", top: " 0.75rem", fontWeight:'bold', color: 'white' ,backgroundColor:'green', borderRadius:"999px",cursor:"pointer"}}
        
        >
          0x
        </Button>
        <AiOutlinePlus
          onClick={openModal}
          color='white'
          size={40}
          style={{position: 'absolute', right: "0.75rem", top: "4rem", fontWeight:'bold', color: 'white' ,backgroundColor:'gray', borderRadius:"999px" ,cursor:"pointer"}}
        />
        <Dialog title={<span className='text-lg font-futura'>Choose Assets</span>} visible={isOpen} onClose={closeModal} animation='slide-fade' maskAnimation='fade' className='w-[800px]' style={{color:"black" }}>
                <div className='flex divide-x h-[400px]'>
                    <div className='flex flex-col gap-3 pr-3 w-[300px]'>
                        <div>Choose a NFT assets.</div>
                        {/* <div className='flex flex-col gap-3 p-2 overflow-y-auto bg-gray-200'> */}
                        <Grid
              gap={5}
              justifyItems={"center"}
              templateColumns={{ base: "repeat(1, 1fr)", md:"repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
            >
                            {
                               <GetNFts
                               loadCounterNFt={false} 
                               setFormData={setFormData}
                               type={3}
                               address={address}
                               counterAddr={2}/>
                            }
                             </Grid>
                        {/* </div> */}
                    </div>
                    <div className='flex flex-wrap items-start w-full gap-3 overflow-y-auto'>
                        {/* { selected.map((val, key) => <NFT nft={val} onClick={onClickCard} key={key} />) } */}
                    </div>
                </div>
            </Dialog>
            <Dialog title={<span className='text-lg font-futura'>Counterparty Address</span>} visible={isAddressOpen} onClose={closeAddressModal} animation='slide-fade' maskAnimation='fade' style={{color:"black" ,fontWeight:"bolder"}}>
                <input type='text' ref={addressInput} style={{widows:"full" ,px:"2" ,    outline: "2px solid transparent",
    outlineOffset: "2px",
    width: "100%",
    backgroundColor:" rgb(229 231 235 )",
    borderRadius:" 0.375rem",
    paddingLeft: "0.5rem",
    paddingRight: "0.5rem",
    paddingTop: "0.25rem",
    paddingBottom: "0.25rem" }} placeholder='Input counterparty address.' />
                <button onClick={setCounterAddress} style={{    fontWeight: "700",
    width: "100%",
    padding: "0.25rem",
    fontSize: "1.125rem",
    lineHeight: "1.75rem",
    backgroundColor: "rgb(74 222 128 )",
    marginTop: "0.75rem"}}>Confirm</button>
            </Dialog>
      </Box>
    )
    // 'w-full px-2 py-1 bg-gray-200 rounded-md outline-none'
}

export default NewRight;