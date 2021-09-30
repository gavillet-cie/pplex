<template lang="pug">
  .home
    slider.home__slider(
      :slides="slides"
    )
    .home__practice-areas
      .home__practice-area(
        v-for="practiceArea in practiceAreas"
      )
        h5 {{ practiceArea.title }}
</template>

<script>
import Slider from '@/components/Slider'

export default {
  components: { Slider },
  async asyncData({ params }) {
    const { language } = params

    const [home, { practiceAreas }] = await Promise.all([
      fetch(
        `https://api-pplex.gavillet-cie.com${language ? `/${language}` : '/'}`
      ).then((res) => res.json()),
      fetch(
        `https://api-pplex.gavillet-cie.com${
          language ? `/${language}` : '/domaines-de-pratique/'
        }`
      ).then((res) => res.json()),
    ])

    return {
      home,
      practiceAreas,
    }
  },

  computed: {
    slides() {
      return this.home?.homeSlider || []
    },
  },
}
</script>

<style lang="scss">
.home {
  &__slider {
    width: 100%;
    height: 60vh;
  }

  &__practice-areas {
    margin: auto;
    padding: 10rem 0;
    max-width: 60rem;
  }

  &__practice-area {
    border-bottom: solid 1px black;
    font-size: 2rem;
    padding: 1rem 10rem;
  }
}
</style>
