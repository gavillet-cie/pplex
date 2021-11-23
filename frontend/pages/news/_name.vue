<template lang="pug">
  .new(
    :class="newCssClasses"
  )
    slider.new__slider(
      v-if="slideOptions && slideOptions.length > 0"
      :slides="slideOptions"
    )

    centered-wrapper
      row.new__title
        h3 {{ title }}

      row.new__info
        span {{ info }}

      row
        .new__content(
          v-html="content"
        )
</template>

<script>
import { mapGetters } from 'vuex'
import { get } from '@/utils/api'
import { decodeText } from '@/utils/text'
import { getDate } from '@/utils/dates'
import CenteredWrapper from '@/components/CenteredWrapper'
import Post from '@/components/Post'
import Row from '@/components/Row'
import Slider from '@/components/Slider'

export default {
  components: { CenteredWrapper, Row, Post, Slider },

  async asyncData({ store, params }) {
    try {
      const { language, name } = params
      store.commit('setBigMenu', true)
      const post = await get(`/news/${name}`, language)
      store.commit('setTitle', post.title)
      store.commit('setPageDescription', post.content)
      return post
    } catch (error) {
      store.commit('setError', error)
    }
  },

  computed: {
    ...mapGetters(['lang']),
    authors() {
      return this.author?.map((it) => it.title).join(', ') || 'PYTHON'
    },

    info() {
      return `${getDate(this.date, this.lang)}, posted by ${this.authors}`
    },

    slideOptions() {
      return this.slides?.map((it) => ({ image: it })) || []
    },

    newCssClasses() {
      return {
        'new--minify-title': decodeText(this.title).length > 34,
      }
    },
  },
}
</script>

<style lang="scss">
@import '../../styles/mixins';

.new {
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
