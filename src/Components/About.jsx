import { Grid, GridItem, Text } from '@chakra-ui/react'
import React from 'react'

const About = () => {
  return (
    <Grid pos={'relative'} height={'80vh'} my={5} templateColumns={{ base: "repeat(1,1fr)", md: "repeat(2,1fr)" }} gap={10} justifyItems={{ base: "center", md: "stretch" }} alignContent={'center'}>
       <div className='hellBlurPurpleLeft'></div>
        <GridItem>
            <img width={"100%"} src="/Test1.png" alt="x" />
        </GridItem>
        <GridItem>
            <span className='InsetTextBlue'>About Us</span>
            <Text my={4} fontSize={'3xl'} fontWeight={'bold'}>Trade Unique NFTs Directly with Peers!</Text>
            <Text>Explore a new era of decentralized trading. Swap NFTs effortlessly and securely on Tuskers.</Text>
            {/* <ol>
                <li><span className='BoldPoints'>Digital Art</span>: Exquisite and original artwork crafted by renowned artists or emerging talents.</li>
                <li><span className='BoldPoints'>Collectibles</span>: Rare and limited-edition digital collectibles, such as virtual trading cards, virtual pets, or other unique items.</li>
            </ol> */}
        </GridItem>
    </Grid>
  )
}

export default About