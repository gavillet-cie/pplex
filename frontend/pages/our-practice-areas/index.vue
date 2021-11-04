<template lang="pug">
  .practice-areas
    centered-wrapper
      row.practice-areas__title
        h3 {{ title }}

      row
        .practice-areas__description(v-html="description")

      .practice-areas__grid
        .practice-areas__grid-inner
          nuxt-link.practice-areas__item(
            v-for="(area, index) in practiceAreas"
            :key="index"
            :to="getUrl(`/our-practice-areas/${area.name}`)"
          )
            .practice-areas__item-inner
              span(v-html="area.title")
</template>

<script>
import { decode } from 'html-entities'
import { get, getUrl } from '@/utils/api'
import CenteredWrapper from '@/components/CenteredWrapper'
import Row from '@/components/Row'

export default {
  components: { CenteredWrapper, Row },

  async asyncData({ params, store }) {
    const { language } = params

    store.commit('setBigMenu', true)
    const res = await get('/our-practice-areas', language)
    return res
  },

  head() {
    return {
      title: this.title ? `${decode(this.title)} - PYTHON` : 'PYTHON',
    }
  },

  methods: {
    getUrl,
  },
}
</script>

<style lang="scss">
@import '../../styles/mixins';

.practice-areas {
  &__title {
    @include sub-title;
  }

  &__grid {
    padding: $section-margin-bottom 0;
    overflow: hidden;
  }

  &__grid-inner {
    display: flex;
    flex-wrap: wrap;
    margin: -$menu-margin;
  }

  &__item {
    width: 25%;
    height: 7rem * $main-line-height + 1rem;
    padding: $menu-margin;
  }

  &__item-inner {
    border-top: $border;
    width: 100%;
    height: 100%;
    position: relative;
    padding: $menu-margin $menu-margin * 2;

    &:hover {
      border-top: $border-width $border-style $main-color;
      background-color: $main-color;
    }

    span {
      display: block;
    }
  }

  @media screen and (max-width: 900px) {
    &__item {
      width: 50%;
    }
  }
}
</style>
