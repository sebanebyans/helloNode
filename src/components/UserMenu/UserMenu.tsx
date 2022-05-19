import React, { useContext } from 'react';
import {
  Avatar,
  Box,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Image,
} from '@chakra-ui/react';
import { FiChevronDown } from 'react-icons/fi';

import { SessionContext } from '@src/context/Session';
import { USER_IMG_DEFAULT } from '@src/utils/constants';

const UserOptions: React.FC = () => {
  const sessionState = useContext(SessionContext);

  const img = sessionState.sessionUser.picture || USER_IMG_DEFAULT;

  return (
    <Flex alignItems="center">
      <Menu>
        <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
          <HStack>
            <Avatar size="sm" src={img} />
            <VStack
              display={{ base: 'none', md: 'flex' }}
              alignItems="flex-start"
              spacing="1px"
              ml="2"
            >
              <Text fontSize="sm">{sessionState.sessionUser.name}</Text>
            </VStack>
            <Box display={{ base: 'none', md: 'flex' }}>
              <FiChevronDown />
            </Box>
          </HStack>
        </MenuButton>
        <MenuList
          bg={useColorModeValue('white', 'gray.900')}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
        >
          <MenuItem
            onClick={sessionState.signOutHandler}
            _hover={{
              bg: 'brand.medium',
              color: 'white',
            }}
          >
            Cerrar sesion
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default UserOptions;
