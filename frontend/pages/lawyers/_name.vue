<template lang="pug">
  .lawyer
    slider.lawyer__slider(
      :slides="lawyerSlides"
    )

    centered-wrapper
      row-wrapper
        lawyer-infos(
          v-bind="lawyer"
        )

      row-wrapper(
        v-if="description"
        :title="getLabel('domain', labels)"
      )
        p.lawyer__description(
          v-html="formatText(description)"
        )

      row-wrapper(
        v-if="showEducation"
        :title="getLabel('education', labels)"
      )
        .lawyer__list
          span(
            v-for="item in education"
          ) {{ item }}

      row-wrapper(
        v-if="showPositionsHeld"
        :title="getLabel('positionsHeld', labels)"
      )
        .lawyer__list
          span(
            v-for="position in positionsHeld"
          ) {{ position }}

      row-wrapper(
        v-if="showMemberships"
        :title="getLabel('memberships', labels)"
      )
        .lawyer__list
          span(
            v-for="membership in memberships"
          ) {{ membership }}

      row-wrapper(
        v-if="showSelectedPublications"
        :title="getLabel('selectedPublications', labels)"
      )
        .lawyer__list
          span(
            v-for="publication in selectedPublications"
          ) {{ publication }}

      row-wrapper(
        v-if="showRankings"
        :title="getLabel('rankings', labels)"
      )
        .lawyer__list
          .lawyer__ranking(
            v-for="ranking in rankings"
          )
            span {{ ranking.year }}
            .lawyer__ranking-images
              img.lawyer__ranking-image(
                v-for="image in ranking.images"
                :src="getImageUrl(image.url)"
              )

      row-wrapper(
        v-if="showSpeeches"
        :title="getLabel('speeches', labels)"
      )
        .lawyer__list
          span(
            v-for="speech in speeches"
            v-html="formatText(speech)"
          )

      row-wrapper(
        v-if="showCases"
        :title="getLabel('cases', labels)"
      )
        .lawyer__list
          span(
            v-for="caseItem in cases"
            v-html="formatText(caseItem)"
          )

      .lawyer__testimonials(
        v-if="showTestimonials"
      )
        text-slider(
          :slides="testimonials"
        )

      template(
        v-if="newsItems.length > 0"
      )
        .lawyer__news-title News
        list.lawyer__news(
          :items="newsItems"
        )

</template>

<script>
import { decode } from 'html-entities'
import { mapGetters } from 'vuex'
import { get, getImageUrl, getUrl } from '@/utils/api'
import { formatText } from '@/utils/text'
import { getLabel } from '@/utils/labels'
import { getDate } from '@/utils/dates'
import Slider from '@/components/Slider'
import TextSlider from '@/components/TextSlider'
import CenteredWrapper from '@/components/CenteredWrapper'
import RowWrapper from '@/components/RowWrapper'
import LawyerInfos from '@/components/LawyerInfos'
import List from '@/components/List'

export default {
  components: {
    CenteredWrapper,
    LawyerInfos,
    RowWrapper,
    Slider,
    TextSlider,
    List,
  },

  async asyncData({ store, params }) {
    const { language, name } = params
    store.commit('setBigMenu', true)
    const [lawyer, news] = await Promise.all([
      get(`lawyers/${name}`, language),
      get(`news`, language),
    ])

    return { lawyer, ...news, ...lawyer }
  },

  head() {
    return {
      title: this.title ? `${decode(this.title)} - PYTHON` : 'PYTHON',
    }
  },

  computed: {
    ...mapGetters(['labels', 'lang']),
    lawyerSlides() {
      return this.slides?.length > 0
        ? this.slides.map((it) => ({
            title: '',
            image: it,
          }))
        : [
            {
              title: '',
              image: this.portrait,
            },
          ]
    },

    newsItems() {
      return this.news
        .filter((it) => it.author.find((author) => author.name === this.name))
        .map((it) => ({
          text: it.content,
          label: getDate(it.date, this.lang),
          url: getUrl(`/news/${it.name}`),
        }))
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

    showTestimonials() {
      return this.testimonials?.filter((it) => it).length > 0
    },
  },

  methods: {
    getImageUrl,
    formatText,
    getLabel,
  },
}
</script>

<style lang="scss">
@import '../../styles/mixins';

.lawyer {
  position: relative;
  padding-bottom: $section-margin-bottom;

  &__testimonials {
    position: fixed;
    top: max(20vh, var(--menu-height));
    left: 0;
    height: 60vh;
    width: calc((100% - #{$wrapper-max-width}) / 2);
    display: flex;
    justify-content: center;
    align-items: center;
  }

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

  &__news-title {
    @include sub-title;
  }

  &__news {
    border-top: $border;
  }

  @media screen and (max-width: 1300px) {
    &__testimonials {
      position: relative;
      top: unset;
      left: unset;
      width: 100%;
      height: 25vh;
      margin: auto;
    }
  }
}
</style>
