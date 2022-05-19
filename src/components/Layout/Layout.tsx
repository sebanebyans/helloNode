import React from 'react';
import { ReactNode } from 'react';
import Sidebar from './Sidebar/';
import { Box, useColorModeValue } from '@chakra-ui/react';
import Modals from '@components/Modals';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      minH="100vh"
      w="100vw"
      maxW="100vw"
      className="main-layout"
      bg={useColorModeValue('gray.100', 'gray.900')}
    >
      <Sidebar />
      <Box w={{ base: 'full', md: '100vw' }} pl={{ base: 'none', md: '20vw', xl: '15vw' }}>
        {children}
      </Box>
      <Modals />
    </Box>
  );
};

export default Layout;
