<template lang="pug">
  .lawyers-filter
    span.lawyers-filter__title {{ getLabel('findALawyer', labels) }}
    .lawyers-filter__filters
      dropdown.lawyers-filter__select(
        :placeholder="getLabel('practiceArea', labels)"
        :options="practiceAreasOptions"
        @selected="onPractiveAreaFilter"
      )

      dropdown.lawyers-filter__select(
        :placeholder="getLabel('location', labels)"
        :options="locationsOptions"
        @selected="onLocationFilter"
      )

      input(
        :placeholder="getLabel('searchByName', labels)"
        type="text"
        @input="onName"
      )

</template>

<script>
import { mapGetters } from 'vuex'
import { get } from '@/utils/api'
import Dropdown from '@/components/Dropdown'
import { getLabel } from '@/utils/labels'

export default {
  components: { Dropdown },

  data() {
    return {
      practiceAreas: [],
      locations: [],
      filters: {
        practiceArea: null,
        location: null,
        name: null,
      },
    }
  },

  async fetch() {
    const { language } = this.$route.params
    const [{ practiceAreas }, { locations }] = await Promise.all([
      get('our-practice-areas', language),
      get('locations', language),
    ])

    this.practiceAreas = practiceAreas
    this.locations = locations
  },

  computed: {
    ...mapGetters(['labels']),
    practiceAreasOptions() {
      return this.practiceAreas?.map((it) => ({
        label: it.title,
        name: it.name,
      }))
    },

    locationsOptions() {
      return this.locations?.map((it) => ({
        label: it.title,
        name: it.name,
      }))
    },
  },

  methods: {
    getLabel,
    onPractiveAreaFilter(option) {
      this.filters.practiceArea = option.name
      this.$emit('input', this.filters)
    },

    onLocationFilter(option) {
      this.filters.location = option.name
      this.$emit('input', this.filters)
    },

    onName(option) {
      this.filters.name = option.target.value
      this.$emit('input', this.filters)
    },
  },
}
</script>

<style lang="scss">
.lawyers-filter {
  &__title {
    display: block;
    color: $secondary-color;
    padding: $main-padding 0;
  }

  &__select {
    width: 25%;
    flex: 0 0 auto;
    padding: $main-padding 0;
    display: block;
    font-size: 1rem;
    color: black;

    & + & {
      margin-right: $menu-margin * 0.5;
    }
  }

  &__filters {
    display: flex;
    padding: $menu-margin 0;
    border-top: solid 2px black;
    border-bottom: solid 2px black;

    input {
      flex: 1 1 auto;
      width: 50%;
    }
  }
}
</style>
