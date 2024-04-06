import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Divider,
  useDisclosure
} from '@chakra-ui/react';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import { useCookies } from 'react-cookie';
import { StockDetailsModal } from './StockDetailsModal';

export const ProductsTable = ({ products }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 10;
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / 10);
  const [selectedProductId, setSelectedProductId] = useState();
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 10) % products.length;
    setItemOffset(newOffset);
  };
  const {
    isOpen: isStockDetailsModalOpen,
    onOpen: onStockDetailsModalOpen,
    onClose: onStockDetailsModalClose
  } = useDisclosure();

  return (
    <>
      <TableContainer>
        <Table
          variant='simple'
          size='sm'
        >
          <Thead>
            <Tr>
              <Th>Nume produs</Th>
              <Th>Pret</Th>
              <Th>Creat la</Th>
              <Th>Optiuni</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentItems.map((pd) => {
              return (
                <Tr key={pd.id}>
                  <Td>{pd.name}</Td>
                  <Td>{pd.price}</Td>
                  <Td>
                    {moment(pd.dateCreated).format('DD.MM.yyyy HH:mm:ss')}
                  </Td>
                  <Td>
                    <Button
                      colorScheme='teal'
                      variant='ghost'
                      size='sm'
                      onClick={() => {
                        setSelectedProductId(pd?.id);
                        onStockDetailsModalOpen();
                      }}
                    >
                      Vezi stoc
                    </Button>
                  </Td>
                </Tr>
              );
            })}
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

      <StockDetailsModal
        isOpen={isStockDetailsModalOpen}
        onClose={onStockDetailsModalClose}
        productId={selectedProductId}
      />
    </>
  );
};
