<template>
    <v-dialog v-model="showDialog" overlay-opacity="0.3">
        <v-card elevation="0">
            <v-card-text class="d-flex justify-center align-center flex-column pt-6 pb-8">
                <v-icon size="90" color="blue-grey darken-2">{{ icon }}</v-icon>
                <span class="text-roboto mt-2 blue-grey--text text--darken-2 font-weight-bold"
                    style="font-size: 0.9rem">
                    {{ text }}
                </span>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ['dialog', 'icon', 'text'],
    data() {
        return {
            showDialog: false,
        }
    },
    watch: {
        dialog() {
            this.dialog ? this.showDialog = true : this.showDialog = false;
        },
        showDialog() {
            if(!this.showDialog) this.$emit('changeValue', false);
        }
    }
}
</script>