<template>
  <v-text-field
    :type="isPasswordVisible ? 'text' : 'password'"
    :append-icon="isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"
    @click:append="isPasswordVisible = !isPasswordVisible"
    single-line
    hide-details=""
    outlined
    flat
    :placeholder="placeholder"
    v-model="text"
    color="grey darken-3"
    clearable
    clear-icon="mdi-close-circle"
    @click:clear="text = ''"
  >
  </v-text-field>
</template>

<script>
export default {
    props: ['placeholder'],
    data() {
        return {
            text: '',
            isPasswordVisible: false,
        }
    },
    watch: {
        text() {
            this.$emit('change', this.text);
        }
    }

}
</script>

<style>

</style>