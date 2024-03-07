import {
  Button,
  Divider,
  Flex,
  Icon,
  Wrap,
  WrapItem
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { getWorkPoints } from '../utils/apiCalls';
import { ResultsLoading } from '../components/ResultsLoading';
import { WorkPointBox } from '../components/WorkPointBox';
import { FaPlusCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { ProductsPage } from '../pages/ProductsPage';

export const WorkPointsFragment = () => {
  const [cookies] = useCookies();
  const [needWorkPointsCall, setNeedWorkPointCall] = useState(true);
  const [workpointsLoading, setWorkPointsLoading] = useState(false);
  const [workpoints, setWorkPoints] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  useEffect(() => {
    (async () => {
      try {
        if (needWorkPointsCall) {
          setWorkPointsLoading(true);
          await getWorkPoints(cookies.userToken).then((res) => {
            setWorkPointsLoading(false);
            setWorkPoints(res);
          });
          setNeedWorkPointCall(false);
        }
      } catch (err) {
        return err;
      }
    })();
  }, [workpoints, cookies.userToken, needWorkPointsCall]);

  const handleTabsChange = (index) => {
    setTabIndex(index)
  }

  return (
    <>
      <Tabs index={tabIndex} onChange={handleTabsChange}>
        <TabList>
          <Tab>Puncte de lucru</Tab>
          <Tab>Comenzile mele</Tab>
          <Tab>Produse</Tab>
          <Tab>Stoc</Tab>
          <Tab>Facturi</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex justify={'space-between'}>
            </Flex>
            <Link to='/addWorkPoint'>
              <Button
                leftIcon={<Icon as={FaPlusCircle} />}
                colorScheme='blue'
              >
                Creeaza punct de lucru
              </Button>
            </Link>
            <Divider my={4} />
            {workpointsLoading && <ResultsLoading />}
            <Wrap spacing={0}>
              {workpoints.length > 0 ? (
                workpoints.map((workpoint, index) => (
                  <WrapItem
                    className='w-full md:w-1/3'
                    key={index}
                  >
                    <WorkPointBox
                      name={workpoint?.name}
                      address={workpoint?.address}
                      author={workpoint?.author}
                      dateUpdated={workpoint?.dateUpdated}
                    />
                  </WrapItem>
                ))
              ) : (
                <>Nu s-au gasit puncte de lucru.</>
              )}
            </Wrap>
          </TabPanel>
          <TabPanel>         
          </TabPanel>
         
          <TabPanel>
          <ProductsPage>            
          </ProductsPage>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
