import { FC } from 'react';
import Layout from '../components/Layout';
import { OrdersTable } from '@templates/Tables';
const Orders: FC<{}> = () => {
  return (
    <Layout>
      <OrdersTable />
    </Layout>
  );
};
export default Orders;
