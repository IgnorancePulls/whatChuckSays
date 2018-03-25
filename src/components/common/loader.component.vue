<template>
    <div :class="$style.spinner">
        <icon name="spinner" scale="4" spin></icon>
    </div>
</template>

<script>
    import 'vue-awesome/icons';
    export default {
        name: 'loader-component',
    }
</script>
<style module>
    .spinner {
        position: fixed;
        z-index: 999;
        height: 30px;
        width: 30px;
        margin: auto;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }
</style>