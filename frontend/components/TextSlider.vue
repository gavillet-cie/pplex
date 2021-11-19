<template lang="pug">
  transition-group.text-slider(
    tag="div"
    name="text-slider"
  )
    .text-slider__slide(
      v-for="slide in currentSlides"
      :key="slideIndex"
    )
      div(v-html="formatHtmlText(slide)")
</template>

<script>
import { formatRawText, formatHtmlText } from '@/utils/text'

export default {
  props: {
    slides: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      slideIndex: 0,
    }
  },

  computed: {
    currentSlides() {
      return [this.slides[this.slideIndex]]
    },
  },

  mounted() {
    setInterval(() => {
      this.slideIndex++
      if (this.slideIndex > this.slides.length - 1) {
        this.slideIndex = 0
      }
    }, 5000)
  },

  methods: {
    formatRawText,
    formatHtmlText,
  },
}
</script>

<style lang="scss">
.text-slider {
  position: relative;
  width: 100%;

  &-enter-active,
  &-leave-active {
    transition: all 1s;
  }
  &-enter,
  &-leave-to {
    opacity: 0;
  }

  &__slide {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(0, -50%);
    width: 100%;
    height: min-content;
    color: $secondary-color;
    padding: 0;
    line-clamp: 20;
    display: -webkit-box;
    -webkit-line-clamp: 20;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  @media screen and (max-width: 900px) {
    &__slide {
      line-clamp: 8;
      -webkit-line-clamp: 8;
    }
  }
}
</style>
