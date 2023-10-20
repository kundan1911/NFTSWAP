import { Grid, GridItem, Text, HStack } from "@chakra-ui/react";
import React from "react";

const Hero = () => {
  return (
    <Grid pos={'relative'} overflow={'unset'} my={'20'} templateColumns={{ base: "repeat(1,1fr)", md: "3fr 2fr" }} justifyItems={{ base: "center", md: "stretch" }}>
      <GridItem textAlign={"start"}>
        <Text fontSize={{ base: "4xl", lg: "6xl" }} fontWeight={"bold"}>
          Explore, Locate,
        </Text>
        <Text fontSize={{ base: "4xl", lg: "6xl" }} className='Text-grad' fontWeight={"bold"}>
          Sell Extraordinary
        </Text>
        <Text fontSize={"xl"} my={3}>
          Marketplace for Monster Character Collections Non-Fungible Tokens NFTs
        </Text>
        <HStack my={5}>
          <a href='/'>
            <button className='bn30'>Explore</button>
          </a>
          <a href='/'>
            <button className='bn30'>Explore</button>
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
