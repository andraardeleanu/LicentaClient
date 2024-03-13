import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';
import { CreateOrderFragment } from './CreateOrderFragment';
import { useSelector } from 'react-redux';

export const AddOrderModal = ({ isOpen, onClose }) => {
  const { data } = useSelector((store) => store.user);

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
          <ModalHeader>Creaza comanda manual</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <CreateOrderFragment
              onClose={onClose}
              companyId={data?.companyId}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
