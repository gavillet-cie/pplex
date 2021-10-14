<template lang="pug">
  .practice-area
    centered-wrapper
      row-wrapper(
        :padding="false"
      )
        h3.practice-area__title {{ title }}
        .practice-area__description(
          v-html="description"
        )

      row-wrapper.practice-area__sub-title Nos avocats spécialisés en arbitrage
</template>

<script>
import { mapGetters } from 'vuex'
import { get } from '@/utils/api'
import CenteredWrapper from '@/components/CenteredWrapper'
import RowWrapper from '@/components/RowWrapper'

export default {
  components: { CenteredWrapper, RowWrapper },

  async asyncData({ store, params }) {
    const { language, name } = params
    store.commit('setBigMenu', true)
    const area = await get(`/our-practice-areas/${name}`, language)
    return area
  },

  computed: {
    ...mapGetters(['lang']),
  },
}
</script>

<style lang="scss">
.practice-area {
  &__title {
    font-size: $sub-title-font-size;
    color: $secondary-color;
    padding: 2rem 0;
  }

  &__sub-title {
    font-size: $medium-font-size;
  }
}
</style>
