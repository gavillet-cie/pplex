<template lang="pug">
  nav.menu(
    :class="menuCssClasses"
  )
    nuxt-link.menu__logo(
      :to="getUrl('/', lang)"
    )
      img(
        src="~/static/pplex-logo-blue.svg"
      )

    .menu__inner
      .menu__title(
        v-if="bigMenu"
      )
        img(
          src="~/static/LOGO_PYTHON.svg"
        )

      h5.menu__page(
        v-if="pageTitle"
      ) {{ formatRawText(pageTitle) }}

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
              v-for="(section, index) in selectedSections"
              v-show="showSection(index)"
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
      index: -1,
      animationInterval: null,
      animationTimeout: null,
    }
  },

  async fetch() {
    const { sections } = await get('/', this.lang)
    this.sections = sections
  },

  computed: {
    ...mapGetters(['lang', 'showMenu', 'bigMenu', 'isMenuSmall', 'pageTitle']),
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
        'menu--small': this.isMenuSmall,
        'menu--title': this.pageTitle,
      }
    },
  },

  watch: {
    async $route() {
      const { sections } = await get('/', this.lang)
      this.sections = sections
    },

    showMenu(show) {
      clearInterval(this.animationInterval)
      clearTimeout(this.animationTimeout)

      if (show) {
        this.animationTimeout = setTimeout(() => {
          this.animationInterval = setInterval(() => {
            this.index += 1
            if (this.index >= this.sections.length) {
              clearInterval(this.animationInterval)
            }
          }, 20)
        }, 300)
      } else {
        this.animationInterval = setInterval(() => {
          this.index--
          if (this.index <= -1) {
            clearInterval(this.animationInterval)
          }
        }, 20)
      }
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

    showSection(index) {
      return index <= this.index
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
  transition: height 0.3s;

  &--highlight {
    color: $link-color !important;
  }

  &--open {
    height: 20rem;
  }

  &__logo {
    height: 100%;
    flex: 0 0 auto;

    img {
      fill: $main-color;
      height: 100%;
    }
  }

  &__page {
    color: white;
    opacity: 0;
    position: relative;
    z-index: 7;
    flex: 1 1 auto;
    padding: $main-padding 0;
    line-height: 2rem;
    margin-top: -7px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1; /* number of lines to show */
    line-clamp: 1;
    -webkit-box-orient: vertical;

    #{$m}--small & {
      opacity: 1;
      transition-delay: 0.5s;
    }

    #{$m}--open & {
      opacity: 0;
      transition-delay: 0s;
    }
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
    height: 44px;
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
      height: calc(#{$max-menu-font-size} - #{$menu-margin});
      transition: height $animation-duration 0s;
    }

    #{$m}--small#{$m}--title & {
      height: calc(#{$max-menu-font-size} - #{$menu-margin});
      width: 30rem;
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
    padding: $main-padding 0;
    font-size: $small-font-size;
    width: max-content;
    flex: 0 0 auto;
    line-height: 0.7;
    margin-right: 6rem;
    height: calc($menu-height - $menu-margin);

    a {
      color: white;
    }

    a:hover {
      color: $link-color;
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
    }

    a:hover {
      color: $link-color;
      text-decoration: none;
    }
  }

  @media screen and (max-width: 900px) {
    padding-bottom: $menu-margin * 0.5;

    &__inner {
      margin-left: $menu-margin * 0.5;
    }

    &--open {
      height: var(--menu-height);
    }

    &__page {
      display: none;

      #{$m}--small & {
        display: none;
      }
    }

    &__title {
      #{$m}--open & {
        height: calc(#{$max-menu-font-size} - #{$menu-margin * 0.5});
      }

      #{$m}--small#{$m}--title & {
        width: unset;
        height: calc(#{$max-menu-font-size} - #{$menu-margin * 0.5});
      }
    }

    &__languages {
      margin-right: 2rem;
      font-size: $base-font-size;
    }

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
