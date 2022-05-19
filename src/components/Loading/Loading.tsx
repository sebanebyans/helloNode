import { FC } from 'react';
import { Box, Image } from '@chakra-ui/react';

const Loading: FC = () => {
  return (
    <Box
      w={{ base: 'full', md: '100vw' }}
      px={{ base: '1rem', md: '20vw', xl: '15vw' }}
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Image
        display={{ base: 'flex' }}
        src="/logo.png"
        width="100%"
        maxW="18rem"
        mb="2rem"
        alt="Tested Logo"
      />
    </Box>
  );
};

export default Loading;
