import {
  Button,
  Divider,
  Icon,
  Wrap,
  WrapItem,
  useDisclosure
} from '@chakra-ui/react';
import { FaPlusCircle } from 'react-icons/fa';
import { ResultsLoading } from '../../components/ResultsLoading';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { ProductBox } from '../../components/ProductBox';
import { getProducts } from '../../utils/apiCalls';
import { AddProductModal } from '../ProductFragments/AddProductModal';

export const ProductsTabContent = () => {
  const [cookies] = useCookies();
  const [needProductsCall, setNeedProductsCall] = useState(true);
  const [productsLoading, setProductsLoading] = useState(false);
  const {
    isOpen: isAddProductModalOpen,
    onOpen: onAddProductModalOpen,
    onClose: onAddProductModalClose
  } = useDisclosure();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        if (needProductsCall) {
          setProductsLoading(true);
          await getProducts(cookies.userToken).then((res) => {
            console.log('res: ', res);
            setProductsLoading(false);
            setProducts(res);
          });
          setNeedProductsCall(false);
        }
      } catch (err) {
        return err;
      }
    })();
  }, [cookies.userToken, needProductsCall]);

  return (
    <>
      <Button
        leftIcon={<Icon as={FaPlusCircle} />}
        colorScheme='blue'
        onClick={onAddProductModalOpen}
      >
        Adauga produs
      </Button>
      <Divider my={4} />
      {productsLoading && <ResultsLoading />}
      <Wrap spacing={0}>
        {products.length > 0 ? (
          products.map((product, index) => (
            <WrapItem
              className='w-full md:w-1/3'
              key={index}
            >
              <ProductBox
                name={product?.name}
                price={product?.price}
                author={product?.author}
                dateUpdated={product?.dateUpdated}
              />
            </WrapItem>
          ))
        ) : (
          <>Nu s-au gasit produse.</>
        )}
      </Wrap>

      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={onAddProductModalClose}
      />      
    </>
  );
};
