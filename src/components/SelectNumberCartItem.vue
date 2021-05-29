<template>
  <div>
    <div class="select-number-wrapper ">
      <div class="select-number">
        <el-button
          type="warning"
          icon="el-icon-minus"
          @click="onDown"
          circle
          class="change change--down"
        ></el-button>

        <div class="value">{{ orderNumber1 }}</div>

        <el-button
          type="warning"
          icon="el-icon-plus"
          @click="onUp"
          circle
          class="change change--up"
        ></el-button>
      </div>
      <div class="quantity">Còn: {{ quantity1 }} sản phẩm</div>
    </div>
  </div>
</template>

<script>
//import {INCREMENT_CART_ITEM_QUANTITY} from '../store/types'
export default {
  name: "SelectNumberCartItem",
  props: { orderNumber1: Number, quantity1: Number, showNumberBelow: Boolean },
  created() {
    this.number = this.orderNumber1;
  },
  methods: {
   
    onUp() {
      if (this.number < this.quantity1) {
        this.number++;
      }
      this.$emit("change", this.number);
    },
    onDown() {
      if (this.number > 1) {
        this.number--;
        this.$emit("change", this.number);
      }
    },
  },
  watch: {
    value: function (old, newVal) {
      if (newVal != old) {
        this.number = old;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
/* Number */
@at-root .number-area > span {
  margin-left: 5px;
  font-size: 1.5rem;
}

.product-item-left {
  position: relative;
}
.select-number-wrapper {
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  width: 100%;
  position: absolute;
  bottom: 10px;
  flex-wrap: wrap;
}
.select-number {
  width: auto;
  display: flex;
  background: rgb(205, 200, 200);
  border-radius: 20px;
}
.value {
  padding: 0px 10px;
  line-height: 1.2;
}
.change {
  height: 30px;
  width: 30px;
  padding: auto;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0px solid;
  background: #f15e2c;
  color: #fff;
}
.change:hover {
  background: #e7971e;
}
.quantity {
  font-size: 15px;
  margin-left: 20px;
}
@media only screen and (min-width: 320px) and (max-width: 480px) {

.quantity {
    width: 100% !important;
    margin-left: 0px !important
}
.select-number-wrapper{
    flex-wrap: wrap!important;
    margin-top: 20px
}
}
</style>