import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {store} from './store'
import vuetify from './plugins/vuetify';
import Element from 'element-ui'
import './element-variables.scss'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

Vue.use(Element)

import {firestorePlugin} from 'vuefire'

Vue.use(firestorePlugin);
Vue.config.productionTip = false

Vue.use(vuetify)




new Vue({
  router,
  store,
  vuetify,
  // data: () => ({test: []}),
  // firestore: {
  //   test: db.collection("test")
  // },
  render: h => h(App)
}).$mount('#app')
