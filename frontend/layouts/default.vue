<template lang="pug">
  .app(
    :style="appCssStyle"
  )
    main-menu
    nuxt(:style="contentCssStyle")
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
      maxMenuHeight: '40vh',
      bigMenuHeight: '40vh',
      menuHeight: '4rem',
    }
  },

  computed: {
    ...mapGetters(['bigMenu', 'showMenu']),
    appCssStyle() {
      return {
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
        this.bigMenuHeight = `calc(${this.maxMenuHeight} - ${window.scrollY}px)`
      }
    },
  },
}
</script>

<style lang="scss">
@import url('../styles/main.scss');

.app {
  @media screen and (max-width: 900px) {
    --menu-height: 4rem !important;

    padding-top: 4rem !important;
  }
}
</style>
