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
import { DragHandleIcon, DeleteIcon } from '@chakra-ui/icons';
import { Spacer, Tooltip } from '@chakra-ui/react';

export const WorkPointBox = ({ name, address, author, dateUpdated }) => {
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
          <IconButton
            colorScheme='gray'
            icon={<DragHandleIcon />}
          />
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
