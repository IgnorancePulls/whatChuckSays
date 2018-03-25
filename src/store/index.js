import Vue from 'vue'
import Vuex from 'vuex'

import quotesState from './quotes.module';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        quotesState
    }
})