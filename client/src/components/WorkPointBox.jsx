import {
  Card,
  Heading,
  Icon,
  CardBody,
  Image,
  Stack,
  Text,
  IconButton
} from '@chakra-ui/react';
import moment from 'moment';
import { FaClock, FaStar } from 'react-icons/fa';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { Spacer, Tooltip } from '@chakra-ui/react';

export const WorkPointBox = ({
  name,
  address,
  author,
  dateUpdated,
  onUpdateClick,
  onDeleteClick
}) => {
  return (
    <Card
      borderRadius='30px'
      className='p-6 w-100 m-4'
      size={'xs'}
    >
      <CardBody>
        <Stack
          direction='row'
          spacing={4}
        >
          <Tooltip
            placement='top'
            label='Modifica punct de lucru'
            bg='white.100'
            color='black'
            fontSize={'md'}
          >
            <IconButton
              leftIcon={<EditIcon />}
              colorScheme='gray'
              variant='ghost'
              onClick={onUpdateClick}
            />
          </Tooltip>
          <Spacer />
          <Tooltip
            label='Sterge punct de lucru'
            bg='gray.300'
            color='black'
            fontSize={'md'}
          >
            <IconButton
              rightIcon={<DeleteIcon />}
              colorScheme='gray'
              variant='ghost'
              onClick={onDeleteClick}
            />
          </Tooltip>
        </Stack>

        <Stack
          spacing={5}
          direction='column'
          align='center'
        >
          <Image
            boxSize='100px'
            src={require('../images/workpoint.png')}
          />
          <Heading size='md'>
            <div className='w-full flex flex-col'>
              <Text>{name}</Text>
            </div>
          </Heading>
          <Text fontStyle="italic" color="blue.700" fontWeight="bold" fontSize='xxs'>{address}</Text>
          <div>
            <span className='flex gap-2 items-center'>
              <Icon as={FaClock} />
              <span>Ultima modificare:</span>
              <span className='font-bold'>
                {moment(dateUpdated).fromNow().toString()}
              </span>
            </span>
            <div>
              <span className='flex gap-2 items-center'>
                <Icon as={FaStar} /> <span>Creat de:</span>
                <span className='font-bold'>{author}</span>
              </span>
            </div>
          </div>
        </Stack>
      </CardBody>
    </Card>
  );
};
