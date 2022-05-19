/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
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
  Box,
  useToast,
} from '@chakra-ui/react';
import { EditableOrderFields } from '@src/redux/modal';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@src/redux/store';
import { renderDiff } from '@utils/helpers';
import { isNil } from 'ramda';
import { userFormFields, provinceFields } from '@utils/fields';
import { useMutation } from '@apollo/client';
import { OrderClient } from '@src/graphql/clients';
import { EDIT_ORDER } from '@src/graphql/mutations';
import Query from '@components/Query';
import { closeModal } from '@redux/modal';
import { useUpdateOrders } from '@utils/hooks';

type AlertT = {
  dataToSave: EditableOrderFields | null;
};

const EditOrderAlert: FC<AlertT> = ({ dataToSave }) => {
  const [disabledButtons, setDisabledButtons] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useToast();
  const labels: LooseObject = { ...userFormFields, ...provinceFields };
  const dataToRender: LooseObject = { ...dataToSave };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { originalOrders } = useSelector((state: RootState) => state.orders);
  const { order } = useSelector((state: RootState) => state.modal);
  const cancelRef = useRef(null);
  const differences = order && dataToSave && renderDiff(order, dataToSave);
  const hasDifferences = !isNil(differences) ? Object.keys(differences) : [];
  const { examId, orderNumber, orderState } = dataToRender;
  //@ts-ignore
  const { stateName, province, start, end, date, address, addressDetail, addressNumber, ...rest } =
    differences;
  const { getOrders, loading: getLoading } = useUpdateOrders();
  const [saveOrder, { loading: mutLoading, error, data }] = useMutation(EDIT_ORDER, {
    variables: {
      input: {
        examId,
        order: String(orderNumber),
        booking: {
          stateName,
          province,
          start,
          end,
          date,
          address,
          addressNumber,
          addressDetail,
        },
        user: {
          ...rest,
        },
      },
    },
    client: OrderClient,
    onCompleted: ({ modifiedOrder }) => {
      if (modifiedOrder) {
        try {
          const fetchedOrders = getOrders();
          if (fetchedOrders) {
            return toast({
              title: `La orden fue editada.`,
              description: 'Las ordenes se actualizaran automaticamente',
              status: 'success',
              duration: 3000,
            });
          }
        } catch (e) {
          return null;
        }
      }
    },
    onError: () => {
      toast({
        title: 'Ocurrio un error al editar la orden',
        description: 'Revisa los parametros e intenta nuevamente',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });
  const loading = getLoading || mutLoading;
  useEffect(() => {
    if (disabledButtons) {
      onClose();
      dispatch(closeModal());
    }
  }, [originalOrders]);
  return (
    <>
      <Button bg="brand.medium" color="white" onClick={onOpen} disabled={hasDifferences.length < 1}>
        Guardar cambios
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
            <Query loading={loading} error={undefined} data={data}>
              <Alert status="warning">
                <AlertIcon />
                IMPORTANTE! Esta accion no se puede deshacer.
              </Alert>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Editar orden N {order?.orderNumber}
              </AlertDialogHeader>
              <AlertDialogBody>
                <Text fontSize="1.2rem" fontWeight="bold">
                  Valores modificados:
                </Text>
                {hasDifferences.map((key) => {
                  const { label } = labels[key].inputProps;
                  const value = dataToRender[key];
                  return (
                    <Box key={key}>
                      <Text fontSize="1.2rem" fontWeight="bold" display="inline-flex">
                        {label}:
                      </Text>
                      <Text fontSize="1rem" display="inline-flex" ml={4}>
                        {value}
                      </Text>
                    </Box>
                  );
                })}
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose} disabled={data && true}>
                  Cancelar
                </Button>
                <Button
                  bg="brand.medium"
                  color="white"
                  onClick={() => {
                    setDisabledButtons(true);
                    saveOrder();
                  }}
                  ml={3}
                  disabled={data && true}
                >
                  Aceptar
                </Button>
              </AlertDialogFooter>
            </Query>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default EditOrderAlert;
