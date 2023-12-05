import { Container } from '../components/Container';
import { Navbar } from '../components/navbar/Navbar';
import { LoginFragment } from '../fragments/LoginFragment';

export const LoginPage = () => {
  return (
    <>
      <Navbar />
      <Container size={33}>
        <p className='mt-4 text-2xl font-bold'>Conecteaza-te</p>
        <LoginFragment />
      </Container>
    </>
  );
};
