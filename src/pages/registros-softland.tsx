import { FC } from 'react';
import { NextPage } from 'next';
import Layout from '../components/Layout';
import { Logs } from '@templates/Softland';

const SoftlandLogs: FC<NextPage> = (props) => {
  return (
    <Layout>
      <Logs />
    </Layout>
  );
};
export default SoftlandLogs;
