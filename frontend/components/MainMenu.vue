<template lang="pug">
  nav.menu
    nuxt-link.menu__logo(:to="getUrl('/', lang)")
      svg(x="0px" y="0px" viewBox="0 0 26.5 27" style="enable-background:new 0 0 26.5 27;" xml:space="preserve")
        path(d="M26.5,16.1c-1.3,4.7-6.1,7.4-10.7,6.1c-3.9-1.1-6.5-4.6-6.4-8.6c-0.1-4.8,3.8-8.8,8.6-8.9c4-0.1,7.5,2.6,8.6,6.4V0H0v27h26.5V16.1z")

    .menu__inner
      .menu__burger(
        @click="toggleMenu"
      )
        .menu__line
        .menu__line
        .menu__line

      h1.menu__title Python

      .menu__panel(v-if="showMenu")
        h5.menu__panel-title PYTHON

        .menu__panel-sections
          nuxt-link.menu__panel-section(
            v-for="section in sections"
            :key="section.name"
            :to="getUrl(`/${section.name}`, lang)"
          )
            span {{ section.title }}

        .menu__panel-languages
          nuxt-link.menu__panel-language(
            :to="getLangUrl('fr')"
          ) FR
          nuxt-link.menu__panel-language(
            :to="getLangUrl('')"
          ) EN

</template>

<script>
import { mapGetters } from 'vuex'
import { get, getUrl } from '../utils/api'

export default {
  data() {
    return {
      sections: [],
    }
  },

  async fetch() {
    const { sections } = await get('/', this.lang)
    this.sections = sections
  },

  computed: {
    ...mapGetters(['lang', 'showMenu']),
  },

  watch: {
    async $route() {
      const { sections } = await get('/', this.lang)
      this.sections = sections
    },
  },

  methods: {
    getUrl,
    toggleMenu() {
      this.$store.commit('setShowMenu', !this.showMenu)
    },
    getLangUrl(lang) {
      const { fullPath, params } = this.$route
      const currentPath = params.language
        ? fullPath.replace(params.language, '')
        : fullPath
      return getUrl(currentPath, lang)
    },
  },
}
</script>

<style lang="scss">
.menu {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  height: var(--menu-height);
  min-height: 4rem;
  width: 100%;
  display: flex;
  padding-bottom: $menu-margin;

  &__logo {
    height: 100%;
    flex: 0 0 auto;
  }

  svg {
    fill: $main-color;
    height: 100%;
  }

  &__inner {
    position: relative;
    background-color: $main-color;
    flex: 1 1 auto;
    margin-left: $menu-margin;
  }

  &__burger {
    padding: $main-padding;
    position: absolute;
    z-index: 20;
    top: 0;
    right: 0;
    width: 50px;
    height: 45px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
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
    padding: $menu-margin;
    font-size: 3rem;
  }

  &__panel {
    position: absolute;
    top: 0;
    right: 0;
    background-color: $main-color;
    width: 100%;
    height: 100vh;
    padding: $main-padding;
    color: white;
    display: flex;

    &-title {
      width: 20%;
      flex: 0 0 auto;
    }

    &-sections {
      display: flex;
      flex-direction: column;
      width: 50%;
    }
  }
}
</style>
