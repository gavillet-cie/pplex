<template lang="pug">
  .news
    slider.news__slider(
      v-if="slideOptions && slideOptions.length > 0"
      :slides="slideOptions"
    )

    centered-wrapper
      row.news__sub-title
        h3 {{ formatRawText(title) }}

      .news__list-wrapper(
        v-if="newsItems.length > 0"
      )
        filters.news__filters(
          :placeholder="getLabel('search', labels)"
          :title="getLabel('searchNews', labels, 'Search a news')"
          :filters="filterOptions"
          @input="onFilter($event, (filters) => { newsFilters = filters })"
        )

        list.news__list(
          :items="isFiltering(newsFilters) ? filterItems(newsItems, newsFilters) : limitItems(newsItems)"
        )

      .news__list-wrapper(
        v-if="dealsAndCasesItems.length > 0"
      )
        filters.news__filters(
          :placeholder="getLabel('search', labels)"
          :title="getLabel('searchCase', labels, 'Search a case')"
          :filters="filterOptions"
          @input="onFilter($event, (filters) => { deasAndCasesFilters = filters })"
        )

        list.news__list(
          :items="isFiltering(deasAndCasesFilters) ? filterItems(dealsAndCasesItems, deasAndCasesFilters) : limitItems(dealsAndCasesItems)"
        )

      .news__list-wrapper(
        v-if="computedPublications.length > 0"
      )
        filters.news__filters(
          :placeholder="getLabel('search', labels)"
          :title="getLabel('searchPublication', labels, 'Search a publication')"
          :filters="filterOptions"
          @input="onFilter($event, (filters) => { publicationsFilters = filters })"
        )

        list.news__list(
          :items="isFiltering(publicationsFilters) ? filterItems(computedPublications, publicationsFilters) : limitItems(computedPublications)"
        )
</template>

<script>
import { mapGetters } from 'vuex'
import { get, getUrl, getApiUrl } from '@/utils/api'
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
      const [news, practiceAreas, dealsAndCases, publications] =
        await Promise.all([
          get(`/news`, language),
          get('/our-practice-areas', language),
          get('/deals-cases', language),
          get('/publications', language),
        ])

      store.commit('setTitle', news.title)
      store.commit('setPageDescription', news.pageDescription)

      return {
        ...(practiceAreas || []),
        news: news || [],
        dealsAndCases: dealsAndCases || [],
        publications: publications || [],
      }
    } catch (error) {
      store.commit('setError', error)
    }
  },

  data() {
    return {
      newsFilters: {},
      deasAndCasesFilters: {},
      publicationsFilters: {},
    }
  },

  computed: {
    ...mapGetters(['lang', 'labels']),
    newsItems() {
      return this.mapItems(this.news?.posts, 'news')
    },

    dealsAndCasesItems() {
      return this.mapItems(this.dealsAndCases?.posts, 'deals-cases')
    },

    computedPublications() {
      return (this.publications?.publications || []).map((it) => ({
        ...it,
        label: getDate(it.date, this.lang),
        text: it.title,
        url: getApiUrl(it.file.url),
        external: true,
      }))
    },

    filterOptions() {
      return [
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
          id: 'datePicker',
          component: 'date-picker',
          placeholder: getLabel('date', this.labels),
          width: '20%',
          flex: true,
          clearButton: true,
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
    onFilter(filters, fn) {
      const { datePicker, practiceAreas, textInput } = filters
      const inputValue = textInput?.target?.value

      if (fn) {
        fn({
          textInput: inputValue,
          practiceAreas: practiceAreas?.name,
          datePicker,
        })
      }
    },

    mapItems(array, urlSegment) {
      return (array || []).map((it) => ({
        ...it,
        title: formatRawText(it.title),
        text: formatHtmlText(it.content),
        label: getDate(it.date),
        url: getUrl(`${urlSegment}/${it.name}`, this.lang),
      }))
    },

    isFiltering(filters) {
      const { textInput, datePicker, practiceAreas } = filters || {}
      return textInput || datePicker || practiceAreas
    },

    limitItems(array) {
      const clone = [...(array || [])]
      return clone.splice(0, 5)
    },

    filterItems(array, filters) {
      const { textInput, datePicker, practiceAreas } = filters || {}

      return (array || []).filter((post) => {
        const includesName =
          post.title?.toLowerCase().includes(textInput?.toLowerCase()) ||
          post.content?.toLowerCase().includes(textInput?.toLowerCase())

        const date = new Date(post.date)
        const isSameDate =
          date.getFullYear() === datePicker?.getFullYear() &&
          date.getMonth() === datePicker?.getMonth() &&
          date.getDate() === datePicker?.getDate()

        const includesPracticeArea = post.practiceAreas
          ?.map((it) => it.name)
          .includes(practiceAreas)

        return (
          (!textInput || includesName) &&
          (!datePicker || isSameDate) &&
          (!practiceAreas || includesPracticeArea)
        )
      })
    },
  },
}
</script>

<style lang="scss">
@import '../../styles/mixins';

.news {
  $n: &;

  padding-bottom: $footer-height;

  &__slider {
    @include header-slider;
  }

  &__sub-title {
    @include sub-title;
  }

  &__list {
    margin-top: calc(1.35rem * 1.2 + 10px);
    border-top: $border;
  }

  &__list-wrapper {
    border-bottom: $border;

    @for $i from 1 through 10 {
      &:nth-child(#{$i}) {
        #{$n}__filters {
          z-index: 20 - $i;
        }
      }
    }

    & + & {
      margin-top: $section-margin-bottom;
    }
  }

  &__filters {
    position: sticky;
    top: calc($menu-height - $menu-margin);
    z-index: 10;
    background-color: white;
    margin-bottom: -$border-width;
  }
}
</style>
