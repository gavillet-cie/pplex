<template lang="pug">
  .row-wrapper(
    :class="rowWrapperCssClasses"
  )
    span.row-wrapper__title(
      v-if="title"
    ) {{ title }}

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

    title: {
      type: String,
      default: '',
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
  $padding-h: 10rem;

  position: relative;

  &__title {
    position: absolute;
    color: $secondary-color;
    width: $padding-h;

    #{$r}--padding & {
      padding: $menu-margin 0;
    }
  }

  &__inner {
    padding: 0 $padding-h;

    #{$r}--padding & {
      padding: $menu-margin $padding-h;
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
        padding: $menu-margin $main-padding;
      }
    }
  }
}
</style>
