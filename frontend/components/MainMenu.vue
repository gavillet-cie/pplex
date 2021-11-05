<template lang="pug">
  nav.menu(
    :class="menuCssClasses"
  )
    nuxt-link.menu__logo(:to="getUrl('/', lang)")
      svg(x="0px" y="0px" viewBox="0 0 26.5 27" style="enable-background:new 0 0 26.5 27;" xml:space="preserve")
        path(d="M26.5,16.1c-1.3,4.7-6.1,7.4-10.7,6.1c-3.9-1.1-6.5-4.6-6.4-8.6c-0.1-4.8,3.8-8.8,8.6-8.9c4-0.1,7.5,2.6,8.6,6.4V0H0v27h26.5V16.1z")

    .menu__inner
      .menu__title(
        v-if="bigMenu"
      )
        img(
          src="~/static/LOGO_PYTHON.svg"
        )


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

      .menu__panel
        .menu__panel-inner
          .menu__panel-sections
            nuxt-link.menu__panel-section(
              v-for="section in selectedSections"
              :key="section.name"
              :to="getUrl(`/${section.name}`, lang)"
              @click.native="hideMenu"
            )
              span {{ formatRawText(section.title) }}

</template>

<script>
import { mapGetters } from 'vuex'
import { get, getUrl } from '../utils/api'
import { formatRawText } from '../utils/text'

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

    menuCssClasses() {
      return {
        'menu--open': this.showMenu,
      }
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
    formatRawText,
    toggleMenu() {
      this.$store.commit('setShowMenu', !this.showMenu)
    },

    hideMenu() {
      this.$store.commit('setShowMenu', false)
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
  $m: &;

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
    position: relative;
    padding: $main-padding $main-padding;
    z-index: 20;
    top: 0;
    right: 0;
    width: max(
      min(var(--menu-height), #{$max-menu-font-size}),
      #{$menu-height}
    );
    height: calc(#{$max-menu-font-size * 0.4} + #{$main-padding * 2});
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;

    #{$m}--open & {
      div {
        display: none;
      }

      div:first-child,
      div:last-child {
        display: block;
        position: absolute;
        width: 65%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
      }

      div:last-child {
        transform: translate(-50%, -50%) rotate(-45deg);
      }
    }
  }

  &__line {
    width: 100%;
    border-top: solid white 2px;
  }

  &__title {
    will-change: height;
    transform: translate3d(0, 0, 1px);
    position: relative;
    pointer-events: none;
    z-index: 20;
    font-family: $theinhardt;
    text-transform: uppercase;
    color: white;
    padding: $main-padding 0.7rem;
    height: 100%;
    flex: 1 1 auto;
    margin-top: -1px;
    transition: height $animation-duration $animation-duration;

    #{$m}--open & {
      height: calc(#{$max-menu-font-size * 0.4} + #{$main-padding * 2});
      transition: height $animation-duration 0s;
    }

    img {
      height: 100%;
      max-height: $max-menu-font-size;
      object-fit: contain;
      object-position: 0 0;
    }
  }

  &__languages {
    position: relative;
    z-index: 7;
    display: flex;
    font-size: 1rem;
    padding: $main-padding 0;
    width: max-content;
    flex: 0 0 auto;
    line-height: 0.7;
    margin-right: 6rem;
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
    will-change: height;
    overflow: hidden;
    display: flex;
    pointer-events: none;
    position: absolute;
    z-index: 6;
    font-size: $medium-font-size;
    top: 0;
    right: 0;
    background-color: $main-color;
    width: 100%;
    height: 100%;
    color: white;
    transition: height $animation-duration $animation-duration;

    &-inner {
      padding: $main-padding;
      padding-left: 25%;
    }

    #{$m}--open & {
      pointer-events: initial;
      height: 100vh;
    }

    &-sections {
      display: flex;
      flex-direction: column;
    }

    &-section {
      color: white;
      font-size: $medium-font-size;
      line-height: 1;
      opacity: 0;
      transition: opacity $animation-duration 0s;

      #{$m}--open & {
        opacity: 1;
        transition: opacity $animation-duration $animation-duration;
      }
    }
  }

  @media screen and (max-width: 900px) {
    &__panel {
      position: fixed;
      top: $menu-height;
      right: 0;
      height: 0;
      overflow: hidden;

      &-inner {
        padding-left: $main-padding;
      }

      #{$m}--open & {
        height: calc(100vh - #{$menu-height});
        transition: height $animation-duration 0s;
      }

      &-sections {
        width: 100%;
      }
    }
  }
}
</style>
