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

export const UploadOrderFragment = () => {
  const {
    isOpen: isCreateOrderModalOpen,
    onOpen: onCreateOrderModalOpen,
    onClose: onCreateOrderModalClose
  } = useDisclosure();

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
        Creaza comanda manual
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

            <Text
              py='2'
              color={'grey'}
            >
              Adauga fisierul din computerul tau ce contine noua comanda.
            </Text>
          </CardBody>

          <CardFooter>
            <Button
              variant='solid'
              colorScheme='blue'
            >
              Incarca
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
