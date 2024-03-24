import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay
  } from '@chakra-ui/react';
  import { AddCustomerFragment } from './AddCustomerFragment';
  
  export const AddCustomerModal = ({ isOpen, onClose }) => {
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
            <ModalHeader>Adauga client nou</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <AddCustomerFragment onClose={onClose} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  };
  