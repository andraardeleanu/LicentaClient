import { useSelector } from 'react-redux';
import { AppContainer } from '../components/AppContainer';
import { Container } from '../components/Container';
import { Navbar } from '../components/navbar/Navbar';
import { Avatar, Box, Button, Heading, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { UserDetailsBox } from '../components/UserDetailsBox';

export const UserProfilePage = () => {
  const { data } = useSelector((state) => state.user);
  const { t: i18titles } = useTranslation('titles');

  console.log('data: ', data);
  return (
    <AppContainer needAuth>
      <>
        <Navbar />
        <Container size={33}>
          <Box>
            <Heading mb={4}>{i18titles('profile')}</Heading>
            <Heading
              size={'lg'}
              mb={4}
            >
              {i18titles('profile')}
            </Heading>
            <Text fontSize='xl'>
              Paystack helps businesses in Africa get paid by anyone, anywhere
              in the world
            </Text>
            <UserDetailsBox />
            <Button
              size='lg'
              colorScheme='green'
              mt='24px'
            >
              Create a free account
            </Button>
          </Box>
          <Heading size={'lg'}>ceaw papi</Heading>
        </Container>
      </>
    </AppContainer>
  );
};
