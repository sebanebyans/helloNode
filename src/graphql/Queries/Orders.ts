import { gql } from '@apollo/client';

export const LIST_OPERATION_ORDERS = gql`
  query GetOrderForBackOffice(
    $cursor: ID
    $limit: String
    $userId: String
    $dateIni: String
    $dateEnd: String
  ) {
    getOrderForBackOffice(
      cursor: $cursor
      limit: $limit
      userId: $userId
      dateIni: $dateIni
      dateEnd: $dateEnd
    ) {
      nodes {
        payment {
          paymentDate
          amount
          status
          commerceOrder
        }
        paymentMethod
        exams {
          id
          title
          code
          isFast
          isCovid
          user {
            rut
            passport
            name
            lastName
            secondLastName
            birthdate
            gender
            phone
            email
          }
        }
        booking {
          stateName
          province
          address
          addressNumber
          addressDetail
          start
          end
          date
          isLab
        }
        orderNumber
        testReason
        isCanceled
      }
      pageInfo {
        nextPageCursor
        hasNextPage
      }
      totalCount
    }
  }
`;

export const LIST_CUSTOMER_SERVICE_ORDERS = gql`
  query GetOrderForBackOffice(
    $cursor: ID
    $limit: String
    $userId: String
    $dateIni: String
    $dateEnd: String
  ) {
    getOrderForBackOffice(
      cursor: $cursor
      limit: $limit
      userId: $userId
      dateIni: $dateIni
      dateEnd: $dateEnd
    ) {
      nodes {
        payment {
          amount
          status
          paymentDate
          commerceOrder
        }
        paymentMethod
        exams {
          id
          title
          code
          isFast
          isCovid
          user {
            rut
            passport
            name
            lastName
            secondLastName
            phone
            email
          }
        }
        booking {
          stateName
          province
          address
          addressNumber
          addressDetail
          start
          end
          date
          isLab
        }
        orderNumber
        isCanceled
      }
      pageInfo {
        nextPageCursor
        hasNextPage
      }
      totalCount
    }
  }
`;

export const GET_SOLD_BLOCKS = gql`
  query GetSoldBlocks($input: soldBlockRequest) {
    getSoldBlocks(input: $input) {
      date
      sold
      blockId
    }
  }
`;
