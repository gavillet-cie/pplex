<template lang="pug">
  .app(
    v-if="!error"
    :style="appCssStyle"
    :class="appCssClasses"
  )
    main-menu.app__menu
    nuxt.app__content
    main-footer.app__footer
  error(
    v-else
  )

</template>

<script>
import { mapGetters } from 'vuex'
import config from '../config'
import { get, sanitizeUrl } from '@/utils/api'
import MainMenu from '@/components/MainMenu'
import MainFooter from '@/components/MainFooter'
import Error from '@/components/ErrorComponent'

const { ROOT_URL } = config

const baseFontSize = 16
const maxMenuHeight = 0.35
const menuHeight = 3 * baseFontSize

export default {
  components: { MainMenu, MainFooter, Error },

  data() {
    return {
      routeIsChanging: false,
      maxMenuHeight: `${maxMenuHeight * 100}vh`,
      bigMenuHeight: `${maxMenuHeight * 100}vh`,
      menuHeight: `${menuHeight}px`,
      disableTransitions: false,
      percent: 0,
    }
  },

  async fetch() {
    try {
      const { labels } = await get('labels', this.lang)
      this.$store.commit('setLabels', labels)
    } catch (error) {
      this.$store.commit('setError', error)
    }
  },

  head() {
    return {
      title: this.title || 'PYTHON',
      meta: [
        {
          name: 'description',
          content: this.pageDescription || '',
        },
        {
          property: 'og:title',
          content: this.title || 'PYTHON',
        },
        {
          property: 'og:description',
          content: this.pageDescription || '',
        },
        {
          property: 'og:url',
          content: sanitizeUrl(`${ROOT_URL}/${this.$route.path}`),
        },
        {
          property: 'og:site_name',
          content: 'PYTHON',
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
      ],
    }
  },

  computed: {
    ...mapGetters([
      'lang',
      'bigMenu',
      'showMenu',
      'error',
      'title',
      'pageDescription',
    ]),
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

        get('labels', this.lang)
          .then(({ labels }) => {
            this.$store.commit('setLabels', labels)
          })
          .catch((error) => {
            this.$store.commit('setError', error)
          })

        this.routeIsChanging = true
        this.$store.commit('setPageTitle', '')
        setTimeout(() => {
          this.routeIsChanging = false
          get(route.path).then((res) => {
            this.$store.commit('setPageTitle', res.title)
          })
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

    window.addEventListener('resize', () => {
      this.disableTransitions = true
      clearTimeout(disableTransitionTimeout)
      disableTransitionTimeout = setTimeout(() => {
        this.disableTransitions = false
      }, 100)
    })
  },

  methods: {
    updateMenuHeight() {
      if (process.client && this.bigMenu) {
        const isSmall =
          window.innerHeight * maxMenuHeight - menuHeight - window.scrollY <= 0

        this.$store.commit('setMenuState', isSmall)

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

.error {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  img {
    height: 40px;
  }
}

a {
  color: $link-color;
  cursor: pointer;
}

.link,
p > a {
  &:hover {
    color: $main-color;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      bottom: 0.1rem;
      left: 0;
      width: 100%;
      border-bottom: $border;
      border-color: $main-color;
    }
  }
}

input[type='text'] {
  border: none;
  display: block;
  background-color: rgb(235, 235, 235);
  padding-left: $main-padding;
  padding-right: $main-padding;
  outline: none;
  height: 100%;
  font-size: inherit;
  font-family: inherit;
}

strong {
  font-family: Rand-Medium, Helvetica, Arial, sans-serif;
  color: $main-color;
}

em {
  font-family: Rand-Medium-Italic, Helvetica, Arial, sans-serif;
}

strong > em,
em > strong {
  font-family: Rand-Medium-Italic, Helvetica, Arial, sans-serif;
  color: $main-color;
}

.nuxt-link-active {
  color: $link-color;
}

.vdp-datepicker {
  background-color: white;

  input {
    background-color: white;
    color: black;

    &::placeholder {
      color: black;
      opacity: 1;
    }
  }
}

.vdp-datepicker__calendar {
  bottom: 0;
  transform: translate(0, 100%);
  border-color: black !important;
}

.vdp-datepicker__calendar .cell:hover {
  border-color: transparent !important;
  background-color: $main-color !important;
  color: white !important;

  & > * {
    color: white !important;
    border-color: white;
  }
}

.vdp-datepicker__calendar header .prev:hover,
.vdp-datepicker__calendar header .next:hover,
.vdp-datepicker__calendar header .day__month_btn:hover {
  border-color: transparent !important;
  background-color: $main-color !important;
  color: white !important;
}

.vdp-datepicker > div {
  min-height: $default-font-size * $main-line-height;
}

.vdp-datepicker > div > input {
  padding-top: 0;
  padding-bottom: 0;
  min-height: $default-font-size * $main-line-height;
}
</style>
