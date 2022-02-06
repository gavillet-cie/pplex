<template lang="pug">
  footer.main-footer
    a.main-footer__icon(
      href="https://www.linkedin.com/company/python-&-peter/"
      target="_blank"
    )
      img(
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

  a {
    display: block;
  }

  &__icon {
    height: 2rem;
    & + & {
      margin-left: 2rem;
    }
  }
}
</style>
