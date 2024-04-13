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
import { updateCustomer } from '../../utils/apiCalls';
import { useDispatch } from 'react-redux';
import { setNeedCustomersCall } from '../../slices/userSlice';

export const UpdateCustomerFragment = ({
    customer,
    onClose,    
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
                id: customer.id,            
                firstName: customer.firstName,
                lastName: customer.lastName,
                username: customer.username,
                email: customer.email
            }}

            onSubmit={async (values) => {
                setLoading(true);
                const response = await updateCustomer(values, cookies.userToken);
                setLoading(false);
                if (response.status === 1) {
                    setUserError(response.message);
                } else {
                    toast({
                        title: 'Clientul a fost actualizat cu succes.',
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                        position: 'top'
                    });
                    dispatch(setNeedCustomersCall(true));
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
                            id='firstName'
                            name='firstName'
                            placeholder='Prenume'
                            onChange={handleChange}
                            value={values.firstName}
                        />
                        <Input
                            id='lastName'
                            name='lastName'
                            placeholder='Nume'
                            onChange={handleChange}
                            value={values.lastName}
                        />
                        <Input
                            id='username'
                            name='username'
                            placeholder='Username'
                            onChange={handleChange}
                            value={values.username}
                        />
                        <Input
                            id='email'
                            name='email'
                            placeholder='E-mail'
                            onChange={handleChange}
                            value={values.email}
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
