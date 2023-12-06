import React from "react";
import Hero from "../Components/Hero";
import About from "../Components/About";
import Expertise from "../Components/Expertise";
import Speciality from "../Components/Speciality";
import { Stack } from "@chakra-ui/react";
// import RoadMap from "../Pages/RoadMap";
import Work from "../Components/Work";
import Faq from "../Components/Faq";
import Contact from "../Components/Form";
import LargeWithAppLinksAndSocial from "../Components/Footer";

export const MNain = () => {
  return (
    <>
      <Stack mx={{ base: "10%", lg: "20%" }}>
        <Hero />
        <About />
        <Expertise />
      </Stack>
      <Speciality />
      <Stack mx={{ base: "10%", lg: "20%" }}>
        <Work />
        <Faq />
        <Contact />
      </Stack>
      <LargeWithAppLinksAndSocial />
    </>
  );
};
