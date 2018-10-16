<style scoped>

h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}

</style>

<template>

<div class="hello text-center">
    <h3 style="margin-top:1em"> Cart</h3>
    <hr>
    <div class="row" v-if="userId">
        <div class="col-sm-8">
            <div v-if="total>0" class="text-right">Total Price: <b>{{total}}.00</b></div>
            <div v-if="cart.length > 0">
                <div v-for="product in cart">
                    <cart-product :product="product" />
                </div>
            </div>
            <div v-else>
                <p v-if="loading">loading</p>
                <p v-else>Seems empty here go to
                    <router-link tag="li" to="/listings">
                        <a>listings</a>
                    </router-link>
                    to add items</p>
            </div>
        </div>
        <div class="col-sm-4">
            <b-card bg-variant="light" class="text-left" header="Coupons">
                <div v-for="coupon in coupons">
                    <p> <span class="badge badge-primary"> {{ coupon._id }}</span> {{coupon.desc}}
                    </p>
                    <div class="text-right">
                        <b-badge style="cursor:pointer" variant="info" @click="validate(coupon._id)">validate</b-badge>
                        <b-badge style="cursor:pointer" variant="success" @click="applyCode(coupon._id)">apply</b-badge>
                    </div>
                    <hr>
                </div>
            </b-card>
        </div>
    </div>
    <div v-else>
      <i>Please Set a userId from toolbar</i>
    </div>
    <b-modal ref="validationModalRef" size="lg" hide-footer title="Coupon Code Validation">
        <div class="d-block text-center">
            <b-progress v-if="validationLoader" :value="100" variant="info" striped :animated="true" class="mb-2"></b-progress>
            <div v-else class="text-left">
                ApiResponse:
                <br>
                <b-card bg-variant="light" class="text-left">
                    <pre>{{validationResponse | pretty}}</pre>
                </b-card>
                <i>the numbers are just the totals on which the coupon is applicable</i>
            </div>
        </div>
    </b-modal>
    <b-modal ref="appliedModalRef" size="lg" hide-footer title="Cart After Coupon">
        <div class="d-block text-center">
            <b-progress v-if="appliedLoader" :value="100" variant="info" striped :animated="true" class="mb-2"></b-progress>
            <div v-else>
                <b-alert v-if="this.couponError" show variant="danger"><b>Coupon Error :</b>{{this.couponError}}</b-alert>
                <p v-if="!this.couponError">Total Price : <b><strike>{{total}}.00</strike>&nbsp;&nbsp;{{newTotal}}.00</b></p>
                <p v-else>Total Price : <b>{{total}}.00</b></p>
                <div v-for="item in cart">
                  <discount-product :product="item" :newPrice="newPrice" :coupon="appliedCouponCode"/>
                </div>
            </div>
        </div>
    </b-modal>
</div>

</template>

<script>

import PostsService from '@/services/PostsService'
import CartProduct from '@/components/CartProduct'
import DiscountProduct from '@/components/DiscountProduct'

export default {
    name: 'HelloWorld',
    components: {
        'cart-product': CartProduct,
        'discount-product': DiscountProduct
    },
    data() {
        return {
            validationLoader: false,
            validationResponse: {},
            appliedLoader: false,
            appliedResponse: {},
            validationCouponCode: "",
            appliedCouponCode: "",
            loading: false,
            newPrice:{},
            newTotal:0,
            couponError : false
        }
    },
    methods: {
        validate(code) {
                this.validationCouponCode = code;
                this.$refs.validationModalRef.show();
                this.validationLoader = true;
                PostsService.validate(code, this.userId).then(response => {
                    this.validationResponse = response.data;
                }).then(() => {
                    this.validationLoader = false;
                });
            },applyCode(code) {
                    this.appliedCouponCode = code;
                    this.$refs.appliedModalRef.show();
                    this.appliedLoader = true;
                    this.newPrice = {};
                    this.newTotal = 0;
                    this.couponError = "";
                    PostsService.applyCode(code, this.userId).then(response => {
                        if(!response.data.status){
                          this.newPrice = {}
                          this.couponError = response.data.reason;
                          return;
                        }

                        this.newPrice = response.data.newPrice;
                        this.cart.forEach(item => {
                          if(this.newPrice[""+item.productId] || this.newPrice[""+item.productId] === 0 ){
                            this.newTotal+=this.newPrice[''+item.productId];
                          }else{
                            this.newTotal += parseInt(item.price) * item.quantity;
                          }
                        })
                    }).then(() => {
                        this.appliedLoader = false;
                    });
                },
            hideValidation() {
                this.$refs.validationModalRef.hide()
            }
    },
    computed: {
        userId: function() {
            return this.$store.state.userId;
        },
        cart: function() {
            return this.$store.getters.cartItems;
        },
        total: function() {
            return this.$store.getters.cartValue;
        },
        coupons: function() {
            return this.$store.state.coupons
        }
    }
}

</script>
