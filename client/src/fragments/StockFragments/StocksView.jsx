import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { getStocks } from '../../utils/apiCalls';
import { ResultsLoading } from '../../components/ResultsLoading';
import { StocksTable } from './StocksTable';
import { useDispatch, useSelector } from 'react-redux';
import { setNeedStocksCall } from '../../slices/userSlice';

export const StocksView = ({ }) => {
  const [cookies] = useCookies();
  const dispatch = useDispatch();
  const needStocksCall = useSelector((state) => state.user.needStocksCall);
  const [stocksLoading, setStocksLoading] = useState(false);
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        if (needStocksCall) {
          setStocksLoading(true);
          await getStocks(cookies.userToken).then((res) => {
            setStocksLoading(false);
            setStocks(res);
          });
          dispatch(setNeedStocksCall(false));
        }
      } catch (err) {
        return err;
      }
    })();
  }, [stocks, cookies.userToken, needStocksCall]);

  return (
    <>
      {stocksLoading ? (
                <ResultsLoading />
            ) : (
                <>
                    <StocksTable
                        stocks={stocks}
                        setStocks={setStocks}
                    />
                    {stocks?.length === 0 && (
                        <div className='flex justify-center'>Nu s-au gasit rezultate.</div>
                    )}
                </>
            )}
    </>
  );
};
