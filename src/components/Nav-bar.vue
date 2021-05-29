<template>
  <div>
    <v-app-bar app color="primary" light>
      <div class="d-flex align-center">
        <router-link  to="/" active-class="active">  
        <i class="el-icon-platform-eleme"></i>
        </router-link>
      </div>
        
      <ul>
        <router-link  to="/" active-class="active" 
          ><li>Trang chủ</li></router-link >

        <router-link  to="/product" active-class="active"
          ><li>Sản phẩm</li></router-link
        >
        
      </ul>
      
      <v-spacer></v-spacer>

     <Cart/>
    </v-app-bar>
  </div>
</template>

<script>
import Cart from './Cart'

export default {
  name: "navbar",
  components: {
    Cart
  }

}
</script>

<style lang="scss" scoped>
ul  {
    display: flex;   
    list-style-type: none;
    margin: 120px;      
}
ul li  {
    margin: 20px;      
}
li {
    color: #000;
    
}
.router-link-exact-active li {
    color: #ff5f17;
    font-weight: 700
}
a {
      text-decoration: none 
}
ul li  a{
    text-decoration: none   ;
    color: #000;
    font-size: 17px;
    font-weight: 700;
}
.el-icon-platform-eleme {
    font-size: 40px;
    color: #f15e2c
}
@media only screen and (min-width : 320px) and (max-width : 480px) {
ul  {
    margin: 10px;      
}
ul li  {
    margin: 10px;      
}

}

</style>