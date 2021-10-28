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

      img.locations__icon(
        src="~/static/location-icon.svg"
      )

</template>

<script>
import { mapGetters } from 'vuex'
import { get } from '@/utils/api'
import { formatText } from '@/utils/text'

export default {
  data() {
    return {
      locations: [],
    }
  },

  async fetch() {
    // this.$store.commit('setBigMenu', true)
    const contact = await get('/contact', this.lang)
    this.locations = contact.locations
  },

  computed: {
    ...mapGetters(['lang']),
  },

  methods: {
    formatText,
  },
}
</script>

<style lang="scss">
.locations {
  &__item {
    border-top: $border;
    display: flex;
    padding: $main-padding 0;
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
}
</style>
