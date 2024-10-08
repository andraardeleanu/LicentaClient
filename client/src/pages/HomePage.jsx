import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Icon
} from '@chakra-ui/react';
import { AppContainer } from '../components/AppContainer';
import { Navbar } from '../components/navbar/Navbar';
import { useSelector } from 'react-redux';
import { Container } from '../components/Container';
import { NotLoggedInFragment } from '../fragments/LoginFragments/NotLoggedInFragment';
import { FaHome } from 'react-icons/fa';
import { HomepageTabsFragment } from '../fragments/HomepageTabsFragment';

export const HomePage = () => {
  const { data } = useSelector((store) => store.user);
  return (
    <AppContainer>
      <>
        <Navbar />
        <Container size={75}>
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink
                className='flex items-center gap-2'
                href='#'
              >
                <Icon as={FaHome} />
                <span>Acasa</span>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <Heading mb={4}>
            Bun venit{data ? ', ' + data?.firstName : ''}!
          </Heading>
          {!data ? <NotLoggedInFragment /> : <HomepageTabsFragment />}
        </Container>
      </>
    </AppContainer>
  );
};
