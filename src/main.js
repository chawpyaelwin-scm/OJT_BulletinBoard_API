// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "./polyfill";
// import cssVars from 'css-vars-ponyfill'
import Vue from "vue";
// import DotEnv from "dotenv/config"
import App from "./App";
import { router } from "./router";
import { store }  from "./store";
import VeeValidate from 'vee-validate';

import ElementUI from "element-ui";
import locale from "element-ui/lib/locale/lang/ja";
import "element-ui/lib/theme-chalk/index.css";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

Vue.use(ElementUI, { locale });
Vue.component("font-awesome-icon", FontAwesomeIcon);

// Vue.use(DotEnv);
Vue.use(VeeValidate, { inject: true, fieldsBagName: 'inputs' } );

/**
 * eslint-disable no-new
 */
new Vue({
  el: "#app",
  router,
  store,
  template: "<App/>",
  components: {
    App
  }
});
