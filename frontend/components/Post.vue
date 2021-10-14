<template lang="pug">
  nuxt-link.post(
    :to="getUrl(`/${mode}/${name}`)"
  )
    .post__inner(
      v-if="mode === 'news'"
    )
      h5.post__title {{ title }}
      span.post__infos {{ infos }}
      .post__content(
        v-html="content"
      )
    .post__inner(
      v-else
    )
      h5.post__title {{ title }}
      span.post__practice-area Practice area: {{ practiceArea.title }}
      span.post__date Publication date: {{ getDate(date, lang) }}
      span.post__authors Author(s): {{ authors }}
</template>

<script>
import { mapGetters } from 'vuex'
import { getUrl } from '@/utils/api'
import { getDate } from '@/utils/dates'

export default {
  props: {
    mode: {
      type: String,
      default: 'news',
    },

    title: {
      type: String,
      default: '',
    },

    name: {
      type: String,
      default: '',
    },

    date: {
      type: String,
      default: '',
    },

    author: {
      type: Array,
      default: () => [],
    },

    content: {
      type: String,
      default: '',
    },

    practiceArea: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    ...mapGetters(['lang']),
    authors() {
      return this.author?.map((it) => it.title).join(', ')
    },

    infos() {
      return `${getDate(this.date, this.lang)}, posted by ${this.authors}`
    },
  },

  methods: {
    getUrl,
    getDate,
  },
}
</script>

<style lang="scss">
.post {
  $s: &;

  color: black;

  &:hover {
    #{$s}__title {
      text-decoration: underline;
    }
  }

  &__inner {
    padding: 1rem;
    background-color: rgb(240, 240, 240);
  }

  &__infos {
    color: $link-color;
  }

  &__content {
    line-clamp: 3;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-top: 1rem;

    p {
      display: contents;
    }
  }
}
</style>
