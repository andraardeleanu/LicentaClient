import {
  Card,
  Heading,
  Icon,
  CardBody,
  Image,
  Stack,
  Text,
  IconButton,
  Tooltip
} from '@chakra-ui/react';
import moment from 'moment';
import { FaClock, FaStar } from 'react-icons/fa';
import { ViewIcon, EditIcon } from '@chakra-ui/icons';

export const CompanyBox = ({
  name,
  author,
  dateUpdated,
  onOptionsClick,
  onUpdateClick
}) => {
  return (
    <Card
      borderRadius='20px'
      className='p-6 w-100 m-4'
      size={'xs'}
    >
      <CardBody>
        <Stack
          direction='row'
          className='flex justify-between'
        >
          <Tooltip
            placement='top'
            label='Modifica companie'
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
          <Tooltip
            placement='top'
            label='Vezi puncte de lucru'
            bg='white.100'
            color='black'
            fontSize={'md'}
          >
            <IconButton
              rightIcon={<ViewIcon />}
              variant='ghost'
              onClick={onOptionsClick}
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
            src={require('../images/company.png')}
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
