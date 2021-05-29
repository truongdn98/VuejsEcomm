<template>
  <div id="footer">
    <el-row :gutter="0">
      <el-col class="grid-content  col-md-6"
        ><p class="title">Giới thiệu</p>
        
        <div>
          <p style="text-align:justify, font-size:15px">Đây là một dự án nhỏ về Ecommerce được thực hiện với Vuejs của mình, tuy nhiên nó vẫn chưa hoàn thiện và còn thiếu nhiều chức năng.  </p>
        </div>
        
        </el-col>
        
      <el-col class="grid-content col-md-6"
        ><p class="title">Thông tin liên hệ</p>
         <div>
          <i class="fa fa-envelope"></i><a href="mailto:truongdn98@gmail.com">truongdn98@gmail.com</a>
        </div>
        <div>
          <i class="fa fa-phone"></i><a href="tel:0777571710"> 0777.571.710</a>
        </div>
        <div>
          <i class="fa fa-github"></i> <a href="https://github.com/truongdn98"> github.com/truongdn98</a>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" justify="center" type="flex">
      <el-col  class=" col-12" justify="center">
        <p class="text-center">Vuejs Trường</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style lang="scss" scoped>
.el-row--flex {
  background: #ff5f17;
}
.text-center {
  text-align: center;
  padding: 0px;
  color: #fff;
}
#footer {
  background: rgb(193,193,249);
  padding: 30px 0 0;
  position: absolute;
  right: 0;
  left: 0;
  margin-top: 40px;
}
.grid-content {
  padding: 0px 20px 30px 20px;
}
.grid-content .title {
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  position: relative;
  display: inline-block;
}
.grid-content .title:after {
  content: "";
  height: 3px;
  width: 30%;
  background: #ff5f17;
  position: absolute;
  bottom: -5px;
  left: 0%;
}
.fa {
   color:  #f15e2c;
    padding-right: 10px
}
.grid-content a {
    font-size: 15px;
    text-decoration: none;
    color: #000
}
</style>