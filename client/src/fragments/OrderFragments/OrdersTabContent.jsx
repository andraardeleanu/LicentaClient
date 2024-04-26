import { Divider, Heading } from '@chakra-ui/react';
import { UploadOrderFragment } from './UploadOrderFragment';
import { OrdersView } from './OrdersView';

export const OrdersTabContent = () => {
  return (
    <>
      <UploadOrderFragment />
      <Divider my={4} />
      <Heading>Comenzile mele</Heading>
      <OrdersView />
    </>
  );
};
