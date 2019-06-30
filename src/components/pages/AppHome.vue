<template>
    <div>
        <h1 id="home-title" class="title">THE RICK AND MORTY UNIVERSE</h1>
        <div id="home-menu">
            <app-button @click.native="$router.push('locations')" buttonWidth="170px">Locations</app-button>
            <app-button @click.native="$router.push('favorites')" buttonWidth="170px">Favorites</app-button>
        </div>
    </div>
</template>

<script>

import AppButton from "../ui/AppButton.vue"

export default {
    name: "AppHome",
    components: {
        AppButton
    }
}
</script>

<style scoped>
    #home-title {
        padding-top: 20vh;
    }
    #home-menu {
        position: absolute;
        top: 50vh;
        left: 50vw;
        width: 50vw;
        display: flex;
        justify-content: space-around;
        transform: translate(-50%, -50%);
    }
</style>


