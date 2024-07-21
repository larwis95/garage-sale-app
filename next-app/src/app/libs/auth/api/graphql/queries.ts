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
          description
          price
          quantity
        }
        startDate
        endDate
        location
      }
      favorites {
        _id
        title
        description
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
        description
        price
        quantity
      }
      startDate
      endDate
      location
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
        description
        price
        quantity
      }
      startDate
      endDate
      location
    }
  }
`;

export const GET_ITEM = gql`
  query item($id: ID!) {
    item(id: $id) {
      _id
      name
      description
      price
      quantity
    }
  }
`;

export const GET_ITEMS = gql`
  query items {
    items {
      _id
      name
      description
      price
      quantity
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
        description
        price
        quantity
      }
      startDate
      endDate
      location
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
