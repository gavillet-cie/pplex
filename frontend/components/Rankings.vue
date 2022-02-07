<template lang="pug">
  .rankings
    row.rankings__item(
      v-for="(item, index) in rankings"
      v-animate
      :key="index"
      :label="item.year"
      :noPadding="true"
    )
      .rankings__item-images
        img.rankings__item-image(
          v-for="image in item.images"
          :src="getImageUrl(image.url)"
        )
</template>

<script>
import { getImageUrl } from '@/utils/api'
import Row from '@/components/Row'

export default {
  components: { Row },
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
@import '../styles/mixins';

.rankings {
  &__item {
    display: flex;
    min-height: 10rem;
    color: $main-color;
    @include v-main-padding;

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
      flex-wrap: wrap;
      margin-top: -$menu-margin;
    }

    &-image {
      margin-top: $menu-margin;
      margin-right: $menu-margin;
      height: 8rem;
      max-width: 15rem;
      object-fit: contain;
      object-position: 0 0;
    }
  }

  @media screen and (max-width: 900px) {
    &__item {
      &-images {
        width: 100%;
      }
    }
  }
}
</style>
