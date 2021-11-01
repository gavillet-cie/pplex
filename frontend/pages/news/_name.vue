<template lang="pug">
  .new
    centered-wrapper
      .new__title
        h2 {{ title }}

      .new__info
        span {{ info }}

      row-wrapper
        .new__content(
          v-html="content"
        )
</template>

<script>
import { decode } from 'html-entities'
import { mapGetters } from 'vuex'
import { get } from '@/utils/api'
import { getDate } from '@/utils/dates'
import CenteredWrapper from '@/components/CenteredWrapper'
import Post from '@/components/Post'
import RowWrapper from '@/components/RowWrapper'

export default {
  components: { CenteredWrapper, RowWrapper, Post },

  async asyncData({ store, params }) {
    const { language, name } = params
    store.commit('setBigMenu', true)
    const post = await get(`/news/${name}`, language)
    return post
  },

  head() {
    return {
      title: this.title ? `${decode(this.title)} - PYTHON` : 'PYTHON',
    }
  },

  computed: {
    ...mapGetters(['lang']),
    authors() {
      return this.author?.map((it) => it.title).join(', ')
    },

    info() {
      return `${getDate(this.date, this.lang)}, posted by ${this.authors}`
    },
  },
}
</script>

<style lang="scss">
@import '../../styles/mixins';

.new {
  &__title {
    @include sub-title;
  }

  &__info {
    @include row-padding;
  }

  &__content {
    padding: $section-margin-bottom 0;
  }
}
</style>
