import { ApolloClient, InMemoryCache } from '@apollo/client';
const ScheduleClient = new ApolloClient({
  uri: 'https://6scwfhw6rc.execute-api.us-east-1.amazonaws.com/graphql/schedule',
  cache: new InMemoryCache(),
});

const ExamsClient = new ApolloClient({
  uri: 'https://6scwfhw6rc.execute-api.us-east-1.amazonaws.com/graphql/exams',
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

const AdminClient = new ApolloClient({
  uri: 'https://6scwfhw6rc.execute-api.us-east-1.amazonaws.com/graphql/admin',
  cache: new InMemoryCache(),
});

const apolloClient = new ApolloClient({
  uri: process.env.GRAPHQL_GATEWAY,
  cache: new InMemoryCache(),
});

const OrderClient = new ApolloClient({
  uri: 'https://6scwfhw6rc.execute-api.us-east-1.amazonaws.com/graphql/orders',
  cache: new InMemoryCache(),
});
export { ScheduleClient, apolloClient, OrderClient, ExamsClient, AdminClient };
