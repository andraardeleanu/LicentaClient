import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { getUsers } from '../../utils/apiCalls';
import { ResultsLoading } from '../../components/ResultsLoading';
import { CustomersTable } from './CustomersTable';
import { useDispatch, useSelector } from 'react-redux';
import { setNeedCustomersCall } from '../../slices/userSlice';

export const CustomersView = () => {
  const [cookies] = useCookies();
  const dispatch = useDispatch();
  const needCustomersCall = useSelector(
    (state) => state.user.needCustomersCall
  );
  const [customersLoading, setCustomersLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        if (needCustomersCall) {
          setCustomersLoading(true);
          await getUsers(cookies.userToken).then((res) => {
            setCustomersLoading(false);
            setCustomers(res);
          });
          dispatch(setNeedCustomersCall(false));
        }
      } catch (err) {
        return err;
      }
    })();
  }, [customers, cookies.userToken, needCustomersCall, dispatch]);

  return (
    <>
      {customersLoading ? (
        <ResultsLoading />
      ) : customers.length > 0 ? (
        <CustomersTable customers={customers} />
      ) : (
        <>Nu se gasesc clienti.</>
      )}
    </>
  );
};
