import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import storeMapper from './storeMapper';

Vue.use(Vuex);

export const store = new Vuex.Store(storeMapper({
  // strict: true,
  state: {
    basePath: '/',
    fileList: [],
    currentPath: [],
    history: [],
    temps: [],
    reverse: false,
    predicate: ['type', 'name'],
    view: 'table',
    query: ''
  },
  getters,
  mutations,
  actions
}));