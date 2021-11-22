<template lang="pug">
  .lawyer
    slider.lawyer__slider(
      v-if="showSlides"
      :slides="lawyerSlides"
    )

    centered-wrapper(
      :marginLeft="marginLeft"
    )
      row.lawyer__row
        lawyer-infos(
          v-bind="lawyer"
        )

      row.lawyer__row(
        v-if="description"
        :label="getLabel('domain', labels)"
        :noPadding="true"
      )
        p.lawyer__description(
          v-html="formatRawText(description)"
        )

      row.lawyer__row(
        v-if="showEducation"
        :label="getLabel('education', labels)"
        :noPadding="true"
      )
        .lawyer__list
          span(
            v-for="item in education"
          ) {{ formatRawText(item) }}

      row.lawyer__row(
        v-if="showPositionsHeld"
        :label="getLabel('positionsHeld', labels)"
        :noPadding="true"
      )
        .lawyer__list
          span(
            v-for="position in positionsHeld"
          ) {{ formatRawText(position) }}

      row.lawyer__row(
        v-if="showMemberships"
        :label="getLabel('memberships', labels)"
        :noPadding="true"
      )
        .lawyer__list
          span(
            v-for="membership in memberships"
          ) {{ formatRawText(membership) }}

      row.lawyer__row(
        v-if="showSelectedPublications"
        :label="getLabel('selectedPublications', labels)"
        :noPadding="true"
      )
        .lawyer__list
          span(
            v-for="publication in selectedPublications"
          ) {{ formatRawText(publication) }}

      row.lawyer__row(
        v-if="showRankings"
        :label="getLabel('rankings', labels)"
        :noPadding="true"
      )
        .lawyer__list
          .lawyer__ranking(
            v-for="ranking in rankings"
          )
            span.lawyer__ranking-year {{ ranking.year }}
            .lawyer__ranking-images
              img.lawyer__ranking-image(
                v-for="image in ranking.images"
                :src="getImageUrl(image.url)"
              )

      row.lawyer__row(
        v-if="showSpeeches"
        :label="getLabel('speeches', labels)"
        :noPadding="true"
      )
        .lawyer__list
          span(
            v-for="speech in speeches"
            v-html="formatRawText(speech)"
          )

      row.lawyer__row(
        v-if="showCases"
        :label="getLabel('cases', labels)"
        :noPadding="true"
      )
        .lawyer__list
          span(
            v-for="caseItem in cases"
            v-html="formatRawText(caseItem)"
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
        row.lawyer__news-title
          span News

        list.lawyer__news(
          :items="newsItems"
        )

</template>

<script>
import { decode } from 'html-entities'
import { mapGetters } from 'vuex'
import { get, getImageUrl, getUrl } from '@/utils/api'
import { formatRawText, formatHtmlText } from '@/utils/text'
import { getLabel } from '@/utils/labels'
import { getDate } from '@/utils/dates'
import Slider from '@/components/Slider'
import TextSlider from '@/components/TextSlider'
import CenteredWrapper from '@/components/CenteredWrapper'
import Row from '@/components/Row'
import LawyerInfos from '@/components/LawyerInfos'
import List from '@/components/List'

export default {
  components: {
    CenteredWrapper,
    LawyerInfos,
    Row,
    Slider,
    TextSlider,
    List,
  },

  async asyncData({ store, params }) {
    try {
      const { language, name } = params
      store.commit('setBigMenu', true)
      const [lawyer, news] = await Promise.all([
        get(`lawyers/${name}`, language),
        get(`news`, language),
      ])

      return { lawyer, ...news, ...lawyer }
    } catch (error) {
      store.commit('setError', true)
    }
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
        : this.portrait
        ? [
            {
              title: '',
              image: this.portrait,
            },
          ]
        : []
    },

    showSlides() {
      return this.lawyerSlides.length > 0
    },

    marginLeft() {
      return this.testimonials?.length > 0 ? '20%' : null
    },

    newsItems() {
      return (
        this.news
          ?.filter((it) =>
            it.author?.find((author) => author.name === this.name)
          )
          .map((it) => ({
            text: formatHtmlText(it.content),
            label: getDate(it.date, this.lang),
            url: getUrl(`/news/${it.name}`, this.lang),
          })) || []
      )
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
    formatRawText,
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
    height: calc(100vh - var(--max-menu-height, 35vh));
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  }

  &__slider {
    width: 100%;
    height: calc(100vh - var(--max-menu-height, 35vh));
  }

  &__row {
    @include text-padding;

    & + & {
      border-top: $border;
    }
  }

  &__ranking {
    $r: &;

    &-year {
      display: block;
      @include v-main-padding;
    }

    &:first-child {
      #{$r}-year {
        border-top: none;
        padding-top: 0;
      }
    }

    &-images {
      display: flex;
      flex-wrap: wrap;
      margin-top: -$menu-margin;

      img {
        height: 8rem;
        display: block;
        max-width: 15rem;
        object-fit: contain;
        object-position: top;
        margin-top: $menu-margin;
        margin-right: $menu-margin;
      }
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    width: 100%;

    & > span {
      position: relative;
      display: flex;
      flex-direction: column;
      border-bottom: $border;
      @include v-main-padding;
    }

    & > span:first-child {
      padding-top: 0;
    }

    & > span:last-child {
      border-bottom: none;
      padding-bottom: 0;
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
      height: 20rem;
      margin: auto;
      padding: 0;
      padding-left: $padding-row;
    }
  }

  @media screen and (max-width: 900px) {
    &__testimonials {
      padding: 0;
    }
  }
}
</style>
