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
  mutation addSale($title: String!, $description: String, $startDate: String, $endDate: String, $location: String) {
    addSale(title: $title, description: $description, startDate: $startDate, endDate: $endDate, location: $location) {
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
      startDate
      endDate
      location
    }
  }
`;

export const UPDATE_SALE = gql`
  mutation updateSale($saleId: ID!, $title: String!, $description: String, $startDate: String, $endDate: String, $location: String) {
    updateSale(saleId: $saleId, title: $title, description: $description, startDate: $startDate, endDate: $endDate, location: $location) {
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
  mutation addItem($name: String!, $description: String!, $price: Float!, $quantity: Int!, $sale: ID!) {
    addItem(name: $name, description: $description, price: $price, quantity: $quantity, sale: $sale) {
      _id
      name
      description
      price
      quantity
      sale {
        _id
      }
    }
  }
`;

export const DELETE_ITEM = gql`
  mutation deleteItem($_id: ID!) {
    deleteItem(_id: $_id) {
      _id
      name
      description
      price
      quantity
    }
  }
`;

export const UPDATE_ITEM = gql`
  mutation updateItem($_id: ID!, $name: String, $description: String!, $price: Float!, $quantity: Int) {
    updateItem(_id: $_id, name: $name, description: $description, price: $price, quantity: $quantity) {
      _id
      name
      description
      condition
      price
      quantity
    }
  }
`;

export const ADD_FAVORITE = gql`
  mutation addFavorite($saleId: ID!) {
    addFavorite(saleId: $saleId) {
      _id
      favorites {
        _id
        title
        description
      }
    }
  }
`;

export const DELETE_FAVORITE = gql`
  mutation deleteFavorite($saleId: ID!) {
    deleteFavorite(saleId: $saleId) {
      _id
      favorites {
        _id
        title
        description
      }
    }
  }
`;
