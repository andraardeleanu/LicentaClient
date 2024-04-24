import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { getBills } from '../../utils/apiCalls';
import { ResultsLoading } from '../../components/ResultsLoading';
import { useDispatch, useSelector } from 'react-redux';
import { setNeedBillsCall } from '../../slices/userSlice';
import { BillsTabContent } from './BillsTabContent';

export const BillsView = ({
    
}) => {
    const [cookies] = useCookies();
    const dispatch = useDispatch();
    const needBillsCall = useSelector (state => state.user.needBillsCall);
    const [billsLoading, setBillsLoading] = useState(false);
    const [bills, setBills] = useState([]);
    const { data } = useSelector((store) => store.user);
    console.log("dsadas", data);
    useEffect(() => {
        (async () => {
            try {
                if (needBillsCall) {
                    setBillsLoading(true);                    
                    await getBills(cookies.userToken).then(
                        (res) => {
                            setBillsLoading(false);
                            setBills(res);
                        }
                    );
                    dispatch(setNeedBillsCall(false));                   
                }
            } catch (err) {
                return err;                
            }
        })();
    }, [bills, cookies.userToken, needBillsCall]);

    return (
        <>
            {billsLoading ? (
                <ResultsLoading />
            ) : bills.length > 0 ? (
                <BillsTabContent
                bills={bills}
                />
            ) : (
                <>Nu se gasesc facturi generate.</>
            )}
        </>
    );
};
