<template lang="pug">
  nav.menu
    .menu__logo
      svg(x="0px" y="0px" viewBox="0 0 26.5 27" style="enable-background:new 0 0 26.5 27;" xml:space="preserve")
        path(d="M26.5,16.1c-1.3,4.7-6.1,7.4-10.7,6.1c-3.9-1.1-6.5-4.6-6.4-8.6c-0.1-4.8,3.8-8.8,8.6-8.9c4-0.1,7.5,2.6,8.6,6.4V0H0v27h26.5V16.1z")
    .menu__inner
      .menu__burger
        .menu__line
        .menu__line
        .menu__line
      h1.menu__title Python
</template>

<style lang="scss">
.menu {
  $margin: 10px;

  height: var(--menu-height);
  display: flex;
  padding-bottom: $margin;

  &__logo {
    height: 100%;
    flex: 0 0 auto;
  }

  svg {
    fill: #15497e;
    height: 100%;
  }

  &__inner {
    position: relative;
    background-color: #15497e;
    flex: 1 1 auto;
    margin-left: $margin;
  }

  &__burger {
    padding: $margin;
    position: absolute;
    top: 0;
    right: 0;
    width: 50px;
    height: 45px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__line {
    width: 100%;
    border-top: solid white;
  }

  &__title {
    position: absolute;
    bottom: 0;
    right: 0;
    text-transform: uppercase;
    color: white;
    padding: $margin;
    font-size: 3rem;
  }
}
</style>
