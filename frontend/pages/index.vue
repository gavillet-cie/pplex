<template lang="pug">
  .home
    slider.home__slider(
      :slides="slides"
      :zoom="true"
    )

</template>

<script>
import { mapGetters } from 'vuex'
import { get, getUrl } from '@/utils/api'
import { showLawyers, filterLawyers } from '@/utils/lawyers'
import { getLabel } from '@/utils/labels'
import Slider from '@/components/Slider'
import CenteredWrapper from '@/components/CenteredWrapper'
import LawyersGrid from '@/components/LawyersGrid'
import AddIcon from '@/components/AddIcon'

export default {
  components: {
    Slider,
    CenteredWrapper,
    LawyersGrid,
    AddIcon,
  },

  async asyncData({ store, params }) {
    const { language } = params
    const home = await get(`/`, language)
    store.commit('setTitle', null)
    store.commit('setPageDescription', home.pageDescription)
    store.commit('setBigMenu', true)
  },

  data() {
    return {
      filters: null,
      homeSlider: [],
      practiceAreas: [],
      news: [],
      language: [],
      lawyers: [],
    }
  },

  async fetch() {
    try {
      const { language } = this.$route.params

      const [{ homeSlider }, { practiceAreas }, { news }, { lawyers }] =
        await Promise.all([
          get('/', language),
          get('our-practice-areas', language),
          get('news', language),
          get('lawyers', language),
        ])

      this.homeSlider = homeSlider
      this.practiceAreas = practiceAreas
      this.news = news
      this.language = language
      this.lawyers = lawyers
    } catch (error) {
      this.$store.commit('setError', error)
    }
  },

  computed: {
    ...mapGetters(['labels']),
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
    getLabel,
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
    height: calc(100vh - 5rem);
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

    &-date {
      position: absolute;
      top: 0;
      left: 0;
      font-size: 1rem;
      margin: $menu-margin 0;
    }

    &-title {
      line-height: 1;
    }

    &-add {
      width: 1rem;
      height: 1rem;
      color: white;
      position: absolute;
      top: 0;
      right: 0;
      margin: $menu-margin 0;
    }
  }

  &__sub-title {
    font-size: $medium-font-size;
    color: $secondary-color;
  }

  @media screen and (max-width: 900px) {
    &__slider {
      width: 100%;
      height: calc(100vh - var(--menu-height));
    }
  }
}
</style>
