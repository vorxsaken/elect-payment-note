<template>
  <v-text-field
    type="text"
    single-line
    outlined
    flat
    :placeholder="placeholder"
    color="grey darken-3"
    hide-details=""
    v-model="text"
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
            text: this.value
        }
    },
    watch: {
        text() {
            this.$emit('change', this.text);
        },
        value() {
            this.text = this.value
        }
    }
}
</script>

<style>

</style>