<template lang="pug">
  .dropdown(
    @click="toggleOptions"
    @blur="hideOptions"
    tabindex="0"
  )
    .dropdown__value
      span(v-html="selectedOption ? selectedOption.label : placeholder")

    .dropdown__options(
      v-show="showOptions"
    )
      .dropdown__option(
        v-for="(option, index) in computedOptions"
        :key="index"
        :class="getOptionCssClass(option)"
        @click="selectOption(option)"
      )
        span(v-html="option.label")
</template>

<script>
import { mapGetters } from 'vuex'
import { getLabel } from '@/utils/labels'

export default {
  props: {
    placeholder: {
      type: String,
      default: '',
    },

    options: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      selectedOption: null,
      showOptions: false,
    }
  },

  computed: {
    ...mapGetters(['labels']),
    computedOptions() {
      return [
        { label: this.getLabel('all', this.labels), name: null },
        ...this.options,
      ]
    },
  },

  methods: {
    getLabel,
    getOptionCssClass(option) {
      return {
        'dropdown__option--active': option === this.selectedOption,
      }
    },

    toggleOptions() {
      this.showOptions = !this.showOptions
    },

    hideOptions() {
      this.showOptions = false
    },

    selectOption(option) {
      this.selectedOption = option
      this.$emit('selected', option)
    },
  },
}
</script>

<style lang="scss">
.dropdown {
  position: relative;
  cursor: pointer;
  user-select: none;

  &__value {
    display: flex;
    align-items: center;
    height: 100%;

    span {
      display: block;
      width: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  &__options {
    position: absolute;
    top: 100%;
    width: 100%;
    background-color: white;
    z-index: 10;
  }

  &__option {
    &--active,
    &:hover {
      background-color: lightgray;
    }
  }
}
</style>
