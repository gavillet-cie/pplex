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
      .slider__image(
        :style="getSliderImageCssStyle(slide.image)"
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
      isSliding: false,
      interval: null,
    }
  },

  computed: {
    currentSlides() {
      return [this.slides[this.slideIndex]].filter((it) => it)
    },

    sliderCssClasses() {
      return {
        'slider--is-sliding': this.isSliding,
      }
    },
  },

  mounted() {
    this.resetInterval()
  },

  methods: {
    getImageUrl,
    getImageCssStyle,
    formatRawText,
    formatHtmlText,

    resetInterval() {
      clearInterval(this.interval)
      this.interval = setInterval(() => {
        this.nextSlide()
      }, 7000)
    },

    getSliderImageCssStyle(image) {
      return {
        backgroundImage: `url(${getImageUrl(image?.url)})`,
      }
    },

    nextSlide() {
      this.slideIndex++
      if (this.slideIndex > this.slides.length - 1) {
        this.slideIndex = 0
      }

      this.isSliding = true
      setTimeout(() => {
        this.isSliding = false
      }, 2000)
    },

    onClick() {
      if (this.isSliding) return
      this.resetInterval()
      this.nextSlide()
    },
  },
}
</script>

<style lang="scss">
.slider {
  $s: &;

  user-select: none;
  position: relative;
  overflow: hidden;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  backface-visibility: hidden;

  &-enter-active,
  &-leave-active {
    transition: all 1.5s 0.2s cubic-bezier(0.65, 0, 0.35, 1);
  }

  &-enter-active {
    position: relative;
    left: initial !important;
    right: 0 !important;

    #{$s}__title {
      transition: filter 1.8s 1s;
    }

    &::before {
      opacity: 1 !important;
    }
  }

  &-enter {
    left: initial !important;
    right: 0 !important;
    width: 0% !important;

    &::before {
      opacity: 1 !important;
    }

    #{$s}__title {
      filter: blur(20px);
      opacity: 0;
    }
  }

  &-leave-to {
    width: 0% !important;

    #{$s}__title {
      filter: blur(20px);
      opacity: 0;
    }
  }

  &__slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    clip: rect(0, 100vw, calc(100vh - 5rem), 0);

    &::before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: $menu-margin;
      background-color: white;
      height: 100%;
      opacity: 0;
      transition: opacity 0.2s;
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    background-size: 100vw cover;
    background-position: 50% 50%;
  }

  &__title {
    color: white;
    font-size: 8rem;
    position: fixed;
    z-index: 10;
    top: calc(50vh + ((1 - var(--scroll-percent)) * 16.5vh));
    left: 50%;
    width: 80%;
    text-align: center;
    transform: translate(-50%, -50%);
    line-height: 1;
    transition: filter 1.5s, opacity 1s;
  }

  @media screen and (max-width: 900px) {
    &__title {
      color: white;
      font-size: $medium-font-size;
      position: fixed;
      top: calc(50vh + ((1 - var(--scroll-percent)) * 16.5vh));
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
