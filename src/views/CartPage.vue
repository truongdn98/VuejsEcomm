<template>
  <div>
    <v-container>
      <v-row v-if="cart.length == 0">
        <v-col class="cart-empty">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_nl9M_exbaJFJv0tsRcn4LxCm-agS6G-Ehg&usqp=CAU" alt="">
        <div>
          <h3>Hiện chưa có sản phẩm nào trong giỏ hàng. <br> Bạn hãy chọn sản phẩm đã nhé!</h3>
        </div>
        </v-col>
      </v-row>
      <v-row v-else >
        <v-col class="cart-left col-lg-8 col-md-12">
          <div class="title">GIỎ HÀNG</div>
          <CartItem :cart="cart"></CartItem>
        
        </v-col>
        <v-col class="cart-right col-lg-4 col-md-12 col-12" >
          <div class="title">ĐƠN HÀNG</div>
          <div class="promotion-title">Nhập mã khuyến mãi</div>
          <div class="promotion">
            <input v-model="text" type="text" placeholder="Nhập mã" />
            <v-btn @click="checkPromotion">ÁP DỤNG</v-btn>
            <p v-if="checked == 1">
              Mã khuyến mãi không hợp lệ do sai cú pháp hoặc quá thời hạn áp
              dụng.
            </p>
            <p class="success" v-if="checked == 2">
              Mã khuyến mãi được áp dụng thành công
            </p>
            <p v-if="checked == 3">Vui lòng nhập mã</p>
          </div>
          <div class="cart-price">
            <span class="title-2">Đơn hàng</span>
            <span class="title-2-1 totalPriceOfCart">{{ totalPrice | currency }} VND</span>
          </div>
          <div>
            <span class="title-2">Giảm</span>
            <span v-if="promoCheck == true" class="title-2-1 totalDiscountOfCart"
              >{{ (promo.sale * totalPrice) / 100 | currency}} VND</span
            >
            <span v-else class="title-2-1 totalDiscountOfCart">0 VND</span>
          </div>
          <div class="totalPrice">
            <span class="title-3">THÀNH TIỀN</span>
            <span v-if="promoCheck == true" class="title-3-1 totalPriceOfCart"
              >{{ sumtotalPrice | currency }} VND</span
            >
            <span v-else class="title-3-1 totalPriceOfCart"
              >{{ sumtotalPrice  | currency }} VND</span
            >
          </div>

          <!-- <v-btn @click="deleteCartItem(id,orderSize)" class="btn btn-cart-to-checkout" elevation="2" block>
            TIẾP TỤC THANH TOÁN
          </v-btn> -->
          <router-link to="/shipping-infomation"
            
          > <v-btn  block class="btn btn-cart-to-checkout" >
            TIẾP TỤC THANH TOÁN
          </v-btn></router-link>
           
        </v-col>
        
      </v-row>
    </v-container>
  </div>
</template>

<script>
import constants from "../store/constants";
import CartItem from "../components/CartItem.vue";
// import SelectNumberCartItem from '../components/SelectNumberCartItem.vue'
//import {REMOVE_PRODUCT_FROM_CART} from '../store/types'
import { SET_ORDER  } from "../store/types";
import {CHECK_PROMO} from "../store/types";

export default {
  name: "cart-page",
  components: {
    CartItem,
    // SelectNumberCartItem,
  },
   filters:{
      currency(value) {
 return new Intl.NumberFormat().format(value);
 }
    }
,
  data() {
    return {
      cart: [],
      checked: null,
      text: "",
      promo: this.$store.state.promo,
      promoCheck: this.$store.state.promoCheck,
      number: 1,
     
    };
  },
  computed: {
    totalPrice() {
      let sum = 0;
      this.cart.forEach((item) => {
        sum = sum + item.orderNumber * item.price;
      });
      return sum;
    },
    sumtotalPrice() {
      let sum = 0;
      this.cart.forEach((item) => {
        sum = sum + item.orderNumber * item.price;
      });
      return this.promoCheck ? sum - (this.promo.sale * sum) / 100 : sum;
    },
  },
  methods: {
    updateStore() {
      this.$store.commit(SET_ORDER, this.cart);
    },
    checkPromotion() {
      if (this.text == "") {
        this.checked = 3;
       
         this.$store.commit(CHECK_PROMO, false)
      } else if (this.promo.code === this.text) {
        this.checked = 2;
        //this.promoCheck = true;
         this.$store.commit(CHECK_PROMO, true)
      } else {
        this.checked = 1;
        this.$store.commit(CHECK_PROMO, false)
      }
    },
  },
  created() {
    let cart = localStorage.getItem(constants.LOCAL_STORAGE_ORDERS);
    if (cart) {
      cart = JSON.parse(cart);
      this.cart = cart;
      this.updateStore();
    }
  },
  watch: {
    "$store.state.cart": function () {
      this.cart = this.$store.state.cart;
       
    },
    "$store.state.promoCheck": function () {
      this.promoCheck = this.$store.state.promoCheck;
    },
  },
};
</script>

<style lang="scss" scoped>
.cart-empty{
 text-align: center;
 padding: 50px;
}
.title {
  background: #f1f1f1;
  font-size: 20px;
  font-weight: 700;
}
.cart-left .title {
  padding: 10px 20px;
}
a {
  text-decoration: none;
}
.btn-delete {
  background: #000 !important;
  width: 100px;
  float: right;
}
.btn-delete:hover {
  background: red !important;
}
.btn-delete i {
  color: #fff;
}

.cart-right .title {
  margin-bottom: 30px;
  border-bottom: 2px solid;
  padding-bottom: 10px;
}
.title-2,
.title-2-1,
.title-3 {
  color: #808080;
  font-size: 16px;
  font-weight: 700;
}
.title-2-1,
.title-3-1 {
  float: right;
}
.title-3 {
  color: #000;
  font-size: 20px;
}
.title-3-1 {
  color: #000;
  font-size: 20px;
  font-weight: 700;
}
.cart-right {
  background: #f1f1f1;
  padding: 15px 20px;
  margin: 10px 0px;
}


input {
  width: 60%;
  border: 1px solid #cccccc;
  height: 40px;
  padding: 10px;
  background: #fff;
}
.cart-right .v-btn {
  width: 40%;
  border: 1px #f15e2c solid;
  height: 40px !important;
  border-radius: 0px;
  margin-bottom: 3px;
  background: #f15e2c !important;
  color: #fff;
}

.promotion {
  padding: 15px 0;
  border-bottom: 1px dashed;
  margin-bottom: 25px;
}
.promotion-title {
  text-transform: uppercase;
  font-weight: 700;
}
.cart-price {
  margin: 5px 0;
}
.totalPrice {
  border-top: 1px dashed;
  margin-top: 25px;
  padding: 20px 0;
}
.cart-right {
  height: 100%;
  border-bottom: 3px solid;
}
.promotion p {
  color: red;
  margin-top: 5px;
}
.promotion .success {
  color: rgb(7, 173, 31);
}



</style>
