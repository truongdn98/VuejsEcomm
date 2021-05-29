<template>
  <div>
    <div class="about">
      <h1>Tất cả sản phẩm</h1>
    </div>
    <ListProduct />
  </div>
</template>
<script>
import ListProduct from "../components/ListProduct";
export default {
  name: "ProductPage",
  components: {
    ListProduct,
  },
};
</script>
<style scoped>
</style>