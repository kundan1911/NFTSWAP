import { LockIcon } from "@chakra-ui/icons";
import { Box, Heading, Text, Stack, Avatar, useColorModeValue, Grid, Button, HStack } from "@chakra-ui/react";


export default function MarketCard({ title, des, imgs = [], author, authorImg, value, acceptTance={name: "Hasabulla", img: ""}, status = true }) {
  return (
    <Box
      maxW={"400px"}
      w={"full"}
      // eslint-disable-next-line react-hooks/rules-of-hooks
      bg={useColorModeValue("white", "gray.900")}
      boxShadow={"2xl"}
      rounded={"lg"}
      p={6}
      overflow={"hidden"}>
      <Stack>
        <Stack borderRadius={'20px'} bg={'white'} boxShadow={'inset 0 0 10px gray'} width={'60%'} p={2} borderTopLeftRadius={0}>
          <HStack>
              <LockIcon color={'black'} />
              <Text fontWeight={'bold'} letterSpacing={0} color={'blue.600'}>I only accept: </Text>
          </HStack>
          <HStack>
            <img width={'20px'} src={acceptTance.img} alt={acceptTance.img} />
            <Text fontWeight={'semibold'} color={'black'}>{acceptTance.name}</Text>
          </HStack>
        </Stack>
        <Heading
          // eslint-disable-next-line react-hooks/rules-of-hooks
          color={useColorModeValue("gray.700", "white")}
          fontSize={"2xl"}
          fontFamily={"body"}>
          {title}
        </Heading>
        <Text color={"gray.500"}>{des}</Text>
        <Grid templateColumns={"repeat(3,1fr)"}>
          {imgs.map((img, index) => (
            <img width={"100px"} height={"100px"} key={index} src={img} alt='' />
          ))}
        </Grid>
      </Stack>
      <Stack color={"gray.500"} mt={6} direction={"row"} spacing={4} align={"center"}>
        <Avatar src={authorImg} />
        <Stack direction={"column"} spacing={0} fontSize={"sm"}>
          <Text color={"black"} fontWeight={600}>
            {author}
          </Text>
          <Text color={"gray.500"}>Feb 08, 2021 · 6min read</Text>
          <Text color={"gray.500"}>Value = {value}</Text>
        </Stack>
        <Stack>
          {status === true ? <Text color={"green"}>Completed</Text> : <Text color={"red"}>Expired</Text>}
          <Button>Make your offer</Button>
        </Stack>
      </Stack>
    </Box>
  );
}
