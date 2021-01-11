<template>
  <ul
    class="BK-Menu"
    :class="{
      'BK-Menu--Horizontal': mode === 'horizontal',
      'Bk-Menu--vertical': mode === 'vertical',
    }"
    @click.stop="() => {}"
  >
    <slot name="left"></slot>
    <li
      class="BK-Menu-Item"
      v-for="(menu, index) in menus"
      :key="menu.index"
      @click.stop="toggle(index, menu.index)"
      :style="!(menu.children || $permission([{ mc: menu.label, ll: true }])) && 'display:none;'"
    >
      <div class="BK-Menu-Item-Label" v-if="menu.children || $permission([{ mc: menu.label, ll: true }])">
        <i :class="menu.icon" />
        <span :class="{ 'BK-Menu-active': menu.active }">{{ menu.label }}</span>
        <i
          v-if="menu.children"
          :class="
            menu.show
              ? mode === 'horizontal'
                ? 'el-icon-arrow-up'
                : 'el-icon-arrow-left'
              : mode === 'horizontal'
              ? 'el-icon-arrow-down'
              : 'el-icon-arrow-right'
          "
        />
      </div>
      <div class="BK-Menu-Recursion" v-if="menu.children">
        <div class="BK-Menu-Recursion-RBox">
          <transition name="BK-Menu">
            <BK-Menu
              :style="{ display: menu.show ? 'flex' : 'none' }"
              :menus="menu.children"
              :key="menu.index"
              :defaultActive="defaultActive"
              @select="$emit('select', $event, {})"
              :mode="mode"
            /><!-- v-show="menu.show" -->
          </transition>
        </div>
      </div>
    </li>
    <slot name="right"></slot>
  </ul>
</template>

<script type="text/javascript">
export default {
  name: 'BK-Menu',
  props: {
    menus: {
      type: Array,
      required: true
    },
    defaultActive: {
      type: String,
      required: true
    },
    mode: {
      type: String,
      default: 'vertical'
    }
  },
  data () {
    return {}
  },
  watch: {
    defaultActive: {
      handler (val) {
        this.color(val)
      },
      immediate: true
    }
  },
  methods: {
    colorRecursion (menus, index) {
      return menus.filter(item => {
        item.active = false
        if (item.index === index) {
          return true
        }
        if (item.children) {
          this.colorRecursion(item.children, index)
        }
      })[0]
    },
    color (index) {
      let item = this.colorRecursion(this.menus, index)
      while (item) {
        item.active = true
        item = item.parent
      }
    },
    toggle (index, key) {
      this.menus.forEach((item, i) => {
        if (index === i) {
          if (item.children) {
            item.show = !item.show
            if (!item.show) {
              item.children.forEach(it => {
                it.show = false
              })
            }
          } else {
            let parent = item.parent
            while (parent) {
              parent.show = false
              parent = parent.parent
            }
            this.$emit('select', key, {})
          }
        } else {
          item.show = false
        }
      })
    }
  }
}
</script>
<style lang="scss">
$bg-color-black: rgb(84, 92, 100);
$bg-color-white: white;
$bg-color-dark-blue: #4574f1 0;
$bg-color-light-blue: #00abf3;
$bg-color-gray: #ccc;
$bg-color-light-gray: rgb(240, 241, 245);

$text-color-white: white;
$text-color-dark-black: #333;
$text-color-gray: #999;

$active-color-yellow: rgb(255, 208, 75);
$active-color-blue: #3386f1;
.BK-Menu {
  position: relative;
  width: 100%;
  background-color: $bg-color-black;
  background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    from($bg-color-dark-blue),
    to($bg-color-light-blue)
  );
  background-image: linear-gradient(
    90deg,
    $bg-color-dark-blue,
    $bg-color-light-blue
  );
  user-select: none;
  .BK-Menu-Item {
    font-size: 14px;
    color: $text-color-white;
    list-style: none;
    cursor: pointer;
    position: static;
    display: flex;
    i {
      color: $text-color-white;
    }
    .BK-Menu-Item-Label {
      padding: 5px 10px;
      height: 46px;
      line-height: 36px;
      box-sizing: border-box;
      .BK-Menu-active {
        color: $active-color-yellow;
      }
      > span {
        margin: 0 4px;
      }
    }
    .BK-Menu-Recursion {
      flex-wrap: wrap;
      position: absolute;
      z-index: 111;
      > .BK-Menu-Recursion-RBox {
        position: relative;
        background-color: $bg-color-white;
      }
      > .BK-Menu-Recursion-RBox > .BK-Menu::before {
        content: "";
        display: block;
        width: 100%;
        height: 15px;
        background-color: $bg-color-gray;
        position: absolute;
        bottom: -10px;
        left: 0;
        z-index: -4;
        filter: blur(15px);
      }
      > .BK-Menu-Recursion-RBox > .BK-Menu {
        background-image: none;
        background-color: $bg-color-white;
        color: $text-color-dark-black;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        .BK-Menu-Item {
          box-sizing: border-box;
          border-radius: 6px;
          color: $text-color-dark-black;
          .BK-Menu-Item-Label {
            .BK-Menu-active {
              color: $active-color-blue;
            }
          }
          i {
            color: $text-color-gray;
          }
        }
        .BK-Menu-Item:hover {
          color: $active-color-blue;
          background-color: $bg-color-light-gray;
        }
      }
    }
  }
}
.BK-Menu-enter-active,
.BK-Menu-leave-active {
  transition: opacity 0.3s cubic-bezier(0.3, 0.5, 0.7, 1);
}
.BK-Menu-enter,
.BK-Menu-leave-to {
  opacity: 0;
}
.Bk-Menu--vertical {
  .BK-Menu-Item {
    height: 46px;
  }
  .BK-Menu-Item .BK-Menu-Recursion {
    width: 450px;
    right: 0%;
    transform: translateX(101%);
    > .BK-Menu-Recursion-RBox {
      border-radius: 6px;
    }
    > .BK-Menu-Recursion-RBox > .BK-Menu {
      min-height: 158px;
      border-radius: 4px;
      > .BK-Menu-Item {
        width: 33.33%;
        > .BK-Menu-Item-Label {
          // padding: 5px 0;
        }
      }
    }
  }
}
.BK-Menu--Horizontal {
  display: flex;
  .BK-Menu-Item .BK-Menu-Recursion {
    width: 100%;
    right: 0;
    left: 0;
    top: 100% !important;
    > .BK-Menu-Recursion-RBox > .BK-Menu {
      padding: 10px 100px 20px 116px;
      box-sizing: border-box;
      > .BK-Menu-Item {
        padding: 10px 0;
        width: 12.5%;
      }
    }
  }
}
</style>
