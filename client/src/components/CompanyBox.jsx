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
import { MdSettings } from 'react-icons/md';

export const CompanyBox = ({
  name,
  cui,
  author,
  dateUpdated,
  onOptionsClick
}) => {
  return (
    <Card
      borderRadius='30px'
      className='p-6 w-100 m-4'
    >
      <CardBody>
        <IconButton
          colorScheme='gray'
          icon={<MdSettings />}
          onClick={onOptionsClick}
        />
        <Stack
          spacing={6}
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
