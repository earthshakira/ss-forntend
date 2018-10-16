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

.smaller {
    height: 2em;
}

</style>

<template>

<div class="hello" style="padding:2em">
    <div class="row">
        <div class="col-sm-12">
          <b-card bg-variant="light"
                header="Insert Coupon"
                footer="
                  Docs:<br>
                  Load ID : loads details for the provided coupon Id
                    <br><i>&nbsp;&nbsp;&nbsp;load 'BOGO' to see buy 1 get 1</i>"
                class="text-left">
                <label>Coupon ID </label>
                <input class="form-control" style="width:auto;display:inline-block" type="text" v-model="coupon.id" placeholder="Add a coupon Id" />
                <button class="btn btn-warning btn-sm" :disabled='disableBtns || !coupon.id' @click="loadData"> {{btnText}}</button>
                <br>
                <br>
                <label>Description</label>
                <input class="form-control" style="width:auto;display:inline-block" type="text" v-model="coupon.desc" placeholder="Add coupon description" />

                <div class="form-inline" style="margin-top:1em">
                    <button class="btn btn-primary btn-sm smaller" v-if="!hasCategory" @click="hasCategory = true">
                        add Category
                    </button>
                    <select class="btn btn-sm" style="width:auto" type="text" v-if="hasCategory" v-model="coupon.category" placeholder="select a Category">
                        <option value="" disabled selected>Select your option</option>
                        <option v-for="category in categories">{{category}}</option>
                    </select>
                    <button class="btn btn-primary btn-sm smaller" v-if="hasCategory" @click="hasCategory = false;coupon.category = null">
                        <font-awesome-icon icon="times" />
                    </button>
                    &nbsp;&nbsp;
                    <button class="btn btn-primary btn-sm smaller" v-if="!hasArtist" @click="hasArtist = true">
                        add Artist
                    </button>
                    <select class="btn btn-sm" style="width:auto" type="text" v-if="hasArtist" v-model="coupon.artist">
                        <option value="" disabled selected>Select your option</option>
                        <option v-for="artist in artists">{{artist}}</option>
                    </select>
                    <button class="btn btn-primary btn-sm smaller" v-if="hasArtist" @click="hasArtist = false;coupon.artist = null">
                        <font-awesome-icon icon="times" />
                    </button>
                    &nbsp;&nbsp;
                    <button class="btn btn-primary btn-sm smaller" v-if="!hasProduct" @click="hasProduct = true">
                        add Product
                    </button>
                    <select class="btn btn-sm" style="width:auto" type="text" v-if="hasProduct" v-model="coupon.product">
                        <option value="" disabled selected>Select your option</option>
                        <option v-for="product in products">{{product}}</option>
                    </select>
                    <button class="btn btn-primary btn-sm smaller" v-if="hasProduct" @click="hasProduct = false;coupon.product=null">
                        <font-awesome-icon icon="times" />
                    </button>
                </div>
                <br>
                <div>
                    <label>
                        Select Constraint Type
                        <div style="display:inline-block">
                            <select class="btn btn-sm" style="width:auto;display:inline-block" v-model="coupon.constraint.type">
                                <option value="" disabled selected>Select your option</option>
                                <option value="buy">Buy X</option>
                                <option value="cartTotal">Minimum Cart Total</option>
                            </select>
                            <input class="input-sm" style="display:inline-block" v-model="coupon.constraint.value" type="text" placeholder="Enter constraint value" />
                        </div>
                    </label>
                </div>
                <br>
                <label>
                    Select Discount Type
                    <select class="btn btn-sm" style="width:auto" v-model="coupon.discount.type">
                        <option value="" disabled selected>Select your option</option>
                        <option value="get">Get Y</option>
                        <option value="getPercentage">Percentage Off</option>
                    </select>
                    <input class="input-sm" style="display:inline-block" v-model="coupon.discount.value" type="text" placeholder="Enter discount value" />
                </label>
                <br>
            <button class="btn btn-sm btn-primary"@click="insert()" :disabled='disableBtns'>Upsert Coupon</button>
            {{updateMessage}}
          </b-card>
        </div>
        <div class="col-sm-12" style="margin-top:1em">
          <b-card bg-variant="light"
                header="Coupon List"
                class="text-left">
                <div v-for="coup in coupons" style="margin-bottom:1em">
                    <p>
                      <b-badge variant="primary">{{coup._id}}</b-badge>
                      {{coup.desc}}
                      <b-badge v-if="coup.product">Product : {{coup.product}}</b-badge>
                      <b-badge v-if="coup.artist">Artist : {{coup.artist}}</b-badge>
                      <b-badge v-if="coup.category">Category :{{coup.category}}</b-badge>
                    </p>



                    <b-list-group>
                      <b-list-group-item >{{coup.constraint.type}} : {{coup.constraint.value}}</b-list-group-item>
                      <b-list-group-item >{{coup.discount.type}} : {{coup.discount.value}}</b-list-group-item>
                    </b-list-group>
                    <hr>
                </div>
          </b-card>
        </div>
    </div>
</div>

</template>

<script>
import PostsService from '@/services/PostsService'

export default {
    name: 'Cart',
    data() {
        return {
            btnText:'Load ID',
            updateMessage:'',
            disableBtns:false,
            hasCategory: false,
            hasProduct: false,
            hasArtist: false,
            hasDiscount: false,
            hasConstraint: false,
            coupon: {
                id: null,
                desc: null,
                constraint: {},
                discount: {},
                artist: null,
                product: null,
                category: null
            }
        }
    },
    methods: {
        insert() {
            this.updateMessage = 'updating';
            this.disableBtns = true;
            PostsService.upsertCoupon(this.coupon).then(data =>{
              this.updateMessage = 'updated!!'
              setTimeout(() => {
                this.updateMessage = ''
              },3000)
              this.disableBtns = false;
              this.$store.commit('refreshCoupons',this.coupon);
            });
        },
        loadData() {
          this.btnText = 'loading'
          this.disableBtns = true
          PostsService.getCoupon(this.coupon.id).then(response => {
            this.coupon = response.data;
            this.coupon.id = this.coupon._id;
            delete this.coupon._id;
            this.hasArtist = this.coupon.artist;
            this.hasCategory = this.coupon.category;
            this.hasProduct = this.coupon.product;
            this.btnText = 'Load ID'
            this.disableBtns = false
          }).catch(err => {
            this.btnText = 'Error: Id not found';
            setTimeout(() => {
              this.btnText = 'Load ID'
              this.disableBtns = false
            },3000)
          })
        }
    },
    mounted() {},
    computed: {
        userId: function() {
            return this.$store.state.userId;
        },
        coupons: function() {
            return this.$store.state.coupons
        },
        categories: function() {
            return this.$store.state.categoryList
        },
        products: function() {
            return this.$store.state.productList
        },
        artists: function() {
            return this.$store.state.artistList
        },
    }
}

</script>
