<template>
  <div>
    <div class="select-number" v-if="getProduct.quantity > 0">
      <el-button
        type="warning"
        icon="el-icon-minus"
        @click="onDown"
        circle
        class="change change--down"
      ></el-button>

      <div class="value">{{ number }}</div>

      <el-button
        type="warning"
        icon="el-icon-plus"
        @click="onUp"
        circle
        class="change change--up"
      ></el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectNumber",
  props: {
    number: {},
    getProduct: {},
  },
  methods: {
    onUp(e) {
      this.$emit("onUpE", e);
    },
    onDown(e) {
      this.$emit("onDownE", e);
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
.select-number {
  display: flex;

  align-items: center;
  font-size: 1.6rem;
  width: 90px;
  margin: 10px 0px;
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
  border: 1px solid;
  background: #f15e2c;
  color: #fff;
}
</style>