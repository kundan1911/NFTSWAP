import { Text, Grid, GridItem } from "@chakra-ui/react";
import React from "react";
const exp = [
  { X: "254k", R: "Active" },
  { X: "45k", R: "Sell" },
  {
    X: "5k",
    R: "New Products",
  },
  { X: "16k", R: "Online" },
];

const RoadMap = () => {
  return (
    <div style={{ textAlign: "center", margin: "4% 0"}}>
      <span className='InsetTextPurple'>Roadmap</span>
      <div style={{width:"70%", margin:'auto'}}>
      <Text textAlign={'center'} my={4} fontSize={{base:'xl',md:"4xl"}} fontWeight={"bold"}>
        Cyclone's NFT Journey
      </Text>
      <Text my={4} textAlign={'center'} fontSize={"sm"} fontWeight={'semibold'}>
        The original creator can also receive a percentage of the resale value through royalties programmed into the NFT smart contract.
      </Text>
      </div>
      <Grid templateColumns={{ base: "repeat(2,1fr)", lg: "repeat(4,1fr)" }} gap={5}>
        {exp.map((e) => (
          <GridItem key={e.X} className='InsetExpCardDotted'>
            <Text fontSize={"4xl"} color={"blue.400"} my={2} fontWeight={"bold"}>
              {e.X}
            </Text>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              {e.R}
            </Text>
          </GridItem>
        ))}
      </Grid>
    </div>
  );
};

export default RoadMap;
