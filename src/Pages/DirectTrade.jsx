import React, { Fragment, useState,useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useToast } from "@chakra-ui/react";
import NewLeft from '../Components/NewLeft';
import NewRight from '../Components/NewRight'
import { useAccount } from "wagmi";
import { Flex, Box, Button, Text } from '@chakra-ui/react';
import { ethers } from "ethers";
import { NftSwap } from '@traderxyz/nft-swap-sdk';
import axios from 'axios';
// import 'assets/styles/index.css';
const GetProvider= async ()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum)
  
    await provider.send("eth_requestAccounts", []);
    console.log(provider)

    const signer = provider.getSigner()
    return {provider,signer}
  }


  function generateUniqueId() {
    // Generate a UUIDv4
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  const MakerSide=async (Makeraddr,makerData,takerData,TakerAddrNFt,setsignedOrder,makerNftImg,toast,navigate,chain)=>{
    const { provider, signer } = await GetProvider();
   console.log(chain)
    console.log(signer)
    const chainId=chain==="0x1"?1:137
    const nftSwapSdk = new NftSwap(provider, signer, chainId);
    console.log("makerside and taker")
    console.log(Makeraddr)
    console.log(nftSwapSdk)
    const walletAddressMaker = Makeraddr;
    const assetsToSwapUserA = [makerData];
    // const CRYPTOPUNK = {
    //     tokenAddress: '0x62e0108637B2067414B977eDF190af0DbE8E404a',
    //     tokenId: '1',
    //     type: 'ERC721', // 'ERC721' or 'ERC1155'
    //   };


 console.log(TakerAddrNFt.takerAddr)
      const walletAddressUserB = TakerAddrNFt.takerAddr;
const assetsToSwapUserB = [takerData];
    
console.log(walletAddressUserB)
      // Check if we need to approve the NFT for swapping

//       // Check if we need to approve the NFT for swapping
      const approvalStatusForUserA = await nftSwapSdk.loadApprovalStatus(
        assetsToSwapUserA[0],
        walletAddressMaker
      );
      console.log(approvalStatusForUserA)
      // If we do need to approve User A's CryptoPunk for swapping, let's do that now
      if (!approvalStatusForUserA.contractApproved) {
        const approvalTx = await nftSwapSdk.approveTokenOrNftByAsset(
          assetsToSwapUserA[0],
          walletAddressMaker
        );
        const approvalTxReceipt = await approvalTx.wait();
        console.log(
          `Approved ${assetsToSwapUserA[0].tokenAddress} contract to swap with 0x (txHash: ${approvalTxReceipt.transactionHash})`
        );
      }
      
      // Create the order (Remember, User A initiates the trade, so User A creates the order)
      const order = nftSwapSdk.buildOrder(
        assetsToSwapUserA,
        assetsToSwapUserB,
        Makeraddr
      );
      console.log(order)
//       // Sign the order (User A signs since they are initiating the trade)
//     //   const signedOrder = await nftSwapSdk.signOrder(order, walletAddressUserB);

//       // Sign the order (User A signs since they are initiating the trade)
const signedOrder = await nftSwapSdk.signOrder(order, Makeraddr);
console.log("maker side signed order")
console.log(signedOrder)

// Convert signedOrder object to a string
// const takeraddr='0x006504050'
// const signedOrder={
//     'makerAddr':'234323232',
//     'makerAsset':'ape',
//     'takerAddr':'334400000',
//     'takerAsset':'cloud'
// }
const signedOrderString = JSON.stringify(signedOrder);
const signedtakerString = JSON.stringify(takerData);
const signedmakerString = JSON.stringify(makerData);
axios.post('http://localhost:5001/saveSignedOrders', {
    orderId:generateUniqueId(),
    chainId:chainId,
  signedOrder: signedOrderString,
  takerData:signedtakerString,
  makerData:signedmakerString,
  makerAddr:Makeraddr,
  makerNftImg:makerNftImg,
  takerAddr: TakerAddrNFt.takerAddr,
  takerNftImg:TakerAddrNFt.takerNftImg
})
  .then(response => {
    console.log(response.data); // Assuming the server sends back a success message

    toast({
        title: "Swap Order Place",
        description: "Ask taker to Complete it",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

    setTimeout(() => {
      navigate('/Orders');
    }, 5000);
  })
  .catch(error => {
    console.error(error);
  });

  }


//   const TakerSide=async (takerData,TakerAddrNFt,signedOrder)=>{
//     const { provider, signer } = await GetProvider();
//     const chainId=137
//     const nftSwapSdk = new NftSwap(provider, signer, chainId);
// console.log("taker sidde signedOrder")
//     console.log(signedOrder)
//       const walletAddressUserB = TakerAddrNFt.takerAddr;
// const assetsToSwapUserB = [takerData];
    

// const approvalStatusForUserB = await nftSwapSdk.loadApprovalStatus(
//     assetsToSwapUserB[0],
//     walletAddressUserB
//   );
//   // If we do need to approve NFT for swapping, let's do that now
//   if (!approvalStatusForUserB.contractApproved) {
//     const approvalTx = await nftSwapSdk.approveTokenOrNftByAsset(
//       assetsToSwapUserB[0],
//       walletAddressUserB
//     );
//     const approvalTxReceipt = await approvalTx.wait();
//     console.log(
//       `Approved ${assetsToSwapUserB[0].tokenAddress} contract to swap with 0x. TxHash: ${approvalTxReceipt.transactionHash})`
//     );
//   }
//   // The final step is the taker (User B) submitting the order.
//   // The taker approves the trade transaction and it will be submitted on the blockchain for settlement.
//   // Once the transaction is confirmed, the trade will be settled and cannot be reversed.
//   const fillTx = await nftSwapSdk.fillSignedOrder(signedOrder,  { gasAmountBufferMultiple: 1.4 });
//   const fillTxReceipt = await fillTx.wait(4);
//   const filledTxnHash = fillTxReceipt.transactionHash;
//   const txnSuccess = fillTxReceipt?.status ?? 0;
// // now I make sure the txnSuccess === 1 and a hash exists to consider it a successful txn

// // .wait() returns the same TransactionReceipt as .awaitTransactionHash() but the latter only waits 0-1 confirms
// // const fillTxReceipt = await nftSwapSdk.awaitTransactionHash(fillTx.hash);
//   console.log(`🎉 🥳 Order filled. TxHash: ${fillTxReceipt.transactionHash}`);

//   }

//   const tradeFun=(setsignedOrder)=>{
//     const obj={
//         "addr":"0x5556645645",
//         "price":100
//     }
//     setsignedOrder(obj);
//   }
const  DirectTrade = (props) => {
    const [ step, setStep ] = useState(1);
    const { address,isConnected } = useAccount();
    const navigate = useNavigate();
    const toast=useToast()
    const [makerData,setMakerData]=useState({})
    const [chainId,setchainId]=useState("")
    const [makerNftImg,setMakerNft]=useState({})
    const [takerData,setTakerData]=useState({})
    const [TakerAddrNFt,setTakerAddrNFt]=useState({})
    const [signedOrder,setsignedOrder]=useState({});
    const[toastNotConnect,settoastNotConnect]=useState(-1)
    useEffect(()=>{
        console.log("makerData")
        console.log(makerData)
    },[makerData])
    useEffect(()=>{
        console.log("takerData")
        console.log(takerData)
        console.log("takerAddr")
        console.log(TakerAddrNFt)
    },[takerData,TakerAddrNFt])


    useEffect(()=>{
        if(isConnected===false){
            toast({
                title: "Connect Wallet First",
                // description: "Ask taker to Complete it",
                status: "error",
                duration: 4000,
                isClosable: true,
              });
        }
    },[toastNotConnect])
    return (
        <>
        <Flex alignItems="center" justifyContent="space-between" px={5} py={3} borderTop="1px" borderBottom="1px">
        <Box>
          <Text pr={5} fontFamily="futura">Step {step} of 2</Text>
          <Text fontSize="sm">
            {step === 1 ?
              'Select ERC721, ERC1155, ERC20, or Ethereum token from both parts' :
              'Approve and pay to generate the trade for your counterparty'
            }
          </Text>
        </Box>
        <Button onClick={() => {
            if(step===2){
                MakerSide(address,makerData,takerData,TakerAddrNFt,setsignedOrder,makerNftImg,toast,navigate,chainId)
            }
            setStep(3 - step)}} px={10} py={3} bg="green.400" fontFamily="futura">
          {step === 1 ? 'NEXT' : 'Pay'}
        </Button>
      </Flex>
      <Flex height="100%" divideX="1px">
        <NewLeft setMakerData={setMakerData} setMakerNft={setMakerNft} walletNotConnect={isConnected} toastNotConnect={settoastNotConnect} setchainId={setchainId}/>
        <NewRight setTakerData={setTakerData} setTakerAddrNFt={setTakerAddrNFt}/>
      </Flex>
      </>
    )
}

export default DirectTrade;