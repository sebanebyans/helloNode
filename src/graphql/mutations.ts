import { gql } from '@apollo/client';

export const CREATE_RULE = gql`
  mutation createRule($input: scheduleRuleConfigInput) {
    createScheduleRuleConfig(input: $input) {
      id
      isCovid
      isLab
      from
      until
      stateNames
      limit
    }
  }
`;

export const DELETE_RULE = gql`
  mutation RemoveScheduleRuleConfig($removeScheduleRuleConfigId: idEncrypted) {
    removeScheduleRuleConfig(id: $removeScheduleRuleConfigId)
  }
`;

export const EDIT_ORDER = gql`
  mutation editOrder($input: OrderModifiedInput) {
    modifiedOrder(input: $input)
  }
`;
