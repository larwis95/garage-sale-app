import { User, Sale, Item } from "@/app/models";
import { BaseContext } from "apollo-server-types";
import {
  signToken,
  AuthenticationError,
  decodeToken,
} from "@/app/libs/auth/backend";

interface IUserArgs {
  username?: string;
  email?: string;
  password?: string;
}

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent: any, { username }: IUserArgs) => {
      return User.findOne({ username }).populate("sales");
    },
    me: async (parent: any, args: IUserArgs, context: BaseContext) => {
      const user = context.user;
      if (user) {
        return User.findOne({ _id: user._id });
      }
      throw AuthenticationError;
    },
    sales: async () => {
      return Sale.find();
    },
    sale: async (parent: any, { _id }: any) => {
      return Sale.findOne({ _id }).populate("items");
    },
    item: async (parent: any, { _id }: any) => {
      return Item.findOne({ _id });
    },
    items: async () => {
      return Item.find();
    },
  },

  Mutation: {
    addUser: async (parent: any, args: IUserArgs) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent: any, { email, password }: IUserArgs) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },
    addSale: async (parent: any, args: any, context: BaseContext) => {
      const user = context.user;
      if (user) {
        const sale = await Sale.create({ ...args, user: user._id });
        await User.findOneAndUpdate(
          { _id: user._id },
          { $addToSet: { sales: sale._id } },
          { new: true }
        );
        return Sale.findOne({ _id: sale._id });
      }
      throw AuthenticationError;
    },
    deleteSale: async (parent: any, { _id }: any, context: BaseContext) => {
      const user = context.user;
      if (user) {
        const sale = await Sale.findOne({ _id });
        if (sale.user.toString() === user._id.toString()) {
          await Sale.deleteOne({ _id });
          await User.updateOne(
            { _id: user._id },
            { $pull: { sales: _id } },
            { new: true }
          );
          return sale;
        }
        throw AuthenticationError;
      }
      throw AuthenticationError;
    },
    updateSale: async (parent: any, args: any, context: BaseContext) => {
      const user = context.user;
      if (user) {
        const sale = await Sale.findOne({ _id: args._id });
        if (sale.user.toString() === user._id.toString()) {
          const updatedSale = Sale.updateOne({ _id: args._id }, { ...args });
          return updatedSale;
        }
        throw AuthenticationError;
      }
      throw AuthenticationError;
    },
    addItem: async (parent: any, args: any, context: BaseContext) => {
      const user = context.user;
      if (user) {
        const item = await Item.create({ ...args, user: user._id });
        await Sale.updateOne(
          { _id: args.sale },
          { $addToSet: { items: item._id } }
        );
        return Item.findOne({ _id: item._id });
      }
      throw AuthenticationError;
    },
    updateItem: async (parent: any, args: any, context: BaseContext) => {
      const user = context.user;
      if (user) {
        const item = await Item.findOne({ _id: args._id });
        if (item.user.toString() === user._id.toString()) {
          const updatedItem = await Item.updateOne(
            { _id: args._id },
            { ...args },
            { new: true }
          );
          return updatedItem;
        }
        throw AuthenticationError;
      }
      throw AuthenticationError;
    },
    deleteItem: async (parent: any, { _id }: any, context: BaseContext) => {
      const user = context.user;
      if (user) {
        const item = await Item.findOne({ _id });
        if (item.user.toString() === user._id.toString()) {
          await Item.deleteOne({ _id });
          return item;
        }
        throw AuthenticationError;
      }
    },
    addFavorite: async (parent: any, { saleId }: any, context: BaseContext) => {
      const user = context.user;
      if (user) {
        await User.updateOne(
          { _id: user._id },
          { $addToSet: { favorites: saleId } }
        );
        return User.findOne({ _id: user._id });
      }
      throw AuthenticationError;
    },
    deleteFavorite: async (
      parent: any,
      { saleId }: any,
      context: BaseContext
    ) => {
      const user = context.user;
      if (user) {
        await User.updateOne(
          { _id: user._id },
          { $pull: { favorites: saleId } }
        );
        return User.findOne({ _id: user._id });
      }
      throw AuthenticationError;
    },
  },
};

export default resolvers;
