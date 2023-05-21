const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    drinks: [Drink]!
  }

  type Drink {
    _id: ID
    drinkText: String
    drinkAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    drinks(username: String): [Drink]
    drink(drinkId: ID!): Drink
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addDrink(drinkText: String!): Drink
    addComment(drinkId: ID!, commentText: String!): Drink
    removeDrink(drinkId: ID!): Drink
    removeComment(drinkId: ID!, commentId: ID!): Drink
  }
`;

module.exports = typeDefs;
