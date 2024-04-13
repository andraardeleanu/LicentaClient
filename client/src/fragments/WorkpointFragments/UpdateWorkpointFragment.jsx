import {
    Alert,
    AlertIcon,
    AlertTitle,
    Button,
    Input,
    Stack,
    useToast
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { updateWorkpoint } from '../../utils/apiCalls';
import { useDispatch } from 'react-redux';
import { setNeedWorkPointsCall } from '../../slices/userSlice';

export const UpdateWorkpointFragment = ({
    workpoint,
    onClose
}) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [userError, setUserError] = useState('');
    const [cookies] = useCookies();
    const toast = useToast();
    const dispatch = useDispatch();

    return (
        <Formik
            initialValues={{
                id: workpoint.id,            
                name: workpoint.name,
                address: workpoint.address
            }}

            onSubmit={async (values) => {
                setLoading(true);
                const response = await updateWorkpoint(values, cookies.userToken);
                setLoading(false);
                if (response.status === 1) {
                    setUserError(response.message);
                } else {
                    toast({
                        title: 'Punctul de lucru a fost actualizat cu succes.',
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                        position: 'top'
                    });
                    dispatch(setNeedWorkPointsCall(true));
                    navigate('/');
                    onClose()
                }
            }}
        >
            {({ handleSubmit, handleChange, values }) => (
                <Form
                    onSubmit={
                        handleSubmit
                    }
                    onChange={() => {
                        setUserError('');
                    }}
                >
                    <Stack
                        spacing={4}
                        className='mt-6'
                    >
                        <Input
                            id='name'
                            name='name'
                            placeholder='Nume punct de lucru'
                            onChange={handleChange}
                            value={values.name}
                        />
                        <Input
                            id='address'
                            name='address'
                            placeholder='Adresa'
                            onChange={handleChange}
                            value={values.address}
                        />
                        {userError && (
                            <Alert status='error'>
                                <AlertIcon />
                                <AlertTitle>{userError}</AlertTitle>
                            </Alert>
                        )}
                        <Button
                            colorScheme='blue'
                            onClick={() => {
                                handleSubmit()
                            }}
                            isLoading={loading}
                        >
                            Actualizeaza
                        </Button>
                        <Button
                            onClick={onClose}
                            disabled={loading}
                        >
                            Renunta
                        </Button>
                    </Stack>
                </Form>
            )}
        </Formik>
    );
};
