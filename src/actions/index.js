import shop from '../api/shop'
import { firebaseApp } from "../firebase";
import * as types from '../constants/ActionTypes'

const Products = firebaseApp.database().ref().child('products');

const Favorites = firebaseApp.database().ref().child('favorites');

const Purchases = firebaseApp.database().ref().child('purchases');

const fetchProducts = products => {
  return {
    type: types.FETCH_PRODUCTS,
    products
  }
}

const fetchProductsFavorites = favorites => {
  return {
    type: types.FETCH_PRODUCTS_FAVORITE,
    favorites
  }
}

const fetchPurchases = purchases => {
  return {
    type: types.FETCH_PURCHASES,
    purchases
  }
}

export const getFetchedProducts = () => dispatch => {
  Products.on('value', snapshot => {
    dispatch(fetchProducts(snapshot.val()))
  })
}


export const getFetchedProductsFavorites = () => dispatch => {
  Favorites.on('value', snapshot => {
    dispatch(fetchProductsFavorites(snapshot.val()))
  })
}

export const getFetchedPurchases = () => dispatch => {
  Purchases.on('value', snapshot => {
    dispatch(fetchPurchases(snapshot.val()))
  })
}

const receiveProducts = products => ({
  type: types.RECEIVE_PRODUCTS,
  products
})

export const getAllProducts = () => dispatch => {
  shop.getProducts(products => {
    dispatch(receiveProducts(products))
  })
}

const addToCartUnsafe = productId => ({
  type: types.ADD_TO_CART,
  productId
})

export const addToCart = productId => (dispatch, getState) => {
  if (getState().products.byId[productId].inventory > 0) {
    dispatch(addToCartUnsafe(productId))
  }
}

export const checkoutCart = (newShippingAddress, newCreditCard, userName) => dispatch =>  {
  dispatch({
    type: types.CHECKOUT_CART,
    payload: {
      newShippingAddress,
      newCreditCard,
      userName
    }
  })
}

export const checkoutFavorite = newProduct => dispatch =>{
  dispatch({
    type: types.ADD_TO_FAVORITE,
    payload:{
      newProduct
    }
  })
}

export const checkout = products => (dispatch, getState) => {
  const { cart } = getState()

  dispatch({
    type: types.CHECKOUT_REQUEST
  })
  shop.buyProducts(products, () => {
    dispatch({
      type: types.CHECKOUT_SUCCESS,
      cart
    })
  })
}