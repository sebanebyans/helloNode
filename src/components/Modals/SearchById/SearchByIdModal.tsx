/* eslint-disable react-hooks/exhaustive-deps */
import { FiSearch } from 'react-icons/fi';
type SearchT = {
  searchFunc: () => void;
};
import { FC } from 'react';
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
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react';
import Query from '@components/Query';
import { useDispatch } from 'react-redux';
import { closeModal } from '@redux/modal';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { setFilter, handlePage } from '@redux/orders';
import { useUpdateOrders } from '@utils/hooks';

const SearchModal: FC = () => {
  const dispatch = useDispatch();
  const { getOrders, loading } = useUpdateOrders();
  const { orderFilters } = useSelector((state: RootState) => state.orders);
  const { id, dateIni, dateEnd } = orderFilters || {};
  const handleFilter = (name: string, value: string) =>
    dispatch(setFilter({ ...orderFilters, [name]: value }));
  const onClose = () => {
    dispatch(closeModal());
  };

  const searchById = () => {
    getOrders({ cursor: null });
    dispatch(handlePage('reset'));
  };

  return (
    <>
      <Modal isOpen={true} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Buscar ordenes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Query loading={loading} error={undefined} data={undefined}>
              <Box display="flex" flexWrap="wrap">
                <Text>Ingresar rut, pasaporte o numero de orden.</Text>
                <InputGroup w="96" display="flex">
                  <InputLeftElement color="gray.500">
                    <FiSearch />
                  </InputLeftElement>
                  <Input
                    variant="filled"
                    value={id}
                    onChange={(e) => handleFilter('id', e.target.value)}
                    placeholder={`Busca por rut, pasaporte o numero de orden.`}
                    style={{
                      fontSize: '1.1rem',
                      border: '0',
                    }}
                  />
                </InputGroup>
                <Text mt={4}>Fecha de agenda desde las 00:00</Text>
                <InputGroup w="96" display="flex">
                  <Input
                    variant="filled"
                    type="date"
                    value={dateIni}
                    onChange={(e) => handleFilter('dateIni', e.target.value)}
                    placeholder={`Fecha de agenda inicial`}
                    style={{
                      fontSize: '1.1rem',
                      border: '0',
                    }}
                  />
                </InputGroup>{' '}
                <Text mt={4}>Fecha de agenda hasta las 23:59</Text>
                <InputGroup w="96" display="flex">
                  <Input
                    value={dateEnd}
                    variant="filled"
                    type="date"
                    onChange={(e) => handleFilter('dateEnd', e.target.value)}
                    placeholder={`Fecha de agenda final`}
                    style={{
                      fontSize: '1.1rem',
                      border: '0',
                    }}
                  />
                </InputGroup>
              </Box>
            </Query>
          </ModalBody>
          <ModalFooter display="flex" justifyContent="space-between">
            <Button onClick={onClose}>Cancelar</Button>
            <Button onClick={searchById}>Buscar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SearchModal;
