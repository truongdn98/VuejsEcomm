import constants from "../store/constants";
import {
    SET_ORDER
} from "../store/types";
const myMixin = {

    filters: {
        currency(value) {
            return new Intl.NumberFormat().format(value);
        }
    },
    data() {
        return {
            cart: [],
        }
    },
    computed: {
        totalPrice() {
            let sum = 0;
            this.cart.forEach((item) => {
                sum = sum + item.orderNumber * item.price;
            });
            return sum;
        },
        sumtotalPrice() {
            let sum = 0;
            this.cart.forEach((item) => {
                sum = sum + item.orderNumber * item.price;
            });
            return this.promoCheck ? sum - (this.promo.sale * sum) / 100 : sum;
        },
    },
    methods: {
        updateStore() {
            this.$store.commit(SET_ORDER, this.cart);
        },
    },
    created() {
        let cart = localStorage.getItem(constants.LOCAL_STORAGE_ORDERS);
        if (cart) {
            cart = JSON.parse(cart);
            this.cart = cart;
            this.updateStore();
        }
    },
    watch: {
        "$store.state.cart": function () {
            this.cart = this.$store.state.cart;
        },
    },
}
export default myMixin