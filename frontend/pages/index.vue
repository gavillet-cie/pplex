<template lang="pug">
  .home {{ title }}
</template>

<script>
export default {
  async asyncData({ params, $http }) {
    const { language } = params
    const data = await $http.$get(language ? `/${language}` : '/')
    return data
  },
}
</script>
