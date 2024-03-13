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
    useDisclosure,
} from '@chakra-ui/react';
import moment from 'moment';
import { OrderDetailsModal } from './OrderDetailsModal';
import { useState } from 'react';

export const OrdersTable = ({ orders, onClose }) => {

    const {
        isOpen: isOrderDetailsModalOpen,
        onOpen: onOrderDetailsModalOpen,
        onClose: onOrderDetailsModalClose
    } = useDisclosure();

    const [selectedOrderId, setSelectedOrderId] = useState();
    const [selectedOrderNo, setSelectedOrderNo] = useState();


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
                        {orders?.map((order) => (
                            <Tr>
                                <Td>{order.orderNo}</Td>
                                <Td>{order.author}</Td>
                                <Td>{moment(order.dateCreated).format('DD.MM.yyyy HH:mm:ss')}</Td>
                                <Td>{order.status}</Td>
                                <Td>{order.workpointId}</Td>
                                <Td>
                                    <Button colorScheme='teal' variant='ghost' size='sm'
                                        onOptionsClick={() => {
                                            setSelectedOrderId(order?.id);
                                            setSelectedOrderNo(order?.orderNo);
                                            onOrderDetailsModalOpen();
                                        }}>
                                        Detalii
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>

            <OrderDetailsModal
                isOpen={isOrderDetailsModalOpen}
                onClose={onOrderDetailsModalClose}
                orderId={selectedOrderId}
                orderNo={selectedOrderNo}
            />
        </>

    );
};
