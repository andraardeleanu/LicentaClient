import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Divider
} from '@chakra-ui/react';
import ReactPaginate from 'react-paginate';
import { useState } from 'react';

export const CustomersTable = ({ customers }) => {

  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 10;
  const currentItems = customers.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(customers.length / 10);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 10) % customers.length;
    setItemOffset(newOffset);
  };


  return (
    <>
      <TableContainer>
        <Table variant='simple' size='sm'>
          <Thead>
            <Tr>
              <Th>Prenume</Th>
              <Th>Nume</Th>
              <Th>Username</Th>
              <Th>Companie</Th>
              <Th>Optiuni</Th>
            </Tr>
          </Thead>
          <Tbody>
            {customers.map((cm) => {
              return (
                <Tr key={cm.id}>
                  <Td>{cm.firstName}</Td>
                  <Td>{cm.lastName}</Td>
                  <Td>{cm.username}</Td>
                  <Td>{cm.companies.map((cp) => {
                    return (
                      <Td>{cp.name}, {"\n"}</Td>
                    )
                  })}</Td>
                  <Td>
                    <Button colorScheme='teal' variant='outline' size='sm'>
                      Modifica
                    </Button>
                  </Td>
                </Tr>
              );
            })
            }
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
    </>
  );
};
