import {
  Button,
  Divider,
  IconButton,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Select,
  useToast,
} from '@chakra-ui/react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { ADMIN_RANK } from '../../utils/constants';
import ReactPaginate from 'react-paginate';
import { OrderDetailsModal } from './OrderDetailsModal';
import { useEffect, useState } from 'react';
import { getOrders, updateOrderStatus } from '../../utils/apiCalls';
import { useCookies } from 'react-cookie';
import { FaFilter, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setNeedOrdersCall } from '../../slices/userSlice';

export const OrdersTable = ({
  orders,
  setOrders
}) => {
  const [cookies] = useCookies();
  const {
    isOpen: isOrderDetailsModalOpen,
    onOpen: onOrderDetailsModalOpen,
    onClose: onOrderDetailsModalClose
  } = useDisclosure();
  const { data } = useSelector((store) => store.user);
  const [selectedOrderId, setSelectedOrderId] = useState();
  const [selectedOrderNo, setSelectedOrderNo] = useState();
  const [orderNoFilter, setOrderNoFilter] = useState();
  const [statusFilter, setStatusFilter] = useState();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [userError, setUserError] = useState('');
  const toast = useToast();
  const dispatch = useDispatch();

  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 10;
  const currentItems = orders.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(orders.length / 10);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 10) % orders.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    (async () => {
      try {
        await getOrders(cookies.userToken, { orderNo: orderNoFilter, status: statusFilter }).then(
          (res) => {
            setOrders(res);
          }
        );
      } catch (err) {
        return err;
      }
    })();
  }, [orderNoFilter, statusFilter]);

  const handleStatusUpdate = async (orderId) => {
    setLoading(true);
    const response = await updateOrderStatus(orderId, cookies.userToken);
    setLoading(false);
    if (response.status === 1) {
      toast({
        title: response.message,
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });    
    } else {
      toast({
        title: 'Status actualizat cu succes.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
      dispatch(setNeedOrdersCall(true));
    }
  };

  return (
    <>
      <Divider my={6} />
      <TableContainer>
        <Table
          variant='striped'
          colorScheme='blackAlpha'
        >
          <Thead>
            <Tr>
              <Th className='flex items-center justify-between'>
                <span>Numar comanda</span>
                <span className='flex gap-2'>
                  <Popover>
                    <PopoverTrigger>
                      <IconButton
                        size={'xs'}
                        colorScheme='blue'
                        icon={<FaFilter />}
                      />
                    </PopoverTrigger>
                    <Portal>
                      <PopoverContent>
                        <PopoverBody className='mt-6 flex flex-col gap-4'>
                          <Input
                            placeholder='Numar comanda'
                            name='orderNrFilter'
                            value={orderNoFilter}
                            onChange={(e) => {
                              setOrderNoFilter(e.target.value);
                            }}
                          />
                        </PopoverBody>
                      </PopoverContent>
                    </Portal>
                  </Popover>
                  {orderNoFilter && (
                    <IconButton
                      size={'sm'}
                      colorScheme='red'
                      icon={<FaPlus className='rotate-45' />}
                      onClick={() => {
                        setOrderNoFilter('');
                      }}
                    />
                  )}
                </span>
              </Th>
              <Th>Data creare</Th>
              <Th className='flex items-center justify-between'>
                <span>Status</span>
                <span className='flex gap-2'>
                  <Select
                    size='xs'
                    placeholder='Alege status'
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="Procesata">Procesata</option>
                    <option value="Initializata">Initializata</option>
                  </Select>
                  {statusFilter && (
                    <IconButton
                      size={'xs'}
                      colorScheme='red'
                      icon={<FaPlus className='rotate-45' />}
                      onClick={() => {
                        setStatusFilter('');
                      }}
                    />
                  )}
                </span>
              </Th>
              <Th>Punct de lucru</Th>
              <Th>Vezi detalii comanda</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentItems.map((order) => (
              <Tr key={order.orderNo}>
                <Td>{order.orderNo}</Td>
                <Td>
                  {moment(order.dateCreated).format('DD.MM.yyyy HH:mm:ss')}
                </Td>
                <Td>{order.status}</Td>
                <Td>{order.workPointId}</Td>
                <Td>
                  <Button
                    colorScheme='teal'
                    variant='ghost'
                    size='sm'
                    onClick={() => {
                      setSelectedOrderId(order?.id);
                      setSelectedOrderNo(order?.orderNo);
                      onOrderDetailsModalOpen();
                    }}
                  >
                    Detalii
                  </Button>
                </Td>
                {data?.roles[0] === ADMIN_RANK &&
                  <Td>
                    <Button
                      colorScheme='teal'
                      variant='ghost'
                      size='sm'
                      onClick={() => {
                        handleStatusUpdate(order?.id);
                      }}
                    >
                      Modifica status
                    </Button>
                  </Td>
                }

              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
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

      <OrderDetailsModal
        isOpen={isOrderDetailsModalOpen}
        onClose={onOrderDetailsModalClose}
        orderId={selectedOrderId}
        orderNo={selectedOrderNo}
      />
    </>
  );
};