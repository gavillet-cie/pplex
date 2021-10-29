<template lang="pug">
  .locations
    .locations__item(
      v-for="item in locations"
    )
      .locations__name {{ item.location }}
      .locations__content
        .locations__address(
          v-html="formatText(item.address)"
        )
        br
        .locations__phone {{ item.phone }}
        a.locations__email(
          :href="`mailto:${item.email}`"
        ) {{ item.email }}
        a.locations__google(
          target="_blank"
          :href="item.googleMap"
        ) {{ getLabel('lookAtTheMap', labels) }}

      img.locations__icon(
        src="~/static/location-icon.svg"
      )

</template>

<script>
import { mapGetters } from 'vuex'
import { get } from '@/utils/api'
import { formatText } from '@/utils/text'
import { getLabel } from '@/utils/labels'

export default {
  data() {
    return {
      locations: [],
    }
  },

  async fetch() {
    const contact = await get('/contact', this.lang)
    this.locations = contact.locations
  },

  computed: {
    ...mapGetters(['lang', 'labels']),
  },

  methods: {
    formatText,
    getLabel,
  },
}
</script>

<style lang="scss">
.locations {
  &__item {
    position: relative;
    display: flex;
    padding: $main-padding 0;

    & + & {
      border-top: $border;
    }
  }

  &__name {
    color: $main-color;
    width: $padding-row;
    flex: 0 0 auto;
  }

  &__content {
    width: 100%;
  }

  &__icon {
    width: 1rem;
    align-self: flex-start;
  }

  a {
    display: block;
  }

  @media screen and(max-width: 900px) {
    &__item {
      flex-direction: column;
    }

    &__icon {
      position: absolute;
      top: $main-padding;
      right: 0;
    }
  }
}
</style>
