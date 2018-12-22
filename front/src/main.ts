import '@babel/polyfill'
import Vue from 'vue';
import './plugins/bootstrap-vue';
import App from './App.vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faDownload} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import router from './router';
import store from './store';

library.add(faCoffee);
library.add(faDownload);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
