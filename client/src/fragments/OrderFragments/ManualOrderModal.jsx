import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay
  } from '@chakra-ui/react';
  import { ManualOrderFragment } from './ManualOrderFragment';
  
  export const ManualOrderModal = ({ isOpen, onClose }) => {
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
            <ModalHeader>Creeaza comanda</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <ManualOrderFragment onClose={onClose} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  };
  