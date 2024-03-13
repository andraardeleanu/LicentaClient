import {
    Button,
    Divider,
    Icon,
    Wrap,
    Heading,
    useDisclosure
} from '@chakra-ui/react';
import { FaPlusCircle } from 'react-icons/fa';
import { ResultsLoading } from '../../components/ResultsLoading';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { AddOrderModal } from './AddOrderModal';
import { OrdersView } from './OrdersView';
import { UploadOrderFragment } from './UploadOrderFragment';

export const OrdersTabContent = () => {
    const {
        isOpen: isAddOrderModalOpen,
        onOpen: onAddOrderModalOpen,
        onClose: onAddOrderModalClose
    } = useDisclosure();

    return (
        <>
            <UploadOrderFragment></UploadOrderFragment>
            <Heading>
                Comenzile mele
            </Heading>
            <OrdersView></OrdersView>
        </>
    );
};
