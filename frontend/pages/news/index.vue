<template lang="pug">
  .news
    centered-wrapper
      row-wrapper
        h2.news__sub-title {{ title }}

      .news__posts
        post.news__post(
          v-for="(newItem, index) in news"
          v-bind="newItem"
          :key="index"
        )

</template>

<script>
import { get } from '@/utils/api'
import CenteredWrapper from '@/components/CenteredWrapper'
import Post from '@/components/Post'
import RowWrapper from '@/components/RowWrapper'

export default {
  components: { CenteredWrapper, RowWrapper, Post },

  async asyncData({ store, params }) {
    const { language } = params
    store.commit('setBigMenu', true)
    const [news] = await Promise.all([get(`/news`, language)])
    return {
      ...news,
    }
  },
}
</script>

<style lang="scss">
@import '../../styles/mixins';

.news {
  &__sub-title {
    @include sub-title;
  }

  &__posts {
    @include posts;
  }

  &__post {
    @include post;
  }
}
</style>
