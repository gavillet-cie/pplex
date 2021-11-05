<template lang="pug">
  .app(
    :style="appCssStyle"
    :class="appCssClasses"
  )
    main-menu.app__menu
    nuxt.app__content
    main-footer.app__footer
</template>

<script>
import { mapGetters } from 'vuex'
import { get } from '@/utils/api'
import MainMenu from '@/components/MainMenu'
import MainFooter from '@/components/MainFooter'

export default {
  components: { MainMenu, MainFooter },

  data() {
    return {
      routeIsChanging: false,
      maxMenuHeight: '35vh',
      bigMenuHeight: '35vh',
      menuHeight: '3rem',
      disableTransitions: false,
      percent: 0,
    }
  },

  async fetch() {
    const { labels } = await get('labels', this.lang)
    this.$store.commit('setLabels', labels)
  },

  computed: {
    ...mapGetters(['lang', 'bigMenu', 'showMenu']),
    appCssStyle() {
      return {
        '--max-menu-height': this.maxMenuHeight,
        '--menu-height': this.bigMenu ? this.bigMenuHeight : this.menuHeight,
        '--scroll-percent': this.percent,
        'padding-top': this.bigMenu ? this.maxMenuHeight : this.menuHeight,
      }
    },

    appCssClasses() {
      return {
        'app--menu-transition': this.routeIsChanging,
        'app--disable-transitions':
          this.disableTransitions && !this.routeIsChanging,
        'app--hide-content': this.showMenu,
      }
    },
  },

  watch: {
    $route: {
      immediate: true,
      handler(route) {
        const { language } = route.params
        this.$store.commit('setLang', language || '')
        this.$store.commit('setShowMenu', false)
        this.updateMenuHeight()

        get('labels', this.lang).then(({ labels }) => {
          this.$store.commit('setLabels', labels)
        })

        this.routeIsChanging = true
        setTimeout(() => {
          this.routeIsChanging = false
        }, 1000)
      },
    },

    showMenu(showMenu) {
      if (process.client) {
        if (showMenu) {
          document.body.style.overflow = 'hidden'
        } else {
          document.body.style.overflow = null
        }
      }
    },
  },

  mounted() {
    this.updateMenuHeight()

    let disableTransitionTimeout = null

    window.addEventListener('scroll', () => {
      this.disableTransitions = true
      clearTimeout(disableTransitionTimeout)
      disableTransitionTimeout = setTimeout(() => {
        this.disableTransitions = false
      }, 100)
      this.updateMenuHeight()
    })
  },

  methods: {
    updateMenuHeight() {
      if (process.client && this.bigMenu) {
        const max = window.innerHeight * 0.4
        this.bigMenuHeight = `calc(${this.maxMenuHeight} - ${Math.min(
          max,
          window.scrollY
        )}px)`

        this.percent =
          window.scrollY / (document.body.clientHeight - window.innerHeight)
      }
    },
  },
}
</script>

<style lang="scss">
@import url('../styles/main.scss');

.page-enter-active,
.page-leave-active {
  transition: opacity 0.1s;
}
.page-enter,
.page-leave-to {
  opacity: 0 !important;
}

.app {
  $a: &;

  display: flex;
  flex-direction: column;
  min-height: 100vh;
  line-height: $main-line-height;

  &--disable-transitions * {
    transition: none !important;
  }

  &__menu {
    #{$a}--menu-transition & {
      transition: height $animation-duration;
    }
  }

  &__content {
    flex: 1 1 auto;
  }

  &__content,
  &__footer {
    transition: opacity $animation-duration $animation-duration;

    #{$a}--hide-content & {
      opacity: 0;
      transition: opacity $animation-duration 0s;
    }
  }

  @media screen and (max-width: 900px) {
    --menu-height: #{$menu-height} !important;

    padding-top: #{$menu-height} !important;
  }
}

a {
  color: $link-color;
}

a:hover {
  color: $link-color;
}

input[type='text'] {
  border: none;
  display: block;
  background-color: $link-color;
  padding-left: $main-padding;
  padding-right: $main-padding;
  outline: none;
  height: 100%;
  font-size: inherit;
  font-family: inherit;
}

.nuxt-link-active {
  color: $link-color;
}

.vdp-datepicker {
  background-color: $link-color;
}

.vdp-datepicker > div {
  min-height: $default-font-size * $main-line-height;
}

.vdp-datepicker > div > input {
  padding: 0;
  min-height: $default-font-size * $main-line-height;
}
</style>
