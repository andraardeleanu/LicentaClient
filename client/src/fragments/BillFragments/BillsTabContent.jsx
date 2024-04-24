import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Divider,
  Button
} from '@chakra-ui/react';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';

export const BillsTabContent = ({ bills }) => {
  const navigate = useNavigate();
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 10;
  const currentItems = bills.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(bills.length / 10);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 10) % bills.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Divider my={4} />
      <TableContainer>
        <Table
          variant='striped'
          colorScheme='blackAlpha'
        >
          <Thead>
            <Tr>
              <Th>Comanda</Th>
              <Th>Pret Total</Th>
              <Th>Data generare factura</Th>
              <Th>Optiuni</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentItems.map((bl, key) => {
              return (
                <Tr key={key}>
                  <Td>{bl.orderNo}</Td>
                  <Td>{bl.totalPrice} RON</Td>
                  <Td>{bl.date}</Td>
                  <Td>
                    <Button
                      colorScheme='teal'
                      variant='ghost'
                      size='sm'
                      onClick={async () => {
                        navigate(`/downloadBill/${bl.id}`)
                      }}
                    >
                      Descarca copie
                    </Button></Td>
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
    </>
  );
};
