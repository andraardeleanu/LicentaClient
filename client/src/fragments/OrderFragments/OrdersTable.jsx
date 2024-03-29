import {
  Button,
  Divider,
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
import { useState } from 'react';

export const OrdersTable = ({ orders, onClose }) => {
  const {
    isOpen: isOrderDetailsModalOpen,
    onOpen: onOrderDetailsModalOpen,
    onClose: onOrderDetailsModalClose
  } = useDisclosure();

  const [selectedOrderId, setSelectedOrderId] = useState();
  const [selectedOrderNo, setSelectedOrderNo] = useState();
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 10;
  const currentItems = orders.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(orders.length / 10);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 10) % orders.length;
    setItemOffset(newOffset);
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
              <Th>Numar comanda</Th>
              <Th>User creare</Th>
              <Th>Data creare</Th>
              <Th>Status</Th>
              <Th>Punct de lucru</Th>
              <Th>Vezi detalii comanda</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentItems.map((order) => (
              <Tr>
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
