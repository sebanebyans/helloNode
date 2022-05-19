import { FC } from 'react';
import { NextPage } from 'next';
import Layout from '../components/Layout';
import { OperationReport } from '@templates/OperationReport';

const SoftlandLogs: FC<NextPage> = (props) => {
  return (
    <Layout>
      <OperationReport />
    </Layout>
  );
};
export default SoftlandLogs;
