import {
    Button,
    Divider,
    Icon,
    Wrap,
    Heading,
    useDisclosure
} from '@chakra-ui/react';
import { OrdersView } from './OrdersView';
import { UploadOrderFragment } from './UploadOrderFragment';

export const OrdersTabContent = () => {
    
    return (
        <>
            <UploadOrderFragment></UploadOrderFragment>
            <Divider my={4} />
            <Heading>
                Comenzile mele
            </Heading>
            <OrdersView></OrdersView>           
        </>
    );
};
