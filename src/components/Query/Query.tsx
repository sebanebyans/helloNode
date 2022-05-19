import { ReactNode } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import FadeLoader from 'react-spinners/FadeLoader';
import theme from '@utils/theme';
import { ApolloError } from '@apollo/client';

type QueryResultT = BoxProps & {
  loading: boolean;
  error: ApolloError | undefined;
  data?: LooseObject;
  children?: ReactNode;
};

const QueryResult = ({ loading, error, children, data, ...rest }: QueryResultT) => {
  if (error) {
    return <p>ERROR: {error.message}</p>;
  }
  if (loading) {
    return (
      <Box w="full" display="flex" justifyContent="center" p={4} {...rest}>
        <FadeLoader color={theme.colors.brand.medium} loading={loading} />
      </Box>
    );
  }
  return <>{children}</>;
};

export default QueryResult;
