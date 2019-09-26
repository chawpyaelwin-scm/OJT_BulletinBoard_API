import Vue from "vue";
import Vuex from "vuex";
import { auth } from "./auth/index";
import { user } from "./user/index";
import { post } from "./post/index";
import { comment } from "./comment/index";
import VueSessionStorage from 'vue-sessionstorage';

Vue.use(Vuex);
Vue.use(VueSessionStorage);

/**
 *eslint-disable no-new
 */
export const store = new Vuex.Store({
  modules: {
    auth,
    user,
    post,
    comment
  }
});
