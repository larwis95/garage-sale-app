import { gql } from "graphql-tag";

const typeDefs = gql`
  scalar JSON

  input ItemInput {
    name: String
    category: String
    description: String
    condition: Int
    price: Float
    quantity: Int
    discount: Int
    picture: String
  }

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
    startDate: String
    endDate: String
    location: String
    discount: Int
    recurring: Boolean
    coordinates: [JSON]
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
    sales: [Sale]
    sale(_id: ID!): Sale
    item(_id: ID!): Item
    items: [Item]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addSale(
      title: String!
      description: String!
      items: [ItemInput]
      category: String!
      startDate: String!
      endDate: String!
      location: String!
      discount: Int!
      recurring: Boolean!
    ): Sale
    addItem(
      name: String!
      category: String!
      description: String!
      condition: Int!
      price: Float!
      quantity: Int!
      discount: Int!
      picture: String!
      sale: ID!
    ): Item
    addFavorite(saleId: ID!): User
    deleteFavorite(saleId: ID!): User
    updateSale(
      saleId: ID!
      title: String
      description: String
      items: [ItemInput]
      category: String
      startDate: String
      endDate: String
      location: String
      discount: Int
      recurring: Boolean
    ): Sale
    deleteSale(saleId: ID!): Sale
    deleteItem(itemId: ID!): Item
    updateItem(
      itemId: ID!
      name: String
      category: String
      description: String
      condition: Int
      price: Float
      quantity: Int
      discount: Int
      picture: String
    ): Item
  }
`;

export default typeDefs;
