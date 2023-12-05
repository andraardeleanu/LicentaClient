import { Button, useBreakpointValue } from '@chakra-ui/react';
import { AppLogo } from '../AppLogo';
import { NavDrawer } from './NavDrawer';

export const Navbar = () => {
  const buttonSize = useBreakpointValue({ base: 'sm', lg: 'md' });
  return (
    <div className='fixed h-14 lg:h-16 px-4 lg:px-6 flex items-center backdrop-blur-xl z-50 w-full border-b-[1px] border-b-zinc-100 gap-2 lg:gap-4'>
      <div className='gap-2 lg:gap-4 flex items-center w-1/2 lg:w-1/3'>
        <div className='block lg:hidden'>
          <NavDrawer />
        </div>
        <AppLogo />
      </div>
      <div className='hidden lg:block lg:w-1/3'>{/* empty */}</div>
      <div className='gap-2 lg:gap-4 w-1/2 lg:w-1/3 flex justify-end items-center'>
        <Button size={buttonSize}>Conecteaza-te</Button>
        <Button
          size={buttonSize}
          colorScheme='blue'
        >
          Inregistreaza-te
        </Button>
      </div>
    </div>
  );
};
