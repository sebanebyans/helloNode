import { FC } from 'react';
import Layout from '../components/Layout';
import { SearchOrders } from '@templates/Tables';
const SearchOrdersPage: FC<{}> = () => {
  return (
    <Layout>
      <SearchOrders />
    </Layout>
  );
};
export default SearchOrdersPage;
