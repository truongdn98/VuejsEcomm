<template>
  <div>
    <div class="cart-order">
      <div class="cart">
        <router-link to="/your-cart">
          <a><i class="el-icon-shopping-bag-1"></i></a>
        </router-link>
        <span class="number">{{ cartLength }}</span>
      </div>
      <transition name="bounce">
        <div class="cart-order-infor">
          <div v-if="cart.length === 0" class="no-order">
            <img
              alt=""
              class="cart-order-infor-no-item-icon"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_nl9M_exbaJFJv0tsRcn4LxCm-agS6G-Ehg&usqp=CAU"
            />

            <span class="cart-order-infor-no-item-label"
              >Chưa có sản phẩm nào</span
            >
          </div>

          <div v-else class="orders-list">
            <div v-for="(item, index) in cart" :key="index" class="order-item">
              <img
                v-bind:src="item.image"
                v-bind:alt="item.name"
                class="order-item--img"
              />
              <div class="order-item--name">
                <h4 class="name">{{ item.name }} / {{ item.orderSize }}</h4>

                <p class="size">Số lượng: {{ item.orderNumber }}</p>
                <div class="order-item--price">
                  {{ item.price | currency }} VND
                </div>
              </div>
            </div>
            <router-link class="order-list-show-all" to="/your-cart"
              >Xem toàn bộ</router-link
            >
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
//import { store } from "../store";
import { SET_ORDER } from "../store/types";

import constants from "../store/constants";
import { mapGetters } from "vuex";
export default {
  name: "Cart",
  data() {
    return {
      cart: this.$store.state.cart,
      // cart: []
    };
  },
  filters: {
    currency(value) {
      return new Intl.NumberFormat().format(value);
    },
  },

  computed: {
    ...mapGetters(["cartLength"]),
  },
  created() {
    let cart = localStorage.getItem(constants.LOCAL_STORAGE_ORDERS);
    if (cart) {
      cart = JSON.parse(cart);
      this.$store.commit(SET_ORDER, cart);
    }
    this.cart = this.$store.state.cart;
  },
  watch: {
    "$store.state.cart": function () {
      this.cart = this.$store.state.cart;
    },
  },
};
</script>

<style scoped>
.el-icon-shopping-bag-1 {
  font-size: 30px;
  margin-right: 15px;
  color: #f15e2c;
}
.no-order img {
  width: 150px;
}
.v-toolbar__content .number {
  background: rgb(0, 0, 0);
  color: #fff;
  height: 19px;
  width: 19px;
  border-radius: 100px;
  text-align: center;
  display: inline-block;
  position: absolute;
  top: -5px;
  right: 5px;
}
.cart {
  position: relative;
}

.cart-order:hover .cart-order-infor {
  display: block;
}

.cart-order-infor::before {
  content: "";
  border: 12px solid;
  border-color: transparent transparent #fff transparent;
  position: absolute;
  right: 0px;
  top: -20px;
}

.cart-order::after {
  content: "";
  border: 5px solid transparent;
  position: absolute;
  top: calc(100%);
  right: 0;
  min-width: 50px;
}

.cart-order-infor {
  position: absolute;
  display: none;
  background-color: #fff;
  padding: 10px;
  right: 30px;
  top: 60px;
  width: 350px;
  border-radius: 2px;
  animation: grow linear 0.5;
}
.cart-order-infor:after {
  content: "";
  background: red;
  position: absolute;
  right: 0px;
  top: -20px;
  height: 50px;
  width: 100px;
  opacity: 0;
}

.cart-order-infor-no-item-icon {
  margin: auto;
  display: block;
}

.cart-order-infor-no-item-label {
  text-align: center;
  display: block;
  font-size: 1.2rem;
  width: auto !important;
}

.cart-icon--acount {
  display: none;
}
.orders-number {
  position: absolute;
  top: -11px;
  right: -2px;
  padding: 5px;
  color: #ffff;
  font-weight: 600;
}
.order-item {
  display: flex;
  justify-content: center;
}
.order-item--img {
  width: 50px;
  height: 50px;
}
.order-item--name {
  padding-left: 5px;
  flex: 1;
  align-self: center;
}
.order-item--price {
  align-self: center;
  color: #ff5f17;
}
.order-item--name .size {
  display: inline;
}
.order-item--price {
  display: inline;
  float: right;
}
.order-list-show-all {
  float: right;
}
.order-list-show-all {
  background: #f15e2c;
  margin-top: 10px;
  color: #fff;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 15px;
}
.cart-order-infor {
  border-bottom: 2px dashed #000;
}
.order-item {
  border-bottom: 1px dashed rgb(166, 166, 166);
  padding: 5px 0;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
.order-list-show-all  {
    text-decoration: none 
}
.number {
    font-size: 13px
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
@media only screen and (min-width : 320px) and (max-width : 480px) {
.cart {
    margin-right: 10px
}
.cart-order:hover .cart-order-infor {
  display: none;
}
}
</style>