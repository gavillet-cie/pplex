<template lang="pug">
  .practice-area
    centered-wrapper
      h3.practice-area__title(
        v-html="title"
      )
      .practice-area__description(
        v-html="description"
      )

      template(
        v-if="filteredLawyers.length > 0"
      )
        .practice-area__lawyers-sub-title(
          v-html="lawyerSubTitle"
        )

        lawyers-grid.practice-area__lawyers(
          :lawyers="filteredLawyers"
        )
</template>

<script>
import { decode } from 'html-entities'
import { mapGetters } from 'vuex'
import { get } from '@/utils/api'
import { filterLawyers } from '@/utils/lawyers'
import CenteredWrapper from '@/components/CenteredWrapper'
import RowWrapper from '@/components/RowWrapper'
import LawyersGrid from '@/components/LawyersGrid'

export default {
  components: { CenteredWrapper, RowWrapper, LawyersGrid },

  async asyncData({ store, params }) {
    const { language, name } = params
    store.commit('setBigMenu', true)
    const [area, { lawyers }] = await Promise.all([
      get(`/our-practice-areas/${name}`, language),
      get(`/lawyers`, language),
    ])
    return {
      ...area,
      lawyers,
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
      return filterLawyers(this.lawyers, {
        name: null,
        location: null,
        practiceArea: this.name,
      })
    },
  },
}
</script>

<style lang="scss">
@import '../../styles/mixins';

.practice-area {
  &__title {
    @include sub-title;
  }

  &__description {
    @include row-padding;

    padding-bottom: $section-margin-bottom;
  }

  &__lawyers-sub-title {
    @include section-title;
    @include row-padding;
  }

  &__lawyers {
    margin-top: $menu-margin;
  }
}
</style>
