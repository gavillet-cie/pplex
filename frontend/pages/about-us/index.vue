<template lang="pug">
  .about-us
    centered-wrapper
      row-wrapper.about-us__title(
        :border="false"
        :padding="false"
      )
        h2 {{ title }}

      .about-us__keywords
        row-wrapper.about-us__keyword(
          v-for="(keyword, index) in keywords"
          :key="index"
          :border="false"
          :padding="false"
        )
          span {{ keyword }}

    centered-wrapper(
      v-for="section in sections"
      :key="section.title"
    )
      row-wrapper
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
    store.commit('setBigMenu', false)
    const about = await get('/about-us', language)
    return about
  },
}
</script>

<style lang="scss">
.about-us {
  &__title,
  &__section-title {
    color: $secondary-color;
  }

  &__title {
    font-size: 4rem;
    padding-top: 2rem;
  }

  &__keyword,
  &__section-title {
    font-size: 2rem;
  }

  &__keywords {
    padding: 2rem 0;
  }
}
</style>
