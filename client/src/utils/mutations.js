import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_DRINK = gql`
  mutation addDrink($drinkText: String!) {
    addDrink(drinkText: $drinkText) {
      _id
      drinkText
      drinkAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($drinkId: ID!, $commentText: String!) {
    addComment(drinkId: $drinkId, commentText: $commentText) {
      _id
      drinkText
      drinkAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
