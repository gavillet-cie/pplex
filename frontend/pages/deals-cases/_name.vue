<template lang="pug">
  post-page.case(
    :post="post"
  )
</template>

<script>
import { get } from '@/utils/api'
import PostPage from '@/components/PostPage'

export default {
  components: { PostPage },

  async asyncData({ store, params }) {
    try {
      const { language, name } = params
      store.commit('setBigMenu', true)
      const post = await get(`/deals-cases/${name}`, language)
      store.commit('setTitle', post.title)
      store.commit('setPageDescription', post.content)
      return { post }
    } catch (error) {
      store.commit('setError', error)
    }
  },
}
</script>
