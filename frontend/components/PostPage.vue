<template lang="pug">
  .post-page(
    :class="postPageCssClasses"
  )
    slider.post-page__slider(
      v-if="slideOptions && slideOptions.length > 0"
      :slides="slideOptions"
    )

    centered-wrapper
      row.post-page__title
        h3 {{ formatRawText(title) }}

      row.post-page__info
        span {{ info }}

      row
        .post-page__content(
          v-html="content"
        )
</template>

<script>
import { mapGetters } from 'vuex'
import { decodeText, formatRawText, formatHtmlText } from '@/utils/text'
import { getDate } from '@/utils/dates'
import CenteredWrapper from '@/components/CenteredWrapper'
import Post from '@/components/Post'
import Row from '@/components/Row'
import Slider from '@/components/Slider'

export default {
  components: { CenteredWrapper, Row, Post, Slider },

  props: {
    post: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    ...mapGetters(['lang']),
    title() {
      return formatRawText(this.post?.title)
    },

    content() {
      return formatHtmlText(this.post?.content)
    },

    authors() {
      return this.post?.author?.map((it) => it.title).join(', ') || 'PYTHON'
    },

    info() {
      return `${getDate(this.post?.date, this.post?.lang)}, posted by ${
        this.authors
      }`
    },

    slideOptions() {
      return this.post?.slides?.map((it) => ({ image: it })) || []
    },

    postPageCssClasses() {
      return {
        'post-page--minify-title': decodeText(this.post?.title).length > 34,
      }
    },
  },

  methods: {
    formatRawText,
  },
}
</script>

<style lang="scss">
@import '../styles/mixins';

.post-page {
  $n: &;

  padding-bottom: $footer-height;

  &__slider {
    @include header-slider;
  }

  &__title {
    @include sub-title;

    #{$n}--minify-title & {
      font-size: $medium-font-size;
    }
  }

  &__content {
    padding: $section-margin-bottom 0 0;
  }

  &__info {
    font-size: $small-font-size;
  }
}
</style>
