import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay
  } from '@chakra-ui/react';
  import { AddProductFragment } from './AddProductFragment';
  
  export const AddProductModal = ({ isOpen, onClose }) => {
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
            <ModalHeader>Adauga produs</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <AddProductFragment onClose={onClose} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  };
  