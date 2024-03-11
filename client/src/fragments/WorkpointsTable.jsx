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

export const WorkpointsTable = ({ workpoints, onClose }) => {
  return (
    <TableContainer>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Nume</Th>
            <Th>Adresa</Th>
            <Th>Creat de</Th>
            <Th>Creat la</Th>
          </Tr>
        </Thead>
        <Tbody>
          {workpoints.map((wp) => (
            <Tr>
              <Td>{wp.name}</Td>
              <Td>{wp.address}</Td>
              <Td>{wp.author}</Td>
              <Td>{moment(wp.dateCreated).format('DD.MM.yyyy HH:mm:ss')}</Td>
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
