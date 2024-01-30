import { AppContainer } from '../components/AppContainer';
import { Container } from '../components/Container';
import { Navbar } from '../components/navbar/Navbar';
import { Box, Heading } from '@chakra-ui/react';
import { UserDetailsBox } from '../components/UserDetailsBox';

export const UserProfilePage = () => {
  return (
    <AppContainer needAuth>
      <>
        <Navbar />
        <Container size={33}>
          <Box>
            <Heading mb={4}>Profil</Heading>
            <UserDetailsBox />
          </Box>
        </Container>
      </>
    </AppContainer>
  );
};
