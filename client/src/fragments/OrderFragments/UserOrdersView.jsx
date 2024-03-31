import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { getOrdersByUserId } from '../../utils/apiCalls';
import { ResultsLoading } from '../../components/ResultsLoading';
import { OrdersTable } from './OrdersTable';
import { setNeedOrdersCall } from '../../slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export const UserOrdersView = () => {
  const { data } = useSelector((store) => store.user);
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
          await getOrdersByUserId(data.id, cookies.userToken).then((res) => {
            setOrdersLoading(false);
            setOrders(res);
          });
          dispatch(setNeedOrdersCall(false));
        }
      } catch (err) {
        return err;
      }
    })();
  }, [orders, cookies.userToken, setNeedOrdersCall]);

  return (
    <>
      {ordersLoading ? (
        <ResultsLoading />
      ) : orders.length > 0 ? (
        <OrdersTable orders={orders} />
      ) : (
        <>Nu se gasesc comenzi.</>
      )}
    </>
  );
};
