import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  Center,
  Heading,
  HStack,
  IconButton,
  Stack,
  Text,
  Tooltip,
  useClipboard,
} from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';
import axios from 'axios';

const ProfilePage = (props) => {
    const [callonce, setCall] = useState(1);
  
  const [userData, setUserData] = useState({
    username: '',
    walletAddr: '',
    email: '',
    bio: '',
  });

  const { hasCopied, onCopy } = useClipboard(userData.walletAddr);

 
    const fetchUserData = async () => {
      try {
        // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
        const userDetails = await axios.get('https://nftbackend-2p4r.onrender.com/getUserAccountDetail', {
            params: { walletAddr:props.address} , // Use the updated chain value here
          });

        setUserData(userDetails.data[0]); // Assuming the response is in the format { username, walletAddress, email, bio }
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

   



  if (callonce === 1) {
    fetchUserData();
    setCall(2);
  }

  return (
    <Center p="4" backgroundColor={"rgb(4 40 111)"}
    margin= "15px"
    borderRadius= "2rem">
      <Stack direction={{ base: 'column', md: 'row' }} spacing={8} align="center">
        {/* User Image */}
        <Avatar size="xl" name={userData.username} src="url_to_user_image" />

        {/* User Details */}
        <Stack spacing={4} align="start">
          <Heading size="lg">{userData.username}</Heading>

          <Box>
            <Text fontSize="md" fontWeight="bold" mb="2">
              Wallet Address
            </Text>
            <HStack>
              <Text>{userData.walletAddr}</Text>
              <Tooltip label={hasCopied ? 'Copied!' : 'Copy to Clipboard'} placement="top">
                <IconButton
                  aria-label="Copy to Clipboard"
                  icon={<CopyIcon />}
                  onClick={onCopy}
                />
              </Tooltip>
            </HStack>
          </Box>

          <Box>
            <Text fontSize="md" fontWeight="bold" mb="2">
              Email
            </Text>
            <Text>{userData.email}</Text>
          </Box>

          <Box>
            <Text fontSize="md" fontWeight="bold" mb="2">
              Bio
            </Text>
            <Text>{userData.bio}</Text>
          </Box>
        </Stack>
      </Stack>
    </Center>
  );
};

export default ProfilePage;
