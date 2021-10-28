<template lang="pug">
  .filters
    span.filters__title {{ title }}
    .filters__items
      client-only
        .filters__item(
          v-for="(filter, index) in filters"
          v-bind="filter"
          :key="index"
          :is="filter.component"
          :style="getFilterCssStyle(filter)"
          @selected="onSelect(filter, $event)"
          @input="onSelect(filter, $event)"
        )

</template>

<script>
import Dropdown from '@/components/Dropdown'
import { getLabel } from '@/utils/labels'

export default {
  components: { Dropdown },

  props: {
    title: {
      type: String,
      default: '',
    },

    filters: {
      type: Array,
      default: () => [],
    },

    placeholder: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      practiceAreas: [],
      locations: [],
      values: {},
    }
  },

  methods: {
    getLabel,
    onSelect(dropdown, value) {
      this.values[dropdown.id] = value
      this.$emit('input', this.values)
    },

    getFilterCssStyle(filter) {
      return {
        width: filter.width,
        flex: filter.flex ? '1 1 auto' : '0 0 auto',
      }
    },
  },
}
</script>

<style lang="scss">
.filters {
  &__title {
    display: block;
    color: $secondary-color;
    padding: $main-padding 0;
  }

  &__select {
    width: 25%;
    flex: 0 0 auto;
    display: block;
    font-size: 1rem;
    color: black;

    & + & {
      margin-right: $menu-margin * 0.5;
    }
  }

  &__items {
    display: flex;
    padding: $menu-margin 0;
    border-top: solid 2px black;
    border-bottom: solid 2px black;
  }

  &__item {
    & + & {
      margin-left: 1rem;
    }

    input {
      width: 100%;
    }
  }
}
</style>
