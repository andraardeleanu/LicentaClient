import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay
  } from '@chakra-ui/react';
  import { AddWorkPointFragment } from './AddWorkPointFragment';
  
  export const AddWorkPointModal = ({ isOpen, onClose }) => {
    return (
      <>
        <Modal
          closeOnOverlayClick={false}
          isOpen={isOpen}
          onClose={onClose}
          isCentered
          size={'xl'}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Adauga punct de lucru</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <AddWorkPointFragment onClose={onClose} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  };
  