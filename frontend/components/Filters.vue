<template lang="pug">
  .filters
    span.filters__title {{ formatRawText(title) }}
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
import { formatRawText, formatHtmlText } from '@/utils/text'

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
    formatRawText,
    formatHtmlText,
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
  font-size: $default-font-size;

  &__title {
    display: block;
    color: $secondary-color;
    padding: $main-padding 0;
  }

  &__select {
    width: 25%;
    flex: 0 0 auto;
    display: block;
    color: black;

    & + & {
      margin-right: $menu-margin * 0.5;
    }
  }

  &__items {
    display: flex;
    border-top: $border;
    border-bottom: $border;
  }

  &__item {
    display: block;
    padding: $main-padding 0;

    & + & {
      margin-left: $main-padding;
    }

    input {
      width: 100%;
    }
  }

  @media screen and (max-width: 900px) {
    &__items {
      flex-direction: column;
    }

    &__item {
      width: 100% !important;

      & + & {
        margin-left: 0;
        border-top: $border;
      }
    }
  }
}
</style>
