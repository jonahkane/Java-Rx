import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      drinks {
        _id
        drinkTitle
        drinkIngredients
        drinkInstructions
        drinkImage
        createdAt
      }
    }
  }
`;

export const QUERY_DRINKS = gql`
  query getDrinks {
    drinks {
      _id
      drinkTitle
      drinkIngredients
      drinkInstructions
      drinkImage
      drinkAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_DRINK = gql`
  query getSingleDrink($drinkId: ID!) {
    drink(drinkId: $drinkId) {
      _id
      drinkTitle
      drinkIngredients
      drinkInstructions
      drinkImage
      drinkAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      drinks {
        _id
        drinkTitle
        drinkIngredients
        drinkInstructions
        drinkImage
        drinkAuthor
        createdAt
      }
    }
  }
`;
