import { FC, useEffect, useMemo, useRef, useState } from 'react';
import {
  Button,
  Container,
  Box,
  Flex,
  Spacer,
  Switch,
  Stack,
  VStack,
  Code,
  Badge,
  useToast,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogBody,
  useDisclosure,
  AlertDialogCloseButton,
} from '@chakra-ui/react';

import EditExamModal from '@components/Modals/EditExam/EditExamModal';
import { AddIcon } from '@chakra-ui/icons';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';
import DataTable from 'react-data-table-component';
import FilterExam from '@components/Tables/Exams/FilterExam';
import { useMutation } from '@apollo/client';
import { REMOVE_EXAM } from '@src/graphql/Queries/Exams';
import { AdminClient } from '@src/graphql/clients';

type examsTableT = {
  exams: any[];
  onRefetch: () => any;
};

type ExamRemove = {
  id: string;
  title: string;
};

const exam: any = {
  code: '',
  title: '',
  completeTitle: '',
  description: '',
  resultTime: '',
  category: '',
  price: 0,
  priceFonasa: 0,
  isCovid: false,
  isLabOnly: false,
  highlight: false,
  searchTags: null,
  reason: '',
  enabled: true,
  isVisible: false,
  isFast: false,
  isPack: false,
  tags: null,
};
const ExamsTable: FC<examsTableT> = ({ exams, onRefetch }) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    editingExam: null,
    isCreate: false,
  });
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [examRemove, setExamRemove] = useState<ExamRemove>({ id: '', title: '' });
  const { isOpen: isOpenAlert, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const toast = useToast();

  const { isOpen, editingExam, isCreate } = modalState;

  const onclose = () => {
    setModalState({ isOpen: false, editingExam: null, isCreate: false });
  };

  const handleEditExam = (exam: any) => {
    setModalState({ isOpen: true, editingExam: exam, isCreate: false });
  };

  const handleRemoveExam = (row: any) => {
    setExamRemove({ id: row.id, title: row.title });
    onOpen();
  };

  const createExam = () => {
    setModalState({ isOpen: true, editingExam: exam, isCreate: true });
  };

  const [removeExam, { loading, error, data }] = useMutation(REMOVE_EXAM, {
    client: AdminClient,
    onCompleted: ({ removeExam }) => {
      if (removeExam) {
        try {
          if (removeExam) {
            onRefetch();
            return toast({
              title: `Examen eliminado`,
              description: 'El examen fue eliminado correctamente',
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
        title: 'Ocurrio un error al editar el examen',
        description: 'Revisa los parametros e intenta nuevamente',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const columns = [
    {
      name: 'Nombre Examen',
      selector: (row: any) => row.title,
      sortable: true,
      grow: 5,
    },
    {
      name: 'Código',
      selector: (row: any) => row.code,
      sortable: true,
      right: true,
      grow: 4,
    },
    {
      name: 'Categoria',
      selector: (row: any) => row.category,
      sortable: true,
      right: true,
      grow: 4,
    },
    {
      name: 'Precio',
      selector: (row: any) => row.price,
      sortable: true,
      right: true,
      grow: 3,
      format: function price(row: any) {
        return (
          <>
            {!row.price ? '' : '$'} {row.price}
          </>
        );
      },
    },
    {
      name: 'Precio Fonasa',
      selector: (row: any) => row.priceFonasa,
      sortable: true,
      right: true,
      grow: 3,
      format: function priceFonasa(row: any) {
        return (
          <>
            {!row.priceFonasa ? '' : '$'} {row.priceFonasa}
          </>
        );
      },
    },
    {
      name: 'Visible',
      selector: (row: any) => row.isVisible,
      sortable: true,
      right: true,
      grow: 3,
      format: function enabled(row: any) {
        return (
          <>
            <Stack align="center" direction="row">
              <Switch
                name="enabled"
                size="sm"
                id="enabled"
                isReadOnly
                isChecked={row.isVisible === true ? true : false}
              />
            </Stack>
          </>
        );
      },
    },
    {
      name: 'Editar',
      selector: (row: any) => row.id,
      format: function buttonEdit(row: any) {
        return (
          <>
            <Button variant="ghost" onClick={() => handleEditExam(row)}>
              <FiEdit />
            </Button>
          </>
        );
      },
      grow: 0,
    },
    {
      name: 'Eliminar',
      selector: (row: any) => row.id,
      cell: function buttonDelete(row: any) {
        return (
          <>
            <Button variant="ghost" size="md" onClick={() => handleRemoveExam(row)}>
              <RiDeleteBinLine />
            </Button>
          </>
        );
      },
      button: true,
      grow: 0,
    },
  ];

  const paginationOptions = {
    rowsPerPageText: 'Filas por Página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  };

  const ExpandedComponent = ({ data }: any) => (
    <>
      <VStack spacing={0} pl={5} align="stretch">
        <Box>
          <Badge pr={2}>Código examen:</Badge>
          <Code variant="">{data.code}</Code>
        </Box>

        <Box>
          <Badge pr={2}>Tiempo de resultados :</Badge>
          <Code variant="">{data.resultTime}</Code>
        </Box>

        <Box>
          <Badge pr={2}>Descripción del examen:</Badge>
          <Code fontSize="sm" variant="">
            {data.description}
          </Code>
        </Box>
      </VStack>
    </>
  );

  const filteredItems = exams.filter(
    (item) =>
      item.title.toLowerCase() && item.title.toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <FilterExam
        onFilter={(e: any) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <>
      <Container p="0" maxW="100%" bg="white">
        <Flex alignItems="right">
          <Spacer />
          <Box p="2">
            <Button variant="solid" onClick={() => createExam()} leftIcon={<AddIcon />}>
              Crear examen
            </Button>
          </Box>
        </Flex>
        <Box padding="2">
          <DataTable
            columns={columns}
            data={filteredItems}
            pagination
            paginationComponentOptions={paginationOptions}
            paginationPerPage={25}
            subHeader
            fixedHeader
            fixedHeaderScrollHeight="600px"
            dense
            expandableRows
            expandableRowsComponent={ExpandedComponent}
            subHeaderComponent={subHeaderComponent}
          />
        </Box>

        <AlertDialog
          motionPreset="slideInBottom"
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isOpen={isOpenAlert}
          isCentered
        >
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogHeader>Desea eliminar el exámen?</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              <Code type="solid" colorScheme="red" align="justify">
                {examRemove.title}
              </Code>{' '}
              <br /> Este cambio no puede deshacerse.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                No
              </Button>
              <Button
                bg="brand.medium"
                color="white"
                ml={3}
                onClick={() => removeExam({ variables: { removeExamId: examRemove.id } })}
              >
                Sí
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <EditExamModal
          exam={editingExam}
          isOpen={isOpen}
          onClose={onclose}
          isCreate={isCreate}
          onRefetch={onRefetch}
        />
      </Container>
    </>
  );
};

export default ExamsTable;
