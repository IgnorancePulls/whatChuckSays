<template>
    <div :class="$style.wrapper">
        <loader-component v-if="isLoading"></loader-component>
        <error-component v-if="isError"></error-component>
        <quotes-component
            v-for="item in categories"
            :category="item"
            :categoryName="item.name"
            :key="item.name"
            @onCategoryClick="handleCategoryClick"
            @onJokeClick="handleJokeClick">
        </quotes-component>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    import {
        QUOTES_CATEGORY_LOAD,
        JOKE_LOAD,
        TOGGLE_FAVORITE,
        QUOTES_MARK_FAVORITE,
        QUOTES_UNMARK_FAVORITE } from '../../store/quotes.type';
    import LoaderComponent from '../common/loader.component.vue';
    import ErrorComponent from '../common/error.component.vue';
    import QuotesComponent from './quotes.component';

    export default {
        name: 'quotes-container',
        components: {
            QuotesComponent,
            LoaderComponent,
            ErrorComponent
        },
        methods: {
            loadQuotes() {
                this.$store.dispatch(QUOTES_CATEGORY_LOAD);
            },
            handleCategoryClick(categoryName) {
                this.$store.dispatch(JOKE_LOAD, categoryName);
            },
            handleJokeClick(id, categoryName) {
                let category = this.categories.find(category => category.name === categoryName);
                if(category.favorites.indexOf(id) === -1){
                    this.$store.commit(QUOTES_MARK_FAVORITE, {
                        name: categoryName,
                        id: id
                    })
                }
                else {
                    this.$store.commit(QUOTES_UNMARK_FAVORITE, {
                        name: categoryName,
                        id: id
                    })
                }
            }
        },
        computed: {
            ...mapGetters([
                'isLoading',
                'isError',
                'categories'
            ])
        },
        created() {
            this.loadQuotes();
        }
    }
</script>
<style module>
    .wrapper {
        max-width: 500px;
        display: block;
        margin: 0 auto;
        min-height: 100vh;
        composes: bcg-secondary from '../../assets/settings/colors.module.scss';
        opacity: 0.8;
    }
</style>