import { FC, useEffect } from 'react';
import { NextPage } from 'next';
import Layout from '../components/Layout';
import ManageExamsTable from '../templates/Tables/ManageExamsTable';

const ManageExams: FC<NextPage> = (props) => {
  return (
    <Layout>
      <ManageExamsTable />
    </Layout>
  );
};
export default ManageExams;
