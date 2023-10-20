import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Text } from "@chakra-ui/react";
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, Box } from "@chakra-ui/react";
import React from "react";

const exp = [
  { Title: "What Does NFT stands for?", Des: 'NFT stands for Non-Fungible Token.' },
  { Title: "What makes NFTs different?", Des: "NFTs are unique digital assets that represent ownership of specific items or pieces of content, while cryptocurrencies are fungible and interchangeable units of value." },
  {
    Title: "How do NFTs use blockchain technology?",
    Des: "NFTs use blockchain technology to store metadata and verify ownership. This ensures that each NFT is unique and cannot be duplicated or forged.",
  },
  { Title: "What kind of digital items can be tokenized as NFTs?", Des: "Almost anything digital can be tokenized as an NFT, including digital artwork, music, videos, virtual real estate, collectibles, tweets, and more." },
  { Title: "How do creators benefit from NFTs?", Des: "Creators can monetize their work by selling NFTs, allowing them to retain ownership and receive royalties from secondary sales on the blockchain." }
];

const Faq = () => {
  return (
    <div style={{margin: '5% 0', position:'relative'}} className='Faq'>
      <div className='hellBlurPurpleLeft'></div>

      <Text fontSize={{base:'xl',md:"5xl"}} fontWeight={"bold"}>
        FAQ
      </Text>
      <Text my={5} color={"gray.200"}>
        Buyers receive a digital certificate of ownership when they purchase an NFT.
      </Text>
      <Accordion allowMultiple>
        {exp.map((e) => (
          <AccordionItem border={"none"}>
            {({ isExpanded }) => (
              <>
                <h2>
                  <AccordionButton>
                    {isExpanded ? <MinusIcon fontSize='15px' /> : <AddIcon fontSize='15px' />}
                    <Box mx={2} as='span' flex='1' textAlign='left' fontSize={'lg'} fontWeight={'bold'}>
                      Q: {e.Title}
                    </Box>
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  {e.Des}
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Faq;
