<template lang="pug">
  .locations
    row.locations__item(
      v-for="(item, index) in locations"
      :key="index"
      :label="formatRawText(item.city)"
      :noPadding="true"
    )
      .locations__content
        .locations__address(
          v-html="formatRawText(getAddress(item))"
        )
        br
        .locations__phone {{ item.phone }}

        a.link.locations__email(
          :href="`mailto:${item.email}`"
        ) {{ item.email }}
        br
        a.link.locations__google(
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
import { formatRawText } from '@/utils/text'
import { getLabel } from '@/utils/labels'
import Row from '@/components/Row'

export default {
  components: { Row },
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
    formatRawText,
    getLabel,

    getAddress(item) {
      return `${item.address}${
        item.additionalAddress ? `\n${item.additionalAddress}` : ''
      }
        ${item.zipCode} ${item.city}
      `
    },
  },
}
</script>

<style lang="scss">
@import '../styles/mixins';

.locations {
  &__item {
    position: relative;
    display: flex;
    @include v-main-padding;

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

  @media screen and(max-width: 900px) {
    &__icon {
      position: absolute;
      top: $main-padding;
      right: 0;
    }
  }
}
</style>
