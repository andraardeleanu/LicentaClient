import { Avatar, Box, Card, Heading, Icon } from '@chakra-ui/react';
import moment from 'moment';
import { FaClock, FaStar } from 'react-icons/fa';
import { HiMiniBuildingOffice } from 'react-icons/hi2';

export const CompanyBox = ({ name, cui, author, dateUpdated }) => {
  return (
    <Card
      borderRadius='lg'
      className='p-4 w-full m-2'
    >
      <div className='w-full flex items-center flex-col'>
        <Avatar icon={<HiMiniBuildingOffice />} />
        <Heading>{name}</Heading>

        <div>
          <span className='flex gap-2 items-center'>
            <Icon as={FaClock} />
            <span>Ultima modificare:</span>
            <span className='font-bold'>
              {moment(dateUpdated).fromNow().toString()}
            </span>
          </span>
        </div>

        <div>
          <span className='flex gap-2 items-center'>
            <Icon as={FaStar} /> <span>Creat de:</span>
            <span className='font-bold'>{author}</span>
          </span>
        </div>
      </div>
    </Card>
  );
};
