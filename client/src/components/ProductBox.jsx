import { DeleteIcon, DragHandleIcon } from '@chakra-ui/icons';
import {
  Card,
  CardBody,
  Heading,
  Icon,
  IconButton,
  Image,
  Spacer,
  Stack,
  Text,
  Tooltip
} from '@chakra-ui/react';
import { FaClock, FaStar } from 'react-icons/fa';

export const ProductBox = ({ name }) => {
  return (
    <Card
      borderRadius='30px'
      className='p-6 w-100 m-4'
    >
      <CardBody>
        <Stack
          direction='row'
          spacing={4}
        >
          <IconButton
            colorScheme='gray'
            icon={<DragHandleIcon />}
          />
          <Spacer />
          <Tooltip
            label='Sterge produs'
            bg='gray.300'
            color='black'
            fontSize={'md'}
          >
            <IconButton
              rightIcon={<DeleteIcon />}
              colorScheme='gray'
              variant='ghost'
            />
          </Tooltip>
        </Stack>

        <Stack
          spacing={6}
          direction='column'
          align='center'
        >
          <Image
            boxSize='200px'
            src={require('../images/product.png')}
          />
          <Heading size='md'>
            <div className='w-full flex flex-col'>
              <Text>{name}</Text>
            </div>
          </Heading>
          <div>
            <span className='flex gap-2 items-center'>
              <Icon as={FaClock} />
              <span>Ultima modificare:</span>
              <span className='font-bold'>nothing yet</span>
            </span>
            <div>
              <span className='flex gap-2 items-center'>
                <Icon as={FaStar} /> <span>Creat de:</span>
                <span className='font-bold'>Autorrr</span>
              </span>
            </div>
          </div>
        </Stack>
      </CardBody>
    </Card>
  );
};
