<template lang="pug">
  .careers
    slider.careers__slider(
      v-if="slideOptions && slideOptions.length > 0"
      :slides="slideOptions"
    )

    centered-wrapper
      row
        h3.careers__title {{ formatRawText(title) }}

      row
        .careers__description(
          v-html="formatHtmlText(description)"
        )

      list.careers__vacancies(
        :items="vacancyItems"
        :addIcon="false"
        :expand="true"
      )
</template>

<script>
import Locations from '@/components/Locations'
import { get } from '@/utils/api'
import { formatRawText, formatHtmlText } from '@/utils/text'
import CenteredWrapper from '@/components/CenteredWrapper'
import Row from '@/components/Row'
import List from '@/components/List'
import Slider from '@/components/Slider'

export default {
  components: { Locations, CenteredWrapper, Row, List, Slider },

  async asyncData({ store, params }) {
    try {
      const { language } = params
      store.commit('setBigMenu', true)
      const careers = await get('/careers', language)
      store.commit('setTitle', careers.title)
      store.commit('setPageDescription', careers.description)
      return careers
    } catch (error) {
      store.commit('setError', error)
    }
  },

  computed: {
    vacancyItems() {
      return this.currentVacancies.map((it) => ({
        label: formatRawText(it.title),
        text: formatRawText(it.description),
      }))
    },

    slideOptions() {
      return this.slides?.map((it) => ({ image: it }))
    },
  },

  methods: {
    formatHtmlText,
    formatRawText,
  },
}
</script>

<style lang="scss">
@import '../../styles/mixins';

.careers {
  padding-bottom: $footer-height;

  &__slider {
    @include header-slider;
  }

  &__title {
    @include sub-title;

    border-bottom: $border;
  }

  &__description {
    @include text-padding;
  }

  &__vacancies {
    border-top: $border;
  }
}
</style>
