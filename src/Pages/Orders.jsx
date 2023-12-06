import OrderCard from '../Components/OrderCard';
import { useEffect, useState } from "react";
import { Grid ,useToast} from "@chakra-ui/react";
import axios from 'axios';
// import Dialog from 'rc-dialog';
// import 'rc-dialog/assets/bootstrap.css';
import { key } from 'localforage';
import { NftSwap } from '@traderxyz/nft-swap-sdk';
import { ethers } from "ethers";

const GetProvider= async ()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum)
  
    await provider.send("eth_requestAccounts", []);
    console.log(provider)

    const signer = provider.getSigner()
    return {provider,signer}
  }

  const TakerSide=async (takerData,takerAddr,signedOrder,toast)=>{
    const { provider, signer } = await GetProvider();
    const chainId=137
    const nftSwapSdk = new NftSwap(provider, signer, chainId);
console.log("taker sidde signedOrder")
    console.log(signedOrder)
    console.log(takerData)
      const walletAddressUserB = takerAddr;
const assetsToSwapUserB = [takerData];
    

const approvalStatusForUserB = await nftSwapSdk.loadApprovalStatus(
    assetsToSwapUserB[0],
    walletAddressUserB
  );
  // If we do need to approve NFT for swapping, let's do that now
  if (!approvalStatusForUserB.contractApproved) {
    const approvalTx = await nftSwapSdk.approveTokenOrNftByAsset(
      assetsToSwapUserB[0],
      walletAddressUserB
    );
    const approvalTxReceipt = await approvalTx.wait();
    console.log(
      `Approved ${assetsToSwapUserB[0].tokenAddress} contract to swap with 0x. TxHash: ${approvalTxReceipt.transactionHash})`
    );
  }
  // The final step is the taker (User B) submitting the order.
  // The taker approves the trade transaction and it will be submitted on the blockchain for settlement.
  // Once the transaction is confirmed, the trade will be settled and cannot be reversed.
  const fillTx = await nftSwapSdk.fillSignedOrder(signedOrder,  { gasAmountBufferMultiple: 1.4 });
  const fillTxReceipt = await fillTx.wait(4);
  const filledTxnHash = fillTxReceipt.transactionHash;
  const txnSuccess = fillTxReceipt?.status ?? 0;
// now I make sure the txnSuccess === 1 and a hash exists to consider it a successful txn

// .wait() returns the same TransactionReceipt as .awaitTransactionHash() but the latter only waits 0-1 confirms
// const fillTxReceipt = await nftSwapSdk.awaitTransactionHash(fillTx.hash);
  console.log(`🎉 🥳 Order filled. TxHash: ${fillTxReceipt.transactionHash}`);
  toast({
    title: "🎉 🥳 Transaction Successful.",
    description: `TxHash: ${fillTxReceipt.transactionHash}`,
    status: "success",
    duration: 10000,
    isClosable: true,
  });
  }


const Orders =(props)=>{
    const [OrderData, setOrderData] = useState([]);
    const toast = useToast();
    const [SelectCardKey,setSelectCardKey]=useState(-1)
    const [callonce, setCall] = useState(1);

    useEffect(()=>{
        if(SelectCardKey!==-1){
        const selectOrder=OrderData[SelectCardKey];
        if(selectOrder.takerAddr !== props.address){
            toast({
                title: "Incorrect Wallet Addr",
                description: "wallet addr should be the taker addr",
                status: "error",
                duration: 3000,
                isClosable: true,
              });
        }
        else{
        console.log(selectOrder)
        TakerSide(JSON.parse(selectOrder.takerData),selectOrder.takerAddr,JSON.parse(selectOrder.signedOrder),toast)
        // toast({
        //         title: "🎉 🥳 Transaction Successful.",
        //         // description: `TxHash: ${fillTxReceipt.transactionHash}`,
        //         status: "success",
        //         duration: 10000,
        //         isClosable: true,
        //       });
        }
    }
    },[SelectCardKey,])
    const DisplayOrderData = () => {
        axios.get('https://nftbackend-2p4r.onrender.com/displayOrderData')
          .then(response => {
            console.log(JSON.parse(response.data[0].signedOrder))
            setOrderData(prevData => [...prevData, ...response.data]);

          })
          .catch(error => {
            console.error(error);
          });
      }

      if (callonce === 1) {
        DisplayOrderData();
        setCall(2);
      }

    return (
        <>
      <Grid p={6} gap={5} templateColumns={{ base: "repeat(1,1fr)", md: "repeat(2,1fr)", lg: "repeat(3,1fr)" }}>
        {OrderData.map((order,index) => (
          <OrderCard
            ID={index}
            clickCard={setSelectCardKey}
            connectWallectAddr={props.address}
             takerAddr={order.takerAddr}
            makerAddr={order.makerAddr}
          />
        ))}
      </Grid>
    </>
    )
}
export default Orders