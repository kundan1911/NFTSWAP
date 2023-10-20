import React from "react";
import MarketCard from "../Components/MarketCards";
import { Grid } from "@chakra-ui/react";

const MarketPlace = () => {
  return (
    <Grid p={6}  gap={5} templateColumns={'repeat(4,1fr)'}>
      <MarketCard
        title={"This NFT/collection is available to cop! 👀"}
        des={"Anyone interested to these NFTs?"}
        imgs={["/Slide/1.webp", "/Slide/2.webp"]}
        authorImg={"https://s3.eu-west-1.amazonaws.com/media.nfttrader.io/static/avatar/1.svg"}
        author={"dortrox"}
        value={"$ 1,000"}
        status={false}
        acceptTance={{name: "Hasabulla", img: "https://s3.eu-west-1.amazonaws.com/media.nfttrader.io/static/avatar/1.svg"}}
      />
            <MarketCard
        title={"This NFT/collection is available to cop! 👀"}
        des={"Anyone interested to these NFTs?"}
        imgs={["/Slide/1.webp", "/Slide/2.webp"]}
        authorImg={"https://s3.eu-west-1.amazonaws.com/media.nfttrader.io/static/avatar/1.svg"}
        author={"dortrox"}
        value={"$ 1,000"}
      />
    </Grid>
  );
};

export default MarketPlace;
