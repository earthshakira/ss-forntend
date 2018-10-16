<template>
  <div class="row">
    <div class="col-sm-3">
          <img :src="product.imageLinks[0]" style="width:100%">
    </div>
    <div class="col-sm-9 text-left" style="padding-top:1em">
      <p class="product-name"><b>{{ product.product }}</b> <b-badge variant='success' v-if="discounted">{{coupon}}</b-badge></p>
      <p class="artist-name">{{ product.artist }} / <span class="category-name">{{ product.category }}</span></p>
      <p class="price" style="position:absolute;right:1em;top:1em;">{{ product.price }} x {{product.quantity}} =
        <span v-if="totalPrice == newPriceAmount" class="totalPrice"><b>{{ totalPrice }}.00</b></span>
        <span v-else class="totalPrice"><b><strike>{{ totalPrice }}.00</strike> {{newPriceAmount}}.00</b></span>
      </p>

    </div>
  </div>
</template>

<script>

export default {
  name: 'DiscountProduct',
  props: ['product','newPrice','coupon'],
  methods:{
  },
  computed:{
    totalPrice: function() { return parseInt(this.product.price) * this.product.quantity },
    newPriceAmount: function(){
      if(this.newPrice[""+this.product.productId] || this.newPrice[""+this.product.productId] === 0)
        return this.newPrice[""+this.product.productId];
      return this.totalPrice;
    },
    discounted:function(){
      return (this.newPrice[""+this.product.productId] || this.newPrice[""+this.product.productId] === 0) ? true : false;
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
.category-name{
  color: #777;
}
</style>
