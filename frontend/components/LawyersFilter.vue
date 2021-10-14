<template lang="pug">
  .lawyers-filter
    span.lawyers-filter__title Trouver un avocat
    .lawyers-filter__filters
      dropdown.lawyers-filter__select(
        placeholder="Domain de pratique"
        :options="practiceAreasOptions"
        @select="onPractiveAreaFilter"
      )

      dropdown.lawyers-filter__select(
        placeholder="Lieu"
        :options="locationsOptions"
        @select="onLocationFilter"
      )

      input(
        placeholder="Recherche par nom"
        type="text"
        @input="onName"
      )

</template>

<script>
import { get } from '@/utils/api'
import Dropdown from '@/components/Dropdown'

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
    const { practiceAreas } = await get('our-practice-areas', language)
    const { locations } = await get('locations', language)
    this.practiceAreas = practiceAreas
    this.locations = locations
  },

  computed: {
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
    padding: 0.5rem 0;
  }

  &__select {
    width: 25%;
    flex: 0 0 auto;
    padding: 0.5rem 0;
    display: block;
    font-size: 1rem;
    color: black;
  }

  &__filters {
    display: flex;
    padding: 0.2rem 0;
    border-top: solid 2px black;
    border-bottom: solid 2px black;

    input {
      flex: 0 0 auto;
      width: 50%;
    }
  }
}
</style>
