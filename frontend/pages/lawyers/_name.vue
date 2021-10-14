<template lang="pug">
  .lawyer
    slider.lawyer__slider(
      :slides="slides"
    )
    centered-wrapper
      row-wrapper
        lawyer-infos(
          v-bind="lawyer"
        )

      row-wrapper(
        v-if="description"
        title="Domaine"
      )
        p.lawyer__description(
          v-html="formatText(description)"
        )

      row-wrapper(
        v-if="showEducation"
        title="Education"
      )
        .lawyer__list
          span(
            v-for="item in education"
          ) {{ item }}

      row-wrapper(
        v-if="showPositionsHeld"
        title="Positions Held"
      )
        .lawyer__list
          span(
            v-for="position in positionsHeld"
          ) {{ position }}

      row-wrapper(
        v-if="showMemberships"
        title="Memberships"
      )
        .lawyer__list
          span(
            v-for="membership in memberships"
          ) {{ membership }}

      row-wrapper(
        v-if="showSelectedPublications"
        title="Selected Publications"
      )
        .lawyer__list
          span(
            v-for="publication in selectedPublications"
          ) {{ publication }}

      row-wrapper(
        v-if="showRankings"
        title="Rankings"
      )
        .lawyer__list
          .lawyer__ranking(
            v-for="ranking in rankings"
          )
            span {{ ranking.year }}
            img(:src="getImageUrl(ranking.image.url)")

      row-wrapper(
        v-if="showSpeeches"
        title="Speeches"
      )
        .lawyer__list
          span(
            v-for="speech in speeches"
            v-html="formatText(speech)"
          )

      row-wrapper(
        v-if="showCases"
        title="Cases"
      )
        .lawyer__list
          span(
            v-for="caseItem in cases"
            v-html="formatText(caseItem)"
          )

</template>

<script>
import { get, getImageUrl } from '@/utils/api'
import { formatText } from '@/utils/text'
import Slider from '@/components/Slider'
import CenteredWrapper from '@/components/CenteredWrapper'
import RowWrapper from '@/components/RowWrapper'
import LawyerInfos from '@/components/LawyerInfos'

export default {
  components: { CenteredWrapper, LawyerInfos, RowWrapper, Slider },

  async asyncData({ store, params }) {
    const { language, name } = params
    store.commit('setBigMenu', true)
    const lawyer = await get(`lawyers/${name}`, language)
    console.log(lawyer)
    return { lawyer, ...lawyer }
  },

  computed: {
    slides() {
      return [
        {
          title: '',
          image: this.portrait,
        },
      ]
    },

    showEducation() {
      return this.education?.length > 0
    },

    showPositionsHeld() {
      return this.positionsHeld?.length > 0
    },

    showMemberships() {
      return this.memberships?.length > 0
    },

    showSelectedPublications() {
      return this.selectedPublications?.length > 0
    },

    showRankings() {
      return this.rankings?.length > 0
    },

    showSpeeches() {
      return this.speeches?.length > 0
    },

    showCases() {
      return this.cases?.length > 0
    },
  },

  methods: {
    getImageUrl,
    formatText,
  },
}
</script>

<style lang="scss">
.lawyer {
  &__slider {
    width: 100%;
    height: 60vh;
  }

  &__list {
    display: flex;
    flex-direction: column;

    span {
      display: block;
    }

    span + span {
      margin-top: 0.5rem;
    }
  }

  &__ranking {
    img {
      height: 10rem;
      display: block;
    }
  }
}
</style>
