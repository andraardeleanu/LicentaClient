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

export const StockDetailsTable = ({ stocks, onClose }) => {
    return (
        <>
            <Divider my={2} />
            <TableContainer>
                <Table variant='striped'>
                    <Thead>
                        <Tr>
                            <Th>Cantitate disponibila</Th>
                            <Th>Cantitate in asteptare</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {stocks.map((st) => (
                            <Tr>
                                <Td>{st.availableStock} buc.</Td>
                                <Td>{st.pendingStock} buc.</Td>
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
