const authConfig = {
  Auth: {
    region: 'us-east-1',
    userPoolId: process.env.COGNITO_USER_POOL_ID,
    userPoolWebClientId: process.env.COGNITO_APP_CLIENT_ID,
  },
  oauth: {
    domain: process.env.COGNITO_DOMAIN,
    redirectSignIn: `${process.env.BASE_URL}/ingreso`,
    redirectSignOut: `${process.env.BASE_URL}/ingreso`,
    responseType: 'token',
  },
  federationTarget: 'COGNITO_USER_POOLS',
};

export default authConfig;
