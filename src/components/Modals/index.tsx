import { FC } from 'react';
import { useSelector } from 'react-redux';
import { ExportSheets } from './ExportSheet';
import { EditOrder } from './EditOrder';
import { SearchByIdModal } from './SearchById';
import { RootState } from '@redux/store';
export { ExportSheets, EditOrder };

const Modal = () => {
  const { open, type } = useSelector((state: RootState) => state.modal);
  return (
    <>
      {open && type === 'editOrder' && <EditOrder />}
      {open && type === 'searchById' && <SearchByIdModal />}
    </>
  );
};

export default Modal;
