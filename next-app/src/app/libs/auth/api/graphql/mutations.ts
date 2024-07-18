import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        type
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        type
      }
    }
  }
`;

export const ADD_SALE = gql`
  mutation addSale(
    $title: String!
    $description: String
    $category: String
    $startDate: String
    $endDate: String
    $location: String
    $discount: Int
    $recurring: Boolean
  ) {
    addSale(
      title: $title
      description: $description
      category: $category
      startDate: $startDate
      endDate: $endDate
      location: $location
      discount: $discount
      recurring: $recurring
    ) {
      _id
      title
      description
      category
      startDate
      endDate
      location
      discount
      recurring
    }
  }
`;

export const DELETE_SALE = gql`
  mutation deleteSale($_id: ID!) {
    deleteSale(_id: $_id) {
      _id
      title
      description
      category
      startDate
      endDate
      location
      discount
      recurring
    }
  }
`;

export const UPDATE_SALE = gql`
  mutation updateSale(
    $_id: ID!
    $title: String!
    $description: String!
    $category: String!
    $startDate: String!
    $endDate: String!
    $location: String!
    $discount: Int!
    $recurring: Boolean!
  ) {
    updateSale(
      _id: $_id
      title: $title
      description: $description
      category: $category
      startDate: $startDate
      endDate: $endDate
      location: $location
      discount: $discount
      recurring: $recurring
    ) {
      _id
      title
      description
      category
      startDate
      endDate
      location
      discount
      recurring
    }
  }
`;

export const ADD_ITEM = gql`
  mutation addItem(
    $name: String!
    $category: String!
    $description: String!
    $condition: Int!
    $price: Float!
    $quantity: Int!
    $discount: Int!
    $picture: String!
    $sale: ID!
  ) {
    addItem(
      name: $name
      category: $category
      description: $description
      condition: $condition
      price: $price
      quantity: $quantity
      discount: $discount
      picture: $picture
    ) {
      _id
      name
      category
      description
      condition
      price
      quantity
      discount
      picture
    }
  }
`;

export const DELETE_ITEM = gql`
  mutation deleteItem($_id: ID!) {
    deleteItem(_id: $_id) {
      _id
      name
      category
      description
      condition
      price
      quantity
      discount
      picture
    }
  }
`;

export const ADD_FAVORITE = gql`
  mutation addFavorite($_id: ID!) {
    addFavorite(_id: $_id) {
      _id
      title
      description
      category
      startDate
      endDate
      location
      discount
      recurring
    }
  }
`;

export const DELETE_FAVORITE = gql`
  mutation deleteFavorite($_id: ID!) {
    deleteFavorite(_id: $_id) {
      _id
      title
      description
      category
      startDate
      endDate
      location
      discount
      recurring
    }
  }
`;
