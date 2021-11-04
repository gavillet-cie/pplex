<template lang="pug">
  .lawyer-infos
    .lawyer-infos__portrait(
      v-if="showPortrait"
    )
      img(:src="getImageUrl(portrait.url)")

    .lawyer-infos__sections
      .lawyer-infos__section
        h2.lawyer-infos__name(
          v-if="title"
        ) {{ title }}

        h3.lawyer-infos__title(
          v-if="lawyerTitle"
        ) {{ lawyerTitle }}

        client-only
          a.lawyer-infos__vcard(
            :href="getApiUrl(`/vcard/${name}`)"
            download
          ) VCard

      .lawyer-infos__section(
        v-if="showContact"
      )
        span.lawyer-infos__section-title {{ getLabel('contact', labels) }}
        a.lawyer-infos__email(
          v-if="email"
          :href="mailto"
        ) {{ email }}
        span.lawyer-infos__phone(
          v-if="phone"
        ) {{ phone }}
        span.lawyer-infos__fax(
          v-if="fax"
        ) {{ fax }}

      .lawyer-infos__section(
        v-if="showPracticeAreas"
      )
        span.lawyer-infos__section-title {{ getLabel('practiceAreas', labels) }}
        nuxt-link.lawyer-infos__practice-area(
          v-for="(area, index) in practiceAreas"
          v-html="area.title"
          :key="index"
          :to="getUrl(`/our-practice-areas/${area.name}`)"
        )

      .lawyer-infos__section(
        v-if="showLanguages"
      )
        span.lawyer-infos__section-title {{ getLabel('languages', labels) }}
        span.lawyer-infos__language(
          v-for="language in languages"
        ) {{ language }}

      .lawyer-infos__section(
        v-if="showEntityAndAddress"
      )
        span.lawyer-infos__section-title {{ getLabel('entityAndAddress', labels) }}
        p.lawyer-infos__entity-address(v-html="formatText(entityAndAddress)")

      .lawyer-infos__section(
        v-if="showBarAdmission"
      )
        span.lawyer-infos__section-title {{ getLabel('barAdmission', labels) }}
        p.lawyer-infos__bar-admission(v-html="formatText(barAdmission)")
</template>

<script>
import { mapGetters } from 'vuex'
import { formatText } from '@/utils/text'
import { getImageUrl, getUrl, getApiUrl } from '@/utils/api'
import { getLabel } from '@/utils/labels'

export default {
  props: {
    name: {
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
  },

  computed: {
    ...mapGetters(['labels']),
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
      return `Python | Avocats
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
    formatText,
    getImageUrl,
    getLabel,
  },
}
</script>

<style lang="scss">
.lawyer-infos {
  display: flex;
  font-size: $small-font-size;

  &__vcard {
    font-size: $default-font-size;
  }

  &__portrait {
    width: 25%;
    padding-right: 0.5rem;

    img {
      display: flex;
      width: 100%;
    }
  }

  &__name,
  &__title {
    font-size: $medium-font-size;
    color: black;
  }

  &__practice-area {
    color: black !important;
  }

  &__section {
    display: flex;
    flex-direction: column;
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
