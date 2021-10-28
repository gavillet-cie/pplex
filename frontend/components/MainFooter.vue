<template lang="pug">
  footer.main-footer
    img.main-footer__icon(
      src="~/static/linkedin-logo.svg"
    )

    img.main-footer__icon(
      src="~/static/twitter-logo.svg"
    )

    img.main-footer__icon(
      src="~/static/mail-logo.svg"
    )

</template>

<script>
import { mapGetters } from 'vuex'
import { getLabel } from '@/utils/labels'
import CenteredWrapper from '@/components/CenteredWrapper'
import Logo from '@/components/Logo'

export default {
  components: { CenteredWrapper, Logo },

  computed: {
    ...mapGetters(['labels']),
  },

  methods: {
    getLabel,
  },
}
</script>

<style lang="scss">
.main-footer {
  overflow: hidden;
  background-color: $main-color;
  display: flex;
  justify-content: center;
  padding: 3rem;

  &__icon {
    & + & {
      margin-left: 2rem;
    }
  }
}
</style>
