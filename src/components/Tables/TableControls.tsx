import { FC } from 'react';
import { ButtonGroup, Button } from '@chakra-ui/react';
import { ExportSheets } from '@components/Modals';
import { RootState } from '@redux/store';
import { useSelector } from 'react-redux';
type TableControlsT = {
  showExport?: boolean;
  fetchPrev?: () => void;
  fetchNext?: () => void;
  showSearch?: () => void;
};

const TableControls: FC<TableControlsT> = ({ showExport, fetchNext, fetchPrev, showSearch }) => {
  const { page, cursors } = useSelector((state: RootState) => state.orders);
  return (
    <ButtonGroup bg="white" w="100%" align="center" p="4" display="inline-flex">
      <Button bg="brand.medium" color="white" onClick={showSearch}>
        Buscar ordenes
      </Button>
      <Button disabled={page < 1} onClick={fetchPrev}>
        Traer anteriores.
      </Button>
      <Button disabled={page === cursors.length - 1} onClick={fetchNext}>
        Traer siguientes.
      </Button>
      {showExport && <ExportSheets />}
    </ButtonGroup>
  );
};

export default TableControls;
