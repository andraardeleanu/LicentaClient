import { Heading } from '@chakra-ui/react';
import { AppContainer } from '../components/AppContainer';
import { Container } from '../components/Container';
import { Navbar } from '../components/navbar/Navbar';
import { LoginFragment } from '../fragments/LoginFragment';
import { useTranslation } from 'react-i18next';

export const LoginPage = () => {
  const { t: i18titles } = useTranslation('titles');
  return (
    <AppContainer forGuest>
      <Navbar />
      <Container size={33}>
        <Heading>{i18titles('login')}</Heading>
        <LoginFragment />
      </Container>
    </AppContainer>
  );
};
