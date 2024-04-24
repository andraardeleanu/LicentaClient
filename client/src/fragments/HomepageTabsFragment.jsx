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

  const AdminTabs = () => {
    return (
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
          <Tab>Clienti</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <CompaniesTabContent />
          </TabPanel>
          <TabPanel>
            <OrdersView />
          </TabPanel>
          <TabPanel>
            <ProductsTabContent />
          </TabPanel>
          <TabPanel>
            <StocksView />
          </TabPanel>
          <TabPanel>
            <BillsView />
          </TabPanel>
          <TabPanel>
            <CustomersTabContent />
          </TabPanel>
        </TabPanels>
      </Tabs>
    );
  };

  const ManagerTabs = () => {
    return (
      <Tabs
        index={tabIndex}
        onChange={handleTabsChange}
      >
        <TabList>
          <Tab>Puncte de lucru</Tab>
          <Tab>Comenzile mele</Tab>
          <Tab>Produse</Tab>
          <Tab>Facturile mele</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <WorkPointsTabContent />
          </TabPanel>
          <TabPanel>
            <OrdersTabContent />
          </TabPanel>
          <TabPanel>
            <ProductsView />
          </TabPanel>
          <TabPanel>
            <BillsView />
          </TabPanel>
        </TabPanels>
      </Tabs>
    );
  };

  return data?.roles[0] === ADMIN_RANK ? <AdminTabs /> : <ManagerTabs />;
};
