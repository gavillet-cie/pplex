<template lang="pug">
  .contact
    slider.about-us__slider(
      v-if="slideOptions && slideOptions.length > 0"
      :slides="slideOptions"
    )

    centered-wrapper
      row.contact__title
        h3 {{ formatRawText(title) }}
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
    const { language } = params
    store.commit('setBigMenu', true)
    const contact = await get('/contact', language)
    return contact
  },

  head() {
    return {
      title: this.title ? `${formatRawText(this.title)} - PYTHON` : 'PYTHON',
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
  &__title {
    @include sub-title;
  }

  &__locations {
    border-top: $border;
  }
}
</style>
