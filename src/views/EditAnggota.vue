<template>
    <v-card elevation="0">
        <v-card-text class="d-flex justify-center align-center flex-column">
            <PickImageVue deskripsi="Upload gambar" :webSrc="src" @getFileImage="getFileImage" />
            <div style="width: 280px" class="mt-4">
                <TextInputVue :value="username" placeholder="username" @change="(e) => username = e" />
            </div>
            <div style="width: 280px" class="mt-4">
                <PasswordInputVue :value="password" placeholder="password" @change="(e) => password = e" />
            </div>
            <div style="width: 280px;" class="mt-4">
                <v-select single-line flat outlined :items="roleChoice" v-model="role" placeholder="akses"
                    hide-details="">
                </v-select>
            </div>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-12">
            <v-btn :loading="loadingDelete" @click="hapusAnggota" outlined color="grey darken-2"
                class="white--text px-6 py-4">
                hapus
            </v-btn>
            <v-btn :loading="loadingEdit" @click="editAnggota" color="grey darken-2" class="white--text px-6 py-4">
                edit
            </v-btn>
        </v-card-actions>

        <DialogMessageVue :dialog="dialog" :icon="dialogIcon" :text="dialogText" @changeValue="e => dialog = e">
        </DialogMessageVue>
    </v-card>
</template>

<script>
import PickImageVue from '../components/PickImage.vue';
import TextInputVue from '../components/TextInput.vue';
import PasswordInputVue from '../components/PasswordInput.vue';
import { getDocWithId, key, deleteDataNoConditional, uploadAFile, updateData } from '../plugins/utils';
import CryptoJS from 'crypto-js';
import Compressor from 'compressorjs';
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
            username: '',
            password: '',
            roleChoice: ['super', 'regular'],
            role: '',
            src: '',
            loadingDelete: false,
            loadingEdit: false,
            dialog: false,
            dialogIcon: '',
            dialogText: ''
        }
    },
    methods: {
        getFileImage(file) {
            const t = this;
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
        showDialog(text, icon) {
            this.dialogText = text;
            this.dialogIcon = icon;
            this.dialog = true;
        },
        async getAnggota() {
            const anggota = await getDocWithId('user', this.$route.params.id);
            const pass = CryptoJS.AES.decrypt(anggota.password, key);
            const password = pass.toString(CryptoJS.enc.Utf8);

            this.username = anggota.nama;
            this.password = password;
            this.role = anggota.role;
            this.src = anggota.foto;
        },
        hapusAnggota() {
            this.loadingDelete = true;
            deleteDataNoConditional('user', this.$route.params.id).then(() => {
                this.$router.back();
            })
        },
        editAnggota() {
            if (this.username == '' || this.password == '') {
                this.showDialog('field tidak boleh kosong', 'mdi-emoticon-cry');
                return;
            }

            this.loadingEdit = true;
            if (this.image) {
                uploadAFile(this.image, 'foto').then((url) => {
                    updateData('user', this.$route.params.id, {
                        foto: url
                    }).catch((err) => {
                        console.log(err);
                    })
                }).catch((err) => {
                    this.loadingEdit = false;
                    console.log(err);
                })
            }

            updateData('user', this.$route.params.id, {
                nama: this.username,
                password: CryptoJS.AES.encrypt(this.password, key).toString(),
                role: this.role
            }).then(() => {
                this.loadingEdit = false;
                this.showDialog('Horee berhasil update', 'mdi-emoticon-cool');
            }).catch((err) => {
                this.loadingEdit = false;
                console.log(err)
            })
        }
    },
    created() {
        this.getAnggota();
    }
}
</script>

<style>

</style>