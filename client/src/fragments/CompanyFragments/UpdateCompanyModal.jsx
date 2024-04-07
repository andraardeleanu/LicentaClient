import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay
} from '@chakra-ui/react';
import { UpdateCompanyFragment } from './UpdateCompanyFragment';
import { useEffect, useState } from 'react';

export const UpdateCompanyModal = ({
    isOpen,
    onClose,
    companyId
}) => {
    const [needCompanyCall, setNeedCompanyCall] = useState(false);

    useEffect(() => {
        if (companyId) {
            setNeedCompanyCall(true);
        }
    }, [companyId]);

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
                    <ModalHeader>Seteaza noul nume al companiei</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={12}>
                        <UpdateCompanyFragment
                            companyId={companyId}
                            onClose={onClose}
                        />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};
