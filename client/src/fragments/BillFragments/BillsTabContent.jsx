import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Divider,
  Button
} from '@chakra-ui/react';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { getBills } from '../../utils/apiCalls';
import { setNeedBillsCall } from '../../slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export const BillsTabContent = ({ bills }) => {
  const navigate = useNavigate();
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 10;
  const currentItems = bills.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(bills.length / 10);

  const [cookies] = useCookies();
  const dispatch = useDispatch();
  const needBillsCall = useSelector((state) => state.user.needBillsCall);
  const [billsLoading, setBillsLoading] = useState(false);
  const [setBills] = useState();

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 10) % bills.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    (async () => {
      try {
        if (needBillsCall) {
          setBillsLoading(true);
          await getBills(cookies.userToken).then((res) => {
            setBillsLoading(false);
          });
          setBills(bills);
          dispatch(setNeedBillsCall(false));
        }
      } catch (err) {
        console.log('err: ', err);
        return err;
      }
    })();
  }, [setBills, cookies.userToken, needBillsCall]);

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
              <Th>Data generare factura</Th>
              <Th>Punct de lucru</Th>
              <Th>Companie</Th>
              <Th style={{ textAlign: 'center', width: '180px' }}>Optiuni</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentItems.map((bl, key) => {
              return (
                <Tr key={key}>
                  <Td>{bl.orderNo}</Td>
                  <Td>{bl.totalPrice} RON</Td>
                  <Td>{bl.dateCreated}</Td>
                  <Td>{bl.workpointName}</Td>
                  <Td>{bl.companyName}</Td>
                  <Td>
                    <Button
                      colorScheme='teal'
                      variant='ghost'
                      size='sm'
                      onClick={async () => {
                        console.log('bl.id ', bl);
                        window.open(`/downloadBill/${bl.id}`, '_blank');
                      }}
                    >
                      Descarca copie
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
