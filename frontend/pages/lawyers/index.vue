<template lang="pug">
  .lawyers
    centered-wrapper
      h3.lawyers__sub-title Rencontrez nos avocats

      lawyers-filter.lawyers__filters(
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
import CenteredWrapper from '@/components/CenteredWrapper'
import LawyersGrid from '@/components/LawyersGrid'
import LawyersFilter from '@/components/LawyersFilter'

export default {
  components: { CenteredWrapper, LawyersGrid, LawyersFilter },

  async asyncData({ store, params }) {
    const { language } = params
    store.commit('setBigMenu', true)
    const lawyers = await get('lawyers', language)
    return lawyers
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
    ...mapGetters(['lang']),
    filteredLawyers() {
      return filterLawyers(this.lawyers, this.filters)
    },
  },

  mounted() {
    this.width = window.innerWidth
  },

  methods: {
    onFilter(filters) {
      this.filters = filters
    },
  },
}
</script>

<style lang="scss">
@import '../../styles/mixins';

.lawyers {
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
