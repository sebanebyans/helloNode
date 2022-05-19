import { FC } from 'react';
import { IconButton, Flex, HStack, useColorModeValue, FlexProps, Image } from '@chakra-ui/react';
import { FiMenu, FiBell } from 'react-icons/fi';

import UserMenu from '@components/UserMenu';

type NavigationT = FlexProps & {
  onOpen: () => void;
};

const Navigation: FC<NavigationT> = ({ onOpen, ...rest }) => {
  return (
    <Flex
      px="4"
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Image
        display={{ base: 'flex', md: 'none' }}
        src="/mobile_logo.png"
        maxW="5rem"
        alt="Tested Logo"
      />
      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} />
        <UserMenu />
      </HStack>
    </Flex>
  );
};

export default Navigation;
