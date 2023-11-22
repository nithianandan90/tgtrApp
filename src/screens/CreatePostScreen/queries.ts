import {gql} from '@apollo/client';

export const createDeal = gql`
  mutation CreateDeal(
    $input: CreateDealInput!
    $condition: ModelDealConditionInput
  ) {
    createDeal(input: $input, condition: $condition) {
      id
      lat
      lng
      radius
      title
      description
      location
      maxRadius
      expiryDate
      userID
      User {
        id
        name
        image
        address
        lat
        lng
        email
        fcmToken
        status
        Deals {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
