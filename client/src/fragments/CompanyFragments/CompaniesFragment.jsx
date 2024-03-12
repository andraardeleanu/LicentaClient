import {
  Button,
  Divider,
  Flex,
  Icon,
  Wrap,
  WrapItem,
  useDisclosure
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { getCompanies } from '../../utils/apiCalls';
import { ResultsLoading } from '../../components/ResultsLoading';
import { CompanyBox } from '../../components/CompanyBox';
import { FaPlusCircle } from 'react-icons/fa';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { AddCompanyModal } from './AddCompanyModal';
import { CompanyWorkpointsModal } from './CompanyWorkpointsModal';

export const CompaniesFragment = () => {
  const [cookies] = useCookies();
  const [needCompaniesCall, setNeedCompaniesCall] = useState(true);
  const [companiesLoading, setCompaniesLoading] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);

  const [selectedCompanyId, setSelectedCompanyId] = useState();
  const [selectedCompanyName, setSelectedCompanyName] = useState();

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

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  return (
    <>
      <Tabs
        index={tabIndex}
        onChange={handleTabsChange}
      >
        <TabList>
          <Tab>Companii</Tab>
          <Tab>Comenzi</Tab>
          <Tab>Produse</Tab>
          <Tab>Stoc</Tab>
          <Tab>Facturi</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex justify={'space-between'}></Flex>   
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
          </TabPanel>
          <TabPanel>
            <p>Yeah yeah. What's up?</p>
          </TabPanel>
          <TabPanel>
            <p>Oh, hello there.</p>
          </TabPanel>
        </TabPanels>
      </Tabs>

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
