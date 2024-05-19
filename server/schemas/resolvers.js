const { User, Product, Category, Order, Show } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {

  Query: {

    ////////////

    users: async () => {
      try {
        const users = await User.find()
          .populate('tickets')
          .populate({
            path: 'orders',
            populate: {
              path: 'products',
              model: 'Product'
            }
          });
        return users;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch users.');
      }
    },

    ticket: async (parent, { userId, ticketId }) => {
      try {
        const user = await User.findById(userId);
        if (!user) {
          throw new Error('User not found.');
        }
        const ticket = user.tickets.id(ticketId);
        if (!ticket) {
          throw new Error('Ticket not found.');
        }
        return ticket;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch ticket.');
      }
    },
    tickets: async (parent, { userId }) => {
      try {
        const user = await User.findById(userId).populate({
          path: 'tickets',
          populate: {
            path: 'show',
            model: 'Show'
          }
        });
        if (!user) {
          throw new Error('User not found.');
        }
          return user.tickets;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch tickets.');
      }
    },
    /////////////
    thoughts: async (parent, args) => {
      // Assuming thoughts are retrieved from the current show of the logged-in user
      if (args.firstName && args.showId) {
        const user = await User.findOne({ firstName: args.firstName });
        const show = await Show.findOne({ _id: args.showId, user: user._id });
        return show.thoughts;
      }
      throw new Error('Invalid query parameters.');
    },
    ///////////
    thought: async (parent, { thoughtId }) => {
      try {
        // Find the thought within the shows collection where it's embedded
        const showWithThought = await Show.findOne({ 'thoughts._id': thoughtId });
        // Find the thought within the embedded thoughts array
        const thought = showWithThought.thoughts.find(t => t._id === thoughtId);
        return thought;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to find the thought.');
      }
    },
    ///////
    me: async (parent, args, context) => {
      console.log("Debugging 'me' query - Context User:", context.user);
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id })
          .populate('thoughts');
        console.log("Debugging 'me' query - Found User:", user);
        return user;
      }
      console.log("Debugging 'me' query - No User Found");
      throw new AuthenticationError('You must be logged in');
    },
    // ----------------------------------------------------- //
    /////////
    shows: async () => {
      try {
        return await Show.find()
          .populate('thoughts');
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch shows.');
      }
    },
    /////////
    show: async (parent, { _id }) => {
      try {
        return await Show.findById(_id)
          .populate('thoughts');
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch show.');
      }
    },

    // ----------------------------------------------------- //

    categories: async () => {
      return await Category.find();
    },
    /////////////    
    products: async (parent, { category, name }) => {
      const params = {};
      if (category) {
        params.category = category;
      }
      if (name) {
        params.name = {
          $regex: name,
        };
      }
      return await Product.find(params)
        .populate('category');
    },
    ///////////    
    product: async (parent, { _id }) => {
      return await Product.findById(_id)
        .populate('category');
    },
    /////////    
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id)
          .populate({
            path: 'orders.products',
            populate: 'category',
          })
          .populate('tickets');
        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);
        return user;
      }
      throw AuthenticationError;
    },
    //////////    
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id)
          .populate({
            path: 'orders.products',
            populate: 'category',
          });
        return user.orders.id(_id);
      }
      throw AuthenticationError;
    },
    /////////////    
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      // We map through the list of products sent by the client to extract the _id of each item and create a new Order.
      await Order.create({ products: args.products.map(({ _id }) => _id) });
      const line_items = [];
      for (const product of args.products) {
        line_items.push({
          price_data: {
            currency: 'aud',
            product_data: {
              name: product.name,
              description: product.description,
              images: [`${url}/images/${product.image}`],
            },
            unit_amount: product.price * 100,
          },
          quantity: product.purchaseQuantity,
        });
      }
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });
      return { session: session.id };
    },
  },

  // ------------------------ MUTATIONS ----------------------------------------------------- //

  Mutation: {
    createTicket: async (parent, { purchaseDate, showName, price, venue, time }, context) => {
      if (context.user) {
        try {
          const user = await User.findById(context.user._id);
          if (!user) {
            throw new Error('User not found');
          }
          const newTicket = {
            purchaseDate,
            showName,
            price,
            venue,
            time,
          };
          user.tickets.push(newTicket);
          await user.save();
          return newTicket;
        } catch (error) {
          console.error('Failed to create ticket:', error);
          throw new Error(`Failed to create ticket: ${error.message}`);
        }
      } else {
        throw new AuthenticationError('You must be logged in to create a ticket.');
      }
    },

    //------------------- thoughts ------------------------- //

    // creating a thought linked to a show 
    addThought: async (parent, { showId, thoughtText }, context) => {
      if (context.user) {
        try {
          // Find the show by its ID
          const show = await Show.findById(showId);
          if (!show) {
            throw new Error('Show not found');
          }
          // Create a new thought embedded within the show
          show.thoughts.push({
            thoughtText,
            thoughtAuthor: context.user.firstName,
          });
          // Save the updated show
          const updatedShow = await show.save();
          return updatedShow;
        } catch (error) {
          throw new Error(`Error creating thought: ${error.message}`);
        }
      }
      throw new Error('You must be logged in');
    },

    /////////////////
    removeThought: async (parent, { thoughtId }, context) => {
      if (context.user) {
        try {
          // Find the thought by its ID and delete it
          const deletedThought = await Thought.findOneAndDelete({
            _id: thoughtId,
            thoughtAuthor: context.user.firstName,
          });
          if (!deletedThought) {
            throw new Error('Thought not found or you are not authorized to delete it.');
          }
          // Remove the thought's ID from the user's thoughts array
          await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { thoughts: deletedThought._id } }
          );
          return deletedThought;
        } catch (error) {
          console.error(error);
          throw new Error('Failed to remove thought.');
        }
      } else {
        throw new AuthenticationError('You must be logged in to remove a thought.');
      }
    },


    //------------------- shows ------------------------- //
    //////////////
    createShow: async (parent, { input }) => {
      const show = await Show.create(input);
      //  add thoughts here if you want
      return show;
    },
    //////////////    
    updateShow: async (parent, { _id, input }) => {
      const updatedShow = await Show.findByIdAndUpdate(_id, input, { new: true });
      // add thoughts update here if you want
      return updatedShow;
    },
    ///////////////    
    deleteShow: async (parent, { _id }) => {
      return await Show.findByIdAndDelete(_id);
    },

    //------------------- ------ ------------------------- //
    ////////////
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    /////////////
    addOrder: async (parent, { products }, context) => {
      if (context.user) {
        const order = new Order({ products });
        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order },
        });
        return order;
      }
      throw AuthenticationError;
    },
    ///////////////
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }
      throw AuthenticationError;
    },
    //////////////
    updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;
      return await Product.findByIdAndUpdate(
        _id,
        { $inc: { quantity: decrement } },
        { new: true }
      );
    },
    //////////////
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw AuthenticationError;
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(user);
      return { token, user };
    }, // end login bracket
    //////////////


  }, // end mutation bracket

} // end resolvers bracket

module.exports = resolvers;
