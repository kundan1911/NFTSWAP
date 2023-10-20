import { Text } from "@chakra-ui/react";
import React, { useEffect } from "react";

const x = [
  "Beeple Special Edition",
  "Scarecrow in daylight",
  "3D digital Artwork",
  "Cyberpunk City Art",
  "Floyd Mayweather",
  "Murphy the Mutant",
  "3D digital Artwork",
];

const Speciality = () => {
  useEffect(() => {
    var copy = document.querySelector(".logos-slide").cloneNode(true);
    document.querySelector(".logos").appendChild(copy);
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <span className='InsetTextPurple' style={{ padding: ".5% 1%" }}>
        Our Speciality
      </span>
      <div style={{width:"40%", margin:'auto'}}>
      <Text my={4} fontSize={{base:'xl',md:"4xl"}} fontWeight={"bold"}>
        Our Collection
      </Text>
      <Text my={4} fontSize={"sm"} fontWeight={'semibold'}>
        NFTs have the potential to revolutionize industries such as gaming, virtual real estate, music, publishing, and more, by enabling
        unique.
      </Text>
      </div>
      <div className='logos'>
        <div className='logos-slide'>
          {Array.from({ length: 7 }, (_, i) => (
            <div key={i} className='Card'>
              <img src={"/Slide/" + ++i + ".webp"} alt='x' />
              <Text textAlign={"center"} fontSize={{ base: "sm", lg: "xl" }} fontWeight={"bold"} color={"gray.300"} my={{ base: 0, md: 5 }}>
                {x[--i]}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Speciality;
