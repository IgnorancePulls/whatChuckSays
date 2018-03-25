<template>
    <div>
        <div :class="$style.header"
             @click="onCategoryClick">
            <div :class="$style.infobox">
                <h1 :class="$style.categoryTitle">
                    {{categoryName}}
                </h1>
                <h2>Favs: {{category.favorites.length}}</h2>
            </div>
        </div>

        <ul>
            <li :class="$style.jokeItem"
                v-for="item in category.jokes">
                <p>{{item.data.value}}</p>
                <div :class="$style.favWrapper"
                     v-if="category.favorites.indexOf(item.data.id) !== -1"
                     :data-id="item.data.id"
                     @click="onJokeClick">
                    <icon name="star" scale="2"></icon>
                </div>
                <div :class="$style.favWrapper"
                     v-else
                     :data-id="item.data.id"
                     @click="onJokeClick">
                    <icon name="star-o" scale="2"></icon>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import 'vue-awesome/icons';

    export default {
        name: 'quotes-component',
        props: {
            category: {
                type: Object,
                required: true
            },
            categoryName: {
                type: String,
                required: true
            }
        },
        methods: {
            onCategoryClick() {
                this.$emit('onCategoryClick', this.categoryName);
            },
            onJokeClick(event) {
                this.$emit('onJokeClick', event.currentTarget.dataset.id, this.categoryName)
            }
        }
    }
</script>

<style module>
    .header {
        display: flex;
        padding: 10px 20px;
        composes: color-primary from '../../assets/settings/colors.module.scss';
        composes: bcg-secondary from '../../assets/settings/colors.module.scss';
        opacity: 0.8;
        cursor: pointer;
    }

    .infobox {
        display: flex;
        width: 100%;
        justify-content: space-between;
    }

    .categoryTitle {
        text-transform: uppercase;
        composes: font-size-md from '../../assets/settings/typograpthy.module.scss';
    }

    .favWrapper {
        padding: 0 0 0 10px;
    }

    .jokesList {
        margin: 5px 0;
    }

    .jokeItem {
        padding: 10px 20px;
        composes: bcg-primary from '../../assets/settings/colors.module.scss';
        composes: color-secondary from '../../assets/settings/colors.module.scss';
        display: flex;
        align-items: center;
        justify-content: space-between;
    }


</style>