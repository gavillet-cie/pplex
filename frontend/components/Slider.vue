<template lang="pug">
  transition-group.slider(
    tag="div"
    name="slider"
    @click.native="onClick"
    :class="sliderCssClasses"
  )
    .slider__slide(
      v-for="slide in currentSlides"
      :key="slideIndex"
    )
      span.slider__title {{ formatRawText(slide.title) }}
      .slider__image
        .slider__image-content(
          :style="getSliderImageCssStyle(slide.image)"
        )
</template>

<script>
import { getImageUrl } from '@/utils/api'
import { getImageCssStyle } from '@/utils/images'
import { formatRawText, formatHtmlText } from '@/utils/text'

export default {
  props: {
    zoom: {
      type: Boolean,
      default: false,
    },

    slides: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      isMounting: true,
      slideIndex: 0,
      isSliding: false,
      interval: null,
      ratio: null,
    }
  },

  computed: {
    currentSlides() {
      return [this.slides[this.slideIndex]].filter((it) => it)
    },

    sliderCssClasses() {
      return {
        'slider--mounting': this.isMounting,
        'slider--is-sliding': this.isSliding,
        'slider--zoom': this.zoom,
      }
    },
  },

  mounted() {
    this.resetInterval()
    this.updateRatio()
    window.addEventListener('resize', this.updateRatio)
    this.isMounting = false
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.updateRatio)
  },

  methods: {
    getImageUrl,
    getImageCssStyle,
    formatRawText,
    formatHtmlText,

    updateRatio() {
      this.ratio = this.$el.clientWidth / this.$el.clientHeight
    },

    resetInterval() {
      clearInterval(this.interval)
      this.interval = setInterval(() => {
        this.nextSlide()
      }, 5000)
    },

    getSliderImageCssStyle(image) {
      const x = image?.focus.left || 50
      const y = image?.focus.top || 50
      const imageRatio = image?.width / image?.height

      let backgroundSize = null

      if (this.ratio) {
        if (imageRatio > this.ratio) {
          backgroundSize = 'auto 100%'
        } else {
          backgroundSize = '100vw auto'
        }
      }

      return {
        backgroundImage: `url(${getImageUrl(image?.url)})`,
        backgroundPosition: `${x}% ${y}%`,
        backgroundSize,
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
    transition: all 1.2s 0.2s cubic-bezier(0.65, 0, 0.35, 1);
  }

  &-enter-active {
    position: relative;
    left: initial !important;
    right: 0 !important;

    #{$s}__title {
      transition: filter 1.2s 0.8s;
    }

    &::before {
      opacity: 1 !important;
    }
  }

  &-enter {
    left: initial !important;
    right: 0% !important;
    width: 0% !important;

    &::before {
      opacity: 1 !important;
    }

    #{$s}__title {
      filter: blur(20px);
      opacity: 0;
    }

    #{$s}__image-content {
      transform: translate(-50%, -50%) scale(1) !important;
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
      z-index: 10;
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
    position: relative;
    width: 100%;
    height: 100%;
  }

  &__image-content {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: 50% 50%;
    transform: translate(-50%, -50%);
    transition: transform 10s linear;

    #{$s}--zoom & {
      transform: translate(-50%, -50%) scale(1.15);
    }

    #{$s}--mounting & {
      transform: translate(-50%, -50%) scale(1);
    }
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
      top: 50vh;
      left: 50%;
      width: 80%;
      text-align: center;
      transform: translate(-50%, -50%);
      line-height: 1;
    }

    &__slide {
      clip: rect(0, 100vw, calc(100vh - var(--menu-height)), 0);

      &::before {
        width: $menu-margin * 0.5;
      }
    }
  }
}
</style>
