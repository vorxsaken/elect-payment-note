<template>
    <v-container class="fill-height d-flex align-start">
        <v-row v-if="anggotas" style="max-height: 89vh; height: auto" class="overflow-y-auto">
            <v-col v-for="item in anggotas" :key="item.id" @click="editAnggota(item.id)" cols="12" sm="12" md="6"
                lg="3">
                <AnggotaListVue :nama="item.nama" :foto="item.foto" />
            </v-col>
        </v-row>
        <div v-else class="fill-height d-flex justify-center align-center pb-6" style="width: 100%">
            <img width="90" src="../assets/loading.gif" alt="">
        </div>
    </v-container>
</template>

<script>
import AnggotaListVue from '../components/AnggotaList.vue';
import { getAll } from '../plugins/utils'

export default {
    components: {
        AnggotaListVue
    },
    data() {
        return {
            anggotas: null
        }
    },
    methods: {
        async getAnggota() {
            const anggota = await getAll('user')
            this.anggotas = anggota;
        },
        editAnggota(id) {
            this.$router.push({ name: 'Edit Anggota', params: { id: id } });
        }
    },
    created() {
        this.getAnggota();
    }

}
</script>

<style>

</style>