import { FC, useContext, useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  Box,
  Text,
  useToast,
} from '@chakra-ui/react';
import { ExceptionsContext } from '@src/context/Exceptions';
import { dateToText, displayTime } from '@utils/helpers';
import { useMutation } from '@apollo/client';
import { ScheduleClient } from '@src/graphql/clients';
import { CREATE_RULE } from '@src/graphql/mutations';
const ExceptionConfirmation: FC = () => {
  const toast = useToast();
  const { schedule, createNewException } = useContext(ExceptionsContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { title, from, until, limit } = schedule;
  const newException = createNewException();
  const { stateNames } = newException || {};
  const [createRule, { data, loading, error }] = useMutation(CREATE_RULE, {
    client: ScheduleClient,
    onCompleted: () => {
      toast({
        title: 'Se creo una nueva regla.',
        description: 'Puedes verla en la seccion de reglas activas',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setIsOpen(false);
    },
    onError: () => {
      toast({
        title: 'Ocurrio un error al crear la regla',
        description: 'Revisa los parametros e intenta nuevamente',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });
  return (
    <>
      <Button
        bg="brand.medium"
        _hover={{ bg: 'brand.dark' }}
        color="white"
        onClick={() => setIsOpen(true)}
      >
        Crear regla
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nueva regla {title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Text fontSize="xl" fontWeight="bold">
                Hora de inicio:
              </Text>
              <Text>
                {dateToText(from)} a las {displayTime(from)}
              </Text>
              <Text fontSize="xl" fontWeight="bold" mt={4}>
                Hora de termino:
              </Text>
              <Text>
                {dateToText(until)} a las {displayTime(until)}
              </Text>
              <Text fontSize="xl" fontWeight="bold" mt={4}>
                Comunas:
              </Text>
              <Text>
                {stateNames
                  .map((st: string) => `${st}, `)
                  .join(' ')
                  .replace(/\,(?=[^,]*$)/, '.')}
              </Text>
              <Text fontSize="xl" fontWeight="bold" mt={4}>
                Nuevo cupo:
              </Text>
              <Text>
                {!limit
                  ? 'Bloques cerrados.'
                  : limit > 1
                  ? `${limit} personas por bloque.`
                  : `${limit} persona por bloque.`}
              </Text>
            </Box>
            <Box display="flex" justifyContent="space-between" py={4}>
              <Button
                _hover={{ bg: 'brand.dark', color: 'white' }}
                color="black"
                onClick={() => setIsOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                bg="brand.medium"
                _hover={{ bg: 'brand.dark' }}
                color="white"
                onClick={() => createRule({ variables: { input: { ...newException } } })}
              >
                Confirmar
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ExceptionConfirmation;
