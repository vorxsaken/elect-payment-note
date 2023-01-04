<template>
    <v-container>
        <v-row dense>
            <v-col @click="$router.push({name: 'Edit Anggota'})" cols="12" sm="12" md="6" lg="3">
                <AnggotaListVue />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import AnggotaListVue from '../components/AnggotaList.vue';
export default {
    components: {
        AnggotaListVue
    }
    
}
</script>

<style>

</style>