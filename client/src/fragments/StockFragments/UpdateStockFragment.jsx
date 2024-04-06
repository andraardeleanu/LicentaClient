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
  import { updateStock } from '../../utils/apiCalls';
  import { useDispatch } from 'react-redux';
  import { setNeedStocksCall } from '../../slices/userSlice';
  
  export const UpdateStockFragmentFragment = ({ onClose }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [userError, setUserError] = useState('');
    const [cookies] = useCookies();
    const toast = useToast();
    const dispatch = useDispatch();
  
    return (
      <Formik
        initialValues={{
          availableStock: '',          
        }}
        onSubmit={async (values) => {
          setLoading(true);
          const response = await updateStock(values, cookies.userToken);
          setLoading(false);
          if (response.errorMessage) {
            setUserError(response.errorMessage);
          } else {
            toast({
              title: 'Noul stoc s-a actualizat cu succes.',
              status: 'success',
              duration: 5000,
              isClosable: true,
              position: 'top'
            });
            dispatch(setNeedStocksCall(true));          
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
                id='availableStock'
                name='availableStock'
                placeholder='Noul stoc disponibil'
                onChange={handleChange}
                value={values.availableStock}
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
  