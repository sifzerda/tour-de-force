import { gql } from '@apollo/client';

export const CREATE_TICKET = gql`
  mutation CreateTicket($purchaseDate: String!, $showName: String!, $price: Float!, $venue: String!, $time: String!) {
    createTicket(purchaseDate: $purchaseDate, showName: $showName, price: $price, venue: $venue, time: $time) {
      _id
      purchaseDate
      showName
      price
      venue
      time
    }
  }
`;

export const ADD_THOUGHT = gql`
mutation addThought($showId: ID!, $thoughtText: String!) {
  addThought(showId: $showId, thoughtText: $thoughtText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
    }
  }
`;

export const CREATE_SHOW = gql`
  mutation CreateShow($input: ShowInput) {
    createShow(input: $input) {
      _id
      name
      description
      image
      price
      venue {
        name
        time {
          time
        }
        seatRows
        seatCols
      }
    }
  }
`;

export const UPDATE_SHOW = gql`
  mutation UpdateShow($_id: ID!, $input: ShowInput!) {
    updateShow(_id: $_id, input: $input) {
      _id
      name
      description
      image
      price
      venue {
        name
        time {
          time
        }
        seatRows
        seatCols
      }
    }
  }
`;

export const DELETE_SHOW = gql`
  mutation DeleteShow($_id: ID!) {
    deleteShow(_id: $_id) {
      _id
      name
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;
