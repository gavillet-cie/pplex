<template lang="pug">
  .lawyers
    centered-wrapper
      h3.lawyers__sub-title Rencontrez nos avocats
      lawyers-grid(
        :lawyers="lawyers"
      )
</template>

<script>
import { mapGetters } from 'vuex'
import { get } from '@/utils/api'
import CenteredWrapper from '@/components/CenteredWrapper'
import LawyersGrid from '@/components/LawyersGrid'

export default {
  components: { CenteredWrapper, LawyersGrid },

  async asyncData({ store, params }) {
    const { language } = params
    store.commit('setBigMenu', true)
    const lawyers = await get('lawyers', language)
    return lawyers
  },

  data() {
    return {
      width: null,
    }
  },

  computed: {
    ...mapGetters(['lang']),
    items() {
      return this.lawyers || []
    },
  },

  mounted() {
    this.width = window.innerWidth
  },
}
</script>

<style lang="scss">
.lawyers {
  &__sub-title {
    text-align: center;
    font-size: 4rem;
    color: $secondary-color;
    padding: 2rem 0;
  }
}
</style>
