import {gql} from '@apollo/client';

export const listDeals = gql`
  query ListDeals(
    $filter: ModelDealFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDeals(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        User {
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
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
