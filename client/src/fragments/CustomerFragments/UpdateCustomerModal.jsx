import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay
} from '@chakra-ui/react';
import { UpdateCustomerFragment } from './UpdateCustomerFragment';
import { useEffect, useState } from 'react';

export const UpdateCustomerModal = ({
    isOpen,
    onClose,
    customer,   
}) => {
    const [needCustomersCall, setNeedCustomersCall] = useState(false);

    useEffect(() => {
        if (customer) {
            setNeedCustomersCall(true);
        }
    }, [customer]);

    return (
        <>
            <Modal
                closeOnOverlayClick={false}
                isOpen={isOpen}
                onClose={onClose}
                isCentered
                size={'xl'}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Actualizeaza datele pe care le doresti modificate</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={12}>
                        <UpdateCustomerFragment
                            customer={customer}
                            onClose={onClose}
                        />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};
