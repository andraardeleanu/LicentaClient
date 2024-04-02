import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { getOrders } from '../../utils/apiCalls';
import { ResultsLoading } from '../../components/ResultsLoading';
import { OrdersTable } from './OrdersTable';
import { setNeedOrdersCall } from '../../slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export const OrdersView = () => {
  const [cookies] = useCookies();
  const dispatch = useDispatch();
  const needOrdersCall = useSelector((state) => state.user.needOrdersCall);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        if (needOrdersCall) {
          setOrdersLoading(true);
          await getOrders(cookies.userToken).then((res) => {
            setOrdersLoading(false);
            setOrders(res);
          });
          dispatch(setNeedOrdersCall(false));
        }
      } catch (err) {
        return err;
      }
    })();
  }, [orders, cookies.userToken, needOrdersCall, dispatch]);

  return (
    <>
      {ordersLoading ? (
        <ResultsLoading />
      ) : orders.length > 0 ? (
        <OrdersTable
          orders={orders}
          setOrders={setOrders}
          setOrdersLoading={setOrdersLoading}
        />
      ) : (
        <>Nu se gasesc comenzi.</>
      )}
    </>
  );
};
