import {
  Button,
  Divider,
  Icon,
  Wrap,
  WrapItem,
  useDisclosure
} from '@chakra-ui/react';
import { FaPlusCircle } from 'react-icons/fa';
import { AddProductModal } from '../ProductFragments/AddProductModal';
import { ProductsView } from './ProductsView';

export const ProductsTabContent = () => {
  const {
    isOpen: isAddProductModalOpen,
    onOpen: onAddProductModalOpen,
    onClose: onAddProductModalClose
  } = useDisclosure();

  return (
    <>
      <Divider my={4} />
      <Button
        leftIcon={<Icon as={FaPlusCircle} />}
        colorScheme='blue'
        onClick={onAddProductModalOpen}
      >
        Adauga produs
      </Button>
      <Divider my={4} />
      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={onAddProductModalClose}
      />

      <ProductsView />
    </>
  );
};
