<template>
  <div class="au-area">
    <div class="au-area-item">
      <span class="au-area-item-label">省 份</span>
      <el-select
        style="flex: 1"
        :value="defaultArea.sfmc"
        filterable
        clearable
        placeholder="请选择省份"
        @change="sfChange"
        :disabled="disabled"
      >
        <el-option
          v-for="item in sfList"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
    </div>
    <div class="au-area-item">
      <span class="au-area-item-label">市 区</span>
      <el-select
        style="flex: 1"
        :value="defaultArea.sqmc"
        filterable
        clearable
        reserve-keyword
        :disabled="!defaultArea.sfmc || disabled"
        @change="sqChange"
        placeholder="请选择市区"
      >
        <el-option
          v-for="item in sqList"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
    </div>
    <div class="au-area-item">
      <span class="au-area-item-label">县 区</span>
      <el-select
        style="flex: 1"
        :value="defaultArea.xqmc"
        filterable
        clearable
        reserve-keyword
        :disabled="!defaultArea.sqmc || disabled"
        placeholder="请选择县区"
        @change="xqChange"
      >
        <el-option
          v-for="item in xqList"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  props: {
    disabled: {
      type: Boolean
    },
    defaultArea: {
      type: Object,
      default: () => ({
        sfmc: '',
        sqmc: '',
        xqmc: ''
      })
    }
  },
  created () {
    this.initArea()
    this.refresh()
  },
  data () {
    return {
      sfList: [],
      sqList: [],
      xqList: [],
      areaSource: {
        sfmc: '',
        sqmc: '',
        xqmc: ''
      },
      area: {}
    }
  },
  methods: {
    refresh () {
      this.getProvince()
      this.getCounty()
      this.getCityProper()
    },
    getProvince () {
      this.$api.getProvince().then(data => {
        this.sfList = data.res.map(c => c.sfmc)
      }, e => {})
    },
    getCounty () {
      this.$api.getCounty({ sqmc: this.defaultArea.sqmc }).then(data => {
        this.xqList = data.res.map(c => c.xqmc)
      }, e => {})
    },
    getCityProper () {
      this.$api.getCityProper({ sfmc: this.defaultArea.sfmc }).then(data => {
        this.sqList = data.res.map(c => c.sqmc)
      }, e => {})
    },
    initArea () {
      this.area = this.$format.copy(this.areaSource)
    },
    xqChange (val) {
      this.$emit('change', { key: 'xqmc', val })
    },
    sqChange (val) {
      this.$emit('change', { key: 'sqmc', val })
      this.getCounty()
      this.xqChange('')
    },
    sfChange (val) {
      this.$emit('change', { key: 'sfmc', val })
      this.getCityProper()
      this.xqChange('')
      this.sqChange('')
    },
    remoteMethod (query) {

    }
  },
  components: {}
}
</script>
<style lang="scss">
.au-area {
  display: flex;
}
.au-area-item {
  flex: 1;
  margin-left: 5px;
  display: flex;
}
.au-area-item-label {
  margin-right: 5px;
}
</style>
