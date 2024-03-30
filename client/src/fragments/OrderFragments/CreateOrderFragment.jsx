import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Heading,
  Input,
  Select,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
  Divider
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import {
  createOrder,
  getProducts,
  getWorkPointsByCompanyId
} from '../../utils/apiCalls';
import { findProductIndexById } from '../../utils/other';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setNeedOrdersCall } from '../../slices/userSlice';
import ReactPaginate from 'react-paginate';

export const CreateOrderFragment = ({ onClose, companyId }) => {
  const { data } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [userError, setUserError] = useState('');
  const [cookies] = useCookies();
  const toast = useToast();
  const [needWorkpointsCall, setNeedWorkpointsCall] = useState(false);
  const [needProductsCall, setNeedProductsCall] = useState(false);
  const [workpointsLoading, setWorkpointsLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(false);
  const [workpoints, setWorkpoints] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 10;
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / 10);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 10) % products.length;
    setItemOffset(newOffset);
  };


  const updateSelectedProducts = (id, qty) => {
    let bufferList = selectedProducts;
    const index = findProductIndexById(bufferList, id);
    if (index !== -1) {
      bufferList.splice(index, 1);
      setSelectedProducts(bufferList);
    }

    if (qty && qty !== 0) {
      bufferList.push({
        productId: id,
        quantity: qty
      });
    }
    setSelectedProducts(bufferList);
  };

  useEffect(() => {
    setNeedWorkpointsCall(true);
  }, [companyId]);

  useEffect(() => {
    setNeedProductsCall(true);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (needWorkpointsCall) {
          setWorkpointsLoading(true);
          await getWorkPointsByCompanyId(cookies.userToken, companyId).then(
            (res) => {
              setWorkpointsLoading(false);
              setWorkpoints(res);
            }
          );
          setNeedWorkpointsCall(false);
        }
      } catch (err) {
        return err;
      }
    })();
  }, [workpoints, cookies.userToken, needWorkpointsCall, companyId]);

  useEffect(() => {
    (async () => {
      try {
        if (needProductsCall) {
          setProductsLoading(true);
          await getProducts(cookies.userToken).then((res) => {
            setProductsLoading(false);
            setProducts(res);
          });
          setNeedProductsCall(false);
        }
      } catch (err) {
        return err;
      }
    })();
  });

  return (
    <Formik
      initialValues={{
        workpointId: 0
      }}
      onSubmit={async (values) => {
        setLoading(true);
        const response = await createOrder(
          {
            author: data?.username,
            createdBy: data?.id,
            workpointId: values.workpointId,
            fileType: 1,
            products: selectedProducts
          },
          cookies.userToken
        );
        setLoading(false);
        if (response.errorMessage) {
          setUserError(response.errorMessage);
        } else {
          toast({
            title: 'Comanda a fost creata cu succes!',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top'
          });
          dispatch(setNeedOrdersCall(true));
          navigate('/');
          onClose()
        }
      }}
    >
      {({ handleSubmit, handleChange, values }) => (
        <Form
          onSubmit={handleSubmit}
          onChange={() => {
            setUserError('');
          }}
        >
          <Stack
            spacing={4}
            className='mt-6'
          >
            <Select
              id='workpointId'
              name='workpointId'
              placeholder='Selecteaza punct de lucru...'
              onChange={handleChange}
              isDisabled={workpointsLoading}
            >
              {workpoints.map((wp) => (
                <option value={wp?.id}>{wp?.name}</option>
              ))}
            </Select>
            {!productsLoading && (
              <TableContainer>
                <Heading
                  size={'sm'}
                  mb={2}
                >
                  Produse
                </Heading>
                <Table size='sm'>
                  <Thead>
                    <Tr>
                      <Th>Nume</Th>
                      <Th>Pret</Th>
                      <Th>Cantitate</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {currentItems.map((prod) => (
                      <Tr key={prod?.id}>                        
                        <Td>{prod?.name}</Td>
                        <Td>{prod?.price}</Td>
                        <Td>
                          <Input
                            className='max-w-[100px]'
                            id='quantity'
                            name='quantity'
                            placeholder='0'
                            type='number'
                            defaultValue={0}
                            onChange={(e) => {
                              updateSelectedProducts(prod?.id, e.target.value);
                            }}
                          />
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
                <Divider my={6} />
                <ReactPaginate
                  breakLabel='...'
                  nextLabel='>'
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  pageCount={pageCount}
                  previousLabel='<'
                  renderOnZeroPageCount={null}
                  className='flex items-center gap-4 justify-center'
                />
              </TableContainer>
            )}
            {userError && (
              <Alert status='error'>
                <AlertIcon />
                <AlertTitle>{userError}</AlertTitle>
              </Alert>
            )}
            <Button
              colorScheme='blue'
              onClick={() => {
                handleSubmit();
                onClose();
              }}
              isLoading={loading}
            >
              Creeaza
            </Button>
            <Button
              onClick={onClose}
              disabled={loading}
            >
              Renunta
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
