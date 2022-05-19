import { FC } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  Img,
} from '@chakra-ui/react';
import SidebarItem from './SidebarItem';
import Navigation from '../Navigation/Navigation';
import { LinkItems } from '@src/routes';

type SidebarT = BoxProps & {
  onClose: () => void;
};

const SidebarContent: FC<SidebarT> = ({ onClose, ...rest }) => {
  const { route } = useRouter();
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: '20vw', xl: '15vw' }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Img src="/logo.png" alt="logo tested" />
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map(({ name, icon, href }) => (
        <SidebarItem key={name} icon={icon} href={href} active={route === href}>
          {name}
        </SidebarItem>
      ))}
    </Box>
  );
};

const Sidebar: FC<{}> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <Navigation onOpen={onOpen} />
    </>
  );
};
export default Sidebar;
