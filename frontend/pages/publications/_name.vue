<template lang="pug">
  .publication
    centered-wrapper
      .publication__file
        iframe(
          :src="getImageUrl(file.url)"
        )
</template>

<script>
import { decode } from 'html-entities'
import { get, getImageUrl } from '@/utils/api'
import CenteredWrapper from '@/components/CenteredWrapper'

export default {
  components: { CenteredWrapper },

  async asyncData({ store, params }) {
    const { language, name } = params
    store.commit('setBigMenu', false)
    const [publication] = await Promise.all([
      get(`/publications/${name}`, language),
    ])

    return {
      ...publication,
    }
  },

  head() {
    return {
      title: this.title ? `${decode(this.title)} - PYTHON` : 'PYTHON',
    }
  },

  methods: {
    getImageUrl,
  },
}
</script>

<style lang="scss">
@import '../../styles/mixins';

.publication {
  &__file {
    position: relative;
    width: 100%;
    padding-top: 141.42%;
    margin: $section-margin-bottom 0;
  }

  iframe {
    border: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
