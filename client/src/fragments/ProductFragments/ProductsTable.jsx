import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Input,
  Td,
  Th,
  Thead,
  Tr,
  Divider,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Portal,
  useDisclosure,
  IconButton,
  Select
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import { StockDetailsModal } from './StockDetailsModal';
import { getProducts } from '../../utils/apiCalls';
import { useCookies } from 'react-cookie';
import { FaFilter, FaPlus } from 'react-icons/fa';

export const ProductsTable = ({
  products,
  setProducts
}) => {
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 10;
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / 10);
  const [selectedProductId, setSelectedProductId] = useState();
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 10) % products.length;
    setItemOffset(newOffset);
  };
  const [cookies] = useCookies();
  const {
    isOpen: isStockDetailsModalOpen,
    onOpen: onStockDetailsModalOpen,
    onClose: onStockDetailsModalClose
  } = useDisclosure();

  const [productNameFilter, setProductNameFilter] = useState();
  const [sortByPrice, setSortByPrice] = useState('');

  useEffect(() => {
    (async () => {
      try {
        await getProducts(cookies.userToken, { name: productNameFilter }).then(
          (res) => {
            const sortedProducts = sortProductsByPrice(res, sortByPrice);
            setProducts(sortedProducts);
          }
        );
      } catch (err) {
        return err;
      }
    })();
  }, [productNameFilter, sortByPrice]);

  const sortProductsByPrice = (products, sortByPrice) => {
    if (sortByPrice === 'asc') {
      return [...products].sort((a, b) => a.price - b.price);
    } else if (sortByPrice === 'desc') {
      return [...products].sort((a, b) => b.price - a.price);
    } else {
      return products;
    }
  };

  return (
    <>
      <TableContainer>
        <Table
          variant='striped'
          colorScheme='blackAlpha'
        >
          <Thead>
            <Tr>
              <Th className='flex items-center justify-between'>
                <span>Nume produs</span>
                <span className='flex gap-2'>
                  <Popover>
                    <PopoverTrigger>
                      <IconButton
                        size={'xs'}
                        colorScheme='blue'
                        icon={<FaFilter />}
                      />
                    </PopoverTrigger>
                    <Portal>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody className='mt-6 flex flex-col gap-4'>
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
              <Th>
                <span className='flex items-center justify-between'>
                  Pret
                  <Select
                    value={sortByPrice}
                    onChange={(e) => setSortByPrice(e.target.value)}
                    placeholder='Sortare'
                    size='sm'
                    width='130px'                    
                  >
                    <option value='asc'>Crescator</option>
                    <option value='desc'>Descrescator</option>
                  </Select>
                </span>
              </Th>
              <Th>Creat la</Th>
              <Th>Optiuni</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentItems.map((pd) => {
              return (
                <Tr key={pd.id}>
                  <Td>{pd.name}</Td>
                  <Td>{pd.price} RON</Td>
                  <Td>
                    {moment(pd.dateUpdated).format('DD.MM.yyyy HH:mm:ss')}
                  </Td>
                  <Td>
                    <Button
                      colorScheme='teal'
                      variant='ghost'
                      size='sm'
                      onClick={() => {
                        setSelectedProductId(pd?.id);
                        onStockDetailsModalOpen();
                      }}
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

      <StockDetailsModal
        isOpen={isStockDetailsModalOpen}
        onClose={onStockDetailsModalClose}
        productId={selectedProductId}
      />
    </>
  );
};
