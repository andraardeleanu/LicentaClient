import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Card,
  Heading,
  Input,
  Stack,
  useToast
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useCookies } from 'react-cookie';
import useAuth from '../hooks/useAuth';
import { useState } from 'react';
import { delay } from '../utils/other';

export const UserSettingsBox = () => {
  const [cookies, setCookie] = useCookies(['userToken']);
  const [loading, setLoading] = useState(false);
  const { changePassword } = useAuth(cookies.userToken);
  const [userError, setUserError] = useState('');
  const toast = useToast();

  return (
    <Card className='p-4'>
      <Formik
        initialValues={{
          oldPassword: '',
          newPassword: ''
        }}
        onSubmit={async (values) => {
          setLoading(true);
          const response = await changePassword(
            values.oldPassword,
            values.newPassword
          );
          setLoading(false);
          if (response.errorMessage) {
            setUserError(response.errorMessage);
          } else {
            toast({
              title:
                'Parola a fost schimbata. Te rugam sa te reconectezi folosind noua parola.',
              status: 'success',
              duration: 5000,
              isClosable: true,
              position: 'top'
            });
            await delay(3000);
            setCookie('userToken', '');
            window.location.reload();
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
            <Stack spacing={4}>
              <Heading>Schimba parola</Heading>
              <Input
                id='oldPassword'
                name='oldPassword'
                placeholder='Parola veche'
                type='password'
                onChange={handleChange}
                value={values.oldPassword}
              />
              <Input
                id='newPassword'
                name='newPassword'
                placeholder='Parola noua'
                onChange={handleChange}
                value={values.newPassword}
                type='password'
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
                type='submit'
              >
                Schimba parola
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Card>
  );
};
