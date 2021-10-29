<template lang="pug">
  .about-us
    centered-wrapper
      .about-us__title
        h3(
          v-html="title"
        )

      .about-us__description(
        v-html="description"
      )

      .about-us__section-title Swisslex
      .about-us__swisslex(
        v-html="swisslex"
      )

      .about-us__section-title Nos bureaux
      locations.about-us__locations

      .about-us__section-title Classements
      rankings.about-us__rankings(
        :rankings="rankings"
      )
</template>

<script>
import { get } from '@/utils/api'
import CenteredWrapper from '@/components/CenteredWrapper'
import RowWrapper from '@/components/RowWrapper'
import Locations from '@/components/Locations'
import Rankings from '@/components/Rankings'

export default {
  component: { CenteredWrapper, RowWrapper, Locations, Rankings },

  async asyncData({ store, params }) {
    const { language } = params
    store.commit('setBigMenu', true)
    const about = await get('/about-us', language)
    return about
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

  &__title {
    @include sub-title;

    text-align: left;
  }

  &__section-title {
    @include section-title;
    @include row-padding;
  }

  &__description,
  &__swisslex {
    @include row-padding;
    @include big-text-padding;
  }

  &__locations,
  &__rankings {
    margin-bottom: $section-margin-bottom;
  }
}
</style>
