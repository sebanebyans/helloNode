import { FC, useEffect } from 'react';
import { NextPage } from 'next';
import Layout from '../components/Layout';
import ExceptionsTemplate from '@templates/Exceptions';

const Exceptions: FC<NextPage> = (props) => {
  return (
    <Layout>
      <ExceptionsTemplate />
    </Layout>
  );
};
export default Exceptions;
