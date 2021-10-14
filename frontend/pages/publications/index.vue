<template lang="pug">
  .publications
    centered-wrapper
      row-wrapper
        h2.publications__sub-title {{ title }}

      .publications__posts
        post.publications__post(
          v-for="(item, index) in publications"
          v-bind="item"
          mode="publications"
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
    const [publications] = await Promise.all([get(`/publications`, language)])
    return {
      ...publications,
    }
  },
}
</script>

<style lang="scss">
@import '../../styles/mixins';

.publications {
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
