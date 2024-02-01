import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Card,
  Checkbox,
  Input,
  Stack
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useCookies } from 'react-cookie';
import useAuth from '../hooks/useAuth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoginFragment = () => {
  const [cookies, setCookie] = useCookies(['userToken']);
  const [loginLoading, setLoginLoading] = useState(false);
  const { login } = useAuth(cookies.userToken);
  const [userError, setUserError] = useState('');
  const navigate = useNavigate();
  return (
    <Card className='p-4'>
      <Formik
        initialValues={{
          username: '',
          password: '',
          rememberMe: true
        }}
        onSubmit={async (values) => {
          setLoginLoading(true);
          const response = await login(
            values.username,
            values.password,
            values.rememberMe
          );
          setLoginLoading(false);
          if (response.errorMessage) {
            setUserError(response.errorMessage);
          } else {
            setCookie('userToken', response.token);
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
                id='username'
                name='username'
                placeholder='Nume de utilizator'
                onChange={handleChange}
                value={values.username}
              />
              <Input
                id='password'
                name='password'
                placeholder='Parola'
                onChange={handleChange}
                value={values.password}
                type='password'
              />
              <Checkbox
                id='rememberMe'
                name='rememberMe'
                value={values.rememberMe}
                onChange={handleChange}
                defaultChecked
              >
                Tine-ma minte
              </Checkbox>
              {userError && (
                <Alert status='error'>
                  <AlertIcon />
                  <AlertTitle>{userError}</AlertTitle>
                </Alert>
              )}
              <Button
                colorScheme='blue'
                onClick={handleSubmit}
                isLoading={loginLoading}
              >
                Conecteaza-te
              </Button>
              <Button
                onClick={() => {
                  setCookie('userToken', '');
                }}
              >
                Inregistreaza-te
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Card>
  );
};
