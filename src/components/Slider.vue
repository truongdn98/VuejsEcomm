<template>
  <v-carousel  cycle  hide-delimiter-background
  :show-arrows="false">
      
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      
    ></v-carousel-item>
  
  </v-carousel>
</template>

<script>
  export default {
      name: 'Slider',
    data () {
      return {
        items: [
          {
            src: 'https://i.pinimg.com/originals/78/a3/18/78a3186290c7a50fbf628b3302663195.jpg',
          },
          {
            src: 'https://img3.thuthuatphanmem.vn/uploads/2019/10/14/banner-thoi-trang-nam-don-gian_113857210.jpg',
          },
       
        ],
      }
    },
  }
</script>

<style  scoped>
.v-carousel{
    margin-top:  -30px
}
.v-carousel__item, .v-carousel  {
    height: 350px !important
}
@media only screen and (min-width : 320px) and (max-width : 480px) {

#App .v-carousel__item, .v-carousel  {
    height: 150px !important
}
}

</style>