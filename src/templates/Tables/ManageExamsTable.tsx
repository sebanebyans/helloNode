import { FC, useState, useEffect } from 'react';
import Query from '@components/Query';
import { useQuery } from '@apollo/client';
import { GET_ALL_EXAMS } from '@src/graphql/Queries/Exams';
import { ExamsClient } from '@src/graphql/clients';
import { ExamsTable } from '@components/Tables';

const ManageExamsTable: FC = () => {
  const [examsState, setExamsState] = useState([]);
  const { data, loading, error, refetch } = useQuery(GET_ALL_EXAMS, {
    client: ExamsClient,
    // variables: { isAdmin: true },
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      setExamsState(data.getAllExam);
    },
  });

  const onRefetch = () => {
    refetch();
    setExamsState(examsState);
  };

  return (
    <Query loading={loading} error={error} data={data}>
      <ExamsTable exams={examsState} onRefetch={onRefetch} />
    </Query>
  );
};
export default ManageExamsTable;
