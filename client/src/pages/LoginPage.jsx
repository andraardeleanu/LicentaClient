import { useState } from 'react';
import { AppContainer } from '../components/AppContainer';
import { Container } from '../components/Container';
import { Navbar } from '../components/navbar/Navbar';
import { LoginFragment } from '../fragments/LoginFragment';

export const LoginPage = () => {
  const [userData, setUserData] = useState(null);
  return (
    <AppContainer
      setUserData={setUserData}
      forGuest
    >
      <Navbar userData={userData} />
      <Container size={33}>
        <p className='mt-4 text-2xl font-bold'>Conecteaza-te</p>
        <LoginFragment />
      </Container>
    </AppContainer>
  );
};
