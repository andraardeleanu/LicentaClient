import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Input,
  Stack,
  useToast,
  FormControl,
  FormLabel
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { addCompany } from '../../utils/apiCalls';
import { useDispatch } from 'react-redux';
import { setNeedCompaniesCall } from '../../slices/userSlice';

export const AddCompanyFragment = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [userError, setUserError] = useState('');
  const [cookies] = useCookies();
  const toast = useToast();
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        name: '',
        cui: ''
      }}
      onSubmit={async (values) => {
        setLoading(true);
        const response = await addCompany(values, cookies.userToken);
        console.log('respo', response);
        setLoading(false);
        if (response.status === 1) {
          setUserError(response.message);
        } else {
          toast({
            title: 'Compania a fost creata cu succes!',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top'
          });
          dispatch(setNeedCompaniesCall(true));
          navigate('/');
          onClose();
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
            <FormControl isRequired>
              <FormLabel>Nume companie</FormLabel>
              <Input
                id='name'
                name='name'
                placeholder='Numele companiei'
                onChange={handleChange}
                value={values.name}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>CUI</FormLabel>
              <Input
                id='cui'
                name='cui'
                placeholder='CUI'
                onChange={handleChange}
                value={values.cui}
              />
            </FormControl>
            {userError && (
              <Alert status='error'>
                <AlertIcon />
                <AlertTitle>{userError}</AlertTitle>
              </Alert>
            )}
            <Button
              colorScheme='blue'
              onClick={() => {
                handleSubmit();
              }}
              isLoading={loading}
            >
              Adauga
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
