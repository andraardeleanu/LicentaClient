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
import { CreateManualOrderModal } from './CreateManualOrderModal';
import { useEffect, useState } from 'react';
import {
  addOrdersFromFile,
  getWorkpointsFromCompany
} from '../../utils/apiCalls';
import { useCookies } from 'react-cookie';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { setNeedOrdersCall } from '../../slices/userSlice';

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
  const needOrdersCall = useSelector((state) => state.user.needOrdersCall);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setNeedWorkpointsCall(true);
  }, [data?.companyId]);

  useEffect(() => {
    (async () => {
      try {
        if (needWorkpointsCall) {
          setWorkpointsLoading(true);
          await getWorkpointsFromCompany(
            cookies.userToken,
            data?.companyId
          ).then((res) => {
            setWorkpointsLoading(false);
            setWorkpoints(res);
          });
          setNeedWorkpointsCall(false);
          needOrdersCall();
        }
      } catch (err) {
        return err;
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workpoints, cookies.userToken, needWorkpointsCall, data?.companyId]);

  return (
    <>
      <Divider my={4} />
      <Flex justify={'space-between'}></Flex>
      <Button
        className='manualOrderButton'
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
          const response = await addOrdersFromFile(
            {
              workPointId: values.workpointId,
              file: uploadedFile
            },
            cookies.userToken
          );
          setLoading(false);
          if (response.status === 1) {
            setUserError(response.message);
          } else {
            toast({
              title: 'Comanda plasata cu succes.',
              status: 'success',
              duration: 5000,
              isClosable: true,
              position: 'top'
            });
            dispatch(setNeedOrdersCall(true));
          }
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
              bg='rgba(255, 255, 255, 0.5)'
            >
              <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                boxSize='90px'
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
                        Incarca fisierul din computerul tau.
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
                    {workpoints?.map((wp) => (
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
                    onClick={() => {
                      handleSubmit();
                    }}
                    isLoading={loading}
                  >
                    Creeaza comanda automat
                  </Button>
                </CardFooter>
              </Stack>
            </Card>
          </Form>
        )}
      </Formik>
      <CreateManualOrderModal
        isOpen={isCreateOrderModalOpen}
        onClose={onCreateOrderModalClose}
      />
    </>
  );
};
