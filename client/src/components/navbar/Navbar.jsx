import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useBreakpointValue
} from '@chakra-ui/react';
import { AppLogo } from '../AppLogo';
import { NavDrawer } from './NavDrawer';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export const Navbar = ({ userData = undefined }) => {
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie] = useCookies(['userToken']);
  const buttonSize = useBreakpointValue({ base: 'sm', lg: 'md' });
  const navigate = useNavigate();
  return (
    <div className='fixed h-14 lg:h-16 px-4 lg:px-6 flex items-center backdrop-blur-xl z-50 w-full border-b-[1px] border-b-zinc-100 gap-2 lg:gap-4'>
      <div className='gap-2 lg:gap-4 flex items-center w-1/2 lg:w-1/3'>
        <div className='block lg:hidden'>
          <NavDrawer />
        </div>
        <AppLogo />
      </div>
      <div className='hidden lg:block lg:w-1/3'>{/* empty */}</div>
      {userData?.id ? (
        <div className='gap-2 lg:gap-4 w-1/2 lg:w-1/3 flex justify-end items-center'>
          <Menu>
            <MenuButton>
              <div className='flex items-center gap-2'>
                <Avatar name={userData?.firstName} />
                <div>sal</div>
              </div>
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={() => {
                  navigate('/profile');
                }}
              >
                Profil
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setCookie('userToken', '');
                  window.location.reload();
                }}
              >
                Deconectare
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      ) : (
        <div className='gap-2 lg:gap-4 w-1/2 lg:w-1/3 flex justify-end items-center'>
          <Button
            size={buttonSize}
            onClick={() => {
              navigate('/login');
            }}
          >
            Conecteaza-te
          </Button>
          <Button
            size={buttonSize}
            colorScheme='blue'
          >
            Inregistreaza-te
          </Button>
        </div>
      )}
    </div>
  );
};
