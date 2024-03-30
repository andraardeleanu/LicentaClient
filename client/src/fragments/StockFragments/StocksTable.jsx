import {
    Button,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Divider
} from '@chakra-ui/react';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import moment from 'moment';

export const StocksTable = ({ stocks }) => {
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + 10;
    const currentItems = stocks.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(stocks.length / 10);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * 10) % stocks.length;
        setItemOffset(newOffset);
    };

    return (
        <>
            <Divider my={4} />
            <TableContainer>
                <Table
                    variant='simple'
                    size='sm'
                >
                    <Thead>
                        <Tr>
                            <Th>Nume produs</Th>
                            <Th>Stoc disponibil</Th>
                            <Th>Stoc in asteptare</Th>
                            <Th>Optiuni</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {currentItems.map((st) => {
                            return (
                                <Tr key={st.id}>                                    
                                    <Td>{st.productName}</Td>
                                    <Td>{st.availableStock}</Td>
                                    <Td>{st.pendingStock}</Td>
                                    <Td>
                                        {moment(st.dateCreated).format('DD.MM.yyyy HH:mm:ss')}
                                    </Td>
                                    <Td>
                                        <Button
                                            colorScheme='teal'
                                            variant='outline'
                                            size='sm'
                                        >
                                            Vezi stoc
                                        </Button>
                                    </Td>
                                </Tr>
                            );
                        })}
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
        </>
    );
};
