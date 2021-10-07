<template lang="pug">
  .centered-wrapper
    .centered-wrapper__inner
      slot
</template>

<style lang="scss">
.centered-wrapper {
  &__inner {
    max-width: $wrapper-max-width;
    margin: auto;
  }
}
</style>
