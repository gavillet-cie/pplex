<template lang="pug">
  footer.main-footer
    .main-footer__content
      .main-footer__logo
        logo

      p.main-footer__description
        | PYTHON est un cabinet d’avocats d’affaires réputé établi en
        | 1981 avec cinq bureaux en Suisse et une présence dans l’UE.
        | Nos avocats compétents, expérimentés et multilingues sont grandement
        | appréciés pour leur orientation clients et leur engagement de
        | respect de nos principes fondamentaux d’efficacité, de flexibilité,
        | d’indépendance, de haute qualité et de créativité.

      span.main-footer__keep-contact {{ getLabel('keepInTouch', labels) }}
      span.main-footer__linkedin Linkedin

    .main-footer__mailing-list
      centered-wrapper
        h5.main-footer__mailing-list-title {{ getLabel('subscribePublications', labels) }}
        .main-footer__mailing-list-input
          input(
            placeholder="adresse mail"
          )
          span {{ getLabel('register', labels) }}

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

  &__content {
    padding: 1rem;
    background-color: $main-color;
    color: white;
    display: flex;
  }

  &__logo {
    flex: 0 0 auto;
    width: calc((100% - $wrapper-max-width) / 2);
  }

  &__description {
    width: $wrapper-max-width * 0.6;
  }

  &__keep-contact {
    width: $wrapper-max-width * 0.4;
    font-size: 1.5rem;
    padding-left: 2rem;
  }

  &__linkedin {
    width: calc((100% - $wrapper-max-width) / 2);
    font-size: 1.5rem;
  }

  &__mailing-list {
    padding: 1rem 0;
  }

  &__mailing-list-title {
    font-size: 1.5rem;
    color: $secondary-color;
  }

  &__mailing-list-input {
    padding: 1rem 0;

    input {
      margin-right: 1rem;
      width: $wrapper-max-width * 0.6;
    }

    span {
      color: $secondary-color;
    }
  }
}
</style>
