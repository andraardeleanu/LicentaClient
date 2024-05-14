import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { getBills } from '../../utils/apiCalls';
import { ResultsLoading } from '../../components/ResultsLoading';
import { useDispatch, useSelector } from 'react-redux';
import { setNeedBillsCall } from '../../slices/userSlice';
import { BillsTabContent } from './BillsTabContent';

export const BillsView = ({ needBillsRefresh, setNeedBillsRefresh }) => {
  const [cookies] = useCookies();
  const dispatch = useDispatch();
  const needBillsCall = useSelector((state) => state.user.needBillsCall);
  const [billsLoading, setBillsLoading] = useState(false);
  const [bills, setBills] = useState([]);

  useEffect(() => {
    if (needBillsRefresh) {
      dispatch(setNeedBillsCall(true));
      setNeedBillsRefresh(false);
    }
  }, [dispatch, needBillsRefresh, setNeedBillsRefresh]);

  useEffect(() => {
    (async () => {
      try {        
        let myBills = [];
        if (needBillsCall) {
          console.log('nbc ', needBillsCall);
          setBillsLoading(true);
          await getBills(cookies.userToken).then((res) => {
            myBills = res;
            setBillsLoading(false);
          });
          setBills(myBills);
          dispatch(setNeedBillsCall(false));
        }
      } catch (err) {
        console.log('err: ', err);
        return err;
      }
    })();
  }, [bills, cookies.userToken, needBillsCall]);

  return (
    <>
      {billsLoading ? (
        <ResultsLoading />
      ) : bills?.length > 0 ? (
        <>
          <BillsTabContent bills={bills} />
        </>
      ) : (
        <>Nu se gasesc facturi generate.</>
      )}
    </>
  );
};
