import './css/index.scss';
import 'mint-ui/lib/style.css';
import './lib/mui/css/mui.min.css';
import './lib/mui/css/iconfont.css';
import './css/icon.css';
import './css/animate.css';
import './css/text.css';
import './js/rem.js';
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import app from './app.vue';
import $ from 'jquery';
import {
  Header,
  Swipe,
  SwipeItem,
  Tabbar,
  TabItem,
  Indicator,
  Popup,
  Picker,
  Button
} from 'mint-ui';

Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Popup.name, Popup);
Vue.component(Picker.name, Picker);
Vue.component(Button.name, Button);
Vue.use(VueRouter);
Vue.use(VueResource);

import router from './router.js';

var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router
});
