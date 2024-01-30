import { Avatar, Box, Divider, Heading, Icon } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import AdminIcon from '../images/admin_rank.png';
import ManagerIcon from '../images/manager_rank.png';
import { ADMIN_RANK } from '../utils/constants';
import { HiMiniBuildingOffice } from 'react-icons/hi2';
import { FaClock, FaStar } from 'react-icons/fa';
import moment from 'moment';

export const UserDetailsBox = () => {
  const { data, companyData } = useSelector((state) => state.user);
  const rankIcon = data?.roles[0] === ADMIN_RANK ? AdminIcon : ManagerIcon;
  return (
    <>
      <Box
        borderWidth='1px'
        borderRadius='lg'
        className='p-4'
      >
        <div className='w-full flex items-center flex-col'>
          <Avatar name={data?.firstName} />
          <Heading>{data?.firstName + ' ' + data?.lastName}</Heading>
          <div>
            <span className='flex gap-2 items-center'>
              <img
                className='w-12'
                src={rankIcon}
                alt={data?.roles[0]}
              />
              <Heading size={'md'}>{data?.roles[0]}</Heading>
            </span>
          </div>
        </div>
      </Box>
      <Divider my={4} />
      <Box
        borderWidth='1px'
        borderRadius='lg'
        className='p-4'
      >
        <div className='w-full flex items-center flex-col'>
          <Avatar icon={<HiMiniBuildingOffice />} />
          <Heading>{companyData?.name}</Heading>

          <div>
            <span className='flex gap-2 items-center'>
              <Icon as={FaClock} />
              <span>Data creare:</span>
              <span className='font-bold'>
                {moment(companyData?.dateCreated).fromNow().toString()}
              </span>
            </span>
          </div>

          <div>
            <span className='flex gap-2 items-center'>
              <Icon as={FaStar} /> <span>Creat de:</span>
              <span className='font-bold'>{companyData?.author}</span>
            </span>
          </div>
        </div>
      </Box>
    </>
  );
};
