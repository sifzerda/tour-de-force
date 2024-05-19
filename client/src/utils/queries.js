import { gql } from '@apollo/client';

export const QUERY_SHOWS = gql`
  {
    shows {
      _id
      name
      description
      ticketDesc
      ticketBannerImg
      image
      price
      venue {
        _id
        name
        time {
          _id
          time
        }
        seatRows
        seatCols
      }
      thoughts {
        _id
        thoughtText
        thoughtAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_SHOW = gql`
  query getShow($id: ID!) {
    show(_id: $id) {
      _id
      name
      description
      ticketDesc
      ticketBannerImg
      image
      price
      venue {
        _id
        name
        time {
          _id
          time
        }
        seatRows
        seatCols
      }
      thoughts {
        _id
        thoughtText
        thoughtAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_PRODUCTS = gql`
  query getProducts($category: ID) {
    products(category: $category) {
      _id
      name
      description
      price
      quantity
      image
      category {
        _id
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ProductInput]) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_ALL_PRODUCTS = gql`
  {
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
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      _id
      firstName
      lastName
      email
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          quantity
          image
        }
      }
      thoughts {
        _id
        thoughtText
        thoughtAuthor
        createdAt
      }
      tickets {
        _id
        purchaseDate
        showName
        price
        venue
        time
      }
    }
  }
`;

export const QUERY_USERS = gql`
{
  users {
    _id
    firstName
    lastName
    email
    orders {
      _id
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        image
      }
    }
    thoughts {
      _id
      thoughtText
      thoughtAuthor
      createdAt
    }
    tickets {
      _id
      purchaseDate
      showName
      price
      venue
      time
    }
  }
}
`;

export const QUERY_THOUGHTS = gql`
  query getThoughts {
    thoughts {
      _id
      thoughtText
      thoughtAuthor
      createdAtz
    }
  }
`;

export const QUERY_SINGLE_THOUGHT = gql`
  query getSingleThought($thoughtId: ID!) {
    thought(thoughtId: $thoughtId) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      firstName
      email
      thoughts {
        _id
        thoughtText
        thoughtAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_TICKET = gql`
  query ticket($userId: ID!, $ticketId: ID!) {
    ticket(userId: $userId, ticketId: $ticketId) {
      _id
      purchaseDate
      showName
      price
      venue
      time
    }
  }
`;
