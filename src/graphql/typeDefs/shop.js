import { gql } from 'apollo-server-express';

export default gql`
  type Shop {
    _id: ID!
    name: String!
    description: String!
    image: String
    imageUrl: String
    owner: User!
  }

  extend type Query {
    getShops(owner: ID): [Shop!]!
    getShop(shopId: ID!): Shop!
  }

  input InputShop {
    name: String!
    description: String!
    image: Upload
  }

  extend type Mutation {
    createShop(shop: InputShop!): Shop!
    updateShop(shopId: ID!, shop: InputShop!): Shop!
    deleteShop(shopId: ID!): Shop!
  }
`;
