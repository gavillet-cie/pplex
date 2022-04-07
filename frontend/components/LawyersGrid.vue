<template lang="pug">
  main.lawyer-grid
    .lawyer-grid__items
      .lawyer-grid__item(
        v-for="(lawyer, index) in lawyers"
        v-animate
        ref="lawyers"
        :key="lawyer.name"
        :name="lawyer.name"
        :class="getItemCssClasses(lawyer)"
        @click="toggleActiveLawyerIndex(lawyer)"
      )
        section.lawyer-grid__item-content
          .lawyer-grid__portrait
            img(
              :src="getImageUrl(getPortraitUrl(lawyer))"
              :style="getImageCssStyle(lawyer.portrait)"
              :alt="lawyer.description || lawyer.title || ''"
            )

          .lawyer-grid__info
            .lawyer-grid__name
              h3 {{ lawyer.title }}

            .lawyer-grid__status
              span {{ lawyer.status }}

        .lawyer-grid__infos(
          v-if="index === activeLawyerIndex"
          @click.stop
        )
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

export default {
  components: { LawyerInfos },

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
    getPortraitUrl(lawyer) {
      return lawyer?.portrait?.url
    },
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
    getItemCssClasses(lawyer) {
      const index = this.lawyers?.indexOf(lawyer)
      return {
        'lawyer-grid--faded':
          this.activeLawyerIndex > -1 && index !== this.activeLawyerIndex,
        'lawyer-grid--active':
          this.activeLawyerIndex > -1 && index === this.activeLawyerIndex,
      }
    },
  },
}
</script>

<style lang="scss">
.lawyer-grid {
  $l: &;

  &--faded {
    opacity: 0.5;
  }

  &--active {
    z-index: 5;
  }

  &__name {
    color: $main-color;
  }

  &__items {
    display: flex;
    flex-wrap: wrap;
    margin: -$menu-margin * 0.5;
  }

  &__item {
    flex: 0 0 auto;
    width: 25%;
    cursor: pointer;
    transition: opacity $animation-duration, transform $animation-duration !important;

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
    padding: #{$main-padding * 0.5} 0 #{$main-padding * 1.2};
    line-height: 1.3;
    font-size: $small-font-size;
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
