import {
  Heading,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td
} from '@chakra-ui/react';
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
          });
          setNeedCall(false);
        }
      } catch (err) {
        return err;
      }
    })();
  }, [orderDetails, cookies.userToken, needCall, orderId]);

  useEffect(() => {
    if (!loading && orderDetails) {
      toPDF({
        page: {
          orientation: 'portrait',
          format: 'letter'
        }
      });
    }
  }, [loading, orderDetails, toPDF]);

  return (
    <AppContainer needAuth>
      {orderDetails && (
        <div className='flex justify-center'>
          <div
            className='w-1/2 px-8 py-4'
            ref={targetRef}
          >
            <div className='text-center font-bold text-3xl mb-8'>
              Factura comanda
            </div>
            <div className='bg-sky-600 rounded-lg p-4 my-4 text-white font-bold text-xl'>
              Detalii comanda
            </div>
            <div>
              <p>
                <span className='font-bold'>Numar comanda:</span>{' '}
                {orderDetails?.orderNo}
              </p>
            </div>
            <div className='bg-sky-600 rounded-lg p-4 my-4 text-white font-bold text-xl'>
              Detalii client
            </div>
            <div>
              <p>
                <span className='font-bold'>Client:</span>{' '}
                {orderDetails?.author}
              </p>
            </div>
            <div>
              <p>
                <span className='font-bold'>Companie:</span>{' '}
                {orderDetails?.companyName}
              </p>
            </div>
            <div>
              <p>
                <span className='font-bold'>Punct de lucru:</span>{' '}
                {orderDetails?.workpointName}
              </p>
            </div>
            <div className='bg-sky-600 rounded-lg p-4 my-4 text-white font-bold text-xl'>
              Produse
            </div>
            <TableContainer>
              <Table size={'lg'}>
                <Thead>
                  <Tr>
                    <Th>Nume produs</Th>
                    <Th>Pret</Th>
                    <Th>Cantitate</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {orderDetails?.products?.map((or, index) => (
                    <Tr key={index}>
                      <Td>{or.name}</Td>
                      <Td>{or.price} RON</Td>
                      <Td>{or.quantity} buc.</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>

            <Heading
              size={'xs'}
              mb={2}
              className='flex items-center justify-between'
            >
              <Heading size={'lg'}>Pret total:</Heading>
              <span className='text-4xl'>{orderDetails.totalPrice} RON</span>
            </Heading>
          </div>
        </div>
      )}
      {/* {orderDetails && (
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
      )} */}
    </AppContainer>
  );
};
