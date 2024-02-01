import { Card } from '@chakra-ui/react';
import { AppLogo } from './AppLogo';

export const Footer = () => {
  return (
    <Card className='w-full h-36 p-6'>
      <div>
        <AppLogo />
      </div>
      <div></div>
    </Card>
  );
};
