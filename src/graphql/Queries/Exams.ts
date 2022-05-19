import { gql } from '@apollo/client';

export const GET_ALL_EXAMS = gql`
  query GetAllExam {
    getAllExam {
      id
      title
      completeTitle
      priceFonasa
      price
      isPack
      examsCodes {
        code
        price
      }
      isVisible
      isCovid
      isLabOnly
      isFast
      highlight
      category
      enabled
      reason
      tags
      searchTags
      code
      resultTime
      description
    }
  }
`;

export const EDIT_EXAM = gql`
  mutation UpdateExam($input: InputExam) {
    updateExam(input: $input) {
      title
      id
      completeTitle
    }
  }
`;

export const REMOVE_EXAM = gql`
  mutation RemoveExam($removeExamId: idEncrypted!) {
    removeExam(id: $removeExamId) {
      id
      title
    }
  }
`;

export const CREATE_EXAM = gql`
  mutation CreateExam($input: InputExam) {
    createExam(input: $input) {
      id
      title
      completeTitle
      price
      priceFonasa
      description
      resultTime
      code
      searchTags
      tags
      reason
      category
      enabled
      highlight
      isFast
      isLabOnly
      isCovid
      isVisible
      isPack
    }
  }
`;
