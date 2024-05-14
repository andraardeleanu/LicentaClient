import { Heading, Text, Divider, GridItem, Grid } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { AppContainer } from '../components/AppContainer';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBillDetails } from '../utils/apiCalls';
import { useCookies } from 'react-cookie';
import { usePDF } from 'react-to-pdf';

export const BillDownloadPage = () => {
  const { toPDF, targetRef } = usePDF({ filename: 'Factura comanda.pdf' });
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const { orderId } = useParams();
  const [needCall, setNeedCall] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState();
  const [isOrderReady, setIsOrderReady] = useState(false);

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
          await getBillDetails(orderId, cookies.userToken).then((res) => {
            setLoading(false);
            setOrderDetails(res);
            setIsOrderReady(true);
          });
          setNeedCall(false);
        }
      } catch (err) {
        return err;
      }
    })();
  }, [orderDetails, cookies.userToken, needCall, orderId]);

  useEffect(() => {
    if (!loading && orderDetails && isOrderReady) {
      toPDF();
      //window.close();
    }
  }, [loading, orderDetails, toPDF]);

  return (
    <AppContainer needAuth>
      {isOrderReady && orderDetails && (
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
            lineHeight='tall'
            size={'md'}
            mt={4}
            className='text-center'
          >
            Factura comanda {orderDetails?.orderNo}
          </Heading>
          <Divider my={15} />
          <Grid
            templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
            gridTemplateRows={'50px 1fr 30px'}
            gridTemplateColumns={'150px 1fr'}
            h='200px'
            gap='1'
            color='blackAlpha.700'
            fontWeight='bold'
          >
            <GridItem
              pl='2'
              area={'header'}
            >
              Detalii factura
              <Text
                mt='6'
                fontWeight='bold'
              >
                Total price - {orderDetails?.totalPrice}
              </Text>
              <Text
                mt='6'
                fontWeight='bold'
              >
                Numar comanda - {orderDetails?.orderNo}
              </Text>
            </GridItem>
            <GridItem
              pl='2'
              area={'footer'}
            >
              Detalii client
              <Text
                mt='6'
                fontWeight='bold'
              >
                Client - {orderDetails?.author}
              </Text>
              <Text
                mt='6'
                fontWeight='bold'
              >
                Companie - {orderDetails?.companyName}
              </Text>
              <Text
                mt='6'
                fontWeight='bold'
              >
                Punct de lucru - {orderDetails?.workpointName}
              </Text>
            </GridItem>
          </Grid>
        </div>
      )}
    </AppContainer>
  );
};
