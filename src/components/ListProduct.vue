<template>
  <div>
    <Product v-bind:product="product" />
  </div>
</template>

<script>
import Product from "../components/Product";
export default {
  name: "ListProduct",
  data() {
    return {};
  },
  components: {
    Product,
  },
  created() {
    this.$store.dispatch("bindProduct");
  },
  computed: {
    product() {
      return this.$store.state.Product;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>