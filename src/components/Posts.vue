<template>
  <div class="posts">
      <div>
        <div v-if="!userId"   class="text-center ">
          Hey, please set a user from the navbar input its just a string to identify a cart
        </div>
        <div v-else>
          <div class="row" style="margin-bottom:2em">
            <div class="col-sm-2">
            </div>
            <div class="col-sm-3 form-inline">
              <label>Filter:</label>
              <select class="form-control" v-model="filter">
                <option>category</option>
                <option>artist</option>
                <option>product</option>
                <option>search</option>
              </select>
            </div>
            <div class="col-sm-5 text-left form-inline">
            <label v-if="filter == 'artist'">Artist:</label>
            <select  style="width:70%;margin-left:5%"class="form-control" @change="filterProducts($event.target.value)" v-if="filter == 'artist'">
              <option v-for="item in artistList">{{item}}</option>
            </select>
            <label v-if="filter == 'category'">&nbsp;&nbsp;Category:</label>
            <select  style="width:70%;margin-left:5%"class="form-control" v-if="filter == 'category'" @change="filterProducts($event.target.value)">
              <option v-for="item in categoryList">{{item}}</option>
            </select>
            <label v-if="filter == 'product'">&nbsp;&nbsp;Product:</label>
            <select  style="width:70%;margin-left:5%"class="form-control" v-if="filter == 'product'" @change="filterProducts($event.target.value)">
              <option v-for="item in productList">{{item}}</option>
            </select>
            <input class="form-control" v-if="filter == 'search'" @keyup="textSearch($event.target.value)" type="text" placeholder="Enter" style="width:100%"/>
            </div>
          </div>
          <div class="row">
            <div v-for="product in filteredProducts" class="col-sm-6 col-md-4 col-lg-3">
              <product :product="product" :userId="userId"></product>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import PostsService from '@/services/PostsService'
import product from '@/components/Product'

export default {
  name: 'posts',
  components: {
            'product': product
        },
  data () {
    return {
      loading:false,
      filter:'search',
      filteredProducts: this.$store.state.products.slice(0,40)
    }
  },
  mounted(){
  },
  computed:{
      userId: function() { return  this.$store.state.userId},
      products : function() { return  this.$store.state.products},
      categoryList: function() { return   this.$store.state.categoryList},
      productList: function() { return   this.$store.state.productList},
      artistList: function() { return   this.$store.state.artistList}
  },
  methods: {
    filterProducts(value){
      console.log('called filter');
      this.filteredProducts = this.products.filter( item => item[this.filter] == value).slice(0,40)
    },
    textSearch(value){
      if(value){
        value = value.toLowerCase();
        this.filteredProducts = this.products.filter(item => ((item.product.toLowerCase().indexOf(value) >= 0) || (item.category.toLowerCase().indexOf(value) >= 0) || (item.artist.toLowerCase().indexOf(value) >= 0))).slice(0,40);
      }
      else this.filteredProducts = this.products.slice(0,40)
    }
  }
}
</script>

<style>
  .posts{
    margin-top: 2em;
  }
</style>
