import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import moment from 'moment';

export const ProductsTable = ({ products }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 10;
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / 10);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 10) % products.length;
    setItemOffset(newOffset);
  };

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
                      variant='outline'
                      size='sm'
                    >
                      Vezi stoc
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
        <ReactPaginate
          breakLabel='...'
          nextLabel='>'
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel='<'
          renderOnZeroPageCount={null}
          className='flex items-center gap-4 justify-center'
          pageClassName='border border-green-100 p-4 rounded-md border border-sky-500 hover:bg-sky-100'
          nextClassName='border border-green-100 p-4 rounded-md border border-sky-500 hover:bg-sky-100'
          previousClassName='border border-green-100 p-4 rounded-md border border-sky-500 hover:bg-sky-100'
        />
      </TableContainer>
    </>
  );
};
