<template lang="pug">
  .about-us
    slider.about-us__slider(
      v-if="slideOptions && slideOptions.length > 0"
      :slides="slideOptions"
    )

    centered-wrapper
      row.about-us__title
        h3 {{ formatRawText(title) }}

      row
        .about-us__description(
          v-html="formatHtmlText(description)"
        )

      template(
        v-for="section in sections"
      )
        row.about-us__section-title
          span {{ formatRawText(section.title) }}

        row
          .about-us__section-content(
            v-html="formatHtmlText(section.description)"
          )

      row.about-us__section-title
        span {{ getLabel('ourOffices', labels) }}

      locations.about-us__locations

      row.about-us__section-title
        span {{ getLabel('rankings', labels) }}

      rankings.about-us__rankings(
        :rankings="rankings"
      )
</template>

<script>
import { mapGetters } from 'vuex'
import { get } from '@/utils/api'
import { formatRawText, formatHtmlText } from '@/utils/text'
import CenteredWrapper from '@/components/CenteredWrapper'
import Row from '@/components/Row'
import Locations from '@/components/Locations'
import Rankings from '@/components/Rankings'
import Slider from '@/components/Slider'
import { getLabel } from '@/utils/labels'

export default {
  component: { CenteredWrapper, Row, Locations, Rankings, Slider },

  async asyncData({ store, params }) {
    try {
      const { language } = params
      store.commit('setBigMenu', true)
      const about = await get('/about-us', language)
      return about
    } catch (error) {
      store.commit('setError', error)
    }
  },

  head() {
    return {
      title: this.title ? `${formatRawText(this.title)} - PYTHON` : 'PYTHON',
    }
  },

  computed: {
    ...mapGetters(['lang', 'labels']),
    slideOptions() {
      return this.slides?.map((it) => ({ image: it }))
    },
  },

  methods: {
    getLabel,
    formatRawText,
    formatHtmlText,
  },
}
</script>

<style lang="scss">
@import '../../styles/mixins';

.about-us {
  &__title,
  &__section-title {
    color: $secondary-color;
  }

  &__slider {
    @include header-slider;
  }

  &__title {
    @include sub-title;

    text-align: left;
  }

  &__section-title {
    @include section-title;
  }

  &__description,
  &__section-content {
    @include big-text-padding;
  }

  &__locations,
  &__rankings {
    margin-bottom: $section-margin-bottom;
  }
}
</style>
