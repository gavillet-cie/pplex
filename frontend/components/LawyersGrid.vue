<template lang="pug">
  .lawyer-grid
    .lawyer-grid__items
      .lawyer-grid__item(
        v-for="(lawyer, index) in lawyers"
        ref="lawyers"
        :key="lawyer.name"
        :name="lawyer.name"
        @click="toggleActiveLawyerIndex(lawyer)"
      )
        .lawyer-grid__item-content
          .lawyer-grid__portrait
            img(
              :src="getImageUrl(lawyer.portrait.url)"
              :style="getImageCssStyle(lawyer.portrait)"
            )

          .lawyer-grid__info
            .lawyer-grid__name
              span {{ lawyer.title }}

            .lawyer-grid__status
              span {{ lawyer.status }}

        .lawyer-grid__infos(
          v-if="index === activeLawyerIndex"
          @click.native.stop
        )
          add-icon.lawyer-grid__infos-add
          lawyer-infos(
            v-bind="lawyer"
            :showPortrait="true"
            :reduceInfo="true"
          )
</template>

<script>
import { mapGetters } from 'vuex'
import scrollIntoView from 'smooth-scroll-into-view-if-needed'
import { getUrl, getImageUrl } from '@/utils/api'
import { getImageCssStyle } from '@/utils/images'
import LawyerInfos from '@/components/LawyerInfos'
import AddIcon from '@/components/AddIcon'

export default {
  components: { LawyerInfos, AddIcon },

  props: {
    lawyers: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      activeLawyerIndex: -1,
    }
  },

  computed: {
    ...mapGetters(['lang']),
  },

  methods: {
    getImageUrl,
    getUrl,
    getImageCssStyle,
    toggleActiveLawyerIndex(lawyer) {
      const index = this.lawyers?.indexOf(lawyer)
      const element = this.$refs.lawyers.find(
        (it) => it.getAttribute('name') === lawyer.name
      )

      scrollIntoView(element, {
        block: 'start',
        behavior: 'smooth',
      })

      this.activeLawyerIndex = this.activeLawyerIndex === index ? -1 : index
    },
  },
}
</script>

<style lang="scss">
.lawyer-grid {
  $l: &;

  &__items {
    display: flex;
    flex-wrap: wrap;
    margin: -$menu-margin * 0.5;
  }

  &__item {
    flex: 0 0 auto;
    width: 25%;
    cursor: pointer;

    &-content {
      padding: $menu-margin * 0.5;
    }

    @for $i from 1 through 300 {
      &:nth-child(#{$i}) #{$l}__infos {
        $index: ($i - 1) % 4;

        margin-left: calc(#{-100% * $index} + #{$menu-margin * 0.5});
        margin-right: calc(#{-100% * (3 - $index)} + #{$menu-margin * 0.5});
      }
    }
  }

  &__portrait {
    position: relative;
    width: 100%;
    padding-top: 110%;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
    }
  }

  &__info {
    padding: $main-padding 0 $main-padding - $menu-margin * 0.5;
    line-height: 1.3;
    font-size: $default-font-size;
  }

  &__infos {
    display: block;
    border-top: $border;
    border-bottom: $border;
    padding: $menu-margin 0;
    margin-bottom: calc(#{$section-margin-bottom} - #{$menu-margin * 0.5});
    position: relative;
    z-index: 5;

    &:hover {
      text-decoration: none;
    }

    &-add {
      width: 2rem;
      height: 2rem;
      position: absolute;
      top: 0;
      right: 0;
      margin-top: $main-padding;
      color: black;
    }
  }

  @media screen and (max-width: 900px) {
    &__item {
      width: 50%;

      @for $i from 1 through 300 {
        &:nth-child(#{$i}) #{$l}__infos {
          $index: ($i - 1) % 2;

          margin-left: calc(#{-100% * $index} + #{$menu-margin * 0.5});
          margin-right: calc(#{-100% * (1 - $index)} + #{$menu-margin * 0.5});
        }
      }
    }
  }
}
</style>
