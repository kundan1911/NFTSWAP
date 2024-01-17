import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
// import { useToast } from "@chakra-ui/react";

const ProfileModal = ({ isOpen, onClose, username, onProfileClick }) => {
    // const toast = useToast();
  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInRight">
      <ModalOverlay />
      <ModalContent color={"black"} width={"220px"} position={"absolute"}      right={"30px"}>
        <ModalHeader>Your Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p style={{textAlign:"center" ,marginBottom:"4px"}}>{username}</p>
          <Button colorScheme="teal" onClick={onProfileClick}>
            View Your Profile
          </Button>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );    
};

export default ProfileModal;
