import {
  Button,
  Divider,
  Icon,
  Wrap,
  WrapItem,
  useDisclosure,
  Input,
} from '@chakra-ui/react';
import { FaPlusCircle } from 'react-icons/fa';
import { ResultsLoading } from '../../components/ResultsLoading';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { CompanyBox } from '../../components/CompanyBox';
import { getCompanies } from '../../utils/apiCalls';
import { AddCompanyModal } from './AddCompanyModal';
import { CompanyWorkpointsModal } from './CompanyWorkpointsModal';
import { UpdateCompanyModal } from './UpdateCompanyModal';
import { setNeedCompaniesCall } from '../../slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export const CompaniesTabContent = () => {
  const [cookies] = useCookies();
  const dispatch = useDispatch();
  const needCompaniesCall = useSelector(
    (state) => state.user.needCompaniesCall
  );
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

  const {
    isOpen: isUpdateCompanyModalOpen,
    onOpen: onUpdateCompanyModalOpen,
    onClose: onUpdateCompanyModalClose
  } = useDisclosure();

  const [companies, setCompanies] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState();
  const [selectedCompanyName, setSelectedCompanyName] = useState('');
  const [companyNameFilter, setCompanyNameFilter] = useState('');

  useEffect(() => {
    (async () => {
      try {
        if (needCompaniesCall) {
          setCompaniesLoading(true);
          await getCompanies(cookies.userToken).then((res) => {
            setCompaniesLoading(false);
            setCompanies(res);
          });
          dispatch(setNeedCompaniesCall(false));
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [cookies.userToken, needCompaniesCall, dispatch]);

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(companyNameFilter.toLowerCase())
  );

  return (
    <>
      <Divider my={4} />
      <Input
        placeholder='Cauta dupa nume companie...'
        value={companyNameFilter}
        onChange={(e) => setCompanyNameFilter(e.target.value)}
      />
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
        {filteredCompanies.length > 0 ? (
          filteredCompanies.map((company, index) => (
            <WrapItem className='w-full md:w-1/3' key={index}>
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
                onUpdateClick={() => {
                  setSelectedCompanyId(company?.id);
                  onUpdateCompanyModalOpen();
                }}
              />
            </WrapItem>
          ))
        ) : (
          <p>Nu s-au gasit companii.</p>
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
      <UpdateCompanyModal
        isOpen={isUpdateCompanyModalOpen}
        onClose={onUpdateCompanyModalClose}
        companyId={selectedCompanyId}
      />
    </>
  );
};
