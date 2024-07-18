import { User, Sale, Item } from "@/app/models";
import { BaseContext } from "apollo-server-types";
import { signToken, AuthenticationError } from "@/app/libs/auth/backend";
import { UserNotFound, ItemNotFound, SaleNotFound } from "@/app/libs/error";
import { GraphQLError } from "graphql";

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
        return User.findOne({ _id: user._id }).populate("sales").populate("favorites");
      }
      throw AuthenticationError;
    },
    sales: async () => {
      const sales = await Sale.find().populate("items");
      if (!sales) throw SaleNotFound;
      return sales;
    },
    sale: async (parent: any, { _id }: any) => {
      const sale = await Sale.findOne({ _id }).populate("items");
      if (!sale) throw SaleNotFound;
      return sale;
    },
    item: async (parent: any, { _id }: any) => {
      const item = await Item.findOne({ _id });
      if (!item) throw ItemNotFound;
      return item;
    },
    items: async () => {
      const items = await Item.find();
      if (!items) throw ItemNotFound;
      return items;
    },
    getCoordinates: async (parent: any, { location }: any) => {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.GOOGLE_API_KEY}`);
      const data = await response.json();
      if (!data || data.status === "ZERO_RESULTS") {
        throw new GraphQLError("No results found for location");
      }
      const { lat, lng } = data.results[0].geometry.location;
      return { latitude: lat, longitude: lng };
    },
    nearBySales: async (parent: any, { coordinates, radius }: any) => {
      const sales = Sale.find({
        geoLocation: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [coordinates.longitude, coordinates.latitude],
            },
            $maxDistance: radius * 1609.34,
          },
        },
      });
      if (!sales) throw SaleNotFound;
      return sales;
    },
    userLocation: async (parent: any, { ip }: any) => {
      try {
        const response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.IP_GEOLOCATION_API_KEY}&ip=${ip}`);
        const data = await response.json();
        return { latitude: data.latitude, longitude: data.longitude };
      } catch (e: any) {
        return { error: e.message };
      }
    },
  },

  Mutation: {
    addUser: async (parent: any, args: IUserArgs) => {
      try {
        const user = await User.create(args);
        const token = signToken(user);
        return { token, user };
      } catch (e: any) {
        return { error: e.message };
      }
    },
    login: async (parent: any, { email, password }: IUserArgs) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw UserNotFound;
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
        if (!sale) throw SaleNotFound;
        await User.findOneAndUpdate({ _id: user._id }, { $addToSet: { sales: sale._id } }, { new: true });
        if (!user) throw UserNotFound;
        return Sale.findOne({ _id: sale._id });
      }
      throw AuthenticationError;
    },
    deleteSale: async (parent: any, { _id }: any, context: BaseContext) => {
      const user = context.user;
      if (user) {
        await Sale.deleteOne({ _id });
        const updatedUser = await User.updateOne({ _id: user._id }, { $pull: { sales: _id } }, { new: true });

        return { message: "Sale deleted", user: updatedUser };
      }
      throw AuthenticationError;
    },
    updateSale: async (parent: any, args: any, context: BaseContext) => {
      const user = context.user;
      if (user) {
        const updatedSale = Sale.findOneAndUpdate({ _id: args.saleId }, { ...args }, { new: true });
        if (!updatedSale) throw SaleNotFound;
        return updatedSale;
      }
      throw AuthenticationError;
    },
    addItem: async (parent: any, args: any, context: BaseContext) => {
      const user = context.user;
      if (user) {
        const item = await Item.create({ ...args, user: user._id });
        if (!item) throw ItemNotFound;
        await Sale.updateOne({ _id: args.sale }, { $addToSet: { items: item._id } });
        return item;
      }
      throw AuthenticationError;
    },
    updateItem: async (parent: any, args: any, context: BaseContext) => {
      const user = context.user;
      if (user) {
        const item = await Item.findOne({ _id: args._id });
        if (!item) throw ItemNotFound;
        if (item.user.toString() === user._id.toString()) {
          const updatedItem = await Item.updateOne({ _id: args._id }, { ...args }, { new: true });
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
        if (!item) throw ItemNotFound;
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
        const updatedUser = await User.updateOne({ _id: user._id }, { $addToSet: { favorites: saleId } }, { new: true });
        if (!updatedUser) throw UserNotFound;
        return updatedUser;
      }
      throw AuthenticationError;
    },
    deleteFavorite: async (parent: any, { saleId }: any, context: BaseContext) => {
      const user = context.user;
      if (user) {
        const updatedUser = await User.updateOne({ _id: user._id }, { $pull: { favorites: saleId } }, { new: true });
        if (!updatedUser) throw UserNotFound;
        return updatedUser;
      }
      throw AuthenticationError;
    },
  },
};

export default resolvers;
