import { gql } from 'apollo-server-express';

export default gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    about: String
    seller: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type AuthRes {
    message: String
    token: String!
    user: User
  }

  extend type Query {
    login(email: String!, password: String!): AuthRes!

    getUsers: [User!]!

    getUser(userId: ID!): User!

    getMe: User!
  }

  extend type Mutation {
    register(
      name: String!
      email: String!
      password: String!
      confirmPassword: String!
    ): AuthRes!
    updateMe(
      name: String!
      email: String!
      about: String
      seller: Boolean!
    ): User!

    deleteMe: User!
    updateUser(
      userId: ID!
      name: String!
      email: String!
      about: String
      seller: Boolean!
    ): User!
    deleteUser(userId: ID!): User!
  }
`;
