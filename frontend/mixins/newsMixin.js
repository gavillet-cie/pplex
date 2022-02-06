import { mapGetters } from 'vuex'
import { get } from '@/utils/api'
import { decodeText, formatRawText } from '@/utils/text'
import { getDate } from '@/utils/dates'
import CenteredWrapper from '@/components/CenteredWrapper'
import Post from '@/components/Post'
import Row from '@/components/Row'
import Slider from '@/components/Slider'

export default {
  components: { CenteredWrapper, Row, Post, Slider },

  async asyncData({ store, params }) {
    try {
      const { language, name } = params
      store.commit('setBigMenu', true)
      const post = await get(`/deals-cases/${name}`, language)
      store.commit('setTitle', post.title)
      store.commit('setPageDescription', post.content)
      return post
    } catch (error) {
      store.commit('setError', error)
    }
  },

  computed: {
    ...mapGetters(['lang']),
    authors() {
      return this.author?.map((it) => it.title).join(', ') || 'PYTHON'
    },

    info() {
      return `${getDate(this.date, this.lang)}, posted by ${this.authors}`
    },

    slideOptions() {
      return this.slides?.map((it) => ({ image: it })) || []
    },

    caseCssClasses() {
      return {
        'case--minify-title': decodeText(this.title).length > 34,
      }
    },
  },

  methods: {
    formatRawText,
  },
}
