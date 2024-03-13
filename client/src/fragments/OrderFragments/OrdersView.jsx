import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { getOrders } from '../../utils/apiCalls';
import { ResultsLoading } from '../../components/ResultsLoading';
import { OrdersTable } from './OrdersTable';

export const OrdersView = ({
    
}) => {
    const [cookies] = useCookies();
    const [needOrdersCall, setNeedOrdersCall] = useState(true);
    const [ordersLoading, setOrdersLoading] = useState(false);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        setNeedOrdersCall(true);
    });

    useEffect(() => {
        (async () => {
            try {
                if (needOrdersCall) {
                    setOrdersLoading(true);
                    await getOrders(cookies.userToken).then(
                        (res) => {
                            setOrdersLoading(false);
                            setOrders(res);
                        }
                    );
                    setNeedOrdersCall(false);
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
                <OrdersTable
                    orders={orders}
                />
            ) : (
                <>Nu se gasesc comenzi.</>
            )}
        </>
    );
};
