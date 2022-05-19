import { useContext } from 'react';
import {
  Box,
  Image,
  useColorModeValue,
  Text,
  Alert,
  AlertIcon,
  AlertDescription,
  CloseButton,
} from '@chakra-ui/react';

import { default as Button } from '@src/atoms/Button';
import { SessionContext } from '@src/context/Session';

const Login: React.FC = () => {
  const sessionState = useContext(SessionContext);

  return (
    <Box
      h="100vh"
      w="100vw"
      bg={useColorModeValue('white', 'gray.900')}
      display="flex"
      flexDirection={{ base: 'column', md: 'row' }}
    >
      <Box
        bg={useColorModeValue('brand.medium', 'gray.900')}
        w={{ base: 'full', md: '60vw' }}
        height={{ base: '20vh', md: '100vh' }}
      ></Box>
      <Box
        w={{ base: 'full', md: '40vw' }}
        height={{ base: '80vh', md: '100vh' }}
        px={{ base: '1rem' }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        position="relative"
      >
        {!!sessionState.error && (
          <Alert
            status="error"
            borderRadius="0.25rem"
            position="absolute"
            top="3rem"
            left="1rem"
            width="calc(100% - 2rem)"
          >
            <AlertIcon />
            <AlertDescription>{sessionState.error}</AlertDescription>
            <CloseButton
              position="absolute"
              right="8px"
              top="8px"
              onClick={sessionState.resetError}
            />
          </Alert>
        )}

        <Text fontSize="2rem" fontWeight="700" textAlign="center" mb="1rem">
          Bienvenido a la plataforma de Gestión de Ordenes de
        </Text>
        <Image src="/logo.png" width="100%" maxW="16rem" mb="3rem" alt="Tested Logo" />

        {sessionState.sessionInfo.isValid && !sessionState.sessionInfo.isAvailable ? (
          <>
            <Text fontSize="1rem" fontWeight="500" mb="1rem">
              Hola <b>{sessionState.sessionUser.name}</b>, tu cuenta está siendo validada.
            </Text>
            <Button size="md" variant="primary" mb="2rem" onClick={sessionState.signInHandler}>
              <Image src="/images/google.png" alt="tested backoffice" width="20px" mr="0.5rem" />
              Reintentar
            </Button>
            <Button size="md" variant="primary" onClick={sessionState.signInOtherHandler}>
              <Image src="/images/google.png" alt="tested backoffice" width="20px" mr="0.5rem" />
              Ingresar con otra cuenta
            </Button>
          </>
        ) : (
          <>
            <Text fontSize="1rem" fontWeight="500" mb="1rem">
              Ingresa con tu cuenta de Google
            </Text>
            <Button size="md" variant="primary" onClick={sessionState.signInHandler}>
              <Image src="/images/google.png" alt="tested backoffice" width="20px" mr="0.5rem" />
              Iniciar sesión
            </Button>
          </>
        )}

        <Text fontSize="0.875rem" fontWeight="400" pos="fixed" bottom="1rem">
          Copyright 2021 | Tested.cl
        </Text>
      </Box>
    </Box>
  );
};

export default Login;
