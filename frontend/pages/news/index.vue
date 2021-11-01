<template lang="pug">
  .news
    centered-wrapper
      h2.news__sub-title {{ title }}

      filters(
        :placeholder="getLabel('search', labels)"
        :title="getLabel('searchNews', labels)"
        :filters="filterOptions"
        @input="onFilter"
      )

      list.news__list(
        :items="newsItems"
      )
</template>

<script>
import { decode } from 'html-entities'
import { mapGetters } from 'vuex'
import { get, getUrl } from '@/utils/api'
import { getLabel } from '@/utils/labels'
import { getDate } from '@/utils/dates'
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

  data() {
    return {
      filters: {},
    }
  },

  head() {
    return {
      title: this.title ? `${decode(this.title)} - PYTHON` : 'PYTHON',
    }
  },

  computed: {
    ...mapGetters(['lang', 'labels']),
    newsItems() {
      const { textInput, datePicker, practiceAreas } = this.filters

      return this.news
        .filter((news) => {
          const includesName =
            news.title.toLowerCase().includes(textInput?.toLowerCase()) ||
            news.content.toLowerCase().includes(textInput?.toLowerCase())

          const date = new Date(news.date)
          const isSameDate =
            date.getFullYear() === datePicker?.getFullYear() &&
            date.getMonth() === datePicker?.getMonth() &&
            date.getDate() === datePicker?.getDate()

          const includesPracticeArea = news.practiceAreas
            ?.map((it) => it.name)
            .includes(practiceAreas)

          return (
            (!textInput || includesName) &&
            (!datePicker || isSameDate) &&
            (!practiceAreas || includesPracticeArea)
          )
        })
        .map((it) => ({
          title: it.title,
          text: it.content,
          label: getDate(it.date),
          url: getUrl(`news/${it.name}`, this.lang),
        }))
    },

    filterOptions() {
      return [
        {
          id: 'datePicker',
          component: 'date-picker',
          placeholder: getLabel('date', this.labels),
          width: '20%',
          flex: true,
        },
        {
          id: 'practiceAreas',
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
          id: 'textInput',
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
      const { datePicker, practiceAreas, textInput } = filters
      const inputValue = textInput?.target?.value

      this.filters = {
        textInput: inputValue,
        practiceAreas: practiceAreas?.name,
        datePicker,
      }
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
