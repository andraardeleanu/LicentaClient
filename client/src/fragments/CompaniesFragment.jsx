import { Divider, Heading, Wrap, WrapItem } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { getCompanies } from '../utils/apiCalls';
import { ResultsLoading } from '../components/ResultsLoading';
import { CompanyBox } from '../components/CompanyBox';

export const CompaniesFragment = () => {
  const [cookies] = useCookies();
  const [needCompaniesCall, setNeedCompaniesCall] = useState(true);
  const [companiesLoading, setCompaniesLoading] = useState(false);
  const [companies, setCompanies] = useState([]);
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
      <Heading size={'lg'}>Companii</Heading>
      <Divider my={4} />
      {companiesLoading && <ResultsLoading />}
      <Wrap>
        {companies.length > 0 ? (
          companies.map((company, index) => (
            <WrapItem
              className='w-1/3'
              key={index}
            >
              <CompanyBox
                name={company?.name}
                cui={company?.cui}
                author={company?.author}
                dateUpdated={company?.dateUpdated}
              />
            </WrapItem>
          ))
        ) : (
          <>no companies</>
        )}
      </Wrap>
    </>
  );
};
