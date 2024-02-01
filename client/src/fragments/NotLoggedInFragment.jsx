import { Heading } from '@chakra-ui/react';

export const NotLoggedInFragment = () => {
  return (
    <>
      <Heading size={'lg'}>Nu esti logat.</Heading>
      <Heading
        mt={4}
        size={'md'}
      >
        Pentru a putea utiliza toate functionalitatile, te rugam sa te
        conectezi.
      </Heading>
    </>
  );
};
