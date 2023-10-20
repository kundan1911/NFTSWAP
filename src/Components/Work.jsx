import React from "react";
import { Text, Grid, GridItem } from "@chakra-ui/react";

const exp = [
  { Title: "Top Collection", Des: 'In the context of "High Quality NFT Collections," it suggests that the collection consists of NFTs.' },
  { Title: "Best Source", Des: "Struggled to monetize their work due to the ease of replication, can now create limited editions." },
  {
    Title: "Best Regulars",
    Des: "One of the most prominent domains impacted by NFTs is the art world. Digital artists, who previously.",
  },
  { Title: "Large Society", Des: "Compensation for their creations. High-profile artists have embraced NFTs, producing unique." },
];
const Work = () => {
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <span className='InsetTextPurple'>Work</span>
      </div>
      <div style={{width:"70%", margin:'auto'}}>
      <Text style={{ textAlign: "center" }} my={4} fontSize={{base:'xl',md:"4xl"}} fontWeight={"bold"}>
        Our Working Process
      </Text>
      <Text style={{ textAlign: "center" }} my={4} fontSize={"sm"} fontWeight={'semibold'}>
        Environmental impact due to energy-intensive blockchain networks, copyright infringement, and the potential for market speculation.
      </Text>
      </div>
      <Grid templateColumns={{ base: "1fr", md: "repeat(2,1fr)", lg: "repeat(2,1fr)" }} gap={5}>
        {exp.map((e) => (
          <GridItem key={e.Title} className='InsetExpCard2'>
            <Text fontSize={"xl"} my={2} fontWeight={"bold"}>
              {e.Title}
            </Text>
            <Text fontSize={"sm"}>{e.Des}</Text>
          </GridItem>
        ))}
      </Grid>
    </div>
  );
};

export default Work;
