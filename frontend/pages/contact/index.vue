<template lang="pug">
  .contact
    slider.contact__slider(
      v-if="slideOptions && slideOptions.length > 0"
      :slides="slideOptions"
    )

    centered-wrapper
      row.contact__title(
        v-animate
      )
        h1 {{ formatRawText(title) }}
      locations.contact__locations
</template>

<script>
import Locations from '@/components/Locations'
import { get } from '@/utils/api'
import CenteredWrapper from '@/components/CenteredWrapper'
import Row from '@/components/Row'
import { formatRawText, formatHtmlText } from '@/utils/text'
import Slider from '@/components/Slider'

export default {
  components: { Locations, CenteredWrapper, Row, Slider },

  async asyncData({ store, params }) {
    try {
      const { language } = params
      store.commit('setBigMenu', true)
      const contact = await get('/contact', language)
      store.commit('setTitle', contact.title)
      store.commit('setPageDescription', contact.pageDescription)
      store.commit('setKeyWords', contact.keyWords)
      return contact
    } catch (error) {
      store.commit('setError', error)
    }
  },

  computed: {
    slideOptions() {
      return this.slides?.map((it) => ({ image: it }))
    },
  },

  methods: {
    formatRawText,
    formatHtmlText,
  },
}
</script>

<style lang="scss">
@import '../../styles/mixins';

.contact {
  padding-bottom: $footer-height;

  &__slider {
    @include header-slider;
  }

  &__title {
    @include sub-title;
  }

  &__locations {
    border-top: $border;
  }
}
</style>
