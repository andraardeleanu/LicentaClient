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
  useDisclosure
} from '@chakra-ui/react';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import { OrderDetailsModal } from './OrderDetailsModal';
import { useEffect, useState } from 'react';
import { getOrders } from '../../utils/apiCalls';
import { useCookies } from 'react-cookie';
import { FaFilter, FaPlus } from 'react-icons/fa';

export const OrdersTable = ({
  orders,
  setOrders,
  setOrdersLoading,
  onClose
}) => {
  const [cookies] = useCookies();
  const {
    isOpen: isOrderDetailsModalOpen,
    onOpen: onOrderDetailsModalOpen,
    onClose: onOrderDetailsModalClose
  } = useDisclosure();

  const [selectedOrderId, setSelectedOrderId] = useState();
  const [selectedOrderNo, setSelectedOrderNo] = useState();
  const [orderNoFilter, setOrderNoFilter] = useState();
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
        await getOrders(cookies.userToken, { orderNo: orderNoFilter }).then(
          (res) => {
            setOrders(res);
          }
        );
      } catch (err) {
        return err;
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderNoFilter]);

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
                        size={'sm'}
                        colorScheme='blue'
                        icon={<FaFilter />}
                      />
                    </PopoverTrigger>
                    <Portal>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
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
              <Th>User creare</Th>
              <Th>Data creare</Th>
              <Th>Status</Th>
              <Th>Punct de lucru</Th>
              <Th>Vezi detalii comanda</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentItems.map((order) => (
              <Tr key={order.orderNo}>
                <Td>{order.orderNo}</Td>
                <Td>{order.author}</Td>
                <Td>
                  {moment(order.dateCreated).format('DD.MM.yyyy HH:mm:ss')}
                </Td>
                <Td>{order.status}</Td>
                <Td>{order.workpointId}</Td>
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
