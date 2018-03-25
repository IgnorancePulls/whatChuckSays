import Vue from 'vue';
import Icon from 'vue-awesome/components/Icon';

import App from './components/App.vue';
import {ApiService} from './api/api.service';
import store from './store';

Vue.config.productionTip = false;
Vue.component('icon', Icon);
ApiService.init();


new Vue({
    el: '#app',
    store,
    render: h => h(App)
});
