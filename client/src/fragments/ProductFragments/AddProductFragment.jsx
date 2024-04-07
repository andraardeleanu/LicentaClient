import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useToast
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../../utils/apiCalls';
import { useDispatch } from 'react-redux';
import { setNeedProductsCall } from '../../slices/userSlice';

export const AddProductFragment = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [userError, setUserError] = useState('');
  const [cookies] = useCookies();
  const toast = useToast();
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    if (parseInt(values.availableStock) <= 0) {

      toast({
        title: 'Eroare',
        description: 'Valoarea stocului trebuie sa fie mai mare decat zero.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
      return;
    } else if (parseInt(values.price) <= 0) {
      toast({
        title: 'Eroare',
        description: 'Pretul setat noului produs trebuie sa aiba o valoare mai mare sau egala decat 0.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
      return;
    }

    setLoading(true);
    const response = await addProduct(values, cookies.userToken);
    setLoading(false);
    if (response.status === 1) {
      setUserError(response.message);
    } else {
      toast({
        title: 'Produsul a fost adaugat cu succes!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
      dispatch(setNeedProductsCall(true));
      navigate('/');
      onClose();
    }
  };

  return (
    <Formik
      initialValues={{
        name: '',
        price: '0',
        availableStock: '0'
      }}
      onSubmit={handleSubmit}
      onChange={() => {
        setUserError('');
      }}
    >
      {({ handleSubmit, handleChange, values }) => (
        <Form>
          <Stack spacing={4} className='mt-6'>
            <FormControl isRequired>
              <FormLabel>Nume produs</FormLabel>
              <Input
                id='name'
                name='name'
                placeholder='Nume produs'
                onChange={handleChange}
                value={values.name}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Pret</FormLabel>
              <Input
                id='price'
                name='price'
                type='number'
                step='0.01'
                placeholder='Pret'
                onChange={handleChange}
                value={values.price}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Stoc disponibil</FormLabel>
              <Input
                id='availableStock'
                name='availableStock'
                type='number'
                placeholder='Stoc disponibil'
                onChange={handleChange}
                value={values.availableStock}
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
              onClick={handleSubmit}
              isLoading={loading}
            >
              Adauga
            </Button>
            <Button onClick={onClose} disabled={loading}>
              Renunta
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
