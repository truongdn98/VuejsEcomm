<template>
    <div id="payment">
        <div class="card">
      <div style="border-radius:200px; height:200px; width:200px; background: #F8FAF5; margin:0 auto;">
        <i class="checkmark">✓</i>
      </div>
        <h1>Đặt hàng thành công</h1> 
        <p>Bạn vui lòng kiểm tra Email để xem chi tiết đơn hàng</p>
        <router-link to="/">
        <el-button icon="el-icon-s-goods"     class="btn back-to-home">
          Tiếp tục mua hàng
      </el-button>
      </router-link>
      </div>
      
    </div>
</template>

<script>
    export default {
        name: 'PaymentSuccessPage'
    }
</script>

<style lang="scss" scoped>
      #payment {
        text-align: center;
        padding: 40px 0;
        background: #EBF0F5;
      }
       .back-to-home {
          background: #f15e2c;
          margin-top: 20px;
                    color: #fff
      }
      .card div {
           border: 2px solid #88B04B
      }
 h1 {
          color: #88B04B;
          font-weight: 900;
          font-size: 30px;
          margin-bottom: 10px;
        }
        p {
          color: #404F5E;
          font-size:15px;
          margin: 0;
        }
      i {
        color: #9ABC66;
        font-size: 100px;
        line-height: 200px;
        margin-left:-15px;
      }
      .card {
        background: white;
        padding: 60px;
        border-radius: 4px;
        box-shadow: 0 2px 3px #C8D0D8;
        display: inline-block;
        margin: 0 auto;
      }
</style>