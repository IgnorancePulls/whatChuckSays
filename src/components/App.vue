<template>
    <div id="app">
        <quotes-container></quotes-container>
    </div>
</template>

<script>
    import { QUOTES_CATEGORY_LOADING } from '../store/quotes.type';
    import QuotesContainer from './quotes/quotes.container';

    export default {
        name: 'app',
        components: {
            QuotesContainer
        }
    }
</script>
<style>
    @import "../assets/generic/_normalize.scss";

    #app {
        min-width: 100vw;
        min-height: 100vh;
        background: url(../../static/16_Chuck-Norris.jpeg) no-repeat center center fixed;
        background-size: cover;
    }
</style>
