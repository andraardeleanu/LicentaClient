import { AppContainer } from '../components/AppContainer';
import { Container } from '../components/Container';
import { Navbar } from '../components/navbar/Navbar';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Icon
} from '@chakra-ui/react';
import { UserDetailsBox } from '../components/UserDetailsBox';
import { FaHome } from 'react-icons/fa';

export const UserProfilePage = () => {
  return (
    <AppContainer needAuth>
      <>
        <Navbar />
        <Container size={75}>
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink
                className='flex items-center gap-2'
                href='/'
              >
                <Icon as={FaHome} />
                <span>Acasa</span>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink
                className='flex items-center gap-2'
                href='#'
              >
                <span>Profil</span>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Box>
            <Heading mb={4}>Profil</Heading>
            <UserDetailsBox />
          </Box>
        </Container>
      </>
    </AppContainer>
  );
};
