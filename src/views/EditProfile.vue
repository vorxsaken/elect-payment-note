<template>
  <v-card elevation="0">
    <v-card-text class="d-flex justify-center align-center flex-column">
        <PickImageVue deskripsi="Upload Foto Profil" :webSrc="this.$store.state.profilePicture" @getFileImage="getFileImage"/>
        <div style="width: 280px" class="mt-4">
            <TextInputVue placeholder="Name" @change="e => nama = e" />
        </div>
    </v-card-text>
    <v-card-actions class="d-flex justify-center">
        <v-btn color="grey darken-2" class="white--text px-4 py-4">
            submit
        </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import PickImageVue from '../components/PickImage.vue';
import TextInputVue from '../components/TextInput.vue';

export default {
    components: {
        PickImageVue,
        TextInputVue
    },
    date() {
        return {
            image: null,
            nama: ''
        }
    },
    methods: {
        getFileImage(file) {
            this.image = file
        }
    }

}
</script>

<style>

</style>