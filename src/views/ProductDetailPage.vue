<template>
  <div>
    <Product-detail :product="product" />
  </div>
</template>

<script>
import ProductDetail from "../components/ProductDetail.vue";

export default {
  components: { ProductDetail },
  firestore: {},
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("bindProduct");
  },
  computed: {
    product() {
      return this.$store.state.Product.find(
        (p) => p.slug === this.$route.params.slug
      );
    },
    cart() {
      return this.$store.state.cart;
    },
  },
};
</script>

<style scoped>
</style>