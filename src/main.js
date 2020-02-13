/* eslint-disable global-require */
/* eslint-disable no-underscore-dangle */
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

import { Icon } from 'leaflet';
import App from './App.vue';
import router from './router';
import utils from './utils';
import 'leaflet/dist/leaflet.css';


Vue.prototype.$utils = utils;
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
