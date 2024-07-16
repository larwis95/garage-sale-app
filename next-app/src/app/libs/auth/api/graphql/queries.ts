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
