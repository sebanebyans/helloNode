import { FC } from 'react';
import { Flex, Container } from '@chakra-ui/react';
import Layout from '@components/Layout';

const Dashboard: FC = () => {
  return (
    <Layout>
      <Container p="4" maxW="100%">
        <Flex
          flexDirection={{ base: 'column', lg: 'row' }}
          width="100%"
          flexWrap="wrap"
          justify="space-around"
        ></Flex>
      </Container>
    </Layout>
  );
};

export default Dashboard;
