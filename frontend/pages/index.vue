<template lang="pug">
  .home {{ title }}
</template>

<script>
export default {
  async asyncData({ params, $http }) {
    const { language } = params
    const data = await fetch(
      `https://api-pplex.gavillet-cie.com${language ? `/${language}` : '/'}`
    ).then((res) => res.json())
    return data
  },
}
</script>
