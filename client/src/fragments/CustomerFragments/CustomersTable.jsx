import {
    Button,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
  } from '@chakra-ui/react';
  import {
    useState
  } from 'react';
  import { PaginationTable } from "table-pagination-chakra-ui"
  
  export const CustomersTable = ({ customers }) => {
  
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(25);
  
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
                    <Td>{cm.companyId}</Td>
                    <Td>
                      <Button colorScheme='teal' variant='outline' size='sm'>
                        Modifica
                      </Button>
                    </Td>
                  </Tr>
                );
              })
                .slice(pageSize * pageIndex, pageSize * (pageIndex + 1))
              }
            </Tbody>
          </Table>
          <PaginationTable
            pageSize={pageSize}
            setPageSize={setPageSize}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            totalItemsCount={customers.length}
            pageSizeOptions={[10, 25, 50]}
          />
        </TableContainer>
      </>
    );
  };
  