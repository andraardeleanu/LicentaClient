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

export const CompanyDetailsTable = ({ companies, onClose }) => {
  return (
    <TableContainer>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Nume</Th>
            <Th>Cui</Th>
            <Th>Creat de</Th>
            <Th>Creat la</Th>
          </Tr>
        </Thead>
        <Tbody>
          {companies?.map((cp) => (
            <Tr>
              <Td>{cp.name}</Td>
              <Td>{cp.cui}</Td>
              <Td>{cp.author}</Td>
              <Td>{moment(cp.dateCreated).format('DD.MM.yyyy HH:mm:ss')}</Td>
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
  );
};
