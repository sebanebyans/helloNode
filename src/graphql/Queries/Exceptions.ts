import { gql } from '@apollo/client';

export const GET_STATES = gql`
  query GetAllStates {
    getAllStates {
      province
      states {
        stateName
      }
    }
  }
`;

export const GET_ACTIVE_RULES = gql`
  query Query {
    getListCurrentRules {
      id
      isLab
      isCovid
      from
      until
      stateNames
      limit
    }
  }
`;
