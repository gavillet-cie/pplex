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

  position: relative;
  padding-bottom: $main-padding * 2;

  & + & {
    border-top: $border;
  }

  &__title {
    display: block;
    position: absolute;
    color: $secondary-color;
    width: $padding-row;

    #{$r}--padding & {
      padding: $menu-margin 0;
    }
  }

  &__inner {
    padding: 0 $padding-row;

    #{$r}--padding & {
      padding: $menu-margin $padding-row;
    }
  }

  @media screen and (max-width: 900px) {
    &__title {
      position: relative;
      width: 100%;
      padding: $main-padding $main-padding 0;

      #{$r}--padding & {
        padding: $main-padding $main-padding 0;
      }
    }

    &__inner {
      padding: $main-padding;

      #{$r}--padding & {
        padding: $menu-margin $main-padding;
      }
    }
  }
}
</style>
