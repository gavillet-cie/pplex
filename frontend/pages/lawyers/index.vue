<template lang="pug">
  .lawyers
    centered-wrapper
      h3.lawyers__sub-title Rencontrez nos avocats
      .lawyers__grid
        nuxt-link.lawyers__grid-item(
          v-for="lawyer in lawyers"
          :key="lawyer.name"
          :to="getUrl(`/lawyers/${lawyer.name}`, lang)"
        )
          .lawyers__portrait
            img(
              :src="getImageUrl(lawyer.portrait.url)"
              :style="getImageCssStyle(lawyer.portrait)"
            )

          .lawyers__info
            .lawyers__name
              span {{ lawyer.title }}

            .lawyers__status
              span {{ lawyer.status }}
</template>

<script>
import { mapGetters } from 'vuex'
import { get, getUrl, getImageUrl } from '@/utils/api'
import { getImageCssStyle } from '@/utils/images'
import CenteredWrapper from '@/components/CenteredWrapper'

export default {
  components: { CenteredWrapper },

  async asyncData({ store, params }) {
    const { language } = params
    store.commit('setBigMenu', false)
    const lawyers = await get('lawyers', language)
    return lawyers
  },

  computed: {
    ...mapGetters(['lang']),
  },

  methods: {
    getUrl,
    getImageUrl,
    getImageCssStyle,
  },
}
</script>

<style lang="scss">
.lawyers {
  &__sub-title {
    text-align: center;
    font-size: 4rem;
    color: $secondary-color;
    padding: 2rem 0;
  }

  &__grid {
    display: flex;
    flex-wrap: wrap;
    margin: $menu-margin * 0.5;

    &-item {
      flex: 0 0 auto;
      width: 25%;
      padding: $menu-margin * 0.5;
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
    padding: $menu-margin 0 2rem 0;
    line-height: 1.3;
  }

  @media screen and (max-width: 900px) {
    &__grid {
      &-item {
        width: 50%;
      }
    }
  }
}
</style>
