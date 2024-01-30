import { Heading } from '@chakra-ui/react';
import { AppContainer } from '../components/AppContainer';
import { Navbar } from '../components/navbar/Navbar';
import { useSelector } from 'react-redux';
import { Container } from '../components/Container';
import { CompaniesFragment } from '../fragments/CompaniesFragment';

export const HomePage = () => {
  const { data } = useSelector((store) => store.user);
  return (
    <AppContainer>
      <>
        <Navbar />
        <Container size={75}>
          <Heading mb={4}>Bun venit, {data?.firstName}!</Heading>
          <CompaniesFragment />
        </Container>
      </>
    </AppContainer>
  );
};
