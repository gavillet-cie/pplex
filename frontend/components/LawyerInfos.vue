<template lang="pug">
  .lawyer-infos(
    :is="header ? 'header' : 'div'"
  )
    .lawyer-infos__portrait(
      v-if="showPortrait"
    )
      nuxt-link.lawyer-infos__portrait-inner(
        :to="getUrl(`/lawyers/${name}`, lang)"
        @click.native.stop
      )
        picture
          source(
            :srcset="getImageUrl(portrait.url)"
            type="image/webp"
          )
          img(
            :src="getImageUrl(portrait.original)"
            :style="getImageCssStyle(portrait)"
            :alt="portrait.description || ''"
          )

    .lawyer-infos__sections
      .lawyer-infos__section
        h2.lawyer-infos__name(
          :is="header ? 'h1' : 'h2'"
          v-if="title"
        ) {{ title }}

        h3.lawyer-infos__title(
          :is="header ? 'h2' : 'h3'"
          v-if="lawyerTitle"
        ) {{ lawyerTitle }}

      .lawyer-infos__links.lawyer-infos__section
        nuxt-link.link.lawyer-infos__profile(
          v-if="reduceInfo"
          :to="getUrl(`/lawyers/${name}`, lang)"
          @click.native.stop
        ) {{ getLabel('seeProfile', labels, 'See Profile') }}

        client-only
          a.link.lawyer-infos__vcard(
            :href="getApiUrl(`/vcard/${name}`)"
            @click.stop
            download
          ) VCard

      .lawyer-infos__section(
        v-if="showContact"
      )
        span.lawyer-infos__section-title {{ getLabel('contact', labels) }}
        a.link.lawyer-infos__email(
          v-if="email"
          :href="mailto"
          @click.stop
        ) {{ email }}

        a.link.lawyer-infos__phone(
          v-if="phone"
          :href="`tel:${phone}`"
          @click.stop
        ) {{ getLabel('phonePrefix', labels, 'T') }} {{ phone }}

        a.link.lawyer-infos__fax(
          v-if="fax"
          :href="`tel:${fax}`"
          @click.stop
        ) F {{ fax }}

      .lawyer-infos__section(
        v-if="showPracticeAreas && !reduceInfo"
      )
        span.lawyer-infos__section-title {{ getLabel('practiceAreas', labels) }}
        nuxt-link.lawyer-infos__practice-area(
          v-for="(area, index) in practiceAreas"
          v-html="area.title"
          :key="index"
          :to="getUrl(`/our-practice-areas/${area.name}`, lang)"
        )

      .lawyer-infos__section(
        v-if="showLanguages"
      )
        span.lawyer-infos__section-title {{ getLabel('languages', labels) }}
        span.lawyer-infos__language {{ languages.map(formatRawText).join(', ') }}

      .lawyer-infos__section(
        v-if="showEntityAndAddress && !reduceInfo"
      )
        span.lawyer-infos__section-title {{ getLabel('entityAndAddress', labels) }}
        p.lawyer-infos__entity-address(v-html="formatRawText(entityAndAddress)")

      .lawyer-infos__section(
        v-if="showBarAdmission && !reduceInfo"
      )
        span.lawyer-infos__section-title {{ getLabel('barAdmission', labels) }}
        p.lawyer-infos__bar-admission(v-html="formatRawText(barAdmission)")
</template>

<script>
import { mapGetters } from 'vuex'
import { formatRawText } from '@/utils/text'
import { getImageUrl, getUrl, getApiUrl } from '@/utils/api'
import { getImageCssStyle } from '@/utils/images'
import { getLabel } from '@/utils/labels'

export default {
  props: {
    header: {
      type: Boolean,
      default: false,
    },

    name: {
      type: String,
      default: '',
    },

    entity: {
      type: String,
      default: '',
    },

    title: {
      type: String,
      default: '',
    },

    lawyerTitle: {
      type: String,
      default: '',
    },

    email: {
      type: String,
      default: '',
    },

    phone: {
      type: String,
      default: '',
    },

    fax: {
      type: String,
      default: '',
    },

    practiceAreas: {
      type: Array,
      default: () => [],
    },

    languages: {
      type: Array,
      default: () => [],
    },

    locations: {
      type: Array,
      default: () => [],
    },

    barAdmission: {
      type: String,
      default: '',
    },

    portrait: {
      type: Object,
      default: () => ({}),
    },

    showPortrait: {
      type: Boolean,
      default: false,
    },

    reduceInfo: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapGetters(['labels', 'lang']),
    mailto() {
      return `mailto:${this.email}`
    },

    showContact() {
      return this.email || this.phone || this.fax
    },

    showPracticeAreas() {
      return this.practiceAreas?.length > 0
    },

    showLanguages() {
      return this.languages?.length > 0
    },

    showEntityAndAddress() {
      return this.locations && this.locations.length > 0
    },

    entityAndAddress() {
      return `${this.entity || 'Python | Avocats'}
        ${this.locations.map((it) => `${it.city}, ${it.address}`).join('\n')}
      `
    },

    showBarAdmission() {
      return this.barAdmission
    },
  },

  methods: {
    getUrl,
    getApiUrl,
    formatRawText,
    getImageUrl,
    getLabel,
    getImageCssStyle,
  },
}
</script>

<style lang="scss">
.lawyer-infos {
  display: flex;
  font-size: $small-font-size;

  &__links {
    font-size: $default-font-size;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  &__portrait {
    width: 25%;
    padding-right: $menu-margin * 0.75;

    &-inner {
      cursor: pointer;
      display: block;
      position: relative;
      width: 100%;
      padding-top: 110%;
    }

    img {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
    }
  }

  &__name,
  &__title {
    font-size: $medium-font-size;
    color: $main-color;
  }

  &__practice-area {
    color: black !important;
  }

  &__sections {
    padding-left: $menu-margin * 0.5;
  }

  &__section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: black;

    & + & {
      margin-top: 1rem;
    }

    &-title {
      color: $secondary-color;
    }
  }

  @media screen and (max-width: 900px) {
    &__portrait {
      display: none;
    }
  }
}
</style>
