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
import { updateCompany } from '../../utils/apiCalls';
import { useDispatch } from 'react-redux';
import { setNeedCompaniesCall } from '../../slices/userSlice';

export const UpdateCompanyFragment = ({
    companyId,
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
                id: companyId,            
                name: ''
            }}

            onSubmit={async (values) => {
                setLoading(true);
                const response = await updateCompany(values, cookies.userToken);
                setLoading(false);
                if (response.status === 1) {
                    setUserError(response.message);
                } else {
                    toast({
                        title: 'Compania a fost actualizata cu succes.',
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                        position: 'top'
                    });
                    dispatch(setNeedCompaniesCall(true));
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
                            placeholder='Noul nume al companiei'
                            onChange={handleChange}
                            value={values.name}
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
