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
  import { getStockByProductId } from '../../utils/apiCalls';
  import { ResultsLoading } from '../../components/ResultsLoading';
  import { StockDetailsTable } from './StockDetailsTable';
  
  export const StockDetailsModal = ({ isOpen, onClose, productId }) => {
    const [cookies] = useCookies();
    const [needStocksCall, setNeedStocksCall] = useState(false);
    const [stocksLoading, setStocksLoading] = useState(false);
    const [stocks, setStocks] = useState([]);
  
    useEffect(() => {
      if (productId) {
        setNeedStocksCall(true);
      }
    }, [productId]);
  
    useEffect(() => {
      (async () => {
        try {
          if (needStocksCall) {
            setStocksLoading(true);
            await getStockByProductId(productId, cookies.userToken).then((res) => {
              setStocksLoading(false);
              setStocks(res);
            });
            setNeedStocksCall(false);
          }
        } catch (err) {
          return err;
        }
      })();
    }, [stocks, cookies.userToken, needStocksCall, productId]);
  
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
            <ModalHeader>Produs - {productId}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={12}>
              {stocksLoading ? (
                <ResultsLoading />
              ) : stocks.length > 0 ? (
                <StockDetailsTable
                  stocks={stocks}
                  onClose={onClose}
                />
              ) : (
                <>Nu exista stoc pentru acest produs.</>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  };
  