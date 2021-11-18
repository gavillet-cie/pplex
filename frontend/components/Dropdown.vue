<template lang="pug">
  .dropdown(
    @click="toggleOptions"
    @blur="hideOptions"
    tabindex="0"
  )
    .dropdown__value
      span {{ formatRawText(selectedOption ? selectedOption.label : placeholder) }}

    .dropdown__options
      .dropdown__option(
        v-for="(option, index) in computedOptions"
        v-show="showOption(index)"
        :key="index"
        :class="getOptionCssClass(option)"
        @click="selectOption(option)"
      )
        span {{ formatRawText(option.label) }}
</template>

<script>
import { mapGetters } from 'vuex'
import { getLabel } from '@/utils/labels'
import { formatRawText, formatHtmlText } from '@/utils/text'

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
      index: -1,
      animationInterval: null,
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

  watch: {
    showOptions(show) {
      clearInterval(this.animationInterval)
      this.animationInterval = setInterval(() => {
        this.index += show ? 1 : -1
        if (this.index >= this.computedOptions.length || this.index <= -1) {
          clearInterval(this.animationInterval)
        }
      }, 20)
    },
  },

  methods: {
    getLabel,
    formatRawText,
    formatHtmlText,
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

    showOption(index) {
      return index <= this.index
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
      font-size: $default-font-size;
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
    width: calc(200% - $menu-margin);
    background-color: white;
    z-index: 10;
  }

  &__option {
    font-size: $default-font-size;
    border-top: $border;
    padding: $menu-margin 0;
    color: $link-color;
    line-height: 1.2;

    &--active,
    &:hover {
      position: relative;
      z-index: 10;
      background-color: $main-color;
      color: white;
      padding-left: $menu-margin;
      border-bottom: $border;
      border-color: $main-color;
      margin-bottom: -$border-width;
    }
  }

  @media screen and (max-width: 900px) {
    &__options {
      width: 100%;
    }
  }
}
</style>
