<template>
<div class="ato-box">
    <el-input
        :value="value"
        :size="size"
        :disabled="disabled"
        :placeholder="placeholder"
        @input="handleInput"
        @change="handleChange"
        @blur="handleBlur"
        @keydown.up.native.prevent="keyEvent('up')"
        @keydown.enter.native.prevent="keyEvent('enter')"
        @keydown.down.native.prevent="keyEvent('down')">
        <template slot="prepend" v-if="$slots.prepend">
            <slot name="prepend"></slot>
        </template>
        <template slot="append" v-if="$slots.append">
            <slot name="append"></slot>
        </template>
        <template slot="prefix" v-if="$slots.prefix">
            <slot name="prefix"></slot>
        </template>
        <template slot="suffix" v-if="$slots.suffix">
            <slot name="suffix"></slot>
        </template>
    </el-input>
    <transition name="suggestions">
        <autocompleteSuggestions :suggestions="suggestions" v-show="show" :value-key="valueKey" @select="select" :highlightedIndex="highlightedIndex" />
    </transition>
</div>
</template>

<script type="text/javascript">
import autocompleteSuggestions from './autocomplete-suggestions.vue'
export default {
  components: { autocompleteSuggestions },
  props: {
    size: String,
    disabled: Boolean,
    placeholder: String,
    value: [String, Number],
    fetchSuggestions: Function,
    debounce: {
      type: Number,
      default: 300
    },
    valueKey: {
      type: String,
      default: 'value'
    }
  },
  data () {
    return {
      loading: false,
      show: false,
      suggestionDisabled: false,
      suggestions: [],
      highlightedIndex: 0
    }
  },
  mounted () {
    this.debouncedGetData = this.createDebounce(this.getData, this.debounce)
  },
  methods: {
    select (item) {
      if (!item) return
      this.$emit('input', item[this.valueKey])
      this.$emit('select', item)
      this.$nextTick((_) => {
        this.suggestions = []
        this.highlightedIndex = 0
      })
    },
    createDebounce (cb, delay) {
      let timer = null
      return function (val) {
        if (timer !== null) clearTimeout(timer)
        timer = setTimeout(function () {
          cb(val)
        }, delay)
      }
    },
    handleChange (value) {
      this.$emit('change', value)
    },
    handleInput (value) {
      this.$emit('input', value)
      this.suggestionDisabled = false
      if (!this.triggerOnFocus && !value) {
        this.suggestionDisabled = true
        this.suggestions = []
        this.show = false
        return
      }
      this.debouncedGetData(value)
    },
    getData (queryString) {
      this.loading = true
      this.fetchSuggestions(queryString, (suggestions) => {
        this.loading = false
        if (this.suggestionDisabled) {
          return
        }
        if (Array.isArray(suggestions)) {
          this.show = suggestions.length > 0
          this.suggestions = suggestions.map((item, i) => {
            return { ...item, currentIndex: i }
          })
          this.highlightedIndex = 0
        } else {
          console.error(
            '[Element Error][Autocomplete]autocomplete suggestions must be an array'
          )
        }
      })
    },
    keyEvent (type) {
      const scrollEl = document.querySelector('.ato-menu-scroll')
      const lastIndex = this.suggestions.length - 1
      if (type === 'down') {
        this.highlightedIndex++
        if (this.highlightedIndex > lastIndex) {
          this.highlightedIndex = lastIndex
        }
        scrollEl.scrollTop += 34
      } else if (type === 'up') {
        this.highlightedIndex--
        if (this.highlightedIndex < 0) {
          this.highlightedIndex = 0
        }
        scrollEl.scrollTop -= 34
      } else if (type === 'enter') {
        if (this.show) {
          return this.select(this.suggestions[this.highlightedIndex])
        }
        if (!this.value) {
          this.suggestionDisabled = false
          this.getData('')
        }
      }
    },
    handleBlur () {
      setTimeout(() => {
        this.show = false
        this.suggestions = []
      }, 300)
    }
  }
}
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
}

.ato-box {
    position: relative;
    width: 250px;

}

.suggestions-enter-active,
.suggestions-leave-active {
    transition: all 0.25s cubic-bezier(0.3, 0.5, 0.7, 1);
}

.suggestions-enter,
.suggestions-leave-to {
    opacity: 0;
}

.suggestions-move {
    position: absolute;
}
</style>
