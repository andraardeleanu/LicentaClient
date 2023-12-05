import { Button, Checkbox, Input, Stack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useCookies } from 'react-cookie';

export const LoginFragment = () => {
  const [cookies, setCookie] = useCookies(['userToken']);
  console.log('cookeis: ', cookies);
  return (
    <Formik
      initialValues={{
        username: '',
        password: ''
      }}
      onSubmit={async (values) => {
        setCookie('userToken', 'test');
        console.log('cookies: ', cookies);
        if (!values.username) {
          //setGenericError('Numele de utilizator este necesar.');
          return;
        }
        if (!values.password) {
          //setGenericError('Parola este necesara.');
          return;
        }
        //   if (error) {
        //     setGenericError(error);
        //     return;
        //   }
        //dispatch(login({ ...values }));
        //navigate('/');
      }}
    >
      {({ handleSubmit, handleChange, values }) => (
        <Form
          onSubmit={handleSubmit}
          onChange={() => {}}
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
            {/* {genericError && (
              <Alert
                message={genericError}
                type='error'
              />
            )} */}
            <Checkbox defaultChecked>Tine-ma minte</Checkbox>
            <Button
              colorScheme='blue'
              type='submit'
            >
              Conecteaza-te
            </Button>
            <Button>Inregistreaza-te</Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
