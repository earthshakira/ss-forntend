<template>
  <div class="row">
    <div class="col-sm-3">
          <img :src="product.imageLinks[0]" style="width:100%">
    </div>
    <div class="col-sm-9 text-left" style="padding-top:1em">
      <p class="product-name"><b>{{ product.product }}</b></p>
      <p class="artist-name">{{ product.artist }} / <span class="category-name">{{ product.category }}</span></p>
      <div class="form-inline">
        <button class="btn btn-sm round btn-primary" @click="addToCart(-1)"><font-awesome-icon icon="minus" /></button>
        <div style="width:4em" class="text-center"> X {{product.quantity}} </div>
        <button class="btn btn-sm round btn-primary" @click="addToCart(1)"><font-awesome-icon icon="plus" /></button>
        <button class="btn btn-sm btn-danger" style="margin-left:1em" @click="removeItem()">Remove</button>
      </div>
      <p class="price" style="position:absolute;right:1em;top:1em;">{{ product.price }}</p>
      <p class="totalPrice" style="position:absolute;right:1em;top:4.7em;"><b>{{ totalPrice }}.00</b></p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CartProduct',
  props: ['product'],
  methods:{
    addToCart(q){
      this.$store.commit('updateCart',{id:this.product.productId,quantity:q});
    },removeItem(){
      this.$store.commit('removeItem',this.product.productId);
    }
  },
  computed:{
    totalPrice: function() { return parseInt(this.product.price) * this.product.quantity }
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
.category-name{
  color: #777;
}
</style>
