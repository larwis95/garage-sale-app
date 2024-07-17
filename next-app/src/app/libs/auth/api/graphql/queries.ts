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

export const GET_COORDINATES = gql`
  query coordinates {
    coordinates {
      latitude
      longitude
    }
  }
`;

export const GET_NEARBY_SALES = gql`
  query nearBySales($coordinates: CoordinatesInput!, $radius: Int!) {
    nearBySales(coordinates: $coordinates, radius: $radius) {
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
      geoLocation {
        type
        coordinates
      }
    }
  }
`;

export const GET_USER_LOCATION = gql`
  query userLocation($ip: String!) {
    userLocation(ip: $ip) {
      latitude
      longitude
    }
  }
`;
