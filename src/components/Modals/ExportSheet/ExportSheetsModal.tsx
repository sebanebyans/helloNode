import { FC, useState } from 'react';
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  Box,
  Input,
  HStack,
  Text,
} from '@chakra-ui/react';
import { useLazyQuery } from '@apollo/client';
import { OrderClient } from '@src/graphql/clients';
import { EXPORT_SIMPLIROUTE, EXPORT_NOVUSLIS, EXPORT_SOFTLAND } from '@src/graphql/Queries/Exports';
import { LIST_OPERATION_ORDERS } from '@src/graphql/Queries';
import { exportGraphqlData } from '@utils/exportData';
import ExportSheetDates from './ExportSheetDates';
import { formatUTCDate, formatDateNotHours } from '@utils/helpers';
import Query from '@components/Query';
import { startOfDay, endOfDay } from '../../../utils/helpers';

type RangeT = { from: Date; until: Date };

interface FromT {
  from: Date;
  until?: never;
}
interface UntilT {
  until: Date;
  from?: never;
}
type TimeT = FromT | UntilT;

const ExportSheetsModal: FC = () => {
  const [range, setRange] = useState<RangeT>({ from: new Date(), until: new Date() });
  const [affectionNumber, setAffectionNumber] = useState<number>(0);
  const [exemptNumber, setExemptNumber] = useState<number>(0);
  const handleRange = (param: TimeT) => setRange({ ...range, ...param });
  const dateIni = startOfDay(range.from);
  const dateEnd = endOfDay(range.until);
  const isCovid = true;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [exportSimpliRoute, { loading: simpliLoading, error: simpliError }] = useLazyQuery(
    EXPORT_SIMPLIROUTE,
    {
      client: OrderClient,
      onCompleted: ({ getSimpliRouteReport }) => {
        return exportGraphqlData(getSimpliRouteReport, 'simpliRoute');
      },
      fetchPolicy: 'network-only',
    }
  );
  const [exportNovuslis, { loading: novuslisLoading, error: novuslisError }] = useLazyQuery(
    EXPORT_NOVUSLIS,
    {
      client: OrderClient,
      onCompleted: ({ getNovuslisReport }) => {
        return exportGraphqlData(getNovuslisReport, 'novuslis');
      },
      fetchPolicy: 'network-only',
    }
  );
  const [exportSoftland, { loading: softlandLoading, error: softlandError }] = useLazyQuery(
    EXPORT_SOFTLAND,
    {
      client: OrderClient,
      onCompleted: ({ getSoftlandReport }) => {
        return exportGraphqlData(getSoftlandReport, 'softland');
      },
      fetchPolicy: 'network-only',
    }
  );
  const [exportAll, { loading: exportAllLoading, error: exportAllError }] = useLazyQuery(
    LIST_OPERATION_ORDERS,
    {
      client: OrderClient,
      onCompleted: ({ getOrderForBackOffice }) => {
        return exportGraphqlData(getOrderForBackOffice, 'allOrders');
      },
      fetchPolicy: 'network-only',
    }
  );

  const isLoading = simpliLoading || novuslisLoading || softlandLoading || exportAllLoading;
  const hasError = simpliError || novuslisError || softlandError || exportAllError;
  const handleTime = ({ from, until }: TimeT) => {
    if (from) {
      return handleRange({ from });
    }
    if (until) {
      return handleRange({ until });
    }
  };
  return (
    <>
      <Button bg="brand.medium" color="white" onClick={onOpen}>
        Exportar datos
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Exportar datos</ModalHeader>
          <ModalCloseButton />
          <ModalBody py={4}>
            <Query loading={isLoading} error={undefined}>
              <ExportSheetDates range={range} handleRange={handleTime} />
              <HStack justifyContent="center" alignItems="center" mb={8}>
                <Box>
                  <Text textAlign="center" fontSize="1.5rem" fontWeight="bold">
                    Folio afecto inicial
                  </Text>
                  <Input
                    value={affectionNumber}
                    onChange={(e) => setAffectionNumber(Number(e.target.value))}
                    type="number"
                  />
                </Box>
                <Box>
                  <Text textAlign="center" fontSize="1.5rem" fontWeight="bold">
                    Folio exento inicial
                  </Text>
                  <Input
                    value={exemptNumber}
                    onChange={(e) => setExemptNumber(Number(e.target.value))}
                    type="number"
                  />
                </Box>
              </HStack>
              <Text textAlign="center" fontSize="1.5rem" fontWeight="bold">
                Exportar planillas:
              </Text>
              <Box display="flex" justifyContent="space-around" mt={4} flexWrap="wrap">
                <Button
                  bg="brand.medium"
                  color="white"
                  onClick={() => {
                    exportSimpliRoute({
                      variables: { dateIni, dateEnd },
                    });
                  }}
                  _hover={{ bg: 'brand.light' }}
                  minW="122px"
                  mr={4}
                  mb={4}
                >
                  SimpliRoute
                </Button>
                <Button
                  bg="brand.medium"
                  color="white"
                  onClick={() => {
                    exportNovuslis({
                      variables: { dateIni, dateEnd, isCovid: true },
                    });
                  }}
                  _hover={{ bg: 'brand.light' }}
                  minW="122px"
                  mr={4}
                  mb={4}
                >
                  Novuslis / PCR
                </Button>
                <Button
                  bg="brand.medium"
                  color="white"
                  onClick={() => {
                    exportNovuslis({
                      variables: { dateIni, dateEnd, isCovid: false },
                    });
                  }}
                  _hover={{ bg: 'brand.light' }}
                  minW="122px"
                  mr={4}
                  mb={4}
                >
                  Novuslis / Core
                </Button>
                <Button
                  mb={4}
                  bg="brand.medium"
                  color="white"
                  onClick={() => {
                    exportSoftland({
                      variables: {
                        dateIni,
                        dateEnd,
                        affectionNumber,
                        exemptNumber,
                        saveReport: true,
                      },
                    });
                  }}
                  _hover={{ bg: 'brand.light' }}
                  minW="122px"
                >
                  Softland
                </Button>
                <Button
                  bg="brand.medium"
                  color="white"
                  mb={4}
                  onClick={() => {
                    exportAll({
                      variables: {
                        dateIni: formatDateNotHours(range.from),
                        dateEnd: formatDateNotHours(range.until),
                        limit: '2000',
                      },
                    });
                  }}
                  _hover={{ bg: 'brand.light' }}
                  minW="122px"
                >
                  Exportar Ordenes
                </Button>
              </Box>
            </Query>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ExportSheetsModal;
