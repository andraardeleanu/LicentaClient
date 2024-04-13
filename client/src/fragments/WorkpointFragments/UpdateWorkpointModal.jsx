import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay
} from '@chakra-ui/react';
import { UpdateWorkpointFragment } from './UpdateWorkpointFragment';
import { useEffect, useState } from 'react';

export const UpdateWorkpointModal = ({
    isOpen,
    onClose,
    workpoint
}) => {
    const [needWorkpointCall, setNeedWorkpointsCall] = useState(false);

    useEffect(() => {
        if (workpoint) {
            setNeedWorkpointsCall(true);
        }
    }, [workpoint]);

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
                    <ModalHeader>Seteaza noile date ale punctului de lucru</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={12}>
                        <UpdateWorkpointFragment
                            workpoint={workpoint}
                            onClose={onClose}
                        />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};
