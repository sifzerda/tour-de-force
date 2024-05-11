const { User, Product, Category, Order, Show, Thought } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {

Query: {

  // ----------------------------------------------------- //

  thoughts: async (parent, { username }) => {
    const params = username ? { username } : {};
    return Thought.find(params).sort({ createdAt: -1 });
  },
  thought: async (parent, { thoughtId }) => {
    return Thought.findOne({ _id: thoughtId });
  },

// ----------------------------------------------------- //

  shows: async () => {
    return await Show.find();
  },
  show: async (parent, { _id}) => {
    return await Show.findById(_id); 
  },

// ----------------------------------------------------- //

    categories: async () => {
      return await Category.find();
    },
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

      return await Product.find(params).populate('category');
    },
    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate('category');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category',
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw AuthenticationError;
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category',
        });

        return user.orders.id(_id);
      }

      throw AuthenticationError;
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      // We map through the list of products sent by the client to extract the _id of each item and create a new Order.
      await Order.create({ products: args.products.map(({ _id }) => _id) });
      const line_items = [];

      for (const product of args.products) {
        line_items.push({
          price_data: {
            currency: 'usd',
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

  // ------------------------ MUTATIONS ---------------------- //

Mutation: {

      //------------------- thoughts ------------------------- //

      addThought: async (parent, { thoughtText }, context) => {
        if (context.user) {
          const thought = await Thought.create({
            thoughtText,
            thoughtAuthor: context.user.username,
          });
  
          await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { thoughts: thought._id } }
          );
  
          return thought;
        }
        throw AuthenticationError;
      },
      addComment: async (parent, { thoughtId, commentText }, context) => {
        if (context.user) {
          return Thought.findOneAndUpdate(
            { _id: thoughtId },
            {
              $addToSet: {
                comments: { commentText, commentAuthor: context.user.username },
              },
            },
            {
              new: true,
              runValidators: true,
            }
          );
        }
        throw AuthenticationError;
      },
      removeThought: async (parent, { thoughtId }, context) => {
        if (context.user) {
          const thought = await Thought.findOneAndDelete({
            _id: thoughtId,
            thoughtAuthor: context.user.username,
          });
  
          await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { thoughts: thought._id } }
          );
  
          return thought;
        }
        throw AuthenticationError;
      },
      removeComment: async (parent, { thoughtId, commentId }, context) => {
        if (context.user) {
          return Thought.findOneAndUpdate(
            { _id: thoughtId },
            {
              $pull: {
                comments: {
                  _id: commentId,
                  commentAuthor: context.user.username,
                },
              },
            },
            { new: true }
          );
        }
        throw AuthenticationError;
      },


    //------------------- shows ------------------------- //

    createShow: async (parent, { input }) => {
      return await Show.create(input);
    },
    updateShow: async (parent, { _id, input }) => {
      return await Show.findByIdAndUpdate(_id, input, { new: true });
    },
    deleteShow: async (parent, { _id }) => {
      return await Show.findByIdAndDelete(_id);
    },
  

      //------------------- ------ ------------------------- //

    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
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
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw AuthenticationError;
    },
    updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Product.findByIdAndUpdate(
        _id,
        { $inc: { quantity: decrement } },
        { new: true }
      );
    },

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
    },
  },
};

module.exports = resolvers;
