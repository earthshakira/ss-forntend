import Api from '@/services/Api'

export default {
  fetchPosts () {
    return Api().get('/products')
  },
  fetchCoupons () {
    return Api().get('/coupons')
  },
  getCoupon (id) {
    return Api().get('/coupon/'+id)
  },
  addToCart(item,userId){
    return Api().post('/cart/'+userId+'/add', item)
  },
  removeFromCart(item,userId){
    return Api().post('/cart/'+userId+'/remove', item)
  },
  createCart(userId){
    return Api().post('/cart/'+userId,{'userId':userId})
  },
  upsertCoupon(coupon){
    return Api().post('/coupon/'+coupon.id,coupon)
  },
  validate(couponCode,userId){
    return Api().get('/validate/'+userId+'/'+couponCode);
  },
  applyCode(couponCode,userId){
    return Api().get('/apply/'+userId+'/'+couponCode);
  }
}
