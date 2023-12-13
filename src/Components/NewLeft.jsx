import React, { useState,useEffect } from 'react';
// import Moralis from 'moralis';
// import { useMoralis } from 'react-moralis';
import { Box, Flex, Text, Grid } from '@chakra-ui/react';
import Dialog from 'rc-dialog';
// import { Jazzicon } from '@ukstv/jazzicon-react';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsArrowRight } from 'react-icons/bs';
import 'rc-dialog/assets/bootstrap.css';
import GetNFts from './GetNft';

import OnlyCard from '../Components/OnlyCard'; 

const NewLeft = (props) => {

    const [ nfts, setNfts ] = useState([]);
    const [  selected, setSelected ] = useState([]);
    const [formData, setFormData] = useState({});
   const [renderGetNft,setrenderGetNft]=useState(0);
    const [ isOpen, setOpen ] = useState(false);
    const openModal = () => {
        console.log("open")
        if(props.walletNotConnect===false){
            props.toastNotConnect((val)=>!val)
        }
        else
        setOpen(true);
    };
    useEffect(()=>{
        // 
        console.log("formdata")
        console.log(formData)
        props.setMakerData({
            tokenAddress: formData.contractAddr,
            tokenId: formData.tokenId,
            type: formData.type, // 'ERC721' or 'ERC1155'

            
        })
        if(formData.chain){
        props.setchainId(formData.chain)}
        else
        setOpen(false);
        props.setMakerNft(formData.nftImage)
    },[formData])

    const closeModal = () => setOpen(false);
    const onClickNFT = (i: number) => {
        return () => {
            selected.indexOf(nfts[i]) === -1 && setSelected([ ...selected, nfts[i]]);
        }
    }
    const onClickCard = (val: any) => {
        let index = selected.indexOf(val);
        index > -1 && setSelected(selected.slice(0, index).concat(selected.slice(index + 1, selected.length)));
    }
    
    const updateRender=()=>{
        console.log("rernder")
        setrenderGetNft((prevKey) => prevKey + 1);
    }
    return (
        <Box  width={"50%"} position={"relative"}>
        <Flex alignItems="center" gap={3}>
          <Text fontSize="xl" borderBottom="4px" borderBottomColor="green.400" fontFamily="futura">
            My Wallet Assets
          </Text>
          <Flex alignItems="center" gap={3} px={5} bg="red.500" rounded="md">
            <Text fontSize="lg" fontWeight="bold" color="white">
              OUT
            </Text>
            <BsArrowRight color='white' size={25} />
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
            <Text></Text>
        //   <OnlyCard name={formData.frm3.name} Image={formData.frm3.nftImage}/>
        )}
        <Flex flexWrap="wrap" alignItems="start" gap={3} width="full" pt={5} overflowY="auto">
          {/* {selected.map((val, key) => <NFT nft={val} onClick={onClickCard} key={key} />)} */}
        </Flex>
        <AiOutlinePlus
          onClick={openModal}
          color='white'
          size={40}
          style={{position: 'absolute', right: "0.75rem", top: "0.75rem", fontWeight:'bold', color: 'white' ,backgroundColor:'gray', borderRadius:"999px",cursor:"pointer"}}
        />
         <Dialog title={<span className='text-lg font-futura'>Choose Asset</span>} visible={isOpen} onClose={closeModal} animation='slide-fade' maskAnimation='fade' className='w-[800px]' style={{color:"black"}} onClick={updateRender}>
                <div className='flex divide-x h-[75vh]'>
                    <div className='flex flex-col gap-3 pr-3 w-[300px]'>
                        <div>Choose a NFT assets.</div>
                        <div className='flex flex-col gap-3 p-2 overflow-y-auto bg-gray-200'>
                            {
                <Grid
                gap={5}
                justifyItems={"center"}
                templateColumns={{ base: "repeat(1, 1fr)", md:"repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
              >

                                <GetNFts
                                loadCounterNFt={false} 
                                setFormData={setFormData}
                                type={3}
                                reRender={renderGetNft}
                                 />
                                </Grid>
                            }
                            
                        </div>
                    </div>
                    <div className='flex flex-wrap items-start w-full gap-3 overflow-y-auto'>
                        {/* { selected.map((val, key) => <NFT nft={val} onClick={onClickCard} key={key} />) } */}
                    </div>
                </div>
            </Dialog>
      </Box>
    )
}

export default NewLeft;