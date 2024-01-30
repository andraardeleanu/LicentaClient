import { Box, Skeleton } from '@chakra-ui/react';

export const ResultsLoading = () => {
  return (
    <div className='flex gap-2'>
      <Skeleton className='w-1/3'>
        <Box className='h-24'>&nbsp;</Box>
      </Skeleton>
      <Skeleton className='w-1/3'>
        <Box>&nbsp;</Box>
      </Skeleton>
      <Skeleton className='w-1/3'>
        <Box>&nbsp;</Box>
      </Skeleton>
    </div>
  );
};
