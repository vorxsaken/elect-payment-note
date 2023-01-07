<template>
    <v-container class="fill-height">
        <v-row justify="center">
            <v-card elevation="0" class="py-4" width="300" max-width="300">
                <v-card-title class="d-flex justify-center mb-10 login" style="font-size: 4rem">Login</v-card-title>
                <v-card-subtitle v-if="showError" class="text-center red--text text-roboto mt-4">{{  errorMessage }}</v-card-subtitle>
                <v-card-text class="pa-0">
                    <TextInputVue placeholder="username" @change="e => username = e" />
                    <PasswordInputVue class="mt-4" placeholder="password" @change="e => password = e" />
                </v-card-text>
                <v-card-actions class="d-flex justify-center mt-4">
                    <v-btn @click="login" depressed :loading="isLoading" color="grey darken-3" class="white--text px-5 py-5">login</v-btn>
                </v-card-actions>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
import TextInputVue from '../components/TextInput.vue';
import PasswordInputVue from '../components/PasswordInput.vue';
import { getDocCon, key } from '../plugins/utils';
import CryptoJS from 'crypto-js';

export default {
    components: {
        TextInputVue,
        PasswordInputVue
    },
    data() {
        return {
            username: '',
            password: '',
            errorMessage: '',
            showError: false,
            isLoading: false
        }
    },
    methods: {
        setErrorMessage(message) {
            this.showError = true;
            this.errorMessage = message;

            setTimeout(() => {
                this.showError = false;
                this.errorMessage = '';
            }, 3000)
        },
        async login(){
            if(this.username == '' || this.password == '') {
                this.setErrorMessage('Tidak boleh ada field yang kosong')
                return;
            }

            this.isLoading = true;
            var username = await getDocCon('user', 'name', this.username);
            var encryptedPassword = username.length > 0 ? username[0].password : '';

            var bytes = CryptoJS.AES.decrypt(encryptedPassword, key);
            var password = bytes.toString(CryptoJS.enc.Utf8);

            if(username.length > 0){
                if(password == this.password) {
                    localStorage.setItem('id', username[0].id);
                    await this.$store.dispatch('getUser');
                    this.isLoading = false
                    window.location.reload();
                    return;
                }

                this.setErrorMessage('Password salah')
                this.isLoading = false;
                return;
            }

            this.setErrorMessage('User tidak ditemukan')
            this.isLoading = false;
            return;
        }
    }
}
</script>