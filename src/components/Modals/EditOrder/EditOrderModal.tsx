import { FC, useState } from 'react';
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
} from '@chakra-ui/react';
import { ScheduleClient } from '@src/graphql/clients';
import Query from '@components/Query';
import { useDispatch } from 'react-redux';
import { closeModal, EditableOrderFields } from '@redux/modal';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { InputMapper } from '@src/utils/mapper';
import { Fields, SelectProvince } from '@components/Fields';
import EditOrderAlert from './EditOrderAlert';
import ToggleOrderAlert from './ToggleOrderAlert';
import { GET_STATES } from '@src/graphql/Queries/Exceptions';
import { useQuery } from '@apollo/client';

const EditOrderModal: FC = () => {
  const dispatch = useDispatch();
  const onClose = () => dispatch(closeModal());
  const { order } = useSelector((state: RootState) => state.modal);
  const [data, setData] = useState(order);
  const handleData = (param: EditableOrderFields) => setData({ ...data, ...param });
  const fields = InputMapper(data);
  const { data: states, loading, error } = useQuery(GET_STATES, { client: ScheduleClient });
  const provinces = states?.getAllStates;
  const { orderNumber, title } = data || {};
  return (
    <>
      <Modal isOpen={true} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Editar orden {orderNumber} - {title}{' '}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Query loading={loading} error={error} data={states}>
              <Box display="flex" flexWrap="wrap">
                <Fields fieldsToMap={fields} values={data} handler={handleData} />
                <SelectProvince provinces={provinces} values={data} handler={handleData} />
              </Box>
            </Query>
          </ModalBody>
          <ModalFooter display="flex" justifyContent="space-between">
            <Button onClick={onClose}>Cancelar</Button>
            {data && <ToggleOrderAlert dataToSend={data} />}
            <EditOrderAlert dataToSave={data} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditOrderModal;
