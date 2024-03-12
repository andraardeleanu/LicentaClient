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
import { CompanyBox } from '../../components/CompanyBox';
import { getProducts } from '../../utils/apiCalls';
import { AddCompanyModal } from '../CompanyFragments/AddCompanyModal';
import { CompanyWorkpointsModal } from '../CompanyFragments/CompanyWorkpointsModal';

export const ProductsTabContent = () => {
  const [cookies] = useCookies();
  const [needProductsCall, setNeedProductsCall] = useState(true);
  const [productsLoading, setProductsLoading] = useState(false);
  const {
    isOpen: isAddCompanyModalOpen,
    onOpen: onAddCompanyModalOpen,
    onClose: onAddCompanyModalClose
  } = useDisclosure();

  const {
    isOpen: isCompanyWorkpointsModalOpen,
    onOpen: onCompanyWorkpointsModalOpen,
    onClose: onCompanyWorkpointsModalClose
  } = useDisclosure();

  const [companies, setCompanies] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState();
  const [selectedCompanyName, setSelectedCompanyName] = useState();

  useEffect(() => {
    (async () => {
      try {
        if (needProductsCall) {
          setProductsLoading(true);
          await getProducts(cookies.userToken).then((res) => {
            console.log('res: ', res);
            setProductsLoading(false);
            setCompanies(res);
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
        onClick={onAddCompanyModalOpen}
      >
        Adauga produs
      </Button>
      <Divider my={4} />
      {productsLoading && <ResultsLoading />}
      <Wrap spacing={0}>
        {companies.length > 0 ? (
          companies.map((company, index) => (
            <WrapItem
              className='w-full md:w-1/3'
              key={index}
            >
              <CompanyBox
                name={company?.name}
                cui={company?.cui}
                author={company?.author}
                dateUpdated={company?.dateUpdated}
                onOptionsClick={() => {
                  setSelectedCompanyId(company?.id);
                  setSelectedCompanyName(company?.name);
                  onCompanyWorkpointsModalOpen();
                }}
              />
            </WrapItem>
          ))
        ) : (
          <>Nu s-au gasit produse.</>
        )}
      </Wrap>

      <AddCompanyModal
        isOpen={isAddCompanyModalOpen}
        onClose={onAddCompanyModalClose}
      />
      <CompanyWorkpointsModal
        isOpen={isCompanyWorkpointsModalOpen}
        onClose={onCompanyWorkpointsModalClose}
        companyId={selectedCompanyId}
        companyName={selectedCompanyName}
      />
    </>
  );
};
