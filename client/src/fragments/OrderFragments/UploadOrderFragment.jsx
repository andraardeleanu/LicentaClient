import {
  Card,
  Heading,
  CardFooter,
  CardBody,
  Image,
  Stack,
  Text,
  Button,
  Flex,
  Icon,
  Divider,
  useDisclosure,
  Select,
  Alert,
  AlertIcon,
  AlertTitle,
  Input,
  useToast
} from '@chakra-ui/react';
import { FaPlusCircle } from 'react-icons/fa';
import { AddOrderModal } from './AddOrderModal';
import { useEffect, useState } from 'react';
import {
  addOrdersFromFile,
  getWorkPointsByCompanyId
} from '../../utils/apiCalls';
import { useCookies } from 'react-cookie';
import { Form, Formik } from 'formik';
import { useSelector } from 'react-redux';

export const UploadOrderFragment = () => {
  const { data } = useSelector((store) => store.user);
  const {
    isOpen: isCreateOrderModalOpen,
    onOpen: onCreateOrderModalOpen,
    onClose: onCreateOrderModalClose
  } = useDisclosure();
  const [needWorkpointsCall, setNeedWorkpointsCall] = useState(false);
  const [workpointsLoading, setWorkpointsLoading] = useState(false);
  const [workpoints, setWorkpoints] = useState([]);
  const [cookies] = useCookies();
  const [userError, setUserError] = useState('');
  const [uploadedFile, setUploadedFile] = useState([]);
  const toast = useToast();

  useEffect(() => {
    setNeedWorkpointsCall(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.companies[0]?.id]);

  useEffect(() => {
    (async () => {
      try {
        if (needWorkpointsCall) {
          setWorkpointsLoading(true);
          await getWorkPointsByCompanyId(
            cookies.userToken,
            data?.companies[0]?.id
          ).then((res) => {
            setWorkpointsLoading(false);
            setWorkpoints(res);
          });
          setNeedWorkpointsCall(false);
        }
      } catch (err) {
        return err;
      }
    })();
  }, [workpoints, cookies.userToken, needWorkpointsCall, data?.companies]);

  return (
    <>
      <Divider my={4} />
      <Flex justify={'space-between'}></Flex>
      <Button
        leftIcon={<Icon as={FaPlusCircle} />}
        colorScheme='blue'
        onClick={() => {
          onCreateOrderModalOpen();
        }}
      >
        Creeaza comanda manual
      </Button>
      <Divider my={4} />
      <Formik
        initialValues={{
          workpointId: 0
        }}
        onSubmit={async (values) => {
          const response = await addOrdersFromFile({
            workPointId: values.workpointId,
            file: uploadedFile
          });
          toast({
            title: response,
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top'
          });
        }}
      >
        {({ handleSubmit, handleChange }) => (
          <Form
            onSubmit={handleSubmit}
            onChange={() => {
              setUserError('');
            }}
            encType='multipart/form-data'
          >
            <Card
              borderRadius='30px'
              direction={{ base: 'column', sm: 'row' }}
              overflow='hidden'
            >
              <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                src={require('../../images/upload-file2.png')}
              />

              <Stack>
                <CardBody>
                  <Heading size='md'>Incarca fisier</Heading>
                  <section className='container'>
                    <div className='border-4 border-dotted p-2 mt-2 cursor-pointer'>
                      <Input
                        type='file'
                        name='uploadedFile'
                        id='uploadedFile'
                        multiple={false}
                        accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
                        onChange={(e) => {
                          setUploadedFile(e.target.files[0]);
                        }}
                      />
                      <Text
                        py='2'
                        color={'grey'}
                      >
                        Click aici pentru a adauga fisierul ce contine noua
                        comanda din computerul tau.
                      </Text>
                    </div>
                  </section>
                  <br />
                  <Select
                    isDisabled={workpointsLoading}
                    onChange={handleChange}
                    placeholder='Selecteaza punct de lucru...'
                    id='workpointId'
                    name='workpointId'
                  >
                    {workpoints.map((wp) => (
                      <option
                        key={wp?.id}
                        value={wp?.id}
                      >
                        {wp?.name}
                      </option>
                    ))}
                  </Select>
                </CardBody>
                {userError && (
                  <Alert status='error'>
                    <AlertIcon />
                    <AlertTitle>{userError}</AlertTitle>
                  </Alert>
                )}
                <CardFooter>
                  <Button
                    variant='solid'
                    colorScheme='blue'
                    type='submit'
                  >
                    Creeaza comanda automat
                  </Button>
                </CardFooter>
              </Stack>
            </Card>
          </Form>
        )}
      </Formik>
      <AddOrderModal
        isOpen={isCreateOrderModalOpen}
        onClose={onCreateOrderModalClose}
      />
    </>
  );
};
