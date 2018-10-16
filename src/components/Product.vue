<template>
  <div class="product" style="position:relative">
        <button @click="addToCart()" class="btn btn-sm btn-warning" style="position:absolute;top:0.5em;right:0.5em;color:white">
          <font-awesome-icon icon="cart-plus" />
           <b-badge variant="primary">{{product.quantity}}</b-badge>
        </button>
        <img :src="product.imageLinks[0]" style="width:100%;">
        <p class="product-name" style="font-size:0.8em;border-bottom:1px solid #ccc"><b>{{ product.product }}</b></p>
        <div class="text-left" style="position:relative">
        <p class="artist-name">{{ product.artist }} <span class="price" style="float:right;margin-right:3em;font-size:1.2em"><b>{{ product.price }}</b></span></p>

        </div>
  </div>
</template>

<script>
import PostsService from '@/services/PostsService'

export default {
  name: 'product',
  props: ['product'],
  methods:{
    addToCart(){
      this.$store.commit('updateCart',{id:this.product.productId,quantity:1});
    }
  }
}
</script>
<style>
.product-name{
  width: 85%;
  line-height: 1em;
  margin-bottom: 0em;
}
.artist-name{
  font-size: 0.7em;
}
</style>
