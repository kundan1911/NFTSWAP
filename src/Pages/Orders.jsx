import OrderCard from '../Components/OrderCard';
import {  useState } from "react";
import { Grid ,useToast,Text} from "@chakra-ui/react";
import axios from 'axios';
// import Dialog from 'rc-dialog';
// import 'rc-dialog/assets/bootstrap.css';
// import { key } from 'localforage';
import { NftSwap } from '@traderxyz/nft-swap-sdk';
import { ethers } from "ethers";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
    Image,
    Stack,
    useClipboard,
    Box
  } from '@chakra-ui/react';

const GetProvider= async ()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum)
  
    await provider.send("eth_requestAccounts", []);
    console.log(provider)

    const signer = provider.getSigner()
    return {provider,signer}
  }

  const TakerSide=async (takerData,takerAddr,signedOrder,toast,chainId)=>{
    const { provider, signer } = await GetProvider();
    // const chainId=chain==="0x1"?1:137
    console.log("chainId"+chainId)
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
    const [callonce, setCall] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [takerImg,settakerImg]=useState("");
    const [makerImg,setmakerImg]=useState("");
    const [makerNftAddr,setmakerNftAddr]=useState("");
    const [selectOrderInd,setselectOrderInd]=useState(-1);
    const [isHovered, setIsHovered] = useState(false);
    const { hasCopied, onCopy } = useClipboard(makerNftAddr);
    const onClose = () => setIsOpen(false);

    const onOpen = (ind) => {
     
        const selectOrder=OrderData[ind];
        setselectOrderInd(ind);
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
        settakerImg(selectOrder.takerNftImg)
        setmakerImg(selectOrder.makerNftImg)
        setmakerNftAddr(JSON.parse(selectOrder.makerData).tokenAddress)
        setIsOpen(true);
        // TakerSide(JSON.parse(selectOrder.takerData),selectOrder.takerAddr,JSON.parse(selectOrder.signedOrder),toast)
        }

      
    
  }
    const handleConfirm = () => {
      // Your logic when the confirm button is clicked
      // You can perform actions like closing the dialog or triggering some functionality
      const orderDetail=OrderData[selectOrderInd];
      TakerSide(JSON.parse(orderDetail.takerData),orderDetail.takerAddr,JSON.parse(orderDetail.signedOrder),toast,orderDetail.chainId)
      onClose();
    };
  
    const handleMouseEnter = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    
    const DisplayOrderData = () => {
        axios.get('http://localhost:5001/displayOrderData')
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

        // const ImageDialog = ({ isOpen, onClose }) => {
  
  return (
    <>
    <AlertDialog isOpen={isOpen} onClose={onClose} >
      <AlertDialogOverlay color={"black"} >
        <AlertDialogContent>
          <AlertDialogHeader>Direct Swap Order</AlertDialogHeader>
          <AlertDialogBody>
            <Stack direction="row" spacing={12} align="center">
              <Stack>
              <Text margin={"auto"}>Maker NFT</Text>
              <Image
                src={makerImg}
                alt="First Image"
                boxSize="100px"
                objectFit="cover"
              />
              <Text
                  margin="auto"
                  onClick={onCopy}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  _hover={{ cursor: 'pointer', color: 'teal' }}
                >
                  
                  {makerNftAddr.slice(0, 4) + '...' + makerNftAddr.slice(38)}
                </Text>
                <Text>
                {isHovered && (
                  <Box
                    position="relative"
                    // top="-25px"
                    left="50%"
                    transform="translateX(-50%)"
                    bgColor="teal"
                    color="white"
                    borderRadius="md"
                    p={1}
                  >
                    {hasCopied ? 'Copied' : 'Copy'}
                  </Box>
                )}
                </Text>

</Stack>
<Stack>
              <Text margin={"auto"}>Taker NFT</Text>
              <Image
                src={takerImg}
                alt="Second Image"
                boxSize="100px"
                objectFit="cover"
              />
<Text margin={"auto"}>.</Text>
</Stack>
            </Stack>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Text  margin={"auto"}>
            Do you want to confirm the order
            </Text>
            <Button onClick={handleConfirm} colorScheme="teal" ml={3}>
              Confirm
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
      <Grid p={6} gap={5} templateColumns={{ base: "repeat(1,1fr)", md: "repeat(2,1fr)", lg: "repeat(3,1fr)" }}>
        {OrderData.map((order,index) => (
          <OrderCard
            ID={order.orderId}
            chainId={order.chainId}
            clickCard={() => onOpen(index)}
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