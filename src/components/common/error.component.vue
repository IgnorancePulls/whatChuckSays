<template>
    <h1 :class="$style.error">Oops... Something we wrong</h1>
</template>

<script>
    export default {
        name: 'error-component'
    }
</script>

<style module>
    .error {
        composes: color-error from '../../assets/settings/colors.module.scss';
        composes: font-size-md from '../../assets/settings/typograpthy.module.scss';
        padding: 10px;
        text-align: center;
    }
</style>