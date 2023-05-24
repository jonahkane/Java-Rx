const { AuthenticationError } = require("apollo-server-express");
const { User, Drink } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("drinks");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("drinks");
    },
    drinks: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Drink.find(params).sort({ createdAt: -1 });
    },
    drink: async (parent, { drinkId }) => {
      return Drink.findOne({ _id: drinkId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("drinks");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addDrink: async (
      parent,
      { drinkTitle, drinkIngredients, drinkInstructions },
      context
    ) => {
      if (context.user) {
        const drink = await Drink.create({
          drinkTitle,
          drinkIngredients,
          drinkInstructions,
          drinkAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { drinks: drink._id } }
        );

        return drink;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addComment: async (parent, { drinkId, commentText }, context) => {
      if (context.user) {
        return Drink.findOneAndUpdate(
          { _id: drinkId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeDrink: async (parent, { drinkId }, context) => {
      if (context.user) {
        const drink = await Drink.findOneAndDelete({
          _id: drinkId,
          drinkAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { drinks: drink._id } }
        );

        return drink;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeComment: async (parent, { drinkId, commentId }, context) => {
      if (context.user) {
        return Drink.findOneAndUpdate(
          { _id: drinkId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
