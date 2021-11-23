<template lang="pug">
  .publications
    centered-wrapper
      row.publications__sub-title
        h2 {{ title }}

      list.publications__list(
        :items="computedPublications"
      )

</template>

<script>
import { mapGetters } from 'vuex'
import { decodeText } from '../../utils/text'
import { get, getApiUrl } from '@/utils/api'
import { getDate } from '@/utils/dates'
import CenteredWrapper from '@/components/CenteredWrapper'
import Post from '@/components/Post'
import Row from '@/components/Row'

export default {
  components: { CenteredWrapper, Row, Post },

  async asyncData({ store, params }) {
    const { language } = params
    store.commit('setBigMenu', true)
    const [publications] = await Promise.all([get(`/publications`, language)])
    store.commit('setTitle', decodeText(publications.title))
    store.commit('setPageDescription', publications.pageDescription)
    return {
      ...publications,
    }
  },

  computed: {
    ...mapGetters(['lang']),
    computedPublications() {
      return (this.publications || []).map((it) => ({
        label: getDate(it.date, this.lang),
        text: it.title,
        url: getApiUrl(it.file.url),
        external: true,
      }))
    },
  },
}
</script>

<style lang="scss">
@import '../../styles/mixins';

.publications {
  padding-bottom: $footer-height;

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
