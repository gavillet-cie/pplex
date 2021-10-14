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

      .lawyer-infos__section(
        v-if="showContact"
      )
        span.lawyer-infos__section-title Contact
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
        span.lawyer-infos__section-title Domaines de pratique
        span.lawyer-infos__practice-area(
          v-for="area in practiceAreas"
        ) {{ area.title }}

      .lawyer-infos__section(
        v-if="showLanguages"
      )
        span.lawyer-infos__section-title Langues
        span.lawyer-infos__language(
          v-for="language in languages"
        ) {{ language }}

      .lawyer-infos__section(
        v-if="showEntityAndAddress"
      )
        span.lawyer-infos__section-title Entité & Adresse
        p.lawyer-infos__entity-address(v-html="formatText(entityAndAddress)")

      .lawyer-infos__section(
        v-if="showBarAdmission"
      )
        span.lawyer-infos__section-title Admission au barreau
        p.lawyer-infos__bar-admission(v-html="formatText(barAdmission)")
</template>

<script>
import { formatText } from '@/utils/text'
import { getImageUrl } from '@/utils/api'

export default {
  props: {
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

    entityAndAddress: {
      type: String,
      default: '',
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
      return this.entityAndAddress
    },

    showBarAdmission() {
      return this.barAdmission
    },
  },

  methods: {
    formatText,
    getImageUrl,
  },
}
</script>

<style lang="scss">
.lawyer-infos {
  display: flex;

  &__portrait {
    width: 25%;
    padding-right: 0.5rem;

    img {
      width: 100%;
    }
  }

  &__name,
  &__title {
    font-size: $medium-font-size;
    color: black;
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
}
</style>
