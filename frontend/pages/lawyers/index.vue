<template lang="pug">
  .lawyers
    slider.lawyers__slider(
      v-if="slideOptions && slideOptions.length > 0"
      :slides="slideOptions"
    )

    centered-wrapper
      row.lawyers__sub-title
        h3 {{ title }}

      filters.lawyers__filters(
        :placeholder="getLabel('search', labels)"
        :title="getLabel('findALawyer', labels)"
        :filters="filterOptions"
        @input="onFilter"
      )

      lawyers-grid.lawyers__grid(
        :lawyers="filteredLawyers"
      )
</template>

<script>
import { decode } from 'html-entities'
import { mapGetters } from 'vuex'
import { get } from '@/utils/api'
import { filterLawyers } from '@/utils/lawyers'
import { getLabel } from '@/utils/labels'
import CenteredWrapper from '@/components/CenteredWrapper'
import Row from '@/components/Row'
import LawyersGrid from '@/components/LawyersGrid'
import Filters from '@/components/Filters'
import Slider from '@/components/Slider'

export default {
  components: { CenteredWrapper, LawyersGrid, Row, Filters, Slider },

  async asyncData({ store, params }) {
    try {
      const { language } = params
      store.commit('setBigMenu', true)
      const [lawyers, { practiceAreas }, { locations }] = await Promise.all([
        get('lawyers', language),
        get('our-practice-areas', language),
        get('contact', language),
      ])

      return {
        practiceAreas,
        locations,
        ...lawyers,
      }
    } catch (error) {
      store.commit('setError', error)
    }
  },

  data() {
    return {
      width: null,
      filters: null,
    }
  },

  head() {
    return {
      title: this.title ? `${decode(this.title)} - PYTHON` : 'PYTHON',
    }
  },

  computed: {
    ...mapGetters(['lang', 'labels']),
    filteredLawyers() {
      return filterLawyers(this.lawyers, this.filters)
    },

    filterOptions() {
      return [
        {
          id: 'practiceArea',
          component: 'dropdown',
          placeholder: getLabel('practiceArea', this.labels),
          width: '25%',
          options: this.practiceAreas?.map((it) => ({
            label: it.title,
            name: it.name,
          })),
          flex: true,
        },
        {
          id: 'location',
          component: 'dropdown',
          placeholder: getLabel('location', this.labels),
          options: this.locations?.map((it) => ({
            label: it.city,
            name: it.name,
          })),
          width: '25%',
          flex: true,
        },
        {
          id: 'name',
          component: 'input',
          type: 'text',
          placeholder: getLabel('searchByName', this.labels),
          width: 'calc(50% - 2.5px)',
          flex: false,
        },
      ]
    },

    slideOptions() {
      return this.slides?.map((it) => ({ image: it }))
    },
  },

  mounted() {
    this.width = window.innerWidth
  },

  methods: {
    getLabel,
    onFilter(filters) {
      const name = filters.name?.target.value
      const practiceArea = filters.practiceArea?.name
      const location = filters.location?.name

      this.filters = {
        name,
        practiceArea,
        location,
      }
    },
  },
}
</script>

<style lang="scss">
@import '../../styles/mixins';

.lawyers {
  &__slider {
    @include header-slider;
  }

  &__sub-title {
    @include sub-title;
  }

  &__filters {
    position: sticky;
    top: calc($menu-height - $menu-margin);
    z-index: 10;
    background-color: white;
  }

  &__grid {
    margin-top: $menu-margin;
  }
}
</style>
