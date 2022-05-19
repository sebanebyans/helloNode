/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useRef, useState } from 'react';
import { Container, Box } from '@chakra-ui/react';
import Query from '@components/Query';
import { useSelector } from 'react-redux';
import { RootState } from '@src/redux/store';
import { TableControls, OrdersTable as Table } from '@components/Tables';
import { useDispatch } from 'react-redux';
import { searchModal } from '@redux/modal';
import { handleTableName } from '@redux/orders';
import { useUpdateOrders } from '@utils/hooks';

const OrdersTable: FC<{}> = () => {
  const { table } = useSelector((state: RootState) => state.orders);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const { loading, fetchNext, fetchPrev } = useUpdateOrders();
  const dispatch = useDispatch();
  if (table != 'operation') {
    dispatch(handleTableName('operation'));
  }
  const showSearch = () => dispatch(searchModal());

  const currentRef = useRef(null);

  useEffect(() => {
    //@ts-ignore
    setSize({ height: currentRef.current?.clientHeight, width: currentRef.current?.clientWidth });
  }, [currentRef]);
  return (
    <Container p="0" maxW="100%" bg="white">
      <TableControls
        showExport
        fetchNext={fetchNext}
        fetchPrev={fetchPrev}
        showSearch={showSearch}
      />
      <Box
        ref={currentRef}
        alignItems="stretch"
        overflowX="auto"
        maxW="100%"
        h="calc(100vh - 152px)"
        className="table-container"
      >
        <Query loading={loading} error={undefined} data={undefined}>
          <Table height={size.height} width={size.width} editable />
        </Query>
      </Box>
    </Container>
  );
};

export default OrdersTable;
