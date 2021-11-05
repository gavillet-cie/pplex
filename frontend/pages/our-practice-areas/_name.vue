<template lang="pug">
  .practice-area
    slider.about-us__slider(
      v-if="slideOptions && slideOptions.length > 0"
      :slides="slideOptions"
    )

    centered-wrapper
      row.practice-area__title
        h3 {{ formatRawText(title) }}

      row
        .practice-area__description(
          v-html="formatHtmlText(description)"
        )

      template(
        v-if="filteredLawyers.length > 0"
      )
        row.practice-area__lawyers-sub-title
          span {{ formatRawText(lawyerSubTitle) }}

        lawyers-grid.practice-area__lawyers(
          :lawyers="filteredLawyers"
        )
</template>

<script>
import { mapGetters } from 'vuex'
import { get } from '@/utils/api'
import { formatRawText, formatHtmlText } from '@/utils/text'
import { filterLawyers } from '@/utils/lawyers'
import CenteredWrapper from '@/components/CenteredWrapper'
import Row from '@/components/Row'
import LawyersGrid from '@/components/LawyersGrid'
import Slider from '@/components/Slider'

export default {
  components: { CenteredWrapper, Row, LawyersGrid, Slider },

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

  head() {
    return {
      title: this.title ? `${formatRawText(this.title)} - PYTHON` : 'PYTHON',
    }
  },

  computed: {
    ...mapGetters(['lang']),

    filteredLawyers() {
      return filterLawyers(this.lawyers, {
        name: null,
        location: null,
        practiceArea: this.name,
      })
    },

    slideOptions() {
      return this.slides?.map((it) => ({ image: it }))
    },
  },

  methods: { formatHtmlText, formatRawText },
}
</script>

<style lang="scss">
@import '../../styles/mixins';

.practice-area {
  &__title {
    @include sub-title;
  }

  &__description {
    padding-bottom: $section-margin-bottom;
  }

  &__lawyers-sub-title {
    @include section-title;
  }

  &__lawyers {
    margin-top: $menu-margin;
  }
}
</style>
