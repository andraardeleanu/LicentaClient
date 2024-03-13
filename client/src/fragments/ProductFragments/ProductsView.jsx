import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { getProducts } from '../../utils/apiCalls';
import { ResultsLoading } from '../../components/ResultsLoading';
import { ProductsTable } from './ProductsTable';

export const ProductsView = ({
    
}) => {
    const [cookies] = useCookies();
    const [needProductsCall, setNeedProductsCall] = useState(true);
    const [productsLoading, setProductsLoading] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setNeedProductsCall(true);
    });

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
                    setNeedProductsCall(false);
                }
            } catch (err) {
                return err;
            }
        })();
    }, [products, cookies.userToken, setNeedProductsCall]);

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
