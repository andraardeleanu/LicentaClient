import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    useDisclosure,
    useToast,
    Button
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { removeWorkpoint } from '../../utils/apiCalls';
import { setNeedWorkPointsCall } from '../../slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export const ConfirmationModal = ({
    isOpen,
    onClose,
    workpoint
}) => {
    const cancelRef = useRef();
    const [cookies] = useCookies();
    const dispatch = useDispatch();
    const toast = useToast();
    const navigate = useNavigate();
    const [setUserError] = useState('');
    const [loading, setLoading] = useState(false);
    const needWorkPointsCall = useSelector(
        (state) => state.user.needWorkPointsCall
    );

    const handleSubmit = async () => {
        setLoading(true);
        const response = await removeWorkpoint({id: workpoint}, cookies.userToken);
        setLoading(false);
        if (response.status === 1) {
            setUserError(response.message);
        } else {
            toast({
                title: 'Punctul de lucru a fost sters cu succes.',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top'
            });
            dispatch(setNeedWorkPointsCall(true));
            navigate('/');
            onClose();
        }
    };

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader
                        fontSize='lg'
                        fontWeight='bold'
                    >
                        Stergere punct de lucru
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Esti sigur ca vrei stergi acest punct de lucru?
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button
                            ref={cancelRef}
                            onClick={onClose}
                        >
                            Anuleaza
                        </Button>
                        <Button
                            colorScheme='red'
                            onClick={() => {
                                handleSubmit()
                            }}
                            isLoading={loading}
                        >
                            Sterge
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};