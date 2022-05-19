/* eslint-disable react-hooks/exhaustive-deps */
import { FC, Fragment, useEffect, useState, useRef } from 'react';
import { useLazyQuery } from '@apollo/client';
import { OrderClient } from '@src/graphql/clients';
import { GET_SOFTLAND_REPORTS, EXPORT_SOFTLAND } from '@src/graphql/Queries/Exports';
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
  Text,
  HStack,
  Input,
} from '@chakra-ui/react';
import { BsDownload } from 'react-icons/bs';
import Query from '@components/Query';
import { exportGraphqlData } from '@src/utils/exportData';

type SoftlandReportT = {
  dateIni: string;
  dateEnd: string;
  affectionNumber: number;
  exemptNumber: number;
  createdAt: string;
};
const Logs: FC = () => {
  const [download, setDownload] = useState<SoftlandReportT>();
  const [affectInvoice, setAffectInvoice] = useState<number>(0);
  const [exemptInvoice, setExemptInvoice] = useState<number>(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const header = [
    'Fecha de inicio',
    'Fecha final',
    'Folio afecto',
    'Folio exento',
    'Fecha de creacion',
    '',
  ];
  const [reports, setReports] = useState<SoftlandReportT[]>([]);
  const [exportSoftland, { loading: exportLoading, error: exportError, data: exportData }] =
    useLazyQuery(EXPORT_SOFTLAND, {
      client: OrderClient,
      onCompleted: ({ getSoftlandReport }) => {
        exportGraphqlData(getSoftlandReport, 'softland');
        onClose();
      },
      fetchPolicy: 'network-only',
    });
  const [getReports, { loading, data, error }] = useLazyQuery(GET_SOFTLAND_REPORTS, {
    client: OrderClient,
    fetchPolicy: 'network-only',
    onCompleted: ({ getAllSoftlandReport }) => setReports(getAllSoftlandReport),
  });
  useEffect(() => {
    getReports();
  }, []);
  return (
    <>
      <Query loading={loading} data={data} error={undefined}>
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
              {reports?.map(
                ({ affectionNumber, createdAt, dateEnd, dateIni, exemptNumber }: LooseObject) => {
                  const report: LooseObject = {
                    dateIni: dateIni,
                    dateEnd: dateEnd,
                    affectionNumber,
                    exemptNumber,
                    createdAt: createdAt,
                  };
                  return (
                    <Tr key={createdAt}>
                      {Object.keys(report).map((x) => {
                        return (
                          <Fragment key={`${createdAt}${x}`}>
                            <Td fontSize="xs" fontWeight="hairline" textAlign="center">
                              {report[x]}
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
                            icon={<BsDownload />}
                            onClick={() => {
                              setDownload(report as SoftlandReportT);
                              return onOpen();
                            }}
                          />
                        </ButtonGroup>
                      </Td>
                    </Tr>
                  );
                }
              )}
            </Tbody>
          </Table>
        </Flex>
      </Query>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Descargar planilla</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <HStack justifyContent="space-around">
              <Box>
                <Text fontSize="1.2rem" fontWeight="bold">
                  Dia inicio
                </Text>
                <Text fontSize="1rem">{download?.dateIni}</Text>
              </Box>
              <Box>
                <Text fontSize="1.2rem" fontWeight="bold">
                  Dia Final
                </Text>
                <Text fontSize="1rem">{download?.dateEnd}</Text>
              </Box>
            </HStack>
            <HStack justifyContent="center" alignItems="center" mb={8}>
              <Box>
                <Text textAlign="center" fontSize="1.2rem" fontWeight="bold">
                  Folio afecto inicial
                </Text>
                <Input
                  value={affectInvoice}
                  onChange={(e) => setAffectInvoice(Number(e.target.value))}
                  type="number"
                />
              </Box>
              <Box>
                <Text textAlign="center" fontSize="1.2rem" fontWeight="bold">
                  Folio exento inicial
                </Text>
                <Input
                  value={exemptInvoice}
                  onChange={(e) => setExemptInvoice(Number(e.target.value))}
                  type="number"
                />
              </Box>
            </HStack>
          </AlertDialogBody>
          <AlertDialogFooter justifyContent="space-around">
            <Query loading={exportLoading} error={undefined} data={exportData}>
              <Button ref={cancelRef} onClick={onClose}>
                Cacelar
              </Button>
              <Button
                bg="brand.medium"
                color="white"
                ml={3}
                onClick={() =>
                  exportSoftland({
                    variables: {
                      dateIni: download?.dateIni,
                      dateEnd: download?.dateEnd,
                      affectionNumber: affectInvoice,
                      exemptNumber: exemptInvoice,
                      saveReport: false,
                    },
                  })
                }
              >
                Descargar
              </Button>
            </Query>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
export default Logs;
