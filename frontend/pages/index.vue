<template lang="pug">
  .home
</template>

<script>
export default {
  async asyncData({ params }) {
    const { language } = params
    const data = await fetch(
      `https://api-pplex.gavillet-cie.com${language ? `/${language}` : '/'}`
    ).then((res) => res.json())
    return data
  },
}
</script>

<style lang="scss">
.home {
  height: calc(100vh - var(--menu-height));
}
</style>
