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
import moment from 'moment';

export const ProductsTable = ({ products }) => {

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(25);

  return (
    <>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Nume</Th>
              <Th>Pret</Th>
              <Th>Creat la</Th>
              <Th>Optiuni</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((wp) => {
              return (
                <Tr key={wp.id}>
                  <Td>{wp.name}</Td>
                  <Td>{wp.price}</Td>
                  <Td>{moment(wp.dateCreated).format('DD.MM.yyyy HH:mm:ss')}</Td>
                  <Td>
                    <Button colorScheme='teal' variant='outline' size='sm'>
                      Vezi stoc
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
          totalItemsCount={products.length}
          pageSizeOptions={[10, 25, 50]}
        />
      </TableContainer>
    </>
  );
};
