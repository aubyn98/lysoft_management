<template>
<div class="ato-menu">
    <div class="ato-menu-scroll" @scroll="handlScroll">
        <div class="ato-menu-srcollbox" :style="{height:scrollHeight}"></div>
        <ul class="ato-menu-fixbox" :style="{transform:`translateY(${fixTop})`}">
            <li class="ato-menu-fixItem" :class="{'ato-menu-active':highlightedIndex === item.currentIndex}" v-for="item in autoSuggestions" :key="item.item" @click="$emit('select',item)">{{item[valueKey]}}</li>
        </ul>
    </div>
</div>
</template>

<script type="text/javascript">
export default {
  props: {
    suggestions: Array,
    valueKey: String,
    highlightedIndex: [String, Number]
  },
  data () {
    return {
      start: 0,
      end: 30,
      remain: 30,
      size: 34
    }
  },
  methods: {
    handlScroll (e) {
      this.start = Math.floor(e.target.scrollTop / this.size)
      this.end = this.start + this.remain
    }
  },
  computed: {
    autoSuggestions () {
      const end = this.end + 6
      const len = this.suggestions.length
      return this.suggestions.slice(this.start, end > len ? len : end)
    },
    fixTop () {
      return this.start * this.size + 'px'
    },
    scrollHeight () {
      return this.suggestions.length * this.size + 'px'
    }
  }
}
</script>

<style lang="scss">
.ato-menu {
    bottom: 0;
    left: 0;
    position: absolute;
    z-index: 888;
    transform: translateY(calc(100% + 5px));
    width: 100%;
    min-width: 250px;
    background-color: white;
    box-shadow: 0px 0px 2px #606266;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    border: 1px solid #E4E7ED;
    box-sizing: border-box;
    background-color: #FFFFFF;
}

.ato-menu-scroll {
    height: 100%;
    width: 100%;
    max-height: 280px;
    position: relative;
    overflow-x: hidden;
    overflow-y: auto;
    border-radius: 4px;
}

.ato-menu-scroll-box {
    width: 100%;
    transition: height 0.3s;
}

.ato-menu-fixbox {
    width: 100%;
    position: absolute;
    top: 0;
    height: 0;
}

.ato-menu-fixItem {
    list-style-type: none;
    width: 100%;
    margin: 0;
    padding: 0 20px;
    box-sizing: border-box;
    line-height: 34px;
    cursor: pointer;
    color: #606266;
    text-align: left;
    font-size: 14px;
    list-style: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.ato-menu-active {
    background-color: #f5f7fa;
}

.ato-menu-fixItem:hover {
    @extend .ato-menu-active
}
</style>
