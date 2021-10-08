<template lang="pug">
  transition-group.slider(
    tag="div"
    name="slider"
  )
    .slider__slide(
      v-for="slide in currentSlides"
      :key="slideIndex"
    )
      span.slider__title {{ slide.title }}
      img(:src="getImageUrl(slide.image)")
</template>

<script>
import { getImageUrl } from '@/utils/images'
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
    getImageUrl,
  },
}
</script>

<style lang="scss">
.slider {
  position: relative;
  overflow: hidden;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  backface-visibility: hidden;

  .slider-enter-active,
  .slider-leave-active {
    transition: all 1s;
  }
  .slider-enter,
  .slider-leave-to {
    opacity: 0;
  }

  &__slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    clip: rect(0, 100vw, 60vh, 0);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__title {
    font-family: $theinhardt;
    color: white;
    font-size: 10rem;
    position: fixed;
    top: 70vh;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
