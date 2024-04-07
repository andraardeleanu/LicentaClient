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
import { UpdateStockModal } from './UpdateStockModal';

export const StocksTable = ({ stocks }) => {
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + 10;
    const currentItems = stocks.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(stocks.length / 10);
    const [selectedStockId, setSelectedStockId] = useState();
    const [selectedAvailableStock, setSelectedAvailableStock] = useState();

    const handlePageClick = (event) => {
        const newOffset = (event.selected * 10) % stocks.length;
        setItemOffset(newOffset);
    };
    const {
        isOpen: isStockModalOpen,
        onOpen: onStockModalOpen,
        onClose: onStockModalClose
    } = useDisclosure();

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
                            <Th>Produs</Th>
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
                                    <Td>{st.availableStock} buc.</Td>
                                    <Td>{st.pendingStock} buc.</Td>
                                    
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
