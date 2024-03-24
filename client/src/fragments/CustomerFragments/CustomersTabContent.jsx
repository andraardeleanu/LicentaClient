import {
    Button,
    Divider,
    Icon,
    useDisclosure
} from '@chakra-ui/react';
import { FaPlusCircle } from 'react-icons/fa';
import { AddCustomerModal } from './AddCustomerModal';
import { CustomersView } from './CustomersView';

export const CustomersTabContent = () => {
    const {
      isOpen: isAddCustomerModalOpen,
      onOpen: onAddCustomerModalOpen,
      onClose: onAddCustomerModalClose
    } = useDisclosure();
  
    return (
      <>
        <Divider my={4} />
        <Button
          leftIcon={<Icon as={FaPlusCircle} />}
          colorScheme='blue'
          onClick={onAddCustomerModalOpen}
        >
          Adauga client nou
        </Button>
        <Divider my={4} />
        <AddCustomerModal
          isOpen={isAddCustomerModalOpen}
          onClose={onAddCustomerModalClose}
        />
  
        <CustomersView />
      </>
    );
  };