import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';

import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
// import './components/common/directives';
import 'babel-polyfill';
import Router from 'vue-router';
const routerReplace = Router.prototype.replace;
Router.prototype.replace = function replace(location) {
    return routerReplace .call(this, location).catch(error=> error)
};
var axios = require('axios');
// axios.defaults.baseURL = 'http://localhost:8443/api';
axios.defaults.baseURL = 'http://49.234.235.35:8443/api';
Vue.prototype.$axios = axios;


Vue.config.productionTip = false;

Vue.use(ElementUI, {
    size: 'medium '
});

Vue.prototype.$message1 = function (msg) {
    this.$message({message: msg,duration:500})
}

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
