import { FC } from 'react';
import { NextPage } from 'next';
import Layout from '../components/Layout';
import RulesTemplate from '@templates/Rules';

const Rules: FC<NextPage> = (props) => {
  return (
    <Layout>
      <RulesTemplate />
    </Layout>
  );
};
export default Rules;
