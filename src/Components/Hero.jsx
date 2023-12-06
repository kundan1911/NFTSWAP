import { Grid, GridItem, Text, HStack } from "@chakra-ui/react";
import React from "react";

const Hero = () => {
  return (
    <Grid pos={'relative'} overflow={'unset'} my={'20'} templateColumns={{ base: "repeat(1,1fr)", md: "3fr 2fr" }} justifyItems={{ base: "center", md: "stretch" }}>
      <GridItem textAlign={"start"}>
        <Text fontSize={{ base: "4xl", lg: "6xl" }} fontWeight={"bold"}>
        Swap your NFTs in a safe
        </Text>
        <Text fontSize={{ base: "4xl", lg: "6xl" }} className='Text-grad' fontWeight={"bold"}>
        and secure way, your way!
        </Text>
        <Text fontSize={"xl"} my={3}>
        Tuskers provides a secure escrow to let you swap your NFTs with others. At no point in time does Tuskersor anyone else have access to your NFTs or funds.
        </Text>
        <HStack my={5}>
          <a href='/create-post'>
            <button className='bn30'>Create Post</button>
          </a>
          <a href='/DirectTrade'>
            <button className='bn30'>Direct Swap</button>
          </a>
        </HStack>
      </GridItem>
      <GridItem>
        <img src='./Head.gif' alt='' />
      </GridItem>
      <div className="hellBlurBlueRight"></div>
    </Grid>
  );
};

export default Hero;
