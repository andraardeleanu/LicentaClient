import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';
import { AddCompanyFragment } from './AddCompanyFragment';

export const AddCompanyModal = ({ isOpen, onClose }) => {
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
          <ModalHeader>Adauga companie</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <AddCompanyFragment onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
