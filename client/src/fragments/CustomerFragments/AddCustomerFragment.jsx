import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Input,
  Stack,
  useToast,
  Select,
  InputGroup,
  InputRightElement,
  FormControl,
  FormLabel
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { register, getCompanies } from '../../utils/apiCalls';
import { useDispatch } from 'react-redux';
import { setNeedCustomersCall } from '../../slices/userSlice';

export const AddCustomerFragment = ({ onClose, companyId }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [userError, setUserError] = useState('');
  const [cookies] = useCookies();
  const toast = useToast();
  const dispatch = useDispatch();
  const [needCompanyCall, setNeedCompanyCall] = useState(false);
  const [companyLoading, setCompanyLoading] = useState(false);
  const [company, setCompany] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setNeedCompanyCall(true);
  }, [companyId]);

  useEffect(() => {
    (async () => {
      try {
        if (needCompanyCall) {
          setCompanyLoading(true);
          const res = await getCompanies(cookies.userToken);
          setCompany(res);
          setCompanyLoading(false);
          dispatch(setNeedCompanyCall(false));
        }
      } catch (err) {
        console.error("ERROR", err);
      }
    })();
  }, [cookies.userToken, dispatch, needCompanyCall]);

  return (
    <Formik
      initialValues={{
        firstname: '',
        lastname: '',
        companyId: 0,
        username: '',
        password: '',
        email: ''
      }}
      onSubmit={async (values) => {
        setLoading(true);
        const response = await register(values, cookies.userToken);
        setLoading(false);
        if (response.status === 1) {
          setUserError(response.message);
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
          onClose();
        }
      }}
    >
      {({ handleSubmit, handleChange, values }) => (
        <Form onSubmit={handleSubmit}>
          <Stack
            spacing={4}
            className='mt-6'
          >
            <FormControl isRequired>
              <FormLabel>Prenume</FormLabel>
              <Input
                id='firstname'
                name='firstname'
                placeholder='Prenume client'
                onChange={handleChange}
                value={values.firstname}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Nume</FormLabel>
              <Input
                id='lastname'
                name='lastname'
                placeholder='Nume client'
                onChange={handleChange}
                value={values.lastname}
              />
            </FormControl>
            <Select
              id='companyId'
              name='companyId'
              placeholder='Selecteaza compania'
              onChange={handleChange}
              isDisabled={companyLoading}
            >
              {company?.map((cp) => (
                <option
                  key={cp?.id}
                  value={cp?.id}                
                >
                  {cp?.name}
                </option>
              ))}
            </Select>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                id='username'
                name='username'
                placeholder='Username'
                onChange={handleChange}
                value={values.username}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Parola</FormLabel>
              <InputGroup size='md'>
                <Input
                  id='password'
                  name='password'
                  pr='4.5rem'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Parola'
                  onChange={handleChange}
                  value={values.password}
                />
                <InputRightElement width='4.5rem'>
                  <Button
                    h='1.75rem'
                    size='sm'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? 'Ascunde' : 'Arata'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                id='email'
                name='email'
                placeholder='Email'
                onChange={handleChange}
                value={values.email}
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
