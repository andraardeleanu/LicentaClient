import {
  Button,
  Divider,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';

export const OrderDetailsTable = ({ orders, onClose }) => {
  return (
    <>
      <Divider my={6} />
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Nume produs</Th>
              <Th>Pret</Th>
              <Th>Cantitate</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders?.map((or) => (
              <Tr>
                <Td>{or.name}</Td>
                <Td>{or.price} RON</Td>
                <Td>{or.quantity} buc.</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Button
          className='w-full mt-4'
          onClick={onClose}
        >
          Inchide
        </Button>
      </TableContainer>
    </>
  );
};
