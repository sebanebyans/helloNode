import { FC, Fragment, useEffect, useState, useRef } from 'react';
import {
  Flex,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  ButtonGroup,
  IconButton,
  Spinner,
  Box,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogFooter,
  AlertDialogHeader,
  Button,
} from '@chakra-ui/react';
import { BsFillTrashFill } from 'react-icons/bs';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_ACTIVE_RULES } from '@src/graphql/Queries/Exceptions';
import { ScheduleClient } from '@src/graphql/clients';
import { BOOKING_SCHEDULES } from '@utils/constants';
import { filter, view, lensPath } from 'ramda';
import { dateToTableText } from '@src/utils/helpers';
import { DELETE_RULE } from '@src/graphql/mutations';
import { useToast } from '@chakra-ui/react';

export interface LooseObject {
  [key: string]: any;
}

const header = ['Agenda', 'Desde', 'Hasta', 'Comunas', 'Cupos', ''];

const ExceptionsTable: FC = () => {
  const toast = useToast();
  const [rules, setRules] = useState([]);
  const [currentRule, setCurrentRule] = useState<string>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const [getRules, { loading: gLoading, error: gError, data: gData }] = useLazyQuery(
    GET_ACTIVE_RULES,
    {
      client: ScheduleClient,
      onCompleted: ({ getListCurrentRules }) => setRules(getListCurrentRules),
      fetchPolicy: 'network-only',
    }
  );
  const [deleteRule, { loading: dLoading, error: dError, data: dData }] = useMutation(DELETE_RULE, {
    client: ScheduleClient,
    fetchPolicy: 'network-only',
    onCompleted: ({ removeScheduleRuleConfig }) => {
      if (removeScheduleRuleConfig) {
        toast({
          title: 'Regla eliminada.',
          description: 'La regla fue eliminada con exito.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        getRules();
        onClose();
        return null;
      }
      toast({
        title: 'Ocurrio un error.',
        description: 'La regla no se pudo eliminar.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      onClose();
      return null;
    },
  });
  useEffect(() => {
    getRules();
  }, [getRules]);
  return (
    <>
      {gLoading ? (
        <Box w="full" h="100%">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="brand.medium"
            size="xl"
          />
        </Box>
      ) : (
        <Flex w="full" p={4} alignItems="center" justifyContent="center">
          <Table w="full" size="sm" variant="simple" bg="white">
            <Thead>
              <Tr>
                {header.map((hdr) => (
                  <Th textAlign="center" key={hdr} p={4}>
                    {hdr}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {rules?.map(({ id, from, until, stateNames, limit, isLab, isCovid }: LooseObject) => {
                const schedTitle = view(
                  lensPath([
                    Object.keys(
                      filter((e) => e.isLab === isLab && e.isCovid === isCovid, BOOKING_SCHEDULES)
                    )[0],
                    'title',
                  ]),
                  BOOKING_SCHEDULES
                );
                const rule: LooseObject = {
                  title: schedTitle,
                  from: dateToTableText(new Date(from)),
                  until: dateToTableText(new Date(until)),
                  stateNames,
                  limit,
                };
                return (
                  <Tr key={id}>
                    {Object.keys(rule).map((x) => {
                      return (
                        <Fragment key={`${id}${x}`}>
                          <Td fontSize="xs" fontWeight="hairline">
                            {x === 'stateNames'
                              ? rule[x]
                                  .map((st: string) => `${st}, `)
                                  .join(' ')
                                  .replace(/\,(?=[^,]*$)/, '.')
                              : rule[x]}
                          </Td>
                        </Fragment>
                      );
                    })}
                    <Td>
                      <ButtonGroup variant="solid" size="sm" spacing={3}>
                        <IconButton
                          color="brand.medium"
                          variant="outline"
                          aria-label="button"
                          icon={<BsFillTrashFill />}
                          onClick={() => {
                            setCurrentRule(id);
                            return onOpen();
                          }}
                        />
                      </ButtonGroup>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Flex>
      )}
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Eliminar regla?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>Estas seguro? Este cambio no puede deshacerse.</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button
              bg="brand.medium"
              color="white"
              ml={3}
              onClick={() => deleteRule({ variables: { removeScheduleRuleConfigId: currentRule } })}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ExceptionsTable;
