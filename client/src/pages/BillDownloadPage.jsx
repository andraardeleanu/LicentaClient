import { useParams } from 'react-router-dom';
import { AppContainer } from '../components/AppContainer';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOrderDetails, getOrderDetailsForBill } from '../utils/apiCalls';
import { useCookies } from 'react-cookie';
import { usePDF } from 'react-to-pdf';
import { Heading } from '@chakra-ui/react';

export const BillDownloadPage = () => {
  const { toPDF, targetRef } = usePDF({ filename: 'Factura comanda.pdf' });
  const navigate = useNavigate();
  const [cookies] = useCookies();

  const { orderId } = useParams();
  const [needCall, setNeedCall] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState();

  useEffect(() => {
    if (!orderId) {
      navigate(-1);
    } else {
      setNeedCall(true);
    }
  }, [navigate, orderId]);

  useEffect(() => {
    (async () => {
      try {
        if (needCall) {
          setLoading(true);
          await getOrderDetailsForBill(cookies.userToken, orderId).then(
            (res) => {
              console.log('res :', res);
              setLoading(false);
              setOrderDetails(res);
            }
          );
          setNeedCall(false);
        }
      } catch (err) {
        return err;
      }
    })();
  }, [orderDetails, cookies.userToken, needCall, orderId]);

  useEffect(() => {
    if (!loading && orderDetails) {
      toPDF();
    }
  }, [loading, orderDetails, toPDF]);

  return (
    <AppContainer needAuth>
      {orderDetails && (
        <div
          className='w-full h-[100vh]'
          ref={targetRef}
        >
          <Heading
            size={'sm'}
            my={4}
            mx={2}
            className='text-right'
          >
            {orderDetails?.orderNo}
          </Heading>
          <Heading
            size={'md'}
            mt={4}
            className='text-center'
          >
            Factura comanda {orderDetails?.orderNo}
          </Heading>
        </div>
      )}
    </AppContainer>
  );
};
