<template>
  <div>
    <div v-if="cart" class="all-product">
      <v-row class="product-item" v-for="(item, index) in cart" :key="index">
        <v-col class="col-lg-9 product-item-left">
          <router-link :to="`/product/${item.slug}`" exact>
            <v-img class="product-image" :src="item.image"></v-img>
          </router-link>

          <div class="product-info">
            <router-link :to="`/product/${item.slug}`" exact>
              <h3 class="product-name">{{ item.name }}</h3>
            </router-link>
            <h3 class="product-price"> <b>Giá:</b> {{ item.price | currency }} VND</h3>
            <h3 class="product-size"> <b>Size:</b> {{ item.orderSize }}</h3>
            <SelectNumberCartItem
              :orderNumber1="item.orderNumber"
              :quantity1="item.quantity"
              v-on:change="setNumber(index, $event)"
              
            />
          </div>
          <div>
            
          </div>
        </v-col>
        <v-col class="col-lg-3 product-item-right">
          <h3 class="product-totalprice">{{ item.orderNumber * item.price | currency}} VND</h3>
         
          <el-button  icon="el-icon-delete" class="btn btn-delete"  @click="deleteCartItem($event, index)">Xóa</el-button>
           
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { SET_ORDER } from "../store/types";
import SelectNumberCartItem from "./SelectNumberCartItem";
import constants from "../store/constants";
export default {
  name: "CartItem",
  components: {
    SelectNumberCartItem,
  },
  props: {
    crt: {},
  },
  data() {
    return {
      cart: [],
    };
  },
  filters:{
      currency(value) {
 return new Intl.NumberFormat().format(value);
 }
    }
,
  methods: {
    //...mapMutations(['SELECTED_PRODUCT']),
    deleteCartItem(e, index) {
      
      this.$toast.success("Xóa sản phẩm thành công", {
        position: "bottom-left",
        timeout: 2500,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.12,
        showCloseButtonOnHover: true,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false,
      });
      this.cart.splice(index, 1);
      this.updateStore();
      
    },
    updateStore() {
      this.$store.commit(SET_ORDER, this.cart);
    },
    setNumber(index, newNumber) {
      this.cart[index].orderNumber = newNumber;
      this.$store.commit(SET_ORDER, this.cart);
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
};
</script>

<style lang="scss" scoped>
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
  background: #f15e2c;
    position: absolute;
    bottom: 10px;
    right: 0px;
    width: 60%;
     color: rgb(255,255,255)
}
.btn-delete:hover {
    background: #e7971e
}
.product-item {
  margin: 15px;
  border-bottom: 1px dashed;
}

.product-info {
  padding-left: 20px;
}
.product-name {
  color: #000;
  font-size: 22px;
  margin-bottom: 0px;
  min-height: 50px;
}
.product-price , .product-size {
    font-size: 16px;
    color: #292929 !important;
    font-weight: 400;
} 
.product-totalprice {
  color: #f15e2c;
  font-size: 23px;
  margin-bottom: 0px;
  min-height: 50px;
  text-align: right;
}
.product-image {
  width: 150px;
  height: 150px;
}
.product-item-left {
  display: flex;
}
.product-item-left,
.product-item-right {
  padding: 0px 0px 10px 0px;
   position: relative
}
.el-button:hover {
    color: #fff
}
@media only screen and (min-width: 320px) and (max-width: 480px) {
 .btn-delete {
    left: 5px !important;
    width: 45% !important;
    bottom: 20px !important;
}
.product-name {
    font-size: 15px ;
}
.product-image {
  height: 160px !important;
}
}
</style>