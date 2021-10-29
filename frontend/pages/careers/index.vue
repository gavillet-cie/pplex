<template lang="pug">
  .careers
    centered-wrapper
      .careers__title {{ title }}
      .careers__description(
        v-html="description"
      )

      list.careers__vacancies(
        :items="vacancyItems"
      )
</template>

<script>
import Locations from '@/components/Locations'
import { get } from '@/utils/api'
import CenteredWrapper from '@/components/CenteredWrapper'
import RowWrapper from '@/components/RowWrapper'
import List from '@/components/List'

export default {
  components: { Locations, CenteredWrapper, RowWrapper, List },

  async asyncData({ store, params }) {
    const { language } = params
    store.commit('setBigMenu', true)
    const careers = await get('/careers', language)
    return careers
  },

  head() {
    return {
      title: `${this.title} - PYTHON`,
    }
  },

  computed: {
    vacancyItems() {
      return this.currentVacancies.map((it) => ({
        label: it.title,
        text: it.description,
      }))
    },
  },
}
</script>

<style lang="scss">
@import '../../styles/mixins';

.careers {
  &__title {
    @include sub-title;

    border-bottom: $border;
  }

  &__description {
    @include row-padding;
    @include text-padding;
  }

  &__vacancies {
    border-top: $border;
  }
}
</style>
