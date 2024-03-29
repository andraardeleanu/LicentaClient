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
  useDisclosure
} from '@chakra-ui/react';
import { FaPlusCircle } from 'react-icons/fa';
import { AddOrderModal } from './AddOrderModal';
import { useDropzone } from 'react-dropzone';

export const UploadOrderFragment = () => {
  const {
    isOpen: isCreateOrderModalOpen,
    onOpen: onCreateOrderModalOpen,
    onClose: onCreateOrderModalClose
  } = useDisclosure();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const files = acceptedFiles.map((file) => (
    <li
      className='p-2 mb-4 last:mb-0 bg-sky-50 border border-sky-500'
      key={file.path}
    >
      {file.path}
    </li>
  ));

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
              <div
                {...getRootProps({ className: 'dropzone' })}
                className='border-4 border-dotted p-2 mt-2 cursor-pointer'
              >
                <input {...getInputProps()} />
                <Text
                  py='2'
                  color={'grey'}
                >
                  Click aici pentru a adauga fisierul ce contine noua comanda
                  din computerul tau.
                </Text>
              </div>
              <aside>
                <h4 className='font-semibold mt-2'>Incarcari</h4>
                <ul>{files}</ul>
              </aside>
            </section>
          </CardBody>

          <CardFooter>
            <Button
              variant='solid'
              colorScheme='blue'
            >
              Creeaza comanda automat
            </Button>
          </CardFooter>
        </Stack>
      </Card>
      <AddOrderModal
        isOpen={isCreateOrderModalOpen}
        onClose={onCreateOrderModalClose}
      />
    </>
  );
};
