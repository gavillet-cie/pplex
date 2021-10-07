<template lang="pug">
  .row-wrapper
    .row-wrapper__inner
      slot
</template>

<style lang="scss">
.row-wrapper {
  &__inner {
    padding: 1rem 10rem;
    border-bottom: solid 2px;
    border-color: inherit;
  }
}
</style>
