import { User } from "../../../models";
import { BaseContext } from "apollo-server-types";
import { signToken, AuthenticationError } from "../../../libs/auth";

interface IUserArgs {
  username?: string;
  email?: string;
  password?: string;
}

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("thoughts");
    },
    user: async (parent: any, { username }: IUserArgs) => {
      return User.findOne({ username });
    },
    me: async (parent: any, args: IUserArgs, context: BaseContext) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent: any, args: IUserArgs) => {
      console.log(args);
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
  },
};

export default resolvers;
