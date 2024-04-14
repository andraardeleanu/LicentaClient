import {
  Button,
  Divider,
  IconButton,
  Popover,
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
import { ADMIN_RANK, MANAGER_RANK } from '../../utils/constants';
import ReactPaginate from 'react-paginate';
import { OrderDetailsModal } from './OrderDetailsModal';
import { useEffect, useState } from 'react';
import { getOrders, updateOrderStatus, billGenerator } from '../../utils/apiCalls';
import { useCookies } from 'react-cookie';
import { FaPlus } from 'react-icons/fa';
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

  const downloadV2 = (response) => {
    const blob = response.blob;
    const url = window.URL.createObjectURL(new Blob([blob]));

    const headers = new Headers();
    headers.append(
        'Content-Type', 'application/pdf'
    );

    const request = new Request(url, {
      method: 'GET',
      headers: headers,
      mode: 'cors', 
    });
    fetch(request)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf; charset=utf-8' }));

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', response.fileName);
        document.body.appendChild(link);
        link.click();

        // Eliberează resursele URL-ului creat
       /* window.URL.revokeObjectURL(url);

        // Afisează mesaj de succes
        toast({
          title: 'Factură generată și descărcată cu succes.',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top'
        });*/
      })
      .catch((error) => {
        console.error('Eroare în timpul descărcării fișierului:', error);
      });
  }

  const downloadV3 = (response) => {
    console.log('blob', response.blob);
    const url = window.URL.createObjectURL(new Blob([response.blob], { type: 'application/pdf' }));
    
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', response.fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
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

  const handleBillGenerator = async (order) => {
    setLoading(true);
    const response = await billGenerator(order, cookies.userToken);
    console.log('rrrrrr', response);
    setLoading(false);
    if (response.status === 1) {
      toast({
        title: response.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
    } else {
      console.log("file", response.file.blob);
      
      const reader = new FileReader()
      const ceva  = reader.readAsText(response.file.blob);         
      console.log('ceva', ceva);   
      
      downloadV3(response);

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
              <Th style={{ textAlign: 'center' }}>ID</Th>
              <Th className='flex items-center justify-between' style={{ textAlign: 'center' }}>
                <span>Numar comanda</span>
                <span className='flex gap-2'>
                  <Popover>
                    {/* Restul codului */}
                  </Popover>
                </span>
              </Th>
              <Th>Data creare</Th>
              <Th style={{ textAlign: 'center', width: '180px' }} className='flex items-center justify-between'>
                <span className='flex gap-2'>
                  <Select
                    size='sm'
                    placeholder='Alege status'
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="Processed">Procesata</option>
                    <option value="Initialized">Initializata</option>
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
              <Th style={{ textAlign: 'center' }}>Vezi detalii</Th>
              <Th style={{ textAlign: 'center' }}>Actiuni</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentItems.map((order) => (
              <Tr key={order.orderNo}>
                <Td>{order.id}</Td>
                <Td>{order.orderNo}</Td>
                <Td>
                  {moment(order.dateCreated).format('DD.MM.yyyy')}
                </Td>
                <Td>{order.status}</Td>
                <Td>
                  <Button
                    style={{ textAlign: 'center' }}
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
                {data?.roles[0] === MANAGER_RANK &&
                  <Td>
                    <Button
                      colorScheme='teal'
                      variant='ghost'
                      size='sm'
                      onClick={ async () => {
                        await handleBillGenerator(order);
                      }}
                    >
                      Genereaza si descarca factura
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