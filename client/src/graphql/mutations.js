import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation register(
    $name: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      name: $name
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      message
      token
    }
  }
`;

export const UPDATE_ME = gql`
  mutation updateMe(
    $name: String!
    $email: String!
    $about: String
    $seller: Boolean!
  ) {
    updateMe(name: $name, email: $email, about: $about, seller: $seller) {
      _id
      name
      email
      seller
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_ME = gql`
  mutation deleteMe {
    deleteMe {
      _id
    }
  }
`;

export const CREATE_SHOP = gql`
  mutation createShop($name: String!, $description: String!, $image: Upload) {
    createShop(
      shop: { name: $name, description: $description, image: $image }
    ) {
      _id
      name
      description
      imageUrl
      image
    }
  }
`;

export const UPDATE_SHOP = gql`
  mutation updateShop(
    $shopId: ID!
    $name: String!
    $description: String!
    $image: Upload
  ) {
    updateShop(
      shopId: $shopId
      shop: { name: $name, description: $description, image: $image }
    ) {
      _id
      name
      description
      imageUrl
      image
    }
  }
`;

export const DELETE_SHOP = gql`
  mutation deleteShop($shopId: ID!) {
    deleteShop(shopId: $shopId) {
      _id
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation createProduct(
    $shopId: ID!
    $name: String!
    $description: String!
    $category: String!
    $quantity: Int!
    $price: Float!
    $image: Upload
  ) {
    createProduct(
      shopId: $shopId
      product: {
        name: $name
        description: $description
        category: $category
        quantity: $quantity
        price: $price
        image: $image
      }
    ) {
      _id
      name
      description
      category
      quantity
      price
      image
      imageUrl
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct(
    $shopId: ID!
    $productId: ID!
    $name: String!
    $description: String!
    $category: String!
    $quantity: Int!
    $price: Float!
    $image: Upload
  ) {
    updateProduct(
      shopId: $shopId
      productId: $productId
      product: {
        name: $name
        description: $description
        category: $category
        quantity: $quantity
        price: $price
        image: $image
      }
    ) {
      _id
      name
      description
      category
      quantity
      price
      image
      imageUrl
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($shopId: ID!, $productId: ID!) {
    deleteProduct(shopId: $shopId, productId: $productId) {
      _id
    }
  }
`;
