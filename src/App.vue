<template>
    <div id="app">
        <!--        <div id="nav">-->
        <!--            <router-link to="/">Home</router-link>-->
        <!--            |-->
        <!--            <router-link to="/about">About</router-link>-->
        <!--        </div>-->
        <!--        <router-view/>-->
        <home></home>
    </div>
</template>

<script>
    import Home from "./views/Home";

    export default {
        name: 'app',
        components: {
            Home
        }
    }
</script>
<style>

</style>
