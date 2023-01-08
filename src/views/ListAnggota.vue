<template>
    <v-container class="fill-height d-flex align-start">
        <v-row v-if="stateStatus = 'fulfilled'" style="max-height: 89vh; height: auto" class="overflow-y-auto">
            <v-col v-for="item in anggotas" :key="item.id" @click="editAnggota(item.id)" cols="12" sm="12" md="6"
                lg="3">
                <AnggotaListVue :nama="item.nama" :foto="item.foto" />
            </v-col>
        </v-row>
        <div v-else-if="stateStatus == 'loading'" class="fill-height d-flex justify-center align-center pb-6"
            style="width: 100%">
            <img width="90" src="../assets/loading.gif" alt="">
        </div>
        <div v-else-if="stateStatus == 'empty'" class="fill-height d-flex justify-center align-center pb-6 flex-column"
            style="width: 100%">
            <v-icon color="blue-grey darken-3" size="80">
                mdi-delete-empty
            </v-icon>
            <p class="font-weight-bold text-subtitle-1 blue-grey--text text--darken-3">
                Anggota Kosong
            </p>
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
            anggotas: null,
            stateStatus: 'loading'
        }
    },
    methods: {
        async getAnggota() {
            const anggota = await getAll('user')
            if (anggota.length == 0) {
                this.stateStatus = 'empty'
            } else {
                this.stateStatus = 'fulfilled'
                this.anggotas = anggota;
            }
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