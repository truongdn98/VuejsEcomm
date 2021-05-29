<template>
  <div id="App"> 
    <navbar/>
    <transition name="slide-fade" >
     <router-view></router-view>
    
    </transition>
     <notifications/>
    <Footer/>
  </div>


</template>

<script>
import Vue from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

Vue.use(Toast, {  
   transition: "Vue-Toastification__fade",
  maxToasts: 8,
  newestOnTop: true
});
import Footer from './components/core/Footer.vue';

// import About from './views/About.vue';
import Navbar from './components/Nav-bar.vue';
import Notifications from './components/Notifications.vue';
// import Home from './views/Home.vue';
export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
    Notifications,

  },

    
  data: () => ({
    //
  }),

  
};
</script>
<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.css";
#App{
  margin-top: 100px;
}
body {
    font-family: 'Open Sans', sans-serif;
}
.slide-fade-enter-active {
  transition: all .7s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
.Vue-Toastification__toast {
    width: 10px !important;
    padding: 20px 15px !important;
    font-size: 12px !important
}
.Vue-Toastification__toast-body {
    font-size: 15px !important
}

</style>
