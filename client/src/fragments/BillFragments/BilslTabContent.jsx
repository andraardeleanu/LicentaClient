import {
    Button,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Divider,
    useDisclosure
} from '@chakra-ui/react';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';

export const BillsTabContent = ({ bills }) => {
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + 10;
    const currentItems = stocks.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(stocks.length / 10);
    const [selectedBillId, setSelectedBillId] = useState();

    const handlePageClick = (event) => {
        const newOffset = (event.selected * 10) % stocks.length;
        setItemOffset(newOffset);
    };    

    return (
        <>
            <Divider my={4} />
            <TableContainer>
                <Table
                    variant='striped'
                    colorScheme='blackAlpha'
                >
                    <Thead>
                        <Tr>
                            <Th>Comanda</Th>
                            <Th>Pret Total</Th>
                            <Th>Data comenzii</Th>
                            <Th>Optiuni</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {currentItems.map((bill) => {
                            return (
                                <Tr key={bill.id}>
                                    <Td>{st.orderId}</Td>                                   
                                    <Td>{st.totalPrice} RON</Td>
                                    <Td>{st.date}</Td>
                                    <Td>
                                        <Button
                                            colorScheme='teal'
                                            variant='ghost'
                                            size='sm'
                                            onClick={() => {
                                                setSelectedStockId(st?.id);
                                                setSelectedAvailableStock(st?.availableStock);
                                                onStockModalOpen();
                                            }}                                            
                                        >
                                            Actualizeaza
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
            <UpdateStockModal
                isOpen={isStockModalOpen}
                onClose={onStockModalClose}
                stockId={selectedStockId}
                availableStock={selectedAvailableStock}
            />
        </>    
    );
};
