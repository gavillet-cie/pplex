<template lang="pug">
  .app(
    :style="appCssStyle"
  )
    main-menu
    nuxt
</template>

<script>
import MainMenu from '@/components/MainMenu'
export default {
  components: { MainMenu },
  data() {
    return {
      menuHeight: 40,
    }
  },

  computed: {
    appCssStyle() {
      return {
        '--menu-height': `${this.menuHeight}vh`,
      }
    },
  },
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  font-family: Helvetica, Arial, sans-serif;
}

h1,
h2,
h3,
h4,
h5 {
  margin: 0;
  color: inherit;
  font-weight: normal;
  font-size: inherit;
}
</style>