import { FC, useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  Switch,
  SimpleGrid,
} from '@chakra-ui/react';
import {
  FormControl,
  FormLabel,
  Badge,
  Divider,
  Input,
  FormHelperText,
  Text,
  RadioGroup,
  Radio,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
  Stack,
  useToast,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { EDIT_EXAM, CREATE_EXAM } from '@src/graphql/Queries/Exams';
import { AdminClient } from '@src/graphql/clients';

type EditExamModalT = {
  exam: any;
  isOpen: boolean;
  onClose: () => void;
  isCreate: boolean;
  onRefetch: () => void;
};

const formValidation = {
  code: {
    isError: false,
    errorText: '',
  },
  title: {
    isError: false,
    errorText: '',
  },
  completeTitle: {
    isError: false,
    errorText: '',
  },
  description: {
    isError: false,
    errorText: '',
  },
  category: {
    isError: false,
    errorText: '',
  },
  resultTime: {
    isError: false,
    errorText: '',
  },
  price: {
    isError: false,
    errorText: '',
  },
  priceFonasa: {
    isError: false,
    errorText: '',
  },
};

const EditExamModal: FC<EditExamModalT> = ({ exam, isOpen, onClose, isCreate, onRefetch }) => {
  const [currentExamState, setcurrentExamState] = useState(exam);
  const [formValidationState, setFormValidationState] = useState(formValidation);
  const [disabledButtons, setDisabledButtons] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();

  const [saveExam, { loading: mutLoading, error, data }] = useMutation(EDIT_EXAM, {
    variables: {
      input: {
        ...currentExamState,
      },
    },
    client: AdminClient,
    onCompleted: ({ updateExam }) => {
      if (updateExam) {
        try {
          onRefetch();
          if (updateExam) {
            return toast({
              title: `El examen fue editado.`,
              description: 'El examen se actualizará automaticamente',
              status: 'success',
              duration: 3000,
            });
          }
          onClose();
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

  const [createExam, { loading: mutLoadingCreate, error: errorCreate, data: dataCreate }] =
    useMutation(CREATE_EXAM, {
      variables: {
        input: {
          ...currentExamState,
        },
      },
      client: AdminClient,
      onCompleted: ({ createExam }) => {
        if (createExam) {
          try {
            onRefetch();
            if (createExam) {
              onClose();
              return toast({
                title: `Éxito`,
                description: 'Su examen fue guardado correctamente',
                status: 'success',
                duration: 3000,
              });
            } else {
              return toast({
                title: 'Ocurrio un error al editar el examen',
                description: 'El código ya está en uso',
                status: 'error',
                duration: 5000,
                isClosable: true,
              });
            }
          } catch (e) {
            return null;
          }
        } else {
          return toast({
            title: 'Ocurrio un error al editar el examen',
            description: 'El código ya está en uso',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      },
      onError: () => {
        toast({
          title: 'Ocurrio un error al editar el examen',
          description: 'El código ya está en uso',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      },
    });

  useEffect(() => {
    setcurrentExamState(exam);
    if (disabledButtons) {
      dispatch(onClose);
    }
  }, [exam]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setcurrentExamState((currentExamState: any) => ({ ...currentExamState, [name]: value }));
    setFormValidationState((formValidation: any) => ({
      ...formValidation,
      [name]: {
        isError: false,
        errorText: '',
      },
    }));
  };

  const handleArrayChange = (e: any) => {
    const { name, value } = e.target.split(' ');
    setcurrentExamState((currentExamState: any) => ({ ...currentExamState, [name]: value }));
  };

  const handleInputChangeCustom = (name: any, value: any) => {
    setcurrentExamState((currentExamState: any) => ({
      ...currentExamState,
      [name]: str2bool(value),
    }));
  };

  const handleNumberChangeCustom = (name: any, value: any) => {
    setcurrentExamState((currentExamState: any) => ({
      ...currentExamState,
      [name]: parseInt(value),
    }));
    setFormValidationState((formValidation: any) => ({
      ...formValidation,
      [name]: {
        isError: false,
        errorText: '',
      },
    }));
  };

  const str2bool = (value: any) => {
    if (value && typeof value === 'string') {
      if (value.toLowerCase() === 'true') return true;
      if (value.toLowerCase() === 'false') return false;
    }
    return value;
  };

  const bool2str = (value: boolean) => {
    if (value === false || value === true) {
      if (value === true) return 'true';
      if (value === false) return 'false';
    }
    return value;
  };

  const isValid = () => {
    return (
      !formValidationState.code.isError &&
      !formValidationState.title.isError &&
      !formValidationState.completeTitle.isError &&
      !formValidationState.description.isError &&
      !formValidationState.category.isError &&
      !formValidationState.resultTime.isError &&
      !formValidationState.price.isError &&
      !formValidationState.priceFonasa.isError
    );
  };

  const validateExam = () => {
    let isError = false;
    if (!currentExamState?.code || currentExamState?.code == '') {
      setFormValidationState((validation: any) => ({
        ...validation,
        ['code']: { isError: true, errorText: 'Debes agregar un código' },
      }));
      isError = true;
    }
    if (!currentExamState?.title || currentExamState?.title == '') {
      setFormValidationState((validation: any) => ({
        ...validation,
        ['title']: { isError: true, errorText: 'Debes agregar un título' },
      }));
      isError = true;
    }
    if (!currentExamState?.completeTitle || currentExamState?.completeTitle == '') {
      setFormValidationState((validation: any) => ({
        ...validation,
        ['completeTitle']: { isError: true, errorText: 'Debes agregar un título' },
      }));
      isError = true;
    }
    if (!currentExamState?.description || currentExamState?.description == '') {
      setFormValidationState((validation: any) => ({
        ...validation,
        ['description']: { isError: true, errorText: 'Debes agregar un description' },
      }));
      isError = true;
    }
    if (!currentExamState?.category || currentExamState?.category == '') {
      setFormValidationState((validation: any) => ({
        ...validation,
        ['category']: { isError: true, errorText: 'Debes agregar una categoría' },
      }));
      isError = true;
    }
    if (!currentExamState?.resultTime || currentExamState?.resultTime == '') {
      setFormValidationState((validation: any) => ({
        ...validation,
        ['resultTime']: { isError: true, errorText: 'Debes agregar un tiempo de resultado' },
      }));
      isError = true;
    }
    if (parseInt(currentExamState?.price) < 0) {
      setFormValidationState((validation: any) => ({
        ...validation,
        ['price']: { isError: true, errorText: 'Debes agregar un valor igual o mayor a cero' },
      }));
      isError = true;
    }
    if (parseInt(currentExamState?.priceFonasa) < 0) {
      setFormValidationState((validation: any) => ({
        ...validation,
        ['priceFonasa']: {
          isError: true,
          errorText: 'Debes agregar un valor igual o mayor a cero',
        },
      }));
      isError = true;
    }
    return !isError;
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{currentExamState?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display="flex" flexWrap="wrap">
              <SimpleGrid columns={2} spacing={10}>
                <Box>
                  <FormControl pb={2} isInvalid={formValidationState.code.isError}>
                    <FormLabel htmlFor="code">Código del examen</FormLabel>
                    <Input
                      type="text"
                      name="code"
                      size="sm"
                      placeholder="Código del examen"
                      id="code"
                      value={currentExamState?.code}
                      onChange={handleInputChange}
                    />
                    {formValidationState.code.isError ? (
                      <FormErrorMessage>{formValidationState.code.errorText}</FormErrorMessage>
                    ) : (
                      ''
                    )}
                  </FormControl>
                </Box>
                <Box>
                  <FormControl>
                    <FormLabel htmlFor="isChecked" pb={2}>
                      {currentExamState?.isVisible === true ? (
                        <Badge variant="solid" colorScheme="green">
                          Visible
                        </Badge>
                      ) : (
                        <Badge variant="solid" colorScheme="red">
                          Invisible
                        </Badge>
                      )}
                    </FormLabel>
                    <Switch
                      name="enabled"
                      id="isEnabled"
                      isChecked={currentExamState?.isVisible === true ? true : false}
                      onChange={({ target }) => {
                        handleInputChangeCustom('isVisible', target.checked);
                      }}
                    />
                  </FormControl>
                </Box>
              </SimpleGrid>

              <FormControl pb={2} isInvalid={formValidationState.title.isError}>
                <FormLabel htmlFor="name">Nombre del examen</FormLabel>
                <Input
                  id="text"
                  type="text"
                  name="title"
                  size="sm"
                  value={currentExamState?.title}
                  onChange={handleInputChange}
                />
                {formValidationState.title.isError ? (
                  <FormErrorMessage>{formValidationState.title.errorText}</FormErrorMessage>
                ) : (
                  ''
                )}
              </FormControl>

              <FormControl pb={2} isInvalid={formValidationState.completeTitle.isError}>
                <FormLabel htmlFor="name">Nombre completo del examen</FormLabel>
                <Input
                  id="text"
                  type="text"
                  name="completeTitle"
                  size="sm"
                  value={currentExamState?.completeTitle}
                  onChange={handleInputChange}
                />
                {formValidationState.title.isError ? (
                  <FormErrorMessage>{formValidationState.completeTitle.errorText}</FormErrorMessage>
                ) : (
                  ''
                )}
              </FormControl>
              <FormControl pb={2} isInvalid={formValidationState.description.isError}>
                <Text mb="8px">Descripción del examen</Text>
                <Textarea
                  type="text"
                  name="description"
                  value={currentExamState?.description}
                  onChange={handleInputChange}
                  placeholder="Indique una descripción para el examen"
                  size="sm"
                  mb={2}
                />
                {formValidationState.description.isError ? (
                  <FormErrorMessage>{formValidationState.description.errorText}</FormErrorMessage>
                ) : (
                  ''
                )}
              </FormControl>
              <FormControl>
                <Text mb="8px">Tags</Text>
                <Textarea
                  type="text"
                  name="tags"
                  value={currentExamState?.tags == null ? '' : currentExamState?.tags + ''}
                  onChange={handleInputChange}
                  placeholder="Escriba una etiqueta"
                  size="sm"
                  mb={2}
                />
              </FormControl>
              <FormControl>
                <Text mb="8px">Palabras de búsqueda</Text>
                <Textarea
                  type="text"
                  name="searchTags"
                  value={
                    currentExamState?.searchTags == null ? '' : currentExamState?.searchTags + ''
                  }
                  onChange={handleInputChange}
                  placeholder="Escriba palabras para búsqueda"
                  size="sm"
                  mb={2}
                />
              </FormControl>
              <FormControl pb={2} isInvalid={formValidationState.resultTime.isError}>
                <FormLabel htmlFor="resultTime">Tiempo</FormLabel>
                <Input
                  placeholder="Resultados en 12 horas"
                  id="text"
                  type="text"
                  size="sm"
                  name="resultTime"
                  value={currentExamState?.resultTime}
                  onChange={handleInputChange}
                />
                {formValidationState.resultTime.isError ? (
                  <FormErrorMessage>{formValidationState.resultTime.errorText}</FormErrorMessage>
                ) : (
                  ''
                )}
              </FormControl>
              <FormControl pb={2} isInvalid={formValidationState.category.isError}>
                <FormLabel htmlFor="category">Categoria</FormLabel>
                <Input
                  id="text"
                  type="text"
                  size="sm"
                  name="category"
                  value={currentExamState?.category}
                  onChange={handleInputChange}
                />
                {formValidationState.category.isError ? (
                  <FormErrorMessage>{formValidationState.category.errorText}</FormErrorMessage>
                ) : (
                  ''
                )}
              </FormControl>
              <Divider mt={2} />
              <Stack>
                <FormControl as="fieldset">
                  <RadioGroup
                    type="radio"
                    name="isCovid"
                    defaultValue="false"
                    value={bool2str(currentExamState?.isCovid)}
                    onChange={(e) => handleInputChangeCustom('isCovid', e)}
                  >
                    <HStack spacing="24px">
                      <Radio size="sm" value="true">
                        Es Covid
                      </Radio>
                      <Radio size="sm" value="false">
                        No es Covid
                      </Radio>
                    </HStack>
                  </RadioGroup>
                </FormControl>
              </Stack>
              <Divider />
              <Stack>
                <FormControl as="fieldset">
                  <RadioGroup
                    type="radio"
                    name="isFast"
                    defaultValue="false"
                    value={bool2str(currentExamState?.isFast)}
                    onChange={(e) => handleInputChangeCustom('isFast', e)}
                  >
                    <HStack spacing="24px">
                      <Radio size="sm" value="true">
                        Con Ayuno
                      </Radio>
                      <Radio size="sm" value="false">
                        Sin Ayuno
                      </Radio>
                    </HStack>
                  </RadioGroup>
                </FormControl>
              </Stack>
              <Divider />
              <Stack>
                <FormControl as="fieldset">
                  <RadioGroup
                    type="radio"
                    name="isLabOnly"
                    defaultValue="false"
                    value={bool2str(currentExamState?.isLabOnly)}
                    onChange={(e) => handleInputChangeCustom('isLabOnly', e)}
                  >
                    <HStack spacing="24px">
                      <Radio size="sm" value="true">
                        Solo en Laboratorio
                      </Radio>
                      <Radio size="sm" value="false">
                        Laboratorio y domicilio
                      </Radio>
                    </HStack>
                  </RadioGroup>
                </FormControl>
              </Stack>
              <Divider />
              <Stack mb={2}>
                <FormControl as="fieldset">
                  <RadioGroup
                    type="radio"
                    name="highlight"
                    id="highlight"
                    defaultValue="false"
                    value={bool2str(currentExamState?.highlight)}
                    onChange={(e) => handleInputChangeCustom('highlight', e)}
                  >
                    <HStack spacing="24px">
                      <Radio size="sm" value="true">
                        Examen Destacado
                      </Radio>
                      <Radio size="sm" value="false">
                        No es Destacado
                      </Radio>
                    </HStack>
                  </RadioGroup>
                </FormControl>
              </Stack>
              <Divider />
              <Divider />
              <HStack>
                <Stack>
                  <FormControl isInvalid={formValidationState.price.isError}>
                    <FormLabel htmlFor="price">Precio Particular</FormLabel>
                    <NumberInput
                      name="price"
                      type="number"
                      id="price"
                      max={9999999}
                      min={0}
                      value={currentExamState?.price}
                      onChange={(e) => {
                        handleNumberChangeCustom('price', e);
                      }}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    {formValidationState.price.isError ? (
                      <FormErrorMessage>{formValidationState.price.errorText}</FormErrorMessage>
                    ) : (
                      ''
                    )}
                  </FormControl>
                </Stack>
                <Stack>
                  <FormControl isInvalid={formValidationState.priceFonasa.isError}>
                    <FormLabel htmlFor="price">Precio Fonasa</FormLabel>
                    <NumberInput
                      name="priceFonasa"
                      type="number"
                      max={9999999}
                      min={0}
                      id="priceFonasa"
                      defaultValue={currentExamState?.priceFonasa}
                      // value={currentExamState?.priceFonasa}
                      onChange={(e) => {
                        handleNumberChangeCustom('priceFonasa', e);
                      }}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    {formValidationState.priceFonasa.isError ? (
                      <FormErrorMessage>
                        {formValidationState.priceFonasa.errorText}
                      </FormErrorMessage>
                    ) : (
                      ''
                    )}
                  </FormControl>
                </Stack>
              </HStack>
            </Box>
          </ModalBody>
          <ModalFooter display="flex" justifyContent="space-between">
            <Button onClick={onClose}>Cancelar</Button>
            <Button
              // onClick={onClose}
              onClick={() => {
                setDisabledButtons(true);
                if (isCreate) {
                  if (validateExam()) {
                    createExam();
                    console.log(currentExamState);
                  }
                } else {
                  if (validateExam()) {
                    saveExam();
                  }
                }
              }}
            >
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditExamModal;
