import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useBreakpointValue,
  useDisclosure
} from '@chakra-ui/react';
import { AppLogo } from '../AppLogo';
import { NavDrawer } from './NavDrawer';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { useRef } from 'react';

export const Navbar = () => {
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie] = useCookies(['userToken']);
  const { data } = useSelector((state) => state.user);
  const buttonSize = useBreakpointValue({ base: 'sm', lg: 'md' });
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  return (
    <div className='bg-white shadow-sm fixed h-14 lg:h-16 px-4 lg:px-6 flex items-center backdrop-blur-xl z-50 w-full border-b-[1px] border-b-zinc-100 gap-2 lg:gap-4'>
      <div className='gap-2 lg:gap-4 flex items-center w-1/2 lg:w-1/3'>
        <div className='block lg:hidden'>
          <NavDrawer />
        </div>
        <AppLogo />
      </div>
      <div className='hidden lg:block lg:w-1/3'>{/* empty */}</div>
      {data?.id ? (
        <div className='gap-2 lg:gap-4 w-1/2 lg:w-1/3 flex justify-end items-center'>
          <Menu>
            <MenuButton>
              <div className='flex items-center gap-2'>
                <Avatar name={data?.firstName} />
                {/* <div>company name aici</div> */}
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
              <MenuItem onClick={onOpen}>Deconectare</MenuItem>
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
            Conectare
          </Button>
          <Button
            size={buttonSize}
            colorScheme='blue'
          >
            Inregistrare
          </Button>
        </div>
      )}

      {/* Modal confirmare - logout */}

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader
              fontSize='lg'
              fontWeight='bold'
            >
              Deconectare
            </AlertDialogHeader>

            <AlertDialogBody>
              Esti sigur ca vrei sa te deconectezi?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={onClose}
              >
                Anuleaza
              </Button>
              <Button
                colorScheme='red'
                onClick={() => {
                  setCookie('userToken', '');
                  onClose();
                  window.location.reload();
                }}
                ml={3}
              >
                Deconecteaza-te
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
};
