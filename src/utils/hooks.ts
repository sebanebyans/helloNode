/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setOrders, setCursors, handlePage } from '@redux/orders';
import { OrderClient } from '@src/graphql/clients';
import { LIST_OPERATION_ORDERS, LIST_CUSTOMER_SERVICE_ORDERS } from '@src/graphql/Queries';
import { useLazyQuery } from '@apollo/client';
import { RootState } from '@redux/store';
import { useSelector } from 'react-redux';

const queryList = {
  customer_service: LIST_CUSTOMER_SERVICE_ORDERS,
  operation: LIST_OPERATION_ORDERS,
};

type PageT = 'next' | 'prev';

export const useUpdateOrders = () => {
  const { orderFilters, cursors, page, table } = useSelector((state: RootState) => state.orders);
  const currentQuery = queryList[table];
  const dispatch = useDispatch();
  const variables = {
    ...orderFilters,
    userId: orderFilters?.id,
    limit: '1000',
    cursor: cursors[page],
  };
  const handleOrders = (orders: LooseObject) => {
    dispatch(setOrders(orders?.nodes));
    dispatch(setCursors(orders?.pageInfo?.nextPageCursor));
  };

  const setPage = (direction: PageT) => dispatch(handlePage(direction));

  const [fetchOrders, { loading, error }] = useLazyQuery(currentQuery, {
    client: OrderClient,
    fetchPolicy: 'network-only',
    onCompleted: ({ getOrderForBackOffice }) => {
      if (getOrderForBackOffice) {
        handleOrders(getOrderForBackOffice);
      }
    },
  });

  const getOrders = (params?: LooseObject) => {
    const reqVariables = params ? { ...variables, ...params } : variables;
    try {
      fetchOrders({
        variables: reqVariables,
      });
      return true;
    } catch (e) {
      return false;
    }
  };

  const fetchNext = () => {
    getOrders({ cursor: cursors[page + 1] });
    setPage('next');
  };

  const fetchPrev = () => {
    getOrders({ cursor: cursors[page - 1] });
    setPage('prev');
  };

  return { getOrders, loading, error, fetchNext, fetchPrev };
};
