<template lang="pug">
  .app(
    :style="appCssStyle"
  )
    main-menu
    nuxt
    main-footer
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
    ...mapGetters(['bigMenu']),
    appCssStyle() {
      return {
        '--menu-height': this.bigMenu ? this.bigMenuHeight : this.menuHeight,
        'padding-top': this.bigMenu ? this.maxMenuHeight : this.menuHeight,
      }
    },
  },

  watch: {
    $route: {
      immediate: true,
      handler(route) {
        const { language } = route.params
        this.$store.commit('setLang', language || '')
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
</style>
