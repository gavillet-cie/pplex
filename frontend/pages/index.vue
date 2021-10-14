<template lang="pug">
  .home
    slider.home__slider(
      :slides="slides"
    )

    centered-wrapper.home__practice-areas
      row-wrapper.home__sub-title.home--border-black
        h5 Nos domaines de pratique

      nuxt-link(
        v-for="practiceArea in practiceAreas"
        :key="practiceArea.name"
        :to="getUrl(`/our-practice-areas/${practiceArea.name}`, language)"
      )
        row-wrapper.home__practice-area
          h5 {{ practiceArea.title }}

    centered-wrapper.home__lawyers
      lawyers-filter(
        @input="onFilter"
      )

      lawyers-grid.home__lawyers-grid(
        v-if="showLawyers"
        :lawyers="filteredLawyers"
      )

    centered-wrapper.home__news
      row-wrapper.home__sub-title.home--border-white
        h5 Nouvelles récentes

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
import { showLawyers, filterLawyers } from '@/utils/lawyers'
import Slider from '@/components/Slider'
import CenteredWrapper from '@/components/CenteredWrapper'
import RowWrapper from '@/components/RowWrapper'
import LawyersGrid from '@/components/LawyersGrid'
import LawyersFilter from '@/components/LawyersFilter'

export default {
  components: {
    Slider,
    CenteredWrapper,
    RowWrapper,
    LawyersGrid,
    LawyersFilter,
  },

  async asyncData({ params, store }) {
    const { language } = params

    store.commit('setBigMenu', true)

    const [{ homeSlider }, { practiceAreas }, { news }, { lawyers }] =
      await Promise.all([
        get('/', language),
        get('our-practice-areas', language),
        get('news', language),
        get('lawyers', language),
      ])

    return {
      homeSlider,
      practiceAreas,
      news,
      language,
      lawyers,
    }
  },

  data() {
    return {
      filters: null,
    }
  },

  computed: {
    slides() {
      return this.homeSlider || []
    },

    showLawyers() {
      return showLawyers(this.filters)
    },

    filteredLawyers() {
      return filterLawyers(this.lawyers, this.filters)
    },
  },

  methods: {
    getUrl,
    onFilter(filters) {
      this.filters = filters
    },
  },
}
</script>

<style lang="scss">
.home {
  &--border-black {
    border-color: black;
  }

  &--border-white {
    border-color: white;
  }

  &__slider {
    width: 100%;
    height: calc(100vh - var(--max-menu-height));
  }

  &__practice-areas {
    margin: $section-margin-bottom 0;
  }

  &__practice-area,
  &__news-item {
    font-size: $medium-font-size;
    color: black;
  }

  &__lawyers {
    margin-bottom: $section-margin-bottom;
  }

  &__lawyers-grid {
    margin-top: $menu-margin;
  }

  &__news-item {
    color: white;
  }

  &__news {
    background-color: $main-color;
    padding: $section-margin-bottom 0;
  }

  &__sub-title {
    font-size: $medium-font-size;
    color: $secondary-color;
  }
}
</style>
