import React from 'react';

import Login from '@templates/Login';
import HeadTitle from '@templates/HeadTitle';

const LoginPage: React.FC = () => {
  return (
    <HeadTitle title="Tested Ingreso">
      <Login />
    </HeadTitle>
  );
};

export default LoginPage;
