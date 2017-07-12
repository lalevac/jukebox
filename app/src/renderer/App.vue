<template>
    <div id="app">
        <button @click='test()' id='btn'>CALL!</button>
        <app-title-bar-windows></app-title-bar-windows>
        <router-view></router-view>
    </div>
</template>

<script>
    import spotify from './spotify'
    import AppTitleBarWindows from 'components/AppTitleBarWindows'
    import BrowserWindow from 'electron'

    export default {
        components: {
            AppTitleBarWindows
        },
        methods: {
            test() {
                spotify.testModule()
            }
        }
    }
</script>

<style lang='scss'>
    @import '../assets/styles.scss';

    body,
    html {
        overflow: hidden;
    }
</style>
