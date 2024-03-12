import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useState } from 'react';
import { CompaniesTabContent } from '././CompanyFragments/CompaniesTabContent';
import { ProductsTabContent } from '././ProductFragments/ProductsTabContent';
import { UploadOrderFragment } from '././OrderFragments/UploadOrderFragment';

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
          <UploadOrderFragment />
        </TabPanel>
        <TabPanel>
          <ProductsTabContent />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
