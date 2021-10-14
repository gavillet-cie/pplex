<template lang="pug">
  .add-icon
    .add-icon__lines
      .add-icon__line
      .add-icon__line
</template>

<style lang="scss">
.add-icon {
  &__lines {
    position: relative;
    width: 100%;
    height: 100%;
  }

  &__line {
    width: 100%;
    border-top: solid 2px black;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    &:nth-child(2) {
      transform: translate(-50%, -50%) rotate(90deg);
    }
  }
}
</style>
