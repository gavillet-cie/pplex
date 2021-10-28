<template lang="pug">
  .about-us
    centered-wrapper
      .about-us__title
        h3 {{ title }}

      .about-us__keywords {{ keywords.join(', ') }}

    centered-wrapper(
      v-for="section in sections"
      :key="section.title"
    )
      span.about-us__section-title {{ section.title }}

      row-wrapper
        div(v-html="section.description")
</template>

<script>
import { get } from '@/utils/api'
import CenteredWrapper from '@/components/CenteredWrapper'
import RowWrapper from '@/components/RowWrapper'

export default {
  component: { CenteredWrapper, RowWrapper },

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

  &__keywords {
    @include row-padding;

    font-size: $medium-font-size;
    padding-bottom: $section-margin-bottom * 0.5;
  }
}
</style>
