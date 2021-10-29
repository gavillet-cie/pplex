<template lang="pug">
  nav.menu
    nuxt-link.menu__logo(:to="getUrl('/', lang)")
      svg(x="0px" y="0px" viewBox="0 0 26.5 27" style="enable-background:new 0 0 26.5 27;" xml:space="preserve")
        path(d="M26.5,16.1c-1.3,4.7-6.1,7.4-10.7,6.1c-3.9-1.1-6.5-4.6-6.4-8.6c-0.1-4.8,3.8-8.8,8.6-8.9c4-0.1,7.5,2.6,8.6,6.4V0H0v27h26.5V16.1z")

    .menu__inner
      h1.menu__title(
        v-if="bigMenu"
      ) PYTHON


      .menu__languages
        nuxt-link.menu__language(
          :to="getLangUrl('fr')"
          :class="getLanguageCssClasses('fr')"
        ) FR

        nuxt-link.menu__language(
          :to="getLangUrl('')"
          :class="getLanguageCssClasses('')"
        ) EN

      .menu__burger(
        @click="toggleMenu"
      )
        .menu__line
        .menu__line
        .menu__line

      .menu__panel(v-if="showMenu")
        h5.menu__panel-title PYTHON

        .menu__panel-sections
          nuxt-link.menu__panel-section(
            v-for="section in selectedSections"
            :key="section.name"
            :to="getUrl(`/${section.name}`, lang)"
            @click.native="toggleMenu"
          )
            span(
              v-html="section.title"
            )

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
    ...mapGetters(['lang', 'showMenu', 'bigMenu']),
    selectedSections() {
      const selectedSections = [
        'about-us',
        'lawyers',
        'our-practice-areas',
        'news',
        'careers',
        'contact',
      ]

      return this.sections.filter((it) => selectedSections.includes(it.name))
    },
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
    getLanguageCssClasses(lang) {
      return {
        'menu--highlight': lang === this.lang,
      }
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
  min-height: $menu-height;
  width: 100%;
  display: flex;
  padding-bottom: $menu-margin;

  &--highlight {
    color: $link-color !important;
  }

  &__logo {
    height: 100%;
    flex: 0 0 auto;
  }

  svg {
    fill: $main-color;
    height: 100%;
  }

  &__inner {
    display: flex;
    position: relative;
    background-color: $main-color;
    flex: 1 1 auto;
    margin-left: $menu-margin;
  }

  &__burger {
    padding: $main-padding;
    z-index: 20;
    top: 0;
    right: 0;
    width: calc($menu-height + 0.5rem - $menu-margin);
    height: calc($menu-height - $menu-margin);
    flex: 0 0 auto;
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
    font-family: $theinhardt;
    text-transform: uppercase;
    color: white;
    padding: $main-padding;
    font-size: calc(#{$menu-height} - #{$main-padding} * 2);
    width: 100%;
    flex: 1 1 auto;
    line-height: 0.95;
  }

  &__languages {
    position: relative;
    z-index: 10;
    display: flex;
    font-size: 1rem;
    align-items: center;
    width: max-content;
    flex: 0 0 auto;
    margin-right: 1rem;
    height: calc($menu-height - $menu-margin);

    a {
      color: white;
    }
  }

  &__language {
    display: block;

    & + & {
      margin-left: 0.5rem;
    }
  }

  &__panel {
    position: absolute;
    z-index: 6;
    font-size: $medium-font-size;
    top: 0;
    right: 0;
    background-color: $main-color;
    width: 100%;
    height: 100vh;
    padding: $main-padding;
    color: white;
    display: flex;

    &-title {
      font-family: $theinhardt;
      padding-right: 5rem;
      font-size: calc(#{$menu-height} - #{$main-padding} * 2);
      flex: 0 0 auto;
      line-height: 0.95;
    }

    &-sections {
      display: flex;
      flex-direction: column;
      width: 50%;
    }

    &-section {
      color: white;
    }
  }

  @media screen and (max-width: 900px) {
    &__panel {
      position: fixed;
      top: $menu-height;
      right: 0;

      &-title {
        display: none;
      }

      &-sections {
        width: 100%;
      }
    }
  }
}
</style>
