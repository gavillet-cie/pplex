<template lang="pug">
  .news
    slider.news__slider(
      v-if="slideOptions && slideOptions.length > 0"
      :slides="slideOptions"
    )

    centered-wrapper
      row.news__sub-title
        h3 {{ formatRawText(title) }}

      filters.news__filters(
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
import { mapGetters } from 'vuex'
import { get, getUrl } from '@/utils/api'
import { formatRawText, formatHtmlText } from '@/utils/text'
import { getLabel } from '@/utils/labels'
import { getDate } from '@/utils/dates'
import CenteredWrapper from '@/components/CenteredWrapper'
import Post from '@/components/Post'
import List from '@/components/List'
import Filters from '@/components/Filters'
import Slider from '@/components/Slider'

export default {
  components: { CenteredWrapper, Post, List, Filters, Slider },

  async asyncData({ store, params }) {
    try {
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
    } catch (error) {
      store.commit('setError', error)
    }
  },

  data() {
    return {
      filters: {},
    }
  },

  head() {
    return {
      title: this.title ? `${formatRawText(this.title)} - PYTHON` : 'PYTHON',
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
          title: formatRawText(it.title),
          text: formatHtmlText(it.content),
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

    slideOptions() {
      return this.slides?.map((it) => ({ image: it }))
    },
  },

  methods: {
    getLabel,
    formatRawText,
    formatHtmlText,
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
  &__slider {
    @include header-slider;
  }

  &__sub-title {
    @include sub-title;
  }

  &__list {
    margin-top: 2rem;
    border-top: $border;
  }

  &__filters {
    position: sticky;
    top: calc($menu-height - $menu-margin);
    z-index: 10;
    background-color: white;
  }
}
</style>
