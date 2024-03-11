import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useState } from 'react';
import { CompaniesTabContent } from './CompaniesTabContent';
import { ProductsTabContent } from './ProductsTabContent';

export const HomepageTabsFragment = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

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
      </TabList>
      <TabPanels>
        <TabPanel>
          <CompaniesTabContent />
        </TabPanel>
        <TabPanel>
          <p>Yeah yeah. What's up?</p>
        </TabPanel>
        <TabPanel>
          <ProductsTabContent />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
