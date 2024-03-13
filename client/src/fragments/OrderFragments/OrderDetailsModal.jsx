import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { getOrderDetails } from '../../utils/apiCalls';
import { ResultsLoading } from '../../components/ResultsLoading';
import { OrderDetailsTable } from './OrderDetailsTable';

export const OrderDetailsModal = ({ isOpen, onClose, orderNo, orderId }) => {
  const [cookies] = useCookies();
  const [needOrdersCall, setNeedOrdersCall] = useState(false);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (orderId) {
      setNeedOrdersCall(true);
    }
  }, [orderId]);

  useEffect(() => {
    (async () => {
      try {
        if (needOrdersCall) {
          setOrdersLoading(true);
          await getOrderDetails(cookies.userToken, orderId).then((res) => {
            setOrdersLoading(false);
            setOrders(res);
          });
          setNeedOrdersCall(false);
        }
      } catch (err) {
        return err;
      }
    })();
  }, [orders, cookies.userToken, needOrdersCall, orderId]);

  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={'3xl'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Comanda - {orderNo}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={12}>
            {ordersLoading ? (
              <ResultsLoading />
            ) : orders.length > 0 ? (
              <OrderDetailsTable
                orders={orders}
                onClose={onClose}
              />
            ) : (
              <>Nu exista produse in comanda.</>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
