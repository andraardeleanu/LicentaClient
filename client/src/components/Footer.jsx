import { Card } from '@chakra-ui/react';
import { AppLogo } from './AppLogo';

export const Footer = () => {
  return (
    <Card className='w-full h-18 p-6'>
      <div>
        <AppLogo />
      </div>
      <div></div>
    </Card>
  );
};
