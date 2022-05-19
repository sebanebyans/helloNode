import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { ApolloProvider } from '@apollo/client';
import SessionProvider from '@src/context/Session';
import { apolloClient } from '@src/graphql/clients';
import { Provider } from 'react-redux';
import theme from '@utils/theme';
import { store } from '@redux/store';
import '@fontsource/rubik';
import 'regenerator-runtime/runtime.js';
import '../styles/globals.scss';
import '../styles/datepicker.css';
import '../styles/reactvirtualized.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <SessionProvider>
            <Component {...pageProps} />
          </SessionProvider>
        </ChakraProvider>
      </Provider>
    </ApolloProvider>
  );
};

export default MyApp;
