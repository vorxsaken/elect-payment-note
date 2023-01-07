<template>
  <v-card elevation="0">
    <v-card-text :key="index" class="d-flex justify-center align-center flex-column">
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
        <v-btn :loading="isLoading" @click="addAnggota" class="white--text px-8 py-4" color="blue-grey darken-2">
            submit
        </v-btn>
    </v-card-actions>

    <DialogMessageVue :dialog="dialog" :icon="dialogIcon" :text="dialogText" @changeValue="e => dialog = e" ></DialogMessageVue>
  </v-card>
</template>

<script>
import PickImageVue from '../components/PickImage.vue';
import TextInputVue from '../components/TextInput.vue';
import PasswordInputVue from '../components/PasswordInput.vue';
import Compressor from 'compressorjs';
import { addData, uploadAFile, key, setData } from "../plugins/utils";
import CryptoJS from 'crypto-js';
import DialogMessageVue from '../components/DialogMessage.vue';

export default {
    components: {
        PickImageVue,
        TextInputVue,
        PasswordInputVue,
        DialogMessageVue
    },
    data() {
        return {
            image: null,
            isPasswordVisible: false,
            username: '',
            password: '',
            roleChoice: ['super', 'regular'],
            role: '',
            index: 0,
            isLoading: false,
            dialog: false,
            dialogIcon: '',
            dialogText: ''
        }
    },
    methods: {
        getFileImage(file) {
            var t = this;
            new Compressor(file, {
                width: 800,
                quality: 0.8,
                success(res) {
                    t.image = res
                },
                error(err) {
                    console.log(err);
                }
            })
        },
        showDialog(text, icon){
            this.dialogText = text;
            this.dialogIcon = icon;
            this.dialog = true;
        },
        getPassword() {
            var bytes = CryptoJS.AES.encrypt(this.password, key).toString();
            return bytes;
        },
        addAnggota() {
            if(!this.image || this.username == '' || this.password == '') {
                this.showDialog('field tidak boleh kosong', 'mdi-check-decagram');
                return;
            }

            this.isLoading = true;
            addData('user',{
                nama: this.username,
                password: this.getPassword(),
                role: this.role
            }).then((res) => {
                uploadAFile(this.image, 'foto').then((url) => {
                    setData('user', {
                        foto: url
                    }, res.id).then(() => {
                        this.index++;
                        this.role = '';
                        this.isLoading = false;
                        this.showDialog('user berhasil ditambahkan', 'mdi-check-decagram');
                    }).catch((err) => {
                        console.log(err);
                        this.isLoading = false;
                    })
                }).catch((err) => {
                    console.log(err)
                    this.isLoading = false
                })
            }).catch((err) => {
                console.log(err);
                this.isLoading = false;
            })
        }
    }

}
</script>

<style>

</style>