import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { getProducts } from '../../utils/apiCalls';
import { ResultsLoading } from '../../components/ResultsLoading';
import { ProductsTable } from './ProductsTable';
import { useDispatch, useSelector } from 'react-redux';
import { setNeedProductsCall } from '../../slices/userSlice';

export const ProductsView = ({
    
}) => {
    const [cookies] = useCookies();
    const dispatch = useDispatch();
    const needProductsCall = useSelector (state => state.user.needProductsCall);
    const [productsLoading, setProductsLoading] = useState(false);
    const [products, setProducts] = useState([]);
/*
    useEffect(() => {
        setNeedProductsCall(true);
    });
*/
    useEffect(() => {
        (async () => {
            try {
                if (needProductsCall) {
                    setProductsLoading(true);
                    await getProducts(cookies.userToken).then(
                        (res) => {
                            setProductsLoading(false);
                            setProducts(res);
                        }
                    );
                    dispatch(setNeedProductsCall(false));
                }
            } catch (err) {
                return err;
            }
        })();
    }, [products, cookies.userToken, needProductsCall]);

    return (
        <>
            {productsLoading ? (
                <ResultsLoading />
            ) : products.length > 0 ? (
                <ProductsTable
                    products={products}
                />
            ) : (
                <>Nu se gasesc produse.</>
            )}
        </>
    );
};
