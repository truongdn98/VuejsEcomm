<template>
  <div class="home">
    <Slider/>
    <h1>Sản phẩm</h1>
    <ListProduct/>
         
  </div>
</template>

<script>
// @ is an alias to /src

import ListProduct from '../components/ListProduct'
import Slider from '../components/Slider'
export default {
  name: 'Home',
  components: {
      ListProduct,
      Slider
  }
}
</script>
<style >
h1 {
    margin: 15px
}
.v-window__next {
   right: 0px
}

</style>