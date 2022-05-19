import React from 'react';
/* eslint-disable react-hooks/exhaustive-deps */
import Dashboard from '@templates/Dashboard';
import HeadTitle from '@templates/HeadTitle';

const HomePage: React.FC = () => {
  return (
    <HeadTitle title="Tested Dashboard">
      <Dashboard />
    </HeadTitle>
  );
};

export default HomePage;
