import { gql } from "graphql-tag";

const typeDefs = gql`
  scalar JSON

  type User {
    _id: ID
    username: String
    email: String
    password: String
    type: String
    sales: [Sale]
    favorites: [Sale]
  }

  type Sale {
    _id: ID
    title: String
    description: String
    items: [Item]
    category: String
    saleDate: String
    endDate: String
    location: String
    discount: Int
    recurrence: Boolean
    coordinates: [JSON]
    active: Boolean
  }

  type Item {
    _id: ID
    name: String
    category: String
    description: String
    condition: Int
    price: Float
    quantity: Int
    discount: Int
    sale: Sale
    picture: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

export default typeDefs;
