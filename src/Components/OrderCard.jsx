import React from 'react';
import styles from "../styles/Home.module.css";
import { Box, useColorModeValue , HStack , Text} from "@chakra-ui/react";


const OrderCard =({ ID, chainId,clickCard,takerAddr,makerAddr}) => {
    const takerSign=()=>{
console.log(ID)
clickCard(ID)
    }
  return (
    <>
    <Box
    maxW={"400px"}
    w={"full"}
    // eslint-disable-next-line react-hooks/rules-of-hooks
    bg={useColorModeValue("black", "black")}
    boxShadow={"2xl"}
    rounded={"lg"}
    p={6}
    borderColor={"white"}
    borderWidth={"thin"}
    overflow={"hidden"}
    cursor={"pointer"}>
      <div  onClick={() => takerSign()}>

          <HStack borderRadius={'20px'}  boxShadow={'inset 0 0 10px gray'}  p={2} borderTopLeftRadius={0}>
              <Text fontWeight={'bold'} letterSpacing={0} color={'green.600'} width={"50%"} margin={"auto"}>Live Order</Text>
              <img width={"60px"} style={{margin: 'auto'}} alt="x" src={chainId===1?"https://framerusercontent.com/images/85l3B9qKcsJZISndCTY83iZik.png":"https://cryptologos.cc/logos/polygon-matic-logo.png?v=026"} />
          </HStack>

      <h1>Taker Address = {takerAddr.slice(0, 10) + "..." + takerAddr.slice(30)}</h1> 
      <h1>Maker Address = {makerAddr.slice(0, 10) + "..." + makerAddr.slice(30)}</h1>  
      {/* <h1>Order Id = {ID}</h1> */}
      
      </div>
    </Box>
    </>
  )
}

export default OrderCard;