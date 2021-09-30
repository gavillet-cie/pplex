<template lang="pug">
  .home
    slider.home__slider(
      :slides="slides"
    )
</template>

<script>
import Slider from '@/components/Slider'

export default {
  components: { Slider },
  async asyncData({ params }) {
    const { language } = params
    const data = await fetch(
      `https://api-pplex.gavillet-cie.com${language ? `/${language}` : '/'}`
    ).then((res) => res.json())
    return data
  },

  computed: {
    slides() {
      return this.homeSlider || []
    },
  },
}
</script>

<style lang="scss">
.home {
  height: calc(100vh - var(--menu-height));

  &__slider {
    width: 100%;
    height: 100%;
  }
}
</style>
