import { Avatar, Box, Heading } from '@chakra-ui/react';

export const UserDetailsBox = () => {
  return (
    <Box
      borderWidth='1px'
      borderRadius='lg'
      className='p-4'
    >
      <div className='w-full flex items-center flex-col'>
        <Avatar name={'test'} />
        <Heading>Andra Donca</Heading>
      </div>
    </Box>
  );
};
