<template lang="pug">
  error
</template>

<script>
import Error from '@/components/error.vue'
export default {
  components: { Error },

  asyncData({ store }) {
    store.commit('setError', true)
  },

  mounted() {
    this.$store.commit('setError', true)
  },
}
</script>
