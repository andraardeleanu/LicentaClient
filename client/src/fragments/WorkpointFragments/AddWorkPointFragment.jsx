import {
    Alert,
    AlertIcon,
    AlertTitle,
    Button,
    Card,
    Input,
    Stack,
    useToast
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { addWorkPoint } from '../../utils/apiCalls';
import { useState } from 'react';
import {  useSelector } from 'react-redux';

export const AddWorkPointFragment = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [userError, setUserError] = useState('');
    const [cookies] = useCookies();
    const toast = useToast();
    const { data } = useSelector((state) => state.user);

    return (
        <Card className='p-4'>
            <Formik
                initialValues={{
                    name: '',
                    address: '',
                    companyId: data.companyId
                }}
                onSubmit={async (values) => {
                    setLoading(true);
                    const response = await addWorkPoint(values, cookies.userToken);
                    setLoading(false);
                    if (response.errorMessage) {
                        setUserError(response.errorMessage);
                    } else {
                        toast({
                            title: 'Punctul de lucru a fost adaugat.',
                            status: 'success',
                            duration: 5000,
                            isClosable: true,
                            position: 'top'
                        });
                        navigate('/');
                    }
                }}
            >
                {({ handleSubmit, handleChange, values }) => (
                    <Form
                        onSubmit={handleSubmit}
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
                                placeholder='Adresa punct de lucru'
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
                                onClick={handleSubmit}
                                isLoading={loading}
                            >
                                Adauga
                            </Button>
                            <Button
                                onClick={() => {
                                    navigate(-1);
                                }}
                                disabled={loading}
                            >
                                Renunta
                            </Button>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </Card>
    );
};