import { gql } from "@apollo/client";

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      type
      sales {
        _id
        title
        description
        items {
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
        category
        startDate
        endDate
        location
        discount
        recurring
        coordinates
      }
      favorites {
        _id
        title
        description
        items {
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
        category
        startDate
        endDate
        location
        discount
        recurring
        coordinates
      }
    }
  }
`;

export const GET_SALES = gql`
  query sales {
    sales {
      _id
      title
      description
      items {
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
      category
      startDate
      endDate
      location
      discount
      recurring
      coordinates
    }
  }
`;

export const GET_SALE = gql`
  query sale($id: ID!) {
    sale(_id: $id) {
      _id
      title
      description
      items {
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
      category
      startDate
      endDate
      location
      discount
      recurring
      coordinates
    }
  }
`;

export const GET_ITEM = gql`
  query item($id: ID!) {
    item(id: $id) {
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

export const GET_ITEMS = gql`
  query items {
    items {
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
