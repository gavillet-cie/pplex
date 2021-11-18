<template lang="pug">
  .centered-wrapper
    .centered-wrapper__inner(
      :style="wrapperCssStyle"
    )
      slot
</template>

<script>
export default {
  props: {
    marginLeft: {
      type: String,
      default: '',
    },
  },

  computed: {
    wrapperCssStyle() {
      return {
        marginLeft: this.marginLeft,
      }
    },
  },
}
</script>

<style lang="scss">
.centered-wrapper {
  padding: 0 $main-padding;

  &__inner {
    max-width: $wrapper-max-width;
    margin: auto;
  }

  @media screen and (max-width: 1300px) {
    &__inner {
      margin: auto !important;
    }
  }
}
</style>
