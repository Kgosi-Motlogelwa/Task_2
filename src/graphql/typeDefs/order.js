import { gql } from 'apollo-server-express';

export default gql`
  type Address {
    street: String!
    city: String!
    state: String!
    zipcode: String
    country: String
  }

  type CartItem {
    _id: ID!
    product: Product!
    quantity: Int!
    shop: Shop!
    status: String!
  }

  type Order {
    _id: ID!
    customerName: String!
    customerEmail: String!
    deliveryAddress: Address!
    user: User!
    products: [CartItem!]!
  }

  input InputAddress {
    street: String!
    city: String!
    state: String!
    zipcode: String
    country: String
  }

  input InputCartItem {
    product: ID!
    quantity: Int!
    shop: ID!
    status: String
  }

  input InputOrder {
    customerName: String!
    customerEmail: String!
    deliveryAddress: InputAddress!
    products: [InputCartItem!]!
  }

  extend type Query {
    getOrders: [Order!]!
    getOrder(orderId: ID!): Order!
    getStatusValues: [String!]!

    listOrdersByUser(userId: ID!): [Order!]!
    listOrdersByShop(shopId: ID!): [Order!]!
  }

  extend type Mutation {
    createOrder(order: InputOrder!): Order!
    updateOrder(
      productId: ID
      cartItemId: ID!
      status: String!
      quantity: Int
    ): Order!
  }
`;
