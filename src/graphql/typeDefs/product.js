import { gql } from 'apollo-server-express';

export default gql`
  type Product {
    _id: ID!
    name: String!
    description: String!
    category: String!
    quantity: Int!
    price: Float!
    image: String
    imageUrl: String
    shop: Shop!
  }

  input InputProduct {
    name: String!
    description: String!
    category: String!
    quantity: Int!
    price: Float!
    image: Upload
  }

  extend type Query {
    getProducts(search: String, category: String): [Product!]!

    getProduct(productId: ID!): Product!
    listProductsByShop(shopId: ID!): [Product!]!

    listLatestProducts(limit: Int): [Product!]!

    listRelatedProducts(productId: String!, limit: Int): [Product!]!

    listCategories: [String!]!
  }

  extend type Mutation {
    createProduct(shopId: ID!, product: InputProduct!): Product!

    updateProduct(shopId: ID!, productId: ID!, product: InputProduct!): Product!

    deleteProduct(shopId: ID!, productId: ID!): Product!
  }
`;
