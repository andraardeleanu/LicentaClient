import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay
  } from '@chakra-ui/react';
  import { UpdateStockFragment } from './UpdateStockFragment';
  
  export const UpdateStockModal = ({ isOpen, onClose }) => {
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
            <ModalHeader>Seteaza noua cantitate disponibila</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <UpdateStockFragment onClose={onClose} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  };
  