<template>
  <div>
    <transition-group name="slideInLeft">
      <el-alert
        v-show="nofications.showing"
        v-for="(nofication, index) in nofications"
        :key="index"
        title="success alert"
        type="success"
        description="more text description"
        show-icon
        :style="`bottom: ${index * 70}px`"
        @close="closeNofi($event, index)"
      >
      </el-alert>
    </transition-group>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { REMOVE_NOFI } from "../store/types";
export default {
  name: "Notifications",
  computed: mapState(["nofications"]),
  methods: {
    closeNofi(e, index) {
      this.$store.commit(REMOVE_NOFI, index);
    },
  },
};
</script>

<style scoped>
.el-alert {
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 99;
  width: 300px;
  background: rgb(200, 255, 213) !important;
}
.slideInLeft-enter-active {
  animation: slideInLeft 2s ease;
}
.slideInLeft-leave-active {
  animation: fadeOut 1s reverse;
}
@keyframes slideInLeft {
  from {
    transform: translateX(150px);
  }
  to {
    transform: translateX(0);
  }
}
@keyframes fadeOut {
  to {
    opacity: 0;
  }
}
</style>