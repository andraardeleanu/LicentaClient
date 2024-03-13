import {
    Button,
    Divider,
    Heading,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import moment from 'moment';

export const OrdersTable = ({ orders, onClose }) => {
    return (
        <>  
            <Divider my={6} />
            <TableContainer>
                <Table variant='striped' colorScheme='blackAlpha'>
                    <Thead>
                        <Tr>
                            <Th>Numar comanda</Th>
                            <Th>User creare</Th>
                            <Th>Data creare</Th>
                            <Th>Status</Th>
                            <Th>Punct de lucru</Th>
                            <Th>Vezi detalii comanda</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {orders.map((wp) => (
                            <Tr>
                                <Td>{wp.orderNo}</Td>
                                <Td>{wp.author}</Td>
                                <Td>{moment(wp.dateCreated).format('DD.MM.yyyy HH:mm:ss')}</Td>
                                <Td>{wp.status}</Td>
                                <Td>{wp.workpointId}</Td>
                                <Td>
                                    <Button colorScheme='teal' variant='ghost' size='sm'>
                                        Detalii
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </>

    );
};
