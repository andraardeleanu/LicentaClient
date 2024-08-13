import React, { useState } from 'react';
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
  Input,
  useDisclosure
} from '@chakra-ui/react';
import ReactPaginate from 'react-paginate';
import { UpdateCustomerModal } from './UpdateCustomerModal';

export const CustomersTable = ({ customers }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const endOffset = itemOffset + 10;
  const filteredCustomers = customers.filter(
    (cm) =>
      cm.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cm.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cm.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentItems = filteredCustomers.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredCustomers.length / 10);
  const [selectedCustomer, setSelectedCustomer] = useState();

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 10) % filteredCustomers.length;
    setItemOffset(newOffset);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setItemOffset(0);
  };

  const {
    isOpen: isUpdateCustomerModalOpen,
    onOpen: onUpdateCustomerModalOpen,
    onClose: onUpdateCustomerModalClose
  } = useDisclosure();

  return (
    <>
      <Input
        placeholder='Caută după username...'
        value={searchTerm}
        onChange={handleSearchChange}
        mb={4}
      />
      <TableContainer>
        <Table
          variant='striped'
          colorScheme='blackAlpha'
        >
          <Thead>
            <Tr>
              <Th>Prenume</Th>
              <Th>Nume</Th>
              <Th>Username</Th>
              <Th>Companie</Th>
              <Th>Opțiuni</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentItems?.map((cm) => (
              <Tr key={cm.id}>
                <Td>{cm.firstName}</Td>
                <Td>{cm.lastName}</Td>
                <Td>{cm.username}</Td>
                <Td>{cm.companies.length > 0 && cm.companies[0].name}</Td>
                <Td>
                  <Button
                    colorScheme='teal'
                    variant='outline'
                    size='sm'
                    onClick={() => {
                      setSelectedCustomer(cm);
                      onUpdateCustomerModalOpen();
                    }}
                  >
                    Modifica
                  </Button>
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
      <UpdateCustomerModal
        isOpen={isUpdateCustomerModalOpen}
        onClose={onUpdateCustomerModalClose}
        customer={selectedCustomer}
      />
    </>
  );
};
