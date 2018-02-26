// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'font-awesome/css/font-awesome.min.css';
import {
  store
} from './store/store';

import utils from './utils.js';
import moment from 'vue-moment';

Vue.use(utils, {
  store: store
});

Vue.use(BootstrapVue);
Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.use(moment);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  router,
  components: {
    App
  },
  template: '<App/>'
});