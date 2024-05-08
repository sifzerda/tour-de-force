import {
  UPDATE_PRODUCTS,
  ADD_TO_CART,
  UPDATE_CART_QUANTITY,
  REMOVE_FROM_CART,
  ADD_MULTIPLE_TO_CART,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  CLEAR_CART,
  TOGGLE_CART,
} from './actions';

// TODO: To get a better understand of how a reducer works - add comments to the various actions in the reducer
export const reducer = (state, action) => {
  switch (action.type) {
    // TODO: Add a comment describing the functionality of the UPDATE_PRODUCTS case
    // if or switch statements:
    // if one action is made, will return corresponding state
    case UPDATE_PRODUCTS:
      return {
        // below copies the existing state, and combines it with
        // the new state action taken
        // (i.e. will keep the present state, copying over what is different in the new state)
        ...state,
        products: [...action.products],
      };

    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.product],
      };

    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.products],
      };
    // TODO: Add a comment describing the functionality of the UPDATE_CART_QUANTITY case
    // if user takes action to add/remove cart items,
    // will return updated cart state
    // will update purchaseQuantity for the product
    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map((product) => {
          // if the actioned object doesn't match the product object
          if (action._id === product._id) {
            product.purchaseQuantity = action.purchaseQuantity;
          }
          // below means 'or do nothing', i.e. return product as is
          return product;
        }),
      };

    // TODO: Add a comment describing the functionality of the REMOVE_FROM_CART case
    // If user removes items from cart,
    // will return new cart state 
    case REMOVE_FROM_CART:
      let newState = state.cart.filter((product) => {
        return product._id !== action._id;
      });

      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState,
      };

    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: [],
      };

    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen,
      };

    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };

    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory,
      };

    // TODO: Add a comment describing what the default case is for
    // If no action is taken, will return the current state
    default:
      return state;
  }
};
