<template>
    <div>
        <v-app-bar color="grey darken-3" height="70" app>
            <v-toolbar-title class="white--text font-weight-bold" style="font-size: 1.1rem">
                {{ this.$route.name }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-avatar v-if="this.$route.name != 'Profile User'" @click="toProfile" size="40" color="grey">
                <v-img :src="this.$store.state.profilePicture"></v-img>
            </v-avatar>
        </v-app-bar>
    </div>
</template>

<script>
export default {
    methods: {
        toProfile() {
            this.$router.push({ name: 'Profile User' })
        }
    }
}
</script>

<style>

</style>