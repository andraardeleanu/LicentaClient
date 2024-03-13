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
import moment from 'moment';

export const ProductsTable = ({ products, onClose }) => {
  return (
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
          {products.map((wp) => (
            <Tr>
              <Td>{wp.name}</Td>
              <Td>{wp.price}</Td>
              <Td>{moment(wp.dateCreated).format('DD.MM.yyyy HH:mm:ss')}</Td>
              <Td>
                <Button colorScheme='teal' variant='outline' size='sm'>
                  Vezi stoc
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
