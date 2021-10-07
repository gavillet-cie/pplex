<template lang="pug">
  footer.main-footer
    logo.main-footer__logo
    centered-wrapper
      p
        | PYTHON est un cabinet d’avocats d’affaires réputé établi en
        | 1981 avec cinq bureaux en Suisse et une présence dans l’UE.
        | Nos avocats compétents, expérimentés et multilingues sont grandement
        | appréciés pour leur orientation clients et leur engagement de
        | respect de nos principes fondamentaux d’efficacité, de flexibilité,
        | d’indépendance, de haute qualité et de créativité.

      h1 Rester en contact


</template>

<script>
import CenteredWrapper from '@/components/CenteredWrapper'
import Logo from '@/components/Logo'

export default {
  components: { CenteredWrapper, Logo },
}
</script>

<style lang="scss">
.main-footer {
  background-color: $main-color;
  color: white;

  &__logo {
    flex: 0 0 auto;
  }
}
</style>
