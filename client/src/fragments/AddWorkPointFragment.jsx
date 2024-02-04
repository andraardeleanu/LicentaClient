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
import { addWorkPoint } from '../utils/apiCalls';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '../hooks/useAuth';
import { setUserCompanyData, setUserData } from '../slices/userSlice';
import { axiosAuthorizedGet } from '../utils/axiosFunctions';

export const AddWorkPointFragment = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [userError, setUserError] = useState('');
    const [cookies] = useCookies();
    const toast = useToast();
    const { data } = useSelector((state) => state.user);
    const [getFinished, setGetFinished] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { getUser } = useAuth(cookies.userToken);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUserData = async () => {
            if (!getFinished) {
                setLoading(true);
                await getUser().then(async (res) => {
                    setGetFinished(true);
                    setIsLoggedIn(res?.id !== undefined);
                    if (res?.id) {
                        dispatch(setUserData(res));
                        const companyRes = await axiosAuthorizedGet(
                            `/getCompanyById/${res?.companyId}`,
                            cookies.userToken
                        );

                        dispatch(setUserCompanyData(companyRes));
                    }
                });
            }
            setLoading(false);
        };

        fetchUserData();
        return () => { };
    }, [cookies.userToken, dispatch, getFinished, getUser]);

    return (
        <Card className='p-4'>
            <Formik
                initialValues={{
                    name: '',
                    address: '',
                    companyId: getUser.companyId
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