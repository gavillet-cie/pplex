<template lang="pug">
  .news
    slider.news__slider(
      v-if="slideOptions && slideOptions.length > 0"
      :slides="slideOptions"
    )

    centered-wrapper
      row.news__sub-title(
        v-if="newsItems.length > 0"
        v-animate
      )
        h1 {{ formatRawText(news.title) }}

      .news__list-wrapper(
        v-if="newsItems.length > 0"
        v-animate
        :class="getListCssClasses(newsItems, newsLimit, newsFilters)"
      )
        filters.news__filters(
          :placeholder="getLabel('search', labels)"
          :title="getLabel('searchNews', labels, 'Search a news')"
          :filters="filterOptions"
          @input="onFilter($event, (filters) => { newsFilters = filters })"
        )

        list.news__list(
          :items="getListItems(newsItems, newsFilters, newsLimit)"
        )

        .news__load-more(
          v-animate
          @click="newsLimit = null"
        ) {{ getLabel('load-more', labels, 'Load More') }}

      row.news__sub-title(
        v-if="dealsAndCasesItems.length > 0"
        v-animate
      )
        h3 {{ formatRawText(dealsAndCases.title) }}

      .news__list-wrapper(
        v-if="dealsAndCasesItems.length > 0"
        v-animate
        :class="getListCssClasses(dealsAndCasesItems, dealsAndCasesLimit, dealsAndCasesFilters)"
      )
        filters.news__filters(
          :placeholder="getLabel('search', labels)"
          :title="getLabel('searchCase', labels, 'Search a case')"
          :filters="filterOptions"
          @input="onFilter($event, (filters) => { dealsAndCasesFilters = filters })"
        )

        list.news__list(
          :items="getListItems(dealsAndCasesItems, dealsAndCasesFilters, dealsAndCasesLimit)"
        )

        .news__load-more(
          v-animate
          @click="dealsAndCasesLimit = null"
        ) {{ getLabel('load-more', labels, 'Load More') }}

      row.news__sub-title(
        v-if="computedPublications.length > 0"
        v-animate
      )
        h3 {{ formatRawText(publications.title) }}

      .news__list-wrapper(
        v-if="computedPublications.length > 0"
        v-animate
        :class="getListCssClasses(computedPublications, publicationsLimit, publicationsFilters)"
      )
        filters.news__filters(
          :placeholder="getLabel('search', labels)"
          :title="getLabel('searchPublication', labels, 'Search a publication')"
          :filters="filterOptions"
          @input="onFilter($event, (filters) => { publicationsFilters = filters })"
        )

        list.news__list(
          :items="getListItems(computedPublications, publicationsFilters, publicationsLimit)"
        )

        .news__load-more(
          v-animate
          @click="publicationsLimit = null"
        ) {{ getLabel('load-more', labels, 'Load More') }}
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
      store.commit('setKeyWords', news.keyWords)

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
      newsLimit: 5,
      dealsAndCasesFilters: {},
      dealsAndCasesLimit: 5,
      publicationsFilters: {},
      publicationsLimit: 5,
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
        url: it.file?.url ? getApiUrl(it.file?.url) : null,
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

    limitItems(array, limit) {
      if (!limit) return array
      const clone = [...(array || [])]
      return clone.splice(0, limit)
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

    getListItems(items, filters, limit) {
      return this.isFiltering(filters)
        ? this.filterItems(items, filters)
        : this.limitItems(items, limit)
    },

    getListCssClasses(items, limit, filters) {
      return {
        'news--limit':
          !this.isFiltering(filters) && limit && limit < items.length,
      }
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
    position: relative;
    margin-top: calc(1.35rem * 1.2 + 10px);
    border-top: $border;

    #{$n}--limit & {
      &::after {
        content: '';
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 15rem;
        background-image: linear-gradient(transparent, white);
        pointer-events: none;
      }
    }
  }

  &__list-wrapper + &__sub-title {
    margin-top: 5rem;
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
  }

  &__load-more {
    display: none;
    cursor: pointer;
    color: $main-color;
    border-top: $border;
    padding: $main-padding 0;

    #{$n}--limit & {
      display: block;
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
