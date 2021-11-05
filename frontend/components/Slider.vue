<template lang="pug">
  transition-group.slider(
    tag="div"
    name="slider"
    @click.native="onClick"
  )
    .slider__slide(
      v-for="slide in currentSlides"
      :key="slideIndex"
    )
      span.slider__title {{ formatRawText(slide.title) }}
      img(
        :src="getImageUrl(slide.image.url)"
        :style="getImageCssStyle(slide.image)"
      )
</template>

<script>
import { getImageUrl } from '@/utils/api'
import { getImageCssStyle } from '@/utils/images'
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
      return [this.slides[this.slideIndex]].filter((it) => it)
    },
  },

  mounted() {
    setInterval(() => {
      this.nextSlide()
    }, 5000)
  },

  methods: {
    getImageUrl,
    getImageCssStyle,
    formatRawText,
    formatHtmlText,

    nextSlide() {
      this.slideIndex++
      if (this.slideIndex > this.slides.length - 1) {
        this.slideIndex = 0
      }
    },

    onClick() {
      this.nextSlide()
    },
  },
}
</script>

<style lang="scss">
.slider {
  user-select: none;
  position: relative;
  overflow: hidden;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  backface-visibility: hidden;

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
    width: 100%;
    height: 100%;
    overflow: hidden;
    clip: rect(0, 100vw, calc(100vh - 5rem), 0);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__title {
    color: white;
    font-size: 8rem;
    position: fixed;
    top: calc(50vh + ((1 - var(--scroll-percent)) * 16.5vh));
    left: 50%;
    width: 80%;
    text-align: center;
    transform: translate(-50%, -50%);
    line-height: 1;
  }

  @media screen and (max-width: 900px) {
    &__title {
      color: white;
      font-size: 6rem;
      position: fixed;
      top: calc(50vh + var(--menu-height));
      left: 50%;
      width: 80%;
      text-align: center;
      transform: translate(-50%, -50%);
      line-height: 1;
    }
    &__slide {
      clip: rect(0, 100vw, calc(100vh - var(--menu-height)), 0);
    }
  }
}
</style>
