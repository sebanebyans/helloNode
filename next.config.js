const path = require('path');
const { version } = require('./package.json');

const BASE_URL_DEV = 'https://backofficetested.herokuapp.com';
const BASE_URL_STAGING = 'https://backofficetested.herokuapp.com';
const BASE_URL_PROD = 'https://backofficetested.herokuapp.com';

const envs = {
  local: {
    BASE_URL: ' https://backofficetested.herokuapp.com/',
    GRAPHQL_GATEWAY: '',
    GOOGLE_ANALYTICS_ID: 'UA-XXXXXXXXX-1',
    GTM_ID: 'GTM-XXXXXXX',
    stage: 'local',
    RELEASE: version,
    COGNITO_USER_POOL_ID: 'us-east-1_Zmnc0uuux',
    COGNITO_APP_CLIENT_ID: '6pohku70r5423g4gvs62nefuqr',
    COGNITO_DOMAIN: 'backoffice-local-tested.auth.us-east-1.amazoncognito.com',
    COGNITO_USER_GROUP: 'Backoffice-Local',
  },
  dev: {
    BASE_URL: BASE_URL_DEV,
    GRAPHQL_GATEWAY: 'https://44e8oyolv4.execute-api.us-east-1.amazonaws.com/graphql',
    GOOGLE_ANALYTICS_ID: 'UA-XXXXXXXXX-1',
    GTM_ID: 'GTM-XXXXXXX',
    stage: 'dev',
    RELEASE: version,
    COGNITO_USER_POOL_ID: 'us-east-1_Lv35Argjq',
    COGNITO_APP_CLIENT_ID: '3p8qnfj97rqrfapplkpg5k8gga',
    COGNITO_DOMAIN: 'backoffice-dev-tested.auth.us-east-1.amazoncognito.com',
    COGNITO_USER_GROUP: 'Backoffice-Dev',
  },
  staging: {
    BASE_URL: BASE_URL_STAGING,
    GRAPHQL_GATEWAY: 'https://44e8oyolv4.execute-api.us-east-1.amazonaws.com/graphql',
    GOOGLE_ANALYTICS_ID: 'UA-XXXXXXXXX-1',
    GTM_ID: 'GTM-XXXXXXX',
    stage: 'staging',
    RELEASE: version,
    COGNITO_USER_POOL_ID: 'us-east-1_cv0thoPRX',
    COGNITO_APP_CLIENT_ID: '1fk4dtk0a0n3umbtppmdd46v59',
    COGNITO_DOMAIN: 'backoffice-rc-tested.auth.us-east-1.amazoncognito.com',
    COGNITO_USER_GROUP: 'Backoffice-Staging',
  },
  prod: {
    BASE_URL: BASE_URL_PROD,
    GRAPHQL_GATEWAY: `https://6scwfhw6rc.execute-api.us-east-1.amazonaws.com/graphql`,
    GOOGLE_ANALYTICS_ID: 'UA-XXXXXXXXX-1',
    GTM_ID: 'GTM-XXXXXXX',
    stage: 'prod',
    RELEASE: version,
    COGNITO_USER_POOL_ID: 'us-east-1_L6dgrJFx8',
    COGNITO_APP_CLIENT_ID: '7fsrp0bmbodd7r8p7n1o5sajco',
    COGNITO_DOMAIN: 'backoffice-tested.auth.us-east-1.amazoncognito.com',
    COGNITO_USER_GROUP: 'Backoffice-Prod',
  },
};

module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/': path.resolve(__dirname, 'src/'),
      '@atoms': path.resolve(__dirname, 'src/atoms'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@templates': path.resolve(__dirname, 'src/templates'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@redux': path.resolve(__dirname, 'src/redux'),
    };
    return config;
  },
  env: envs[process.env.STAGE || 'dev'],
};
