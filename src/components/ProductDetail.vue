<template>
  <div v-if="product">
    <v-container class="grey lighten-5">
      <v-row no-gutters>
        <v-col cols="12" sm="6" md="3">
          <div class="product">
            <h3 class="product--name">
              {{ product.name }} /
              {{ product.listProductDetail[selectedProduct].size }}
            </h3>
            <p class="product--price">Giá: {{ product.price | currency }} VND</p>
          </div>

          <div class="product__info">
            <span class="product__info--title">Mô tả sản phẩm</span>
            <p class="product__info--content">{{ product.info }}</p>
          </div>
        </v-col>
        <v-col cols="6" md="6" class="col-12 product-image">
          <v-img :src="product.image"></v-img>
        </v-col>
        <v-col class="col-md-3 pd-10 mt-12 product-type">
          <div class="size-row pb-10 mt-12">
            <span class="size">Chọn Size</span>
            
          </div>
          <Size
            :sizes="product.listProductDetail"
            v-on:change="setSize"
            :selectedProduct="selectedProduct"
          />

          <div class="number-area">
            <div class="size">Chọn Số lượng</div>

            <select-number
              v-on:onUpE="onUpE"
              :number="number"
              :getProduct="getProduct"
              v-on:onDownE="onDownE"
            />
            <p class="quantity" v-if="getProduct.quantity > 0">
              Còn lại: {{ getProduct.quantity }} Sản phẩm
            </p>
            <p class="quantity" v-if="getProduct.quantity <= 0">
              Sản phẩm đã hết hàng
            </p>
          </div>
          <v-btn
            v-if="getProduct.quantity > 0"
            color="secondary"
            elevation="14"
            medium
            class="btn-addtocart"
            @click="handleClickAddtocart(product)"
            >Thêm vào giỏ</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { ADD_ORDER } from "../store/types";

import SelectNumber from "./SelectNumber.vue";
import Size from "./Size";
export default {
  props: {
    product: {
      type: Object,
    },
  },
   filters: {
        currency(value) {
            return new Intl.NumberFormat().format(value);
        }
    },
  components: {
    Size,
    SelectNumber,
  },
  data() {
    return {
      number: 1,
      selectedProduct: 0,
      cardNumber: 0,
      size: "S",
    };
  },

  methods: {
    onUpE() {
      if (this.number < this.getProduct.quantity) {
        this.number++;
      }
    },
    onDownE() {
      if (this.number > 1) {
        this.number--;
      }
    },

    setSize(e, index) {
      this.selectedProduct = index;
      this.$store.commit("SELECTED_PRODUCT", index);
      this.number = 1;
    },
    classActive(index) {
      return {
        active: this.selectedProduct === index,
      };
    },
    handleClickAddtocart() {
      if (!this.validateNumber()) {
        this.$toast.error("Số lượng bạn chọn đã vượt mức", {
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
        return;
      }
      this.$toast.success("Thêm vào giỏ hàng thành công", {
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
      this.$store.commit(ADD_ORDER, {
        ...this.product,
        orderNumber: this.number,
        orderSize: this.getProduct.size,
        checked: false,
        quantity: this.getProduct.quantity,
      });
    },
    validateNumber() {
      let isValid = true;
      const exitOrder = this.$store.state.cart.filter(
        (x) => x.orderSize === this.getProduct.size && x.id === this.product.id
      )[0];
      if (exitOrder) {
        if (
          exitOrder.orderNumber + this.number >
          this.product.listProductDetail.filter(
            (x) => x.size === this.getProduct.size
          )[0].quantity
        ) {
          isValid = false;
        }
      }
      return isValid;
    },
  },
  computed: {
    //...mapState(['cart']),
    ...mapGetters(["productSelected", "cartLength"]),
    getProduct() {
      let index = this.selectedProduct;
      // return this.product.listProductDetail[index];
      return this.product.listProductDetail[index];
    },
  },
  // watch: {
  //   defaultValue: function (old, newVal) {
  //     if (newVal != old) {
  //       this.number = old;
  //     }
  //   },
  // },
};
</script>

<style lang="scss" scoped>
.btn-addtocart {
  background: red !important;
  margin-top: 25px;
}
.product__info {
  font-size: 20px;
  margin: 50px 0px;
  
}.product__info--title{
  font-weight: 700
}.product__info--content{
font-size: 17px;
margin-top: 8px
}
.product--name {
  font-size: 30px;
  padding-right: 10px
}
.product--price {
  font-size: 18px;
}
.size-guide {
  float: right;
}
.size {
  font-weight: 700;
  font-size: 20px;
}

/* Number */
@at-root .number-area > span {
  margin-left: 5px;
  font-size: 1.5rem;
}
.select-number {
  display: flex;

  align-items: center;
  font-size: 1.6rem;
  width: 120px;
  margin: 10px 20px;
}
.value {
  padding: 0px 10px;
}
.change {
  height: 30px;
  width: 30px;
  padding: auto;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid;
}
.product-image{
  margin-bottom: 10px
}
</style>
