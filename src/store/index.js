import Vue from "vue";
import Vuex from "vuex";
import { db } from "../firebase/db";
import firebase from "firebase/app";
import "firebase/firestore";
import { vuexfireMutations, firestoreAction } from "vuexfire";
import * as Types from "./types";
import constants from "./constants";
import { province } from "./province";
Vue.use(Vuex);
Vue.use(firebase);

export const store = new Vuex.Store({


  state: {
    Product: [],
    //Product: [],
    cart: [],
    selectedProduct: 0,
    promo: {
      code: "TEST",
      sale: 10,
    },
    promoCheck: false,
    province: province,
    nofications: []
  },
  mutations: {
    ...vuexfireMutations,

    // [Types.SET_NOFI](state, payload) {
    //   state.nofications.showing = state.nofications.push(payload);
    // },
    // [Types.REMOVE_NOFI](state, payload) {
    //   const cartItemIndex = state.nofications.findIndex((x) => x.index === payload.index);
    //   state.nofications.splice(cartItemIndex, 1) 
    // },
    
    // ADD_NUMBER(state, product) {
    //   const cartItemIndex = state.Product.findIndex(
    //     (item) => item.id === product.id
    //   );

    //   if (cartItemIndex > 0) {
    //     state.Product[cartItemIndex].cartItemIndex = 2;
    //   }
    // },
    [Types.ADD_ORDER](state, payload) {
      let cartItemIndex = state.cart.findIndex(
        (x) => x.id === payload.id && x.orderSize === payload.orderSize
      );
      if (cartItemIndex > -1) {
        state.cart[cartItemIndex].orderNumber =
          payload.orderNumber + state.cart[cartItemIndex].orderNumber;
      } else {
        state.cart.push(payload);
      }
      const cart = JSON.stringify(state.cart);
      localStorage.setItem(constants.LOCAL_STORAGE_ORDERS, cart);
    },
    [Types.SET_ORDER](state, payload) {
      state.cart = payload;
      const cart = JSON.stringify(state.cart);
      localStorage.setItem(constants.LOCAL_STORAGE_ORDERS, cart);
    },
    // [Types.REMOVE_PRODUCT_FROM_CART](state, payload) {
    //   const cartItemIndex = state.cart.findIndex((x) => x.id === payload.id);

    //   state.cart.splice(cartItemIndex, 1);
    // },
    [Types.CHECK_PROMO](state, payload) {
      state.promoCheck = payload;
    },
  },
  actions: {
    bindProduct: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef("Product", db.collection("Product"));
    }),

    loadProduct({ commit }, productid) {
      commit("[Types.ADD_ORDER]", productid);
    },
  },
  modules: {},
  getters: {
    cartLength() {
      //return store.state.cart.length;
      let count = 0;
      store.state.cart.forEach((cartItem) => {
        count += cartItem.orderNumber;
      });
      return count;
    },
  
  },
});
