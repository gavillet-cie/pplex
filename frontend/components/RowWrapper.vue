<template lang="pug">
  .row-wrapper(
    :class="rowWrapperCssClasses"
  )
    .row-wrapper__inner
      slot
</template>

<script>
export default {
  props: {
    border: {
      type: Boolean,
      default: true,
    },

    padding: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    rowWrapperCssClasses() {
      return {
        'row-wrapper--border': this.border,
        'row-wrapper--padding': this.padding,
      }
    },
  },
}
</script>

<style lang="scss">
.row-wrapper {
  $r: &;

  &__inner {
    padding: 0 10rem;

    #{$r}--padding & {
      padding: 1rem 10rem;
    }

    #{$r}--border & {
      border-bottom: solid 2px;
      border-color: inherit;
    }
  }

  @media screen and (max-width: 900px) {
    &__inner {
      padding: $main-padding;

      #{$r}--padding & {
        padding: 1rem $main-padding;
      }
    }
  }
}
</style>
