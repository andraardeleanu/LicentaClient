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
import { addProduct } from '../../utils/apiCalls';

export const AddProductFragment = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [userError, setUserError] = useState('');
  const [cookies] = useCookies();
  const toast = useToast();

  return (
    <Formik
      initialValues={{
        name: '',
        price: ''
      }}
      onSubmit={async (values) => {
        setLoading(true);
        const response = await addProduct(values, cookies.userToken);
        setLoading(false);
        if (response.errorMessage) {
          setUserError(response.errorMessage);
        } else {
          toast({
            title: 'Produsul a fost adaugat cu succes!',
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
              placeholder='Nume produs'
              onChange={handleChange}
              value={values.name}
            />
            <Input
              id='price'
              name='price'
              placeholder='Pret'
              onChange={handleChange}
              value={values.price}
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
