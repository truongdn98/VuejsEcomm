<template>
  <div class="product__container d-flex">
    <div
      v-for="(item, index) in product"
      :key="index"
      class="card product__item"
    >
      <div class="product__item--wrapper">
        <router-link :to="`/product/${item.slug}`" exact>
          <v-img class="product__item--image" v-bind:src="item.image"></v-img>
        </router-link>

        <div class="product__item--content">
          <router-link :to="`/product/${item.slug}`" exact>
            <h3 class="product__item--name">
              <a>{{ item.name }}</a>
            </h3>
          </router-link>
          <p class="product__item--price">
            Giá: {{ item.price | currency }} VND
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Array,
    },
  },
  filters: {
    currency(value) {
      return new Intl.NumberFormat().format(value);
    },
  },
  data() {
    return {
      name: "Product",
    };
  },
};
</script>

<style scoped >
.product__container {
  display: flex;
  flex-wrap: wrap;
  margin-left: -px;
}
.product__item--wrapper {
  margin: 5px;
  border-radius: 10px !important;
  border: 1px solid rgb(215, 206, 206);
  border-radius: 8px;
  overflow: hidden;
}
.product__item--wrapper:hover {
  border: 1px solid rgba(65, 75, 72, 0.56);
  box-shadow: 5px 5px 10px 1px rgba(74, 82, 80, 0.6);
}
.product__item {
  width: 25%;
  padding: 10px;
}
a {
  text-decoration: none;
}
.product__item--content {
  text-align: center;
  padding-bottom: 10px;
}
.product__item--name {
  color: red;
  text-transform: uppercase;
  margin: 10px 0px;
  font-weight: 700;
}
.product__item--price {
  text-transform: uppercase;
  font-weight: 700;
}
.product__item--image {
  width: 100%;
  height: 350px;
  object-fit: cover;
}
.value-3 {
  color: #f15e2c;
  font-size: 20px;
  font-weight: 700;
}
@media only screen and (min-width: 320px) and (max-width: 480px) {
  .product__item {
    width: 50%;
    padding:0px !important;
  }
  .product__item--image {
  width: 100%;
  height: 150px;
}
.product__item--name {
 font-size:15px
}
}
</style>
