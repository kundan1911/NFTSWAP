import React from "react";
import MarketCard from "../Components/MarketCards";
import { Grid, useDisclosure, Button } from "@chakra-ui/react";
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton } from "@chakra-ui/react";
import { useRef } from "react";
import { FaWolfPackBattalion } from "react-icons/fa";

function DrawerExample() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();



  /* ATTENTION 

  if you wann understand how the not showing logic work then check Navabar.jsx 66-76 lines
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⡷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⡿⠋⠀⠀⠀⠀⢀⣴⣷⣄⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢴⣿⣿⣿⣿⣿⣏⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⣷⣄⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠈⠿⣿⣿⣿⣿⣷⣄⢀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄⠀⠀⠀
⠀⢀⣴⣧⣄⠀⠀⠀⠀⠙⢻⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋⠉⠿⣿⣿⣿⣿⣷⣄⠀
⢴⣿⣿⣿⣿⣶⣀⠀⠀⠀⠀⢘⣿⣿⣿⣿⣿⣿⣏⠀⠀⠀⠀⠉⠿⣿⣿⣿⣿⡷
⠀⠙⠿⣿⣿⣿⣿⣶⣄⢀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄⠀⠀⠀⠀⠉⠻⡿⠋⠀
⠀⠀⠀⠉⢿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋⠘⢻⣿⣿⣿⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠙⢿⣿⣿⣿⣿⡿⠋⠀⠀⠀⠀⢉⣿⣿⣿⣿⣿⡷⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠉⢿⡿⠋⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⡿⠋⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢴⣿⣿⣿⣿⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀

*/

  return (
    <div style={{ width: "100%", margin: "auto", textAlign: "end", padding: "2%" }}>
      <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
        Connect wallet
      </Button>
      <Drawer isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader color={"gray.500"}>Connect your wallet</DrawerHeader>

          <DrawerBody>
            <Button width={"auto"}>
              <FaWolfPackBattalion size={30} />
              <p style={{ margin: "0 5%" }}>Metamask</p>
            </Button>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
const MarketPlace = () => {
  return (
    <>
      <DrawerExample />

      <Grid p={6} gap={5} templateColumns={"repeat(4,1fr)"}>
        <MarketCard
          title={"This NFT/collection is available to cop! 👀"}
          des={"Anyone interested to these NFTs?"}
          imgs={["/Slide/1.webp", "/Slide/2.webp"]}
          authorImg={"https://s3.eu-west-1.amazonaws.com/media.nfttrader.io/static/avatar/1.svg"}
          author={"dortrox"}
          value={"$ 1,000"}
          status={false}
          acceptTance={{ name: "Hasabulla", img: "https://s3.eu-west-1.amazonaws.com/media.nfttrader.io/static/avatar/1.svg" }}
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
    </>
  );
};

export default MarketPlace;
