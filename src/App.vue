<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="info">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="#"><font-awesome-icon icon="coffee" /></b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item :active="link == '/'" href="#/">Cart</b-nav-item>
          <b-nav-item :active="link == '/listings'" href="#/listings">Listings</b-nav-item>
          <b-nav-item :active="link == '/coupons'" href="#/coupons">Coupons</b-nav-item>
          <b-nav-item style="position:absolute;right:1em;top:0em">

            <div class="inline-form">
                <input placeholder="Enter a UserId" v-model="userInput" class="from-control" @keyup.enter="setUser()" />
                <button @click="setUser()" style="margin-left:1em" class="btn btn-primary">Set User</button>
                <span>{{userId}}</span>
            </div>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div v-if="loading">
      <b-progress :value="100" variant="info" striped :animated="true" class="mb-2"></b-progress>
      <p style="margin-top:1em" v-if="userId">current UserId is <u style="color:#42b983">{{userId}}</u></p>
    </div>
    <router-view class="container" v-else/>
  </div>
</template>

<script>

import PostsService from '@/services/PostsService'

export default {
  name: 'App',
  data:function(){
    return {
      loading:false,
      userInput:""
    }
  },mounted () {
    this.getProducts();
    this.getCoupons();
  },methods:{
    async getProducts () {
        this.loading = true;
        const response = await PostsService.fetchPosts()
        let productsList = response.data
        let categoryList = {};
        let artistList = {};
        let productList = {};
        productsList.forEach(item => {
        	item.images = JSON.parse(item.images);
          item.quantity = 0;
        	item.imageLinks = [];
        	for (var i =  0; i < item.images.length; i++) {
        		item.imageLinks.push('https://images.thesouledstore.com/public/theSoul/uploads/catalog/product/'+item.images[i]);
        	}
          categoryList[(item.category)] = true;
          productList[(item.product)] = true;
          artistList[(item.artist)] = true;
        });
        this.$store.state.categoryList = Object.keys(categoryList);
        this.$store.state.artistList = Object.keys(artistList);
        this.$store.state.productList = Object.keys(productList);
        this.$store.state.products = productsList;
        this.$store.state.total = 0;
        this.loading = false;
      },
    async getCoupons() {
        const response = await PostsService.fetchCoupons()
        let couponsList = response.data;
        this.$store.state.coupons = couponsList;
        console.log(couponsList);
    },
    setUser() {
        this.$store.state.userId = this.userInput;
        this.loading = true;
        const response = PostsService.createCart(this.userId).then(response => {
            this.$store.commit('applyCart', response.data);
        }).catch(err => {
            this.error = err;
        }).then(() => {
            this.loading = false;
        });
    }
  },
  computed:{
    link: function(){
      return this.$route.path;
    },
    userId:function(){
      return this.$store.state.userId;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
