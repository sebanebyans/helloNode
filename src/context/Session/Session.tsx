import React, { useEffect, createContext, ReactNode, useState } from 'react';
import { useRouter } from 'next/router';
import { Amplify, Auth, Hub } from 'aws-amplify';

import routes from '@src/routes';
import Loading from '@components/Loading';

import authConfig from './authConfig';
import { COGNITO_AUTH_ERRORS, EMAIL_DOMAIN, LOGIN_AUTH_ERRORS } from '@src/utils/constants';

type SessionT = {
  children: ReactNode;
};

type SessionUserT = {
  name: string;
  email: string;
  groups: string[];
  picture: string;
};

const initialUser: SessionUserT = {
  name: '',
  email: '',
  groups: [],
  picture: '',
};
export const SessionContext = createContext({
  signInHandler: () => {},
  signOutHandler: () => {},
  signInOtherHandler: () => {},
  sessionUser: initialUser,
  sessionInfo: {
    isValid: false,
    isAvailable: false,
  },
  error: '',
  resetError: () => {},
});

const SessionProvider: React.FC<SessionT> = ({ children }) => {
  const router = useRouter();
  const [sessionInfo, setSessionInfo] = useState({
    isValid: false,
    isAvailable: false,
    user: initialUser,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn_failure':
          if (data.message.indexOf(COGNITO_AUTH_ERRORS.userPoolId) !== -1) {
            setError(LOGIN_AUTH_ERRORS.userPoolId);
          } else if (data.message.indexOf(COGNITO_AUTH_ERRORS.emailDomain) !== -1) {
            setError(LOGIN_AUTH_ERRORS.emailDomain);
          } else if (data.message.indexOf(COGNITO_AUTH_ERRORS.userGroup) !== -1) {
            setError(LOGIN_AUTH_ERRORS.userGroup);
          }
          break;
      }
    });
  }, []);

  Amplify.configure(authConfig);

  const signInHandler = () => {
    const authOptions: any = { provider: 'Google' };

    Auth.federatedSignIn(authOptions);
  };
  const signOutHandler = () => Auth.signOut();
  const signInOtherHandler = () => {
    signOutHandler();
    signInHandler();
  };
  const resetError = () => setError('');

  useEffect(() => {
    (async () => {
      try {
        const currentSession = (await Auth.currentSession()).getIdToken();
        const newSessionUser = {
          name: currentSession.payload.name,
          email: currentSession.payload.email,
          groups: currentSession.payload['cognito:groups'],
          picture: currentSession.payload.picture,
        };

        if (newSessionUser.email.indexOf(EMAIL_DOMAIN) === -1) {
          signOutHandler();
          setError(LOGIN_AUTH_ERRORS.emailDomain);

          if (router.pathname !== routes.login) {
            router.replace(routes.login);

            return;
          }

          setLoading(false);
          return;
        }

        if (newSessionUser.groups.includes(process.env.COGNITO_USER_GROUP)) {
          setSessionInfo({
            isValid: true,
            isAvailable: true,
            user: newSessionUser,
          });

          if (router.pathname === routes.login) {
            router.replace(routes.home);

            return;
          }

          setLoading(false);
        } else {
          setSessionInfo({
            isValid: true,
            isAvailable: false,
            user: newSessionUser,
          });
          setError(LOGIN_AUTH_ERRORS.userGroup);

          if (router.pathname !== routes.login) {
            router.replace(routes.login);

            return;
          }

          setLoading(false);
        }
      } catch (e) {
        if (router.pathname !== routes.login) {
          router.replace(routes.login);

          return;
        }

        setLoading(false);
      }
    })();
  }, [router]);

  return (
    <SessionContext.Provider
      value={{
        signInHandler,
        signOutHandler,
        signInOtherHandler,
        sessionUser: sessionInfo.user,
        sessionInfo,
        error,
        resetError,
      }}
    >
      {loading ? <Loading /> : children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
