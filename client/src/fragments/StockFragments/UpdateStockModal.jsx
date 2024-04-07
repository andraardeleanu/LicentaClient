import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';
import { UpdateStockFragment } from './UpdateStockFragment';
import { useCookies } from 'react-cookie';
import { getStockById } from '../../utils/apiCalls';
import { useEffect, useState } from 'react';
import { ResultsLoading } from '../../components/ResultsLoading';

export const UpdateStockModal = ({ isOpen, onClose, stockId, availableStock }) => {
  const [cookies] = useCookies();
  const [needStocksCall, setNeedStocksCall] = useState(false);

  useEffect(() => {
    if (stockId) {
      setNeedStocksCall(true);
    }
  }, [stockId]);

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
          <ModalHeader>Stoc actual: {availableStock} buc.</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={12}>
            <UpdateStockFragment
              stockId={stockId}
              onClose={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
