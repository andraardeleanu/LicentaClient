import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useBreakpointValue,
  useDisclosure
} from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import { MdOutlineMenu } from 'react-icons/md';
import { useRef } from 'react';

export const NavDrawer = () => {
  const buttonSize = useBreakpointValue({ base: 'sm', lg: 'md' });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  return (
    <>
      <IconButton
        ref={btnRef}
        onClick={onOpen}
        icon={<MdOutlineMenu />}
        size={buttonSize}
      />
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader />

          <DrawerBody>menu</DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
