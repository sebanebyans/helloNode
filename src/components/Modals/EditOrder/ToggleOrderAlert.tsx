/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useRef, useState } from 'react';
import {
  Alert,
  AlertIcon,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  useDisclosure,
  Text,
  useToast,
} from '@chakra-ui/react';
import { EditableOrderFields } from '@src/redux/modal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@src/redux/store';
import { useMutation } from '@apollo/client';
import { OrderClient } from '@src/graphql/clients';
import { EDIT_ORDER } from '@src/graphql/mutations';
import Query from '@components/Query';
import { useUpdateOrders } from '@utils/hooks';
import { closeModal } from '@redux/modal';
type AlertT = {
  dataToSend?: EditableOrderFields;
};

const ToggleOrderAlert: FC<AlertT> = ({ dataToSend }) => {
  const { orderNumber, orderState } = {
    ...dataToSend,
  };
  const [disabledButtons, setDisabledButtons] = useState(false);
  const dispatch = useDispatch();
  const isEnabled = orderState === 'Habilitado';
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { originalOrders } = useSelector((state: RootState) => state.orders);
  const { order } = useSelector((state: RootState) => state.modal);
  const cancelRef = useRef(null);
  const { getOrders, loading: hLoading } = useUpdateOrders();
  const [saveOrder, { loading: mLoading }] = useMutation(EDIT_ORDER, {
    client: OrderClient,
    onCompleted: ({ modifiedOrder }) => {
      if (modifiedOrder) {
        try {
          const fetchedOrders = getOrders();
          if (fetchedOrders) {
            return toast({
              title: `La orden fue ${isEnabled ? 'anulada' : 'habilitada'}`,
              description: 'Las ordenes se actualizaran automaticamente',
              status: 'success',
              duration: 10000,
            });
          }
        } catch (e) {
          return null;
        }
      }
    },
    onError: () => {
      toast({
        title: `Ocurrio un error al ${isEnabled ? 'anular' : 'habilitar'} la orden`,
        description: 'Intenta nuevamente',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });
  const loading = hLoading || mLoading;
  useEffect(() => {
    if (disabledButtons) {
      onClose();
      dispatch(closeModal());
    }
  }, [originalOrders]);
  return (
    <>
      <Button bg={isEnabled ? 'red.900' : 'green.300'} color="white" onClick={onOpen}>
        {isEnabled ? 'Anular orden' : 'Habilitar orden'}
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        closeOnEsc={false}
        closeOnOverlayClick={false}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <Query loading={loading} error={undefined}>
              <Alert status="warning">
                <AlertIcon />
                IMPORTANTE! Esta accion no se puede deshacer.
              </Alert>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                {isEnabled ? 'Anular orden' : 'Habilitar orden'} N {order?.orderNumber}
              </AlertDialogHeader>
              <AlertDialogBody>
                <Text fontSize="1.2rem" fontWeight="bold">
                  Estas seguro que deseas continuar?
                </Text>
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose} disabled={disabledButtons}>
                  Cancelar
                </Button>
                <Button
                  disabled={disabledButtons}
                  bg="brand.medium"
                  color="white"
                  onClick={() => {
                    setDisabledButtons(true);
                    saveOrder({
                      variables: {
                        input: {
                          order: String(orderNumber),
                          isCanceled: isEnabled,
                        },
                      },
                    });
                  }}
                  ml={3}
                >
                  {isEnabled ? 'Anular orden' : 'Habilitar orden'}
                </Button>
              </AlertDialogFooter>
            </Query>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ToggleOrderAlert;
