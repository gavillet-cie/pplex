<template lang="pug">
  .home
    slider.home__slider(
      :slides="slides"
    )

    centered-wrapper.home__practice-areas
      nuxt-link(
        v-for="practiceArea in practiceAreas"
        :key="practiceArea.name"
        :to="getUrl(`/our-practice-areas/${practiceArea.name}`, language)"
      )
        row-wrapper.home__practice-area(
        )
          h5 {{ practiceArea.title }}

    centered-wrapper.home__news
      nuxt-link(
        v-for="item in news"
        :key="item.name"
        :to="getUrl(`/news/${item.name}`, language)"
      )
        row-wrapper.home__news-item
          h5 {{ item.title }}
</template>

<script>
import { get, getUrl } from '@/utils/api'
import Slider from '@/components/Slider'
import CenteredWrapper from '@/components/CenteredWrapper'
import RowWrapper from '@/components/RowWrapper'

export default {
  components: { Slider, CenteredWrapper, RowWrapper },

  async asyncData({ params, store }) {
    const { language } = params

    store.commit('setBigMenu', true)

    const [{ homeSlider }, { practiceAreas }, { news }] = await Promise.all([
      get('/', language),
      get('our-practice-areas', language),
      get('news', language),
    ])

    return {
      homeSlider,
      practiceAreas,
      news,
      language,
    }
  },

  computed: {
    slides() {
      return this.homeSlider || []
    },
  },

  methods: {
    getUrl,
  },
}
</script>

<style lang="scss">
.home {
  &__slider {
    width: 100%;
    height: 60vh;
  }

  &__practice-areas,
  &__news {
    padding: 5rem 0;
  }

  &__practice-area,
  &__news-item {
    font-size: 2rem;
  }

  &__news-item {
    color: white;
  }

  &__news {
    background-color: #15497e;
  }
}
</style>
