import {gql} from '@apollo/client';
export const getUser = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      sub
      image
      address
      lat
      lng
      email
      fcmToken
      status
      Deals {
        items {
          id
          lat
          lng
          radius
          title
          description
          location
          image
          maxRadius
          expiryDate
          userID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const createUser = gql`
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      name
      sub
      image
      address
      lat
      lng
      email
      fcmToken
      status
      Deals {
        items {
          id
          lat
          lng
          radius
          title
          description
          location
          image
          maxRadius
          expiryDate
          userID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
