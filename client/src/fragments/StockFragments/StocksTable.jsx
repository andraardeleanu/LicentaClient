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
  useDisclosure,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Portal,
  IconButton,
  Input
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaFilter, FaPlus } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import { UpdateStockModal } from './UpdateStockModal';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { getStocks } from '../../utils/apiCalls';

export const StocksTable = ({ stocks, setStocks }) => {
  const [cookies] = useCookies();

  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 10;
  const currentItems = stocks.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(stocks.length / 10);

  const [selectedStockId, setSelectedStockId] = useState();
  const [selectedAvailableStock, setSelectedAvailableStock] = useState();

  const [productNameFilter, setProductNameFilter] = useState();

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 10) % stocks.length;
    setItemOffset(newOffset);
  };
  const {
    isOpen: isStockModalOpen,
    onOpen: onStockModalOpen,
    onClose: onStockModalClose
  } = useDisclosure();

  useEffect(() => {
    (async () => {
      try {
        await getStocks(cookies.userToken, { name: productNameFilter }).then(
          (res) => {
            setStocks(res);
          }
        );
      } catch (err) {
        return err;
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productNameFilter, cookies.userToken]);

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
              <Th className='flex items-center stockTable justify-between'>
                <span>Nume produs</span>
                <span className='flex gap-2'>
                  <Popover>
                    <PopoverTrigger>
                      <IconButton
                        size={'xs'}
                        colorScheme='blue'
                        icon={<FaFilter />}
                        variant={'outline'}
                      />
                    </PopoverTrigger>
                    <Portal>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody className='mt-6 stocksTable flex flex-col gap-4'>
                          <Input
                            placeholder='Nume produs'
                            name='productNameFilter'
                            value={productNameFilter}
                            onChange={(e) => {
                              setProductNameFilter(e.target.value);
                            }}
                          />
                        </PopoverBody>
                      </PopoverContent>
                    </Portal>
                  </Popover>
                  {productNameFilter && (
                    <IconButton
                      size={'xs'}
                      colorScheme='red'
                      icon={<FaPlus className='rotate-45' />}
                      onClick={() => {
                        setProductNameFilter('');
                      }}
                    />
                  )}
                </span>
              </Th>
              <Th>Stoc disponibil</Th>
              <Th>Stoc in asteptare</Th>
              <Th>Optiuni</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentItems?.map((st) => {
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
