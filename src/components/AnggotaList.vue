<template>
    <v-card elevation="0" style="border: 1px grey solid;">
        <v-list>
            <v-list-item>
                <v-list-item-avatar size="50" color="grey darken-2" rounded="">
                    <v-img :src="foto"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title>{{ nama }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script>
export default {
    props: ['nama', 'foto']

}
</script>

<style>

</style>