import { useState } from 'react';
import { AppContainer } from '../components/AppContainer';
import { Navbar } from '../components/navbar/Navbar';

export const HomePage = () => {
  const [userData, setUserData] = useState(null);
  return (
    <AppContainer setUserData={setUserData}>
      <>
        <Navbar userData={userData} />
      </>
    </AppContainer>
  );
};
