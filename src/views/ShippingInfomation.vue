<template>
  <div>
    <v-container>
      <el-form>
        <v-row>
          <v-col class="cart-left col-lg-7 col-md-12 ">
            <div class="title">THÔNG TIN GIAO HÀNG</div>
            <div :class="{ 'form-group--error': $v.name.$error }"></div>

            <el-input
              placeholder="Họ tên của bạn"
              v-model="name"
              class="form-control"
              :class="{ 'is-invalid': submitted && $v.name.$error }"
            />
            <div v-if="submitted && !$v.name.required" class="error">
              Bạn vui lòng nhập tên
            </div>

            <el-input
              placeholder="Số điện thoại của bạn"
              v-model="tel"
              type="number"
              maxlength="10"
              class="form-control"
              :class="{ 'is-invalid': submitted && $v.tel.$error }"
            />
            <div class="error" v-if="submitted && !$v.tel.required">
              Bạn vui lòng nhập số điện thoại
            </div>
            <div class="error" v-if="submitted && !$v.tel.minLength">
              Bạn vui lòng kiểm tra lại số điện thoại
            </div>
            <el-input
              placeholder="Email"
              v-model="email"
       
              type="email"
              class="form-control"
              :class="{ 'is-invalid': submitted && $v.email.$error }"
            ></el-input>
            <div class="error" v-if="submitted && !$v.email.required">
              Bạn vui lòng nhập email
            </div>
            <div class="error" v-if="submitted && !$v.email.email">
              Bạn vui lòng nhập đúng cấu trúc email
            </div>
            <el-input
              placeholder="Địa chỉ"
              v-model="address"
              class="form-control"
              :class="{ 'is-invalid': submitted && $v.email.$error }"
            ></el-input>
            <div class="error" v-if="submitted && !$v.address.required">
              Bạn vui lòng nhập địa chỉ giao hàng
            </div>

            <div class="cascading-dropdown">
              <div class="dropdown">
                <el-select
                  max
                  v-model="selectedProvince"
                  placeholder="Tỉnh/ Thành"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.selectedProvince.$error,
                  }"
                >
                  <el-option
                    max
                    v-for="(index, province) in provinces"
                    :key="province.index"
                    :value="province"
                    >{{ province }}</el-option
                  >
                </el-select>
                <div
                  class="error"
                  v-if="submitted && !$v.selectedProvince.required"
                >
                  Bạn vui lòng chọn tỉnh/ thành
                </div>
              </div>

              <el-row :gutter="15">
                <el-col :span="12" class="grid-content bg-purple">
                  <el-select
                    :disabled="districts.length == 0"
                    v-model="selectedDist"
                    placeholder="Quận/ Huyện"
                    class="form-control"
                    :class="{
                      'is-invalid': submitted && $v.selectedDist.$error,
                    }"
                  >
                    <el-option
                      v-bind:value="district"
                      v-for="(index, district) in districts"
                      :key="district.index"
                      >{{ district }}</el-option
                    >
                  </el-select>
                  <div
                    class="error"
                    v-if="submitted && !$v.selectedDist.required"
                  >
                    Bạn vui lòng chọn quận/ huyện
                  </div>
                </el-col>
                <el-col :span="12" class="grid-content bg-purple">
                  <el-select
                    :disabled="wards.length == 0"
                    v-model="selectedWard"
                    placeholder="Xã/ Phường"
                    class="form-control"
                    :class="{
                      'is-invalid': submitted && $v.selectedWard.$error,
                    }"
                  >
                    <el-option
                      v-bind:value="ward"
                      v-for="(ward, index) in wards"
                      :key="index"
                      >{{ ward }}</el-option
                    >
                  </el-select>
                  <div
                    class="error"
                    v-if="submitted && !$v.selectedWard.required"
                  >
                    Bạn vui lòng chọn xã/ phường
                  </div>
                </el-col>
                <el-col class="col-md-12">
                 <el-checkbox  border v-model="checked">Tôi xác nhận các thông tin trên</el-checkbox>
                </el-col>
              </el-row>
            </div>
            <div class="title title-4">PHƯƠNG THỨC GIAO HÀNG</div>

            <el-radio v-model="resource" label="1">
              <label>
                Tốc độ tiêu chuẩn (từ 2 - 5 ngày làm việc) &nbsp; &nbsp;
              </label>
              </el-radio>

            <div class="title title-4">PHƯƠNG THỨC THANH TOÁN</div>
            <el-radio v-model="resource" label="1">
              <label> Thanh toán trực tiếp khi giao hàng &nbsp; &nbsp; </label>
              <img
                style="margin-left: 10px"
                src="https://ananas.vn/wp-content/themes/ananas/fe-assets/images/svg/icon_COD.svg"
              />
            </el-radio>
          </v-col>
          <v-col class="cart-right col-lg-5 col-md-12">
            <div class="title">ĐƠN HÀNG</div>
            <div class="cart__item--container">
              <div
                class="cart__item--wrapper"
                v-for="(item, index) in cart"
                :key="index"
              >
                <span class="cart__item--name">{{ item.name }}</span>
                <span class="cart__item--price"
                  >{{ item.price | currency }} VNĐ</span
                >
                <div>
                  <span class="cart__item--size"
                    >Size: {{ item.orderSize }}</span
                  >
                  <span class="cart__item--number"
                    >X {{ item.orderNumber }}</span
                  >
                </div>
              </div>
            </div>
            <div class="cart-info">
              <div class="cart-price">
                <span class="title-2">Đơn hàng</span>
                <span class="value totalPriceOfCart"
                  >{{ totalPrice | currency }} VND</span
                >
              </div>
              <div>
                <span class="title-2">Giảm</span>
                <span
                  v-if="promoCheck == true"
                  class="value totalDiscountOfCart"
                  >{{ ((promo.sale * totalPrice) / 100) | currency }} VND</span
                >
                <span v-else class="value totalDiscountOfCart">0 VND</span>
              </div>
              <div class="">
                <span class="title-2">Phí vận chuyển</span>
                <span class="value totalPriceOfCart"
                  >{{ shippingFee | currency }} VND</span
                >
              </div>
            </div>
            <div class="totalPrice">
              <span class="title-3">TỔNG CỘNG</span>
              <span v-if="promoCheck == true" class="value-3 totalPriceOfCart"
                >{{ sumtotalPrice | currency }} VND</span
              >
              <span v-else class="value-3 totalPriceOfCart"
                >{{ sumtotalPrice | currency }} VND</span
              >
            </div>


            <el-button
              type="submit"
              block
              class="btn btn-cart-to-checkout"
              @click.prevent="handleSubmit"
            >
              HOÀN TẤT ĐẶT HÀNG
            </el-button>
          </v-col>
        </v-row>
      </el-form>
    </v-container>
  </div>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  email,
  numeric,
} from "vuelidate/lib/validators";
// import { mapGetters } from "vuex";
import { SET_ORDER } from "../store/types";
//import constants from "../store/constants";
import myMixin from "../mixins/mixins";
export default {
  mixins: [myMixin],
  name: "ShippingInfo",
  data() {
    return {
      cart: [],
      shippingFee: 30000,
      promo: this.$store.state.promo,
      promoCheck: this.$store.state.promoCheck,
      name: "",
      tel: "",
      address: "",
      email: "",
      provinces: this.$store.state.province,
      resource: '1',
      checked: false,
      districts: [],
      wards: [],
      selectedProvince: "",
      selectedDist: "",
      selectedWard: "",
      user: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      submitted: false,
    };
  },
  validations: {
    name: {
      required,
    },
    email: {
      required,
      email,
    },
    tel: {
      numeric,
      required,
      maxLength: maxLength(10),
      minLength: minLength(9),
    },
    address: {
      required,
    },
    selectedProvince: {
      required,
    },
    selectedDist: {
      required,
    },
    selectedWard: {
      required,
    },
  },
  methods: {

    handleSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
          this.$toast.error("Bạn chưa điền thông tin mua hàng", {
        position: "bottom-left",
        timeout: 2500,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.12,
        showCloseButtonOnHover: true,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false,
      });
        return;
      }
      if(!this.checked){
         this.$toast.warning("Bạn chưa xác nhận thông tin", {
        position: "bottom-left",
        timeout: 2500,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.12,
        showCloseButtonOnHover: true,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false,
      });
       return;
      }

         this.$toast.success("Đặt mua thành công", {
        position: "bottom-left",
        timeout: 2500,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.12,
        showCloseButtonOnHover: true,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false,
      });
       this.$router.push("/payment-success");
        const cartLength = this.cart.length;
        this.cart.splice(0, cartLength);
      this.updateStore();
       
    },
   
  updateStore() {
      this.$store.commit(SET_ORDER, this.cart);
    },
   },


  computed: { 
    sumtotalPrice() {
      let sum = 0;
      this.cart.forEach((item) => {
        sum = sum + item.orderNumber * item.price;
      });
      return this.promoCheck
        ? sum - (this.promo.sale * sum) / 100 + this.shippingFee
        : sum + this.shippingFee;
    },
  },
  watch: {
    selectedProvince: function () {
      this.districts = [];
      this.wards = [];
      this.selectedDist = "";
      this.selectedWard = "";

      if (this.selectedProvince == "Khác") {
        this.selectedDist = "Khác";
      }
      if (this.selectedProvince.length > 0) {
        this.districts = this.provinces[this.selectedProvince];
      }
    },
    selectedDist: function () {
      this.wards = [];
      this.selectedWard = "";

      if (this.selectedDist == "Khác") this.selectedWard = "Khác";
      if (this.selectedDist.length > 0) {
        this.wards = this.provinces[this.selectedProvince][this.selectedDist];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.cart-right .title {
  margin-bottom: 30px;
  border-bottom: 2px solid;
  padding-bottom: 10px;
}
.title {
  background: #f1f1f1;
  font-size: 20px;
  font-weight: 700;
}
.cart-left .title {
  padding: 10px 20px;
}
.cart__item--name {
  font-weight: 700;
}
.cart__item--price,
.cart__item--number {
  float: right;
}
.cart__item--wrapper {
  padding: 0px 0px 10px;
}
.cart__item--container,
.cart-info {
  border-bottom: 2px rgb(0, 0, 0) dashed;
  padding-bottom: 10px;
}
.cart-right {
  background: #f1f1f1;
  padding: 15px 20px;
  margin: 10px 0px;
}
.cart-right .title {
  margin-bottom: 30px;
  border-bottom: 2px solid;
  padding-bottom: 10px;
}
.title {
  background: #f1f1f1;
  font-size: 20px;
  font-weight: 700;
}
.cart-left .title {
  padding: 10px 20px;
}
.cart-right .title {
  margin-bottom: 30px;
  border-bottom: 2px solid;
  padding-bottom: 10px;
}
.cart-price {
  margin-top: 10px;
}
.title-2,
.title-3 {
  color: #333;
  font-size: 16px;
  font-weight: 700;
}
.value,
.value-3 {
  float: right;
}
.title-3 {
  color: #000;
  font-size: 20px;
}
.title-4 {
  margin: 40px 0 15px;
}

.cart-info {
  padding: 10px 0 20px;
}
.cart-info div {
  padding: 5px 0;
}

.totalPrice {
  padding: 35px 0 25px;
}
.btn-cart-to-checkout {
  background: #f15e2c;
  width: 100%;
  font-size: 25px;
  padding: 30px;
  color: #fff;
  margin-top: 10px;
}

.el-select-dropdown__item.is-disabled {
  color: #ffffff;
}
.el-select-dropdown__item.is-disabled:hover {
  color: #fff;
  font-weight: 700;
  background: #ff8000;
  margin-top: -5px;
}
.el-checkbox {
    margin: 20px 8px
}
.el-select {
  width: 100%;
  margin: 10px 0 0;
}
.el-input {
  color: rgb(0, 0, 0) !important;

  margin-top: 10px;
}
.el-input .el-input__inner {
  color: rgb(0, 0, 0);
  border: 1px #d7d5d2 solid;
  margin-top: 10px;
}
.cart-left ::placeholder {
  color: #000 !important;
}
.el-radio__label label {
  color: #000;
}
.form-control.el-input.is-invalid,
.form-control.el-select.is-invalid {
  border: 1px solid red;
  border-radius: 5px;
}
.error {
  color: red;
  font-size: 13px;
  margin: 5px 5px 0px;
}.is-bordered {
    width: 98%
}
</style>