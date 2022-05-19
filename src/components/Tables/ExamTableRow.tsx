import { FC } from 'react';
import { FiEdit, FiDelete } from 'react-icons/fi';
import { Tr, Td, Button } from '@chakra-ui/react';

type ExamT = {
  exam: any;
  edit: any;
};

const ExamsTableRow: FC<ExamT> = ({ exam, edit }) => {
  const { title, price, category, code } = exam;
  return (
    <Tr>
      <Td>{title}</Td>
      <Td>{price}</Td>
      <Td>{category}</Td>
      <Td>{code}</Td>
      <Td>
        <Button onClick={edit} className="btn__table">
          {' '}
          <FiEdit />
        </Button>
        <Button onClick={edit} className="btn__table">
          {' '}
          <FiDelete />
        </Button>
      </Td>
    </Tr>
  );
};

export default ExamsTableRow;
