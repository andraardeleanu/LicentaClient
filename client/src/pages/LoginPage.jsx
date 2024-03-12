import { Heading } from '@chakra-ui/react';
import { AppContainer } from '../components/AppContainer';
import { Container } from '../components/Container';
import { Navbar } from '../components/navbar/Navbar';
import { LoginFragment } from '../fragments/LoginFragments/LoginFragment';

export const LoginPage = () => {
  return (
    <AppContainer forGuest>
      <Navbar />
      <Container size={33}>
        <Heading mb={4}>Conecteaza-te</Heading>
        <LoginFragment />
      </Container>
    </AppContainer>
  );
};
