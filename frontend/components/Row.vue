<template lang="pug">
  .row(
    :class="rowCssClasses"
  )
    .row__inner
      span.row__label(
        v-if="label"
      ) {{ formatRawText(label) }}

      slot
</template>

<script>
import { formatRawText, formatHtmlText } from '@/utils/text'

export default {
  props: {
    label: {
      type: String,
      default: '',
    },

    noPadding: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    rowCssClasses() {
      return {
        'row--label': this.label,
        'row--no-padding': this.noPadding,
      }
    },
  },

  methods: {
    formatRawText,
    formatHtmlText,
  },
}
</script>

<style lang="scss">
@import '../styles/mixins';

.row {
  $r: &;

  &__inner {
    display: flex;
    padding-left: $padding-row;
    padding-right: $padding-row;
    width: 100%;

    #{$r}--label & {
      padding-left: 0;
    }

    #{$r}--no-padding & {
      padding-left: 0;
      padding-right: 0;
    }
  }

  &__label {
    color: $main-color;
    width: $padding-row;
    flex: 0 0 auto;
    padding-right: 1rem;
  }

  @media screen and (max-width: 900px) {
    &__inner {
      flex-direction: column;
      height: auto;
      padding-left: 0;
      padding-right: 0;
    }

    &__label {
      display: block;
      padding-bottom: $main-padding;
    }
  }
}
</style>
