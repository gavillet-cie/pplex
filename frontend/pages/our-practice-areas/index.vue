<template lang="pug">
  .practice-areas
    centered-wrapper
      row-wrapper(
        :padding="false"
      )
        h3.practice-areas__title {{ title }}
        .practice-areas__description(v-html="description")

      .practice-areas__grid
        nuxt-link.practice-areas__item(
          v-for="area in practiceAreas"
          :to="getUrl(`/our-practice-areas/${area.name}`)"
        )
          .practice-areas__item-inner
            span {{ area.title }}
</template>

<script>
import { get, getUrl } from '@/utils/api'
import CenteredWrapper from '@/components/CenteredWrapper'
import RowWrapper from '@/components/RowWrapper'

export default {
  components: { CenteredWrapper, RowWrapper },

  async asyncData({ params, store }) {
    const { language } = params

    store.commit('setBigMenu', true)
    const res = await get('/our-practice-areas', language)
    return res
  },

  methods: {
    getUrl,
  },
}
</script>

<style lang="scss">
.practice-areas {
  &__title {
    font-size: $sub-title-font-size;
    line-height: 1;
    color: $secondary-color;
    padding-top: $section-margin-bottom * 0.5;
  }

  &__description {
    padding: $section-margin-bottom 0;
  }

  &__grid {
    display: flex;
    flex-wrap: wrap;
    margin: -$menu-margin * 0.5;
    margin-top: $section-margin-bottom;
    padding-bottom: $section-margin-bottom;
  }

  &__item {
    width: 25%;
    height: 5rem;
    padding: $menu-margin * 0.5;
  }

  &__item-inner {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: $main-color;

    span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80%;
      text-align: center;
      color: white;
    }

    &:hover {
      background-color: $link-color;
    }
  }
}
</style>
