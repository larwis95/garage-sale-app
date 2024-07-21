import { GraphQLError } from "graphql";

export const UserNotFound = new GraphQLError("User not found.");
export const ItemNotFound = new GraphQLError("Item not found.");
export const SaleNotFound = new GraphQLError("Sale not found.");
