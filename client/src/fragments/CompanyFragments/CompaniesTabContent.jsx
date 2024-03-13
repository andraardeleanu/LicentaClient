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
import { getCompanies } from '../../utils/apiCalls';
import { AddCompanyModal } from './AddCompanyModal';
import { CompanyWorkpointsModal } from './CompanyWorkpointsModal';

export const CompaniesTabContent = () => {
  const [cookies] = useCookies();
  const [needCompaniesCall, setNeedCompaniesCall] = useState(true);
  const [companiesLoading, setCompaniesLoading] = useState(false);
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
        if (needCompaniesCall) {
          setCompaniesLoading(true);
          await getCompanies(cookies.userToken).then((res) => {
            setCompaniesLoading(false);
            setCompanies(res);
          });
          setNeedCompaniesCall(false);
        }
      } catch (err) {
        return err;
      }
    })();
  }, [companies, cookies.userToken, needCompaniesCall]);

  return (
    <>
      <Divider my={4} />
      <Button
        leftIcon={<Icon as={FaPlusCircle} />}
        colorScheme='blue'
        onClick={onAddCompanyModalOpen}
      >
        Adauga companie
      </Button>
      <Divider my={4} />
      {companiesLoading && <ResultsLoading />}
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
          <>Nu s-au gasit companii.</>
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