const typeDefs = `

type Show {
  _id: ID
  name: String
  description: String
  image: String
  ticketBannerImg: String
  ticketDesc: String
  venue: [Venue]
  price: Float
  thoughts: [Thought]
}

type Venue {
  _id: ID
  name: String
  time: [Time]
  seatRows: Int 
  seatCols: Int
}

type Time {
  _id: ID
  time: String
}

  type Category {
    _id: ID
    name: String
  }

  type Product {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: Category
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
    thoughts: [Thought]
  }

  type Thought {
    _id: ID
    thoughtText: String
    thoughtAuthor: String
    createdAt: String
    show: Show
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  input ProductInput {
    _id: ID
    purchaseQuantity: Int
    name: String
    image: String
    price: Float
    quantity: Int
  }

  input ShowInput {
    name: String
    description: String
    image: String
    venue: [VenueInput]
    price: Float
  }

  input VenueInput {
    name: String
    time: [TimeInput]
    seatRows: Int
    seatCols: Int
  }

  input TimeInput {
    time: String
  }

  type Query {
    shows: [Show]
    show(_id: ID): Show
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
    checkout(products: [ProductInput]): Checkout
    thoughts(firstName: String): [Thought]
    thought(thoughtId: ID!): Thought
    me: User
  }

  type Mutation {
    createShow(input: ShowInput): Show
    updateShow(_id: ID!, input: ShowInput!): Show
    deleteShow(_id: ID!): Show
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateProduct(_id: ID!, quantity: Int!): Product
    login(email: String!, password: String!): Auth
    addThought(showId: ID!, thoughtText: String!): Thought
    removeThought(thoughtId: ID!): Thought
  }
`;

module.exports = typeDefs;
