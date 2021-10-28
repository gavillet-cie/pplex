<template lang="pug">
  ul.list
    li.list__item(v-for="item in items")
      .list__item-inner(
        :is="item.url ? 'nuxt-link' : 'div'"
        :to="item.url"
      )
        .list__item-label(
          v-if="item.label"
        ) {{ item.label }}
        .list__item-content
          .list__item-content-text(
            v-if="item.text"
            v-html="item.text"
          )
        add-icon.list__item-icon
</template>

<script>
import { mapGetters } from 'vuex'
import AddIcon from '@/components/AddIcon'
export default {
  components: { AddIcon },

  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    ...mapGetters(['lang']),
  },
}
</script>

<style lang="scss">
.list {
  &__item {
    $i: &;

    &-inner {
      padding: 1rem 0;
      display: flex;
    }

    & + & {
      border-top: solid 2px;
    }

    &-label {
      width: 10rem;
      flex: 0 0 auto;
      color: $main-color;
      padding-right: 1rem;
      white-space: nowrap;
    }

    &-content {
      width: 100%;
      flex: 1 1 auto;
      padding-right: 1rem;
    }

    &-content-title {
      display: none;
    }

    &-content-text {
      line-clamp: 3;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      color: black;

      #{$i}-content-title + & {
        margin-top: 1rem;
      }

      p {
        display: contents;
      }
    }

    &-icon {
      width: 1.5rem;
      height: 1.5rem;
      flex: 0 0 auto;
    }
  }

  @media screen and (max-width: 900px) {
    &__item {
      &-inner {
        position: relative;
        flex-direction: column;
        padding: 1rem;
      }

      &-label {
        margin-bottom: 1rem;
      }

      &-content {
        padding-right: 0;
      }

      &-icon {
        position: absolute;
        top: 1rem;
        right: 1rem;
      }
    }
  }
}
</style>
