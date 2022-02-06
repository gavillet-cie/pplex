<template lang="pug">
  ul.list(
    :class="listCssClasses"
  )
    template(
      v-if="(filteredItems || []).length > 0"
    )
      row.list__item(
        v-for="(item, index) in filteredItems"
        :key="index"
        :label="formatRawText(item.label)"
        :noPadding="true"
      )
        li.list__item-inner(
          v-bind="getItemAttributes(item)"
        )
          .list__item-content
            .list__item-content-text(
              v-if="item.text"
              v-html="formatHtmlText(item.text)"
            )

          add-icon.list__item-icon

    row.list__item(
      v-else
    ) {{ getLabel('empty-list', labels, 'Empty list') }}
</template>

<script>
import { mapGetters } from 'vuex'
import { formatRawText, formatHtmlText } from '@/utils/text'
import { getLabel } from '@/utils/labels'
import AddIcon from '@/components/AddIcon'
import Row from '@/components/Row'

export default {
  components: { AddIcon, Row },

  props: {
    items: {
      type: Array,
      default: () => [],
    },

    addIcon: {
      type: Boolean,
      default: true,
    },

    expand: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapGetters(['lang', 'labels']),
    listCssClasses() {
      return {
        'list--hide-add': !this.addIcon,
        'list--expand': this.expand,
      }
    },

    filteredItems() {
      return (this.items || []).filter((it) => it.text)
    },
  },

  methods: {
    formatRawText,
    formatHtmlText,
    getLabel,
    getItemAttributes(item) {
      return {
        is: item?.url ? (item?.external ? 'a' : 'nuxt-link') : 'div',
        to: item?.url && !item?.external ? item.url : null,
        href: item?.url && item?.external ? item.url : null,
        target: item?.external ? '_blank' : null,
      }
    },
  },
}
</script>

<style lang="scss">
@import '../styles/mixins';

.list {
  $l: &;

  &__item {
    $i: &;
    @include text-padding;

    &:last-child {
      padding-bottom: $main-padding;
    }

    &-inner {
      display: flex;
      width: 100%;

      &:hover {
        text-decoration: none;
      }
    }

    & + & {
      border-top: $border;
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

      #{$l}--hide-add & {
        padding-right: 0;
      }
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

      #{$l}--expand & {
        display: block;
      }

      #{$i}-content-title + & {
        margin-top: 1rem;
      }

      p {
        display: contents;

        #{$l}--expand & {
          display: initial;
        }
      }

      a {
        color: black;
        pointer-events: none;
      }
    }

    &-icon {
      width: 1.5rem;
      height: 1.5rem;
      flex: 0 0 auto;

      #{$l}--hide-add & {
        display: none;
      }
    }
  }

  @media screen and (max-width: 900px) {
    &__item {
      position: relative;

      &-inner {
        flex-direction: column;
      }

      &-label {
        margin-bottom: $main-padding;
      }

      &-content {
        padding-right: 0;
      }

      &-icon {
        position: absolute;
        top: $main-padding;
        right: 0;
      }
    }
  }
}
</style>
