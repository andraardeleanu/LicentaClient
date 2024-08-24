import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';
import { UpdateCustomerFragment } from './UpdateCustomerFragment';

export const UpdateCustomerModal = ({ isOpen, onClose, customer }) => {
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
          <ModalHeader>
            Actualizeaza datele pe care le doresti modificate
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={12}>
            <UpdateCustomerFragment
              customer={customer}
              onClose={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
