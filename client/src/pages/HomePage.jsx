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
import { CompaniesFragment } from '../fragments/CompanyFragments/CompaniesFragment';
import { NotLoggedInFragment } from '../fragments/LoginFragments/NotLoggedInFragment';
import { WorkPointsFragment } from '../fragments/WorkpointFragments/WorkPointsFragment';
import { ADMIN_RANK, MANAGER_RANK } from '../utils/constants';
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
          {/* {data?.roles[0] === ADMIN_RANK && <CompaniesFragment />}
          {data?.roles[0] === MANAGER_RANK && <WorkPointsFragment />} */}
        </Container>
      </>
    </AppContainer>
  );
};
