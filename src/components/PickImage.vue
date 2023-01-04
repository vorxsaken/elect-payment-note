<template>
    <div>
        <input type="file" class="d-none" ref="inputFile" @change="fileChange">
        <div v-if="fileImage || fileImageSrc"
            style="width: auto; height: auto; border-radius: 10px; overflow: hidden; border: 1px grey solid;"
            @click="pickPictureChoice = true">
            <v-img width="300" height="300" :src="fileImageSrc"></v-img>
        </div>
        <div v-else class="addImage d-flex justify-center align-center flex-column" @click="pickPictureChoice = true">
            <v-icon size="80" color="white">mdi-plus-box</v-icon>
            <p class="text-roboto white--text font-weight-bold mt-2">{{ deskripsi }}</p>
        </div>
        <v-bottom-sheet v-model="pickPictureChoice">
            <v-card>
                <v-card-actions class="pt-6 pl-6">
                    <div class="d-flex justify-center align-center flex-column">
                        <v-icon size="40" color="blue-grey darken-1">mdi-camera</v-icon>
                        <p class="text-caption font-weight-bold blue-grey--text text-darken-1">Kamera</p>
                    </div>
                    <div @click="pickFromGallery" class="d-flex justify-center align-center flex-column ml-8">
                        <v-icon size="40" color="blue-grey darken-1">mdi-panorama-variant-outline</v-icon>
                        <p class="text-caption font-weight-bold blue-grey--text text-darken-1">Gallery</p>
                    </div>
                </v-card-actions>
            </v-card>
        </v-bottom-sheet>
    </div>
</template>

<script>
export default {
    props: {
        deskripsi: String,
        webSrc: String
    },
    data() {
        return {
            fileImage: null,
            fileImageSrc: this.webSrc ? this.webSrc : null,
            fileType: ['image/jpg', 'image/jpeg', 'image/webp', 'image/png'],
            pickPictureChoice: false,
        }
    },
    methods: {
        fileChange(e) {
            if (this.fileType.some(type => type == e.target.files[0].type)) {
                this.fileImage = e.target.files[0];
                this.fileImageSrc = URL.createObjectURL(this.fileImage);
                this.$emit('getFileImage', this.fileImage);
            }
        },
        pickFromGallery() {
            this.$refs.inputFile.click();
            this.pickPictureChoice = false;
        }
    }
}
</script>

<style lang="scss" scoped>
.addImage {
    width: 300px;
    height: 300px;
    border: 3px #404752 solid;
    border-radius: 10px;
    background-color: #404752;
}
</style>