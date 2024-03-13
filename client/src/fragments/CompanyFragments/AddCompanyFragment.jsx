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
import { addCompany } from '../../utils/apiCalls';

export const AddCompanyFragment = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [userError, setUserError] = useState('');
  const [cookies] = useCookies();
  const toast = useToast();

  return (
    <Formik
      initialValues={{
        name: '',
        cui: ''
      }}
      onSubmit={async (values) => {
        setLoading(true);
        const response = await addCompany(values, cookies.userToken);
        setLoading(false);
        if (response.errorMessage) {
          setUserError(response.errorMessage);
        } else {
          toast({
            title: 'Compania a fost creata cu succes!',
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
              placeholder='Numele companiei'
              onChange={handleChange}
              value={values.name}
            />
            <Input
              id='cui'
              name='cui'
              placeholder='CUI'
              onChange={handleChange}
              value={values.cui}
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
                onClose()
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
