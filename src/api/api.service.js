import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

import { BASE_PATH } from './api.paths';

export const ApiService = {
    init() {
        Vue.use(VueAxios, axios);
        Vue.axios.defaults.baseURL = BASE_PATH;
    },

    get (resource, slug = '', params = {}) {
        return Vue.axios
            .get(`${resource}${slug}`, params)
            .catch((error) => {
                throw new Error(`[WCS] ApiService ${error}`);
            });
    },

    getSome(resource, slug = '', qty, params) {
        let requests = [];
        for(let i = 0; i < qty; i++) {
            requests.push(this.get(resource, slug, params));
        }

        return requests;
    }
};