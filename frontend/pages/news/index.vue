<template lang="pug">
  .news
    centered-wrapper
      row-wrapper
        h2.news__sub-title {{ title }}

      filters(
        placeholder="Search"
        :title="getLabel('searchNews', labels)"
        :filters="filters"
        @input="onFilter"
      )

      list.news__list(
        :items="newsItems"
      )
</template>

<script>
import { mapGetters } from 'vuex'
import { get, getUrl } from '@/utils/api'
import { getLabel } from '@/utils/labels'
import CenteredWrapper from '@/components/CenteredWrapper'
import Post from '@/components/Post'
import RowWrapper from '@/components/RowWrapper'
import List from '@/components/List'
import Filters from '@/components/Filters'

export default {
  components: { CenteredWrapper, RowWrapper, Post, List, Filters },

  async asyncData({ store, params }) {
    const { language } = params
    store.commit('setBigMenu', true)
    const [news, practiceAreas] = await Promise.all([
      get(`/news`, language),
      get('/our-practice-areas', language),
    ])

    return {
      ...practiceAreas,
      ...news,
    }
  },

  computed: {
    ...mapGetters(['lang', 'labels']),
    newsItems() {
      return this.news.map((it) => ({
        title: it.title,
        text: it.content,
        date: it.date,
        url: getUrl(`news/${it.name}`, this.lang),
      }))
    },

    filters() {
      return [
        {
          id: 'date-picker',
          component: 'date-picker',
          placeholder: getLabel('date', this.labels),
          width: '20%',
          flex: true,
        },
        {
          id: 'practice-areas',
          component: 'dropdown',
          placeholder: getLabel('practiceAreas', this.labels),
          options: this.practiceAreas.map((it) => ({
            label: it.title,
            name: it.name,
          })),
          width: '30%',
          flex: true,
        },
        {
          id: 'text-input',
          component: 'input',
          type: 'text',
          placeholder: getLabel('search', this.labels),
          width: '50%',
          flex: false,
        },
      ]
    },
  },

  methods: {
    getLabel,
    onFilter(filters) {
      console.log(filters)
    },
  },
}
</script>

<style lang="scss">
@import '../../styles/mixins';

.news {
  &__sub-title {
    @include sub-title;
  }

  &__list {
    margin-top: 2rem;
    border-top: $border;
  }
}
</style>
