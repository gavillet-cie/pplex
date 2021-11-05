<template lang="pug">
  .contact
    centered-wrapper
      .contact__title {{ formatRawText(title) }}
      locations.contact__locations
</template>

<script>
import Locations from '@/components/Locations'
import { get } from '@/utils/api'
import CenteredWrapper from '@/components/CenteredWrapper'
import { formatRawText, formatHtmlText } from '@/utils/text'

export default {
  components: { Locations, CenteredWrapper },

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
