import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  query loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
        email
        about
        seller
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_ME = gql`
  query getMe {
    getMe {
      _id
      name
      email
      about
      seller
      createdAt
      updatedAt
    }
  }
`;

export const GET_SHOPS = gql`
  query getShops($owner: ID) {
    getShops(owner: $owner) {
      _id
      name
      description
      imageUrl
      owner {
        _id
        name
      }
    }
  }
`;

export const GET_SHOP = gql`
  query getShop($shopId: ID!) {
    getShop(shopId: $shopId) {
      _id
      name
      description
      imageUrl
      image
      owner {
        _id
        name
      }
    }
  }
`;

export const GET_PRODUCTS = gql`
  query getProducts($search: String, $category: String) {
    getProducts(search: $search, category: $category) {
      _id
      name
      description
      image
      imageUrl
      quantity
      price
      category
      shop {
        _id
        name
      }
    }
  }
`;

export const LIST_PRODUCTS_BY_SHOP = gql`
  query listProductsByShop($shopId: ID!) {
    listProductsByShop(shopId: $shopId) {
      _id
      name
      description
      image
      imageUrl
      quantity
      price
      category
      shop {
        _id
        name
      }
    }
  }
`;

export const LIST_LATEST_PRODUCTS = gql`
  query listLatestProducts {
    listLatestProducts {
      _id
      name
      description
      image
      imageUrl
      quantity
      price
      category
      shop {
        _id
        name
      }
    }
  }
`;

export const LIST_RELATED_PRODUCTS = gql`
  query listRelatedProducts($productId: String!) {
    listRelatedProducts(productId: $productId) {
      _id
      name
      description
      image
      imageUrl
      quantity
      price
      category
      shop {
        _id
        name
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query getProduct($productId: ID!) {
    getProduct(productId: $productId) {
      _id
      name
      description
      image
      imageUrl
      quantity
      price
      category
      shop {
        _id
        name
      }
    }
  }
`;

export const LIST_CATEGORIES = gql`
  query listCategories {
    listCategories
  }
`;
