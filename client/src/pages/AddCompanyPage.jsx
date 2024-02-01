import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Icon
} from '@chakra-ui/react';
import { AppContainer } from '../components/AppContainer';
import { Container } from '../components/Container';
import { Navbar } from '../components/navbar/Navbar';
import { ADMIN_RANK } from '../utils/constants';
import { AddCompanyFragment } from '../fragments/AddCompanyFragment';
import { FaHome } from 'react-icons/fa';

export const AddCompanyPage = () => {
  return (
    <AppContainer
      needAuth
      needRank={ADMIN_RANK}
    >
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
                <span>Adauga companie</span>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Heading mb={4}>Adauga companie</Heading>
          <AddCompanyFragment />
        </Container>
      </>
    </AppContainer>
  );
};
