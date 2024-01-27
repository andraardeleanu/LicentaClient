import { useState } from 'react';
import { AppContainer } from '../components/AppContainer';
import { Navbar } from '../components/navbar/Navbar';

export const UserProfilePage = () => {
  const [userData, setUserData] = useState(null);
  console.log('user data: ', userData);
  return (
    <AppContainer setUserData={setUserData}>
      <>
        <Navbar userData={userData} />
      </>
    </AppContainer>
  );
};
