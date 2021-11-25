<template lang="pug">
  .practice-areas
    slider.practice-areas__slider(
      v-if="slideOptions && slideOptions.length > 0"
      :slides="slideOptions"
    )

    centered-wrapper
      row.practice-areas__title
        h3 {{ formatRawText(title) }}

      row
        .practice-areas__description(
          v-html="formatHtmlText(description)"
        )

      .practice-areas__grid
        .practice-areas__grid-inner
          nuxt-link.practice-areas__item(
            v-for="(area, index) in practiceAreas"
            :key="index"
            :to="getUrl(`/our-practice-areas/${area.name}`, lang)"
          )
            .practice-areas__item-inner
              span {{ formatRawText(area.title) }}
</template>

<script>
import { mapGetters } from 'vuex'
import { get, getUrl } from '@/utils/api'
import { formatRawText, formatHtmlText } from '@/utils/text'
import CenteredWrapper from '@/components/CenteredWrapper'
import Row from '@/components/Row'
import Slider from '@/components/Slider'

export default {
  components: { CenteredWrapper, Row, Slider },

  async asyncData({ params, store }) {
    try {
      const { language } = params

      store.commit('setBigMenu', true)
      const res = await get('/our-practice-areas', language)
      store.commit('setTitle', res.title)
      store.commit('setPageDescription', res.description)
      return res
    } catch (error) {
      store.commit('setError', error)
    }
  },

  computed: {
    ...mapGetters(['lang']),

    slideOptions() {
      return this.slides?.map((it) => ({ image: it }))
    },
  },

  methods: {
    getUrl,
    formatRawText,
    formatHtmlText,
  },
}
</script>

<style lang="scss">
@import '../../styles/mixins';

.practice-areas {
  padding-bottom: $footer-height;

  &__slider {
    @include header-slider;
  }

  &__title {
    @include sub-title;
  }

  &__grid {
    padding: $section-margin-bottom 0 0;
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

    span {
      display: block;
      color: $main-color;
    }

    &:hover {
      border-top: $border-width $border-style $main-color;
      background-color: $main-color;

      span {
        color: white;
      }
    }
  }

  @media screen and (max-width: 900px) {
    &__item {
      width: 50%;
    }
  }

  @media screen and (max-width: 500px) {
    &__item {
      width: 100%;
    }
  }
}
</style>
