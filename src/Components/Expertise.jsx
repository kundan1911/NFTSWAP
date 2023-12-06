import { Text, Grid, GridItem } from "@chakra-ui/react";
import React from "react";

const exp = [
    { Title: "Community-Driven", Des: 'Join a vibrant community passionate about digital assets. Engage in discussions, share insights, and discover new opportunities.', img: "/VidIcon.svg" },
    { Title: "Low Fees, Fair Transactions", Des: "Benefit from minimal fees and transparent pricing. Enjoy fair value exchanges without hidden costs.", img: "/DbIcon.svg" },
    {
        Title: "Secure Escrow Services",
        Des: "Trust our secure escrow services for worry-free transactions. Your assets are protected every step of the way",img: "/BadgeIcon.svg"
    },
    { Title: "Large Society", Des: "Compensation for their creations. High-profile artists have embraced NFTs, producing unique.", img: "/PeopleIcon.svg" },
];

const Expertise = () => {
    return (
        <div style={{ textAlign: "center", margin:'15% 0' }}>
            <span className='InsetTextPurple'>Key Features</span>
            {/* <div style={{width:"80%", margin:'auto'}}>
            <Text my={4} fontSize={{base:'xl',md:"4xl"}} fontWeight={"bold"}>
                Comprehensive Answers for your NFT Inquiries
            </Text>
            <Text my={4} fontSize={"sm"} fontWeight={'semibold'}>
                NFTs are blockchain-based tokens that represent ownership of a specific asset, such as digital art, music, videos, virtual real
                estate, or even virtual pets.
            </Text>
            </div> */}
            <Grid templateColumns={{base: '1fr', md:'repeat(2,1fr)', lg:"repeat(4,1fr)"}} gap={5}>
                {exp.map((e, index) => (
                    <GridItem key={e.Title} className="InsetExpCard" pos={'relative'}>
                        <p className="X" style={{position: 'absolute', top: '10%', fontSize:'20px', fontWeight:'bold', color: 'gray'}}>{index + 1}</p>
                        <img width={70} style={{margin: 'auto'}} src={e.img} alt="" />
                        <Text fontSize={"xl"} fontWeight={"bold"}>
                            {e.Title}
                        </Text>
                        <Text fontSize={"sm"}>{e.Des}</Text>
                    </GridItem>
                ))}
            </Grid>
        </div>
    );
};

export default Expertise;