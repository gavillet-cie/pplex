<template lang="pug">
  .contact
    centered-wrapper
      .contact__title {{ title }}
      locations.contact__locations
</template>

<script>
import { decode } from 'html-entities'
import Locations from '@/components/Locations'
import { get } from '@/utils/api'
import CenteredWrapper from '@/components/CenteredWrapper'
import RowWrapper from '@/components/RowWrapper'

export default {
  components: { Locations, CenteredWrapper, RowWrapper },

  async asyncData({ store, params }) {
    const { language } = params
    store.commit('setBigMenu', true)
    const contact = await get('/contact', language)
    return contact
  },

  head() {
    return {
      title: this.title ? `${decode(this.title)} - PYTHON` : 'PYTHON',
    }
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
