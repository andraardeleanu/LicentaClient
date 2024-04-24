import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useState } from 'react';
import { CompaniesTabContent } from '././CompanyFragments/CompaniesTabContent';
import { ProductsTabContent } from '././ProductFragments/ProductsTabContent';
import { ADMIN_RANK, MANAGER_RANK } from '../utils/constants';
import { useSelector } from 'react-redux';
import { WorkPointsTabContent } from './WorkpointFragments/WorkPointsTabContent';
import { ProductsView } from './ProductFragments/ProductsView';
import { OrdersTabContent } from './OrderFragments/OrdersTabContent';
import { OrdersView } from './OrderFragments/OrdersView';
import { CustomersTabContent } from './CustomerFragments/CustomersTabContent';
import { StocksView } from './StockFragments/StocksView';
import { BillsView } from './BillFragments/BillsView';

export const HomepageTabsFragment = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabsChange = (index) => {
    setTabIndex(index);
  };
  const { data } = useSelector((store) => store.user);
  return (
    <Tabs
      index={tabIndex}
      onChange={handleTabsChange}
    >
      <TabList>
        {data?.roles[0] === ADMIN_RANK && <Tab>Companii</Tab>}
        {data?.roles[0] === MANAGER_RANK && <Tab>Puncte de lucru</Tab>}
        {data?.roles[0] === ADMIN_RANK && <Tab>Comenzi</Tab>}
        {data?.roles[0] === MANAGER_RANK && <Tab>Comenzile mele</Tab>}
        <Tab>Produse</Tab>
        {data?.roles[0] === ADMIN_RANK && <Tab>Stoc</Tab>}
        {data?.roles[0] === MANAGER_RANK && <Tab>Facturile mele</Tab>}
        {data?.roles[0] === ADMIN_RANK && <Tab>Clienti</Tab>}
        {data?.roles[0] === ADMIN_RANK && <Tab>Facturi</Tab>}
      </TabList>
      <TabPanels>
        <TabPanel>
          {data?.roles[0] === ADMIN_RANK && <CompaniesTabContent />}
          {data?.roles[0] === MANAGER_RANK && <WorkPointsTabContent />}
        </TabPanel>
        <TabPanel>
          {data?.roles[0] === ADMIN_RANK && <OrdersView />}
          {data?.roles[0] === MANAGER_RANK && <OrdersTabContent />}
        </TabPanel>
        <TabPanel>
          {data?.roles[0] === ADMIN_RANK && <ProductsTabContent />}
          {data?.roles[0] === MANAGER_RANK && <ProductsView />}
        </TabPanel>
        <TabPanel>
          {data?.roles[0] === ADMIN_RANK && <StocksView />}
          {data?.roles[0] === MANAGER_RANK && <BillsView />}
        </TabPanel>
        <TabPanel>
          {data?.roles[0] === ADMIN_RANK && <CustomersTabContent />}
        </TabPanel>
        <TabPanel>
          {data?.roles[0] === ADMIN_RANK && <BillsView />}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};