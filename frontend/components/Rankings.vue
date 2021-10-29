<template lang="pug">
  .rankings
    .rankings__item(
      v-for="item in rankings"
    )
      .rankings__item-year {{ item.year }}
      .rankings__item-images
        img.rankings__item-image(
          v-for="image in item.images"
          :src="getImageUrl(image.url)"
        )
</template>

<script>
import { getImageUrl } from '@/utils/api'

export default {
  props: {
    rankings: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    getImageUrl,
  },
}
</script>

<style lang="scss">
.rankings {
  &__item {
    display: flex;
    height: 15rem;
    padding: $main-padding 0;
    color: $main-color;

    & + & {
      border-top: $border;
    }

    &-year {
      flex: 0 0 auto;
      width: $padding-row;
    }

    &-images {
      display: flex;
      flex: 1 1 auto;
      width: 50%;
    }

    &-image {
      & + & {
        margin-left: $main-padding;
      }
    }
  }
}
</style>
