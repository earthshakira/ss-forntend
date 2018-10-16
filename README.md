# ss-cart [heroku-link](https://shubham-ss.herokuapp.com/)

> 

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

### UserId
This is an Important part as it is what builds the cart , it's a string identifier for the cart,so set anything you feel like
and all the items you add will be persistently stored on this id in the carts DB

### 3 Parts

#### Cart
``` bash
In this part , you can add/remove items and check the effect of various coupons on the current cart
```

#### Listings
``` bash
Here you can search for items on various filters and add the required items to the cart by pressing the yellow button
```

#### Coupons
``` bash
Here you can create and manipulate coupons 
add an existing couponId and press fetch to fetch its existing congigs
```
##### Coupon Constraint
  
  if you consider 'Buy 1 Get 1'  the 'Buy 1' is what I've made a constraint , as you need to buy atleast that many items to make the coupon valid

##### Coupon Discount
  
  if you consider 'Buy 1 Get 1'  the 'Get 1' is what I've made a discount , i.e. that is the number that will affect the price of that item like get 1 will turn the price of the other shirt to 0 and so on
    
