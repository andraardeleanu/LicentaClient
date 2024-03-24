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
  import { register } from '../../utils/apiCalls';
  import { useDispatch } from 'react-redux';
  import { setNeedCustomersCall } from '../../slices/userSlice';
  
  export const AddCustomerFragment = ({ onClose }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [userError, setUserError] = useState('');
    const [cookies] = useCookies();
    const toast = useToast();
    const dispatch = useDispatch();
  
    return (
      <Formik
        initialValues={{
          firstname: '',
          lastname: '',
          companyId: '',
          username: '',
          password: '',
          email: ''
        }}
        onSubmit={async (values) => {
          setLoading(true);
          const response = await register(values, cookies.userToken);
          setLoading(false);
          if (response.errorMessage) {
            setUserError(response.errorMessage);
          } else {
            toast({
              title: 'Noul client a fost adaugat cu succes!',
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
                id='firstname'
                name='firstname'
                placeholder='Prenume client'
                onChange={handleChange}
                value={values.firstname}
              />
              <Input
                id='lastname'
                name='lastname'
                placeholder='Nume client'
                onChange={handleChange}
                value={values.lastname}
              />
              <Input
                id='companyId'
                name='companyId'
                placeholder='Companie'
                onChange={handleChange}
                value={values.companyId}
              />
              <Input
                id='username'
                name='username'
                placeholder='Username'
                onChange={handleChange}
                value={values.username}
              />
              <Input
                id='password'
                name='password'
                placeholder='Parola'
                onChange={handleChange}
                value={values.lastname}
              />              
              <Input
                id='email'
                name='email'
                placeholder='Email'
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
                Adauga client
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
  