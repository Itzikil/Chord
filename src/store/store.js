import Vuex from 'vuex'

import { userStore } from './user.store.js'
import { songStore } from './song.store.js'
import { reviewStore } from './review.store.js'

export const store = Vuex.createStore({
  strict: true,
  modules: {
    userStore,
    songStore,
    reviewStore
  },
  state: {
  },
  mutations: {
  },
  actions: {
  }
})
