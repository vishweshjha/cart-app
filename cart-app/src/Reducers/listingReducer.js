const defaultListingState = {
  productList: [],
  isCartEmpty: true,
  cartList: [],
  cartCount: 0,
};

const assign = (obj, keyPath, value) => {
  const lastKeyIndex = keyPath.length - 1;
  for (let i = 0; i < lastKeyIndex; ++i) {
    const key = keyPath[i];
    if (!(key in obj)) obj[key] = {};
    obj = obj[key];
  }
  obj[keyPath[lastKeyIndex]] = value;
};

export default function listingReducer(state = defaultListingState, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { id } = action.payload;
      const { cartList, productList, cartCount } = state;

      let productToAdd = cartList[id];
      let count;
      if (!productToAdd) {
        productToAdd = productList.find(obj => obj.id === id);
        count = 1;
      } else {
        count = productToAdd.count + 1;
      }
      const pid = productToAdd.id;
      const newCart = { ...state.cartList, [pid]: { ...productToAdd, count } };
      const newcount = cartCount + 1;
      return { ...state, cartList: newCart, cartCount: newcount };
    }
    case 'REMOVE_ITEM': {
      const { id } = action.payload;
      const { cartList, cartCount } = state;
      const productToRemove = cartList[id];
      const count = productToRemove.count - 1;
      const pid = productToRemove.id;
      const newCart = { ...state.cartList, [pid]: { ...productToRemove, count } };
      const newcount = cartCount - 1;
      return { ...state, cartList: newCart, cartCount: newcount };
    }
    case 'SET_PRODUCTS':
      return { ...state, ...action.payload };
    case 'DETELE_ITEM': {
      const { id } = action.payload;
      const { cartList, cartCount } = state;
      const { count } = cartList[id];
      const newcount = cartCount - count;
      const stateObj = {};
      const idKeys = Object.keys(cartList);
      const nonDeletedKeys = idKeys.filter(key => key.indexOf(id));
      nonDeletedKeys.map((key) => {
        assign(stateObj, [key], cartList[key]);
        return null;
      });
      return { ...state, cartList: stateObj, cartCount: newcount };
    }
    default:
      return state;
  }
}
