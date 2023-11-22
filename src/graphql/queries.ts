/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getItem = /* GraphQL */ `query GetItem($id: ID!) {
  getItem(id: $id) {
    id
    name
    price
    description
    image
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetItemQueryVariables, APITypes.GetItemQuery>;
export const listItems = /* GraphQL */ `query ListItems(
  $filter: ModelItemFilterInput
  $limit: Int
  $nextToken: String
) {
  listItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      price
      description
      image
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.ListItemsQueryVariables, APITypes.ListItemsQuery>;
export const syncItems = /* GraphQL */ `query SyncItems(
  $filter: ModelItemFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncItems(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      name
      price
      description
      image
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.SyncItemsQueryVariables, APITypes.SyncItemsQuery>;
export const getDeal = /* GraphQL */ `query GetDeal($id: ID!) {
  getDeal(id: $id) {
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
      Deals {
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetDealQueryVariables, APITypes.GetDealQuery>;
export const listDeals = /* GraphQL */ `query ListDeals(
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
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.ListDealsQueryVariables, APITypes.ListDealsQuery>;
export const syncDeals = /* GraphQL */ `query SyncDeals(
  $filter: ModelDealFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncDeals(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
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
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.SyncDealsQueryVariables, APITypes.SyncDealsQuery>;
export const dealsByUserID = /* GraphQL */ `query DealsByUserID(
  $userID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelDealFilterInput
  $limit: Int
  $nextToken: String
) {
  dealsByUserID(
    userID: $userID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
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
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.DealsByUserIDQueryVariables,
  APITypes.DealsByUserIDQuery
>;
export const getUser = /* GraphQL */ `query GetUser($id: ID!) {
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
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const listUsers = /* GraphQL */ `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
export const syncUsers = /* GraphQL */ `query SyncUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncUsers(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
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
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.SyncUsersQueryVariables, APITypes.SyncUsersQuery>;
