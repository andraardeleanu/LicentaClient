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
import { MANAGER_RANK } from '../utils/constants';
import { AddWorkPointFragment } from '../fragments/AddWorkPointFragment';
import { FaHome } from 'react-icons/fa';

export const AddWorkPointPage = () => {
  return (
    <AppContainer
      needAuth
      needRank={MANAGER_RANK}
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
                <span>Adauga punct de lucru</span>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Heading mb={4}>Adauga punct de lucru</Heading>
          <AddWorkPointFragment />
        </Container>
      </>
    </AppContainer>
  );
};
