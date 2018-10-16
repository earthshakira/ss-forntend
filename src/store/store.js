import Vue from 'vue'
import Vuex from 'vuex'
import PostsService from '@/services/PostsService'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state:{
    categoryList:[],
    artistList:[],
    productList:[],
    products:[],
    total:0,
    userId:"",
    coupons:[]
  },
  mutations:{
    applyCart(state,cart){
      state.products.forEach(item => {
        item.quantity = 0;
        if(cart.items[item.productId+''])
          item.quantity = cart.items[item.productId+''].quantity;
      })
    },
    refreshCoupons(state,coupon){
      PostsService.fetchCoupons().then(coupons => {
        state.coupons = coupons.data;
      });
    }
    ,
    removeItem(state,productId){
      let product = {productId:productId};
      state.products.forEach(item => {
        if(item.productId == productId){
            item.quantity = 0;
        }
      });
      PostsService.removeFromCart(product,state.userId)
    },
    updateCart(state,payload){
      let product = {};
      let removed = false;
      state.products.forEach(item => {
        if(item.productId == payload.id){
          product = item;
          console.log(item.quantity,payload.quantity);
          if(!item.quantity)
            item.quantity = 0;
          item.quantity+=payload.quantity
          if(item.quantity <= 0){
            item.quantity = 0;
            PostsService.removeFromCart({productId:payload.id},state.userId);
            removed = true;
          }
        }
      });
      let update = {productId:product.productId,quantity:product.quantity}
      if(!removed)
        PostsService.addToCart(update,state.userId);
    }
  },getters:{
    cartItems: state => {
      let items = state.products.filter(product => product.quantity > 0)
      return items;
    },
    cartValue: state => {
      let total = 0;
      state.products.forEach(item => {
          total += (parseInt(item.price) * item.quantity)
      })
      return total;
    }
  }
})
