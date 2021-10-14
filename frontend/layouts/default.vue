<template lang="pug">
  .app(
    :style="appCssStyle"
  )
    main-menu
    nuxt.app__content(:style="contentCssStyle")
    main-footer(:style="contentCssStyle")
</template>

<script>
import { mapGetters } from 'vuex'
import MainMenu from '@/components/MainMenu'
import MainFooter from '@/components/MainFooter'

export default {
  components: { MainMenu, MainFooter },

  data() {
    return {
      maxMenuHeight: '28vh',
      bigMenuHeight: '28vh',
      menuHeight: '4rem',
    }
  },

  computed: {
    ...mapGetters(['bigMenu', 'showMenu']),
    appCssStyle() {
      return {
        '--max-menu-height': this.maxMenuHeight,
        '--menu-height': this.bigMenu ? this.bigMenuHeight : this.menuHeight,
        'padding-top': this.bigMenu ? this.maxMenuHeight : this.menuHeight,
      }
    },

    contentCssStyle() {
      return {
        opacity: this.showMenu ? 0 : 1,
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
      },
    },
  },

  mounted() {
    this.updateMenuHeight()
    window.addEventListener('scroll', this.updateMenuHeight)
  },

  methods: {
    updateMenuHeight() {
      if (process.client && this.bigMenu) {
        const max = window.innerHeight * 0.4
        this.bigMenuHeight = `calc(${this.maxMenuHeight} - ${Math.min(
          max,
          window.scrollY
        )}px)`
      }
    },
  },
}
</script>

<style lang="scss">
@import url('../styles/main.scss');

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  line-height: $main-line-height;

  &__content {
    flex: 1 1 auto;
  }

  @media screen and (max-width: 900px) {
    --menu-height: 4rem !important;

    padding-top: 4rem !important;
  }
}

a {
  color: $link-color;
}

input[type='text'] {
  border: none;
  background-color: lightgray;
  padding: 0.5rem;
}

.nuxt-link-active {
  color: $secondary-color !important;
}
</style>
