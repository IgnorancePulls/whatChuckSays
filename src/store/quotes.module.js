import {
    QUOTES_CATEGORY_LOAD,
    QUOTES_CATEGORY_LOADING,
    QUOTES_CATEGORY_LOADING_COMPLETED,
    QUOTES_CATEGORY_LOADING_FAILED,
    QUOTES_MARK_FAVORITE,
    QUOTES_UNMARK_FAVORITE,
    JOKE_LOAD,
    JOKE_LOADING,
    JOKE_LOADING_FAILED,
    JOKE_LOADING_COMPLETED,
} from './quotes.type';
import {ApiService} from '../api/api.service';
import {CHUCK_JOKES_CATEGORIES_PATH, CHUCK_JOKES_RANDOM_PATH } from '../api/api.paths'

const state = {
    categories: [],
    isLoading: false,
    isError: false,
};

const mutations = {
    [QUOTES_CATEGORY_LOADING] (state) {
        state.isLoading = true;
        state.isError = false;
    },
    [QUOTES_CATEGORY_LOADING_COMPLETED] (state, payload) {
        state.isLoading = false;
        state.isError = false;
        state.categories = payload.map(category => {
            return {
                name: category,
                jokes: [],
                favorites: []
            }
        });
    },
    [QUOTES_CATEGORY_LOADING_FAILED] (state) {
        state.isError = true;
        state.isLoading = false;
    },
    [JOKE_LOADING] (state) {
        state.isLoading = true;
        state.isError = false;
    },
    [JOKE_LOADING_COMPLETED] (state, payload) {
        state.isLoading = false;
        state.isError = false;
        state.categories = state.categories.map((category) => {
            if (category.name === payload.name) {
                category = {
                    ...category,
                    ...payload,
                    favorites: []
                }
            }
            return category;
        });
    },
    [JOKE_LOADING_FAILED] (state) {
        state.isError = true;
        state.isLoading = false;
    },
    [QUOTES_MARK_FAVORITE] (state, payload) {
        state.categories =  state.categories.map((category) => {
            if(category.name === payload.name) {
                category.favorites.push(payload.id)
            }
            return category
        });
    },
    [QUOTES_UNMARK_FAVORITE] (state, payload) {
        state.categories =  state.categories.map((category) => {
            if(category.name === payload.name) {
                let filtered = category.favorites.filter(favorite => favorite !== payload.id);
                return {
                    ...category,
                    favorites: filtered
                }
            }
            return category
        });
    }
};

const actions = {
    [QUOTES_CATEGORY_LOAD] (context) {
        context.commit(QUOTES_CATEGORY_LOADING);
        ApiService.get(CHUCK_JOKES_CATEGORIES_PATH)
            .then((res) => {
                context.commit(QUOTES_CATEGORY_LOADING_COMPLETED, res.data)
            })
            .catch((err) => {
                console.log(err)
                context.commit(QUOTES_CATEGORY_LOADING_FAILED)
            })
    },
    [JOKE_LOAD] (context, categoryName) {
        context.commit(JOKE_LOADING);
        Promise.all(ApiService.getSome(CHUCK_JOKES_RANDOM_PATH, '', 3, {
            category: categoryName
        })).then(res => {
            context.commit(JOKE_LOADING_COMPLETED, {
                name: categoryName,
                jokes: res
            })
        });
    }
};

const getters = {
    isLoading (state) {
        return state.isLoading;
    },
    isError (state) {
        return state.isError;
    },
    categories (state) {
        return state.categories
    }
};

export default {
    state,
    mutations,
    getters,
    actions
};