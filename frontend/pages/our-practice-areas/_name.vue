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

      template(
        v-if="filteredLawyers.length > 0"
      )
        row-wrapper.practice-area__sub-title {{ subTitle }}
        lawyers-grid.practice-area__lawyers(
          :lawyers="filteredLawyers"
        )
</template>

<script>
import { mapGetters } from 'vuex'
import { get } from '@/utils/api'
import { filterLawyers } from '@/utils/lawyers'
import CenteredWrapper from '@/components/CenteredWrapper'
import RowWrapper from '@/components/RowWrapper'
import LawyersGrid from '@/components/LawyersGrid'

export default {
  components: { CenteredWrapper, RowWrapper, LawyersGrid },

  async asyncData({ store, params }) {
    const { language, name } = params
    store.commit('setBigMenu', true)
    const [area, { lawyers }] = await Promise.all([
      get(`/our-practice-areas/${name}`, language),
      get(`/lawyers`, language),
    ])
    return {
      ...area,
      lawyers,
    }
  },

  computed: {
    ...mapGetters(['lang']),
    subTitle() {
      return `Nos avocats spécialisés en ${this.title.toLowerCase()}`
    },

    filteredLawyers() {
      return filterLawyers(this.lawyers, {
        name: null,
        location: null,
        practiceArea: this.name,
      })
    },
  },
}
</script>

<style lang="scss">
.practice-area {
  &__title {
    font-size: $sub-title-font-size;
    line-height: 1;
    color: $secondary-color;
    padding: $section-margin-bottom * 0.5 0;
  }

  &__description {
    padding-bottom: $section-margin-bottom;
  }

  &__sub-title {
    font-size: $medium-font-size;
  }

  &__lawyers {
    margin-top: $menu-margin;
  }
}
</style>
