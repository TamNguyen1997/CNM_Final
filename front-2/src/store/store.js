import Vue from 'vue'
import Vuex from 'vuex'

import { alert } from './alert_module';
import { account } from './account_module';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    alert,
    account,
  }
})
