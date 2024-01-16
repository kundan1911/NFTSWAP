import React, { useState } from 'react';
import {
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
} from '@chakra-ui/react';

const Sidebar = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    bio: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // Implement your logic to submit the form data (e.g., send to backend)
    // Close the sidebar after submission
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Create Profile</DrawerHeader>

        <DrawerBody>
          <FormControl mb={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Bio</FormLabel>
            <Textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Enter your bio"
            />
          </FormControl>

          <Button colorScheme="teal" onClick={handleSubmit}>
            Save
          </Button>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default Sidebar;
