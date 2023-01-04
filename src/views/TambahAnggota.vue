<template>
  <v-card elevation="0">
    <v-card-text class="d-flex justify-center align-center flex-column">
        <PickImageVue deskripsi="Upload Image" @getFileImage="getFileImage" />
        <div style="width: 280px;" class="mt-4">
            <TextInputVue placeholder="username" @change="e => username = e" />
        </div>
        <div style="width: 280px;" class="mt-4">
            <PasswordInputVue placeholder="password" @change="e => password = e" />
        </div>
        <div style="width: 280px;" class="mt-4">
            <v-select single-line flat outlined :items="roleChoice" v-model="role" placeholder="akses" hide-details="">
            </v-select>
        </div>
    </v-card-text>
    <v-card-actions class="d-flex justify-center align-center pb-12">
        <v-btn :to="{name: 'List Anggota'}" class="white--text" outlined color="blue-grey darken-2">
            list anggota
        </v-btn>
        <v-btn class="white--text px-8 py-4" color="blue-grey darken-2">
            submit
        </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import PickImageVue from '../components/PickImage.vue';
import TextInputVue from '../components/TextInput.vue';
import PasswordInputVue from '../components/PasswordInput.vue';

export default {
    components: {
        PickImageVue,
        TextInputVue,
        PasswordInputVue
    },
    data() {
        return {
            image: null,
            isPasswordVisible: false,
            username: '',
            password: '',
            roleChoice: ['super', 'regular'],
            role: ''
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