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
    props: {
        placeholder: String,
        value: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            text: this.value,
            isPasswordVisible: false,
        }
    },
    watch: {
        text() {
            this.$emit('change', this.text);
        },
        value() {
            this.text = this.value;
        }
    }

}
</script>

<style>

</style>