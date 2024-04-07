import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';
import { CreateManualOrderFragment } from './CreateManualOrderFragment';
import { useSelector } from 'react-redux';

export const CreateManualOrderModal = ({ isOpen, onClose }) => {
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
          <ModalBody pb={4}>
            <CreateManualOrderFragment
              onClose={onClose}
              companyId={data?.companies[0]?.id}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
