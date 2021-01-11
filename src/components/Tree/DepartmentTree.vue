<template>
  <el-tree
    lazy
    show-checkbox
    node-key="label"
    ref="DepartmentTree"
    disabled
    :props="props"
    :load="loadNode"
    :default-expanded-keys="expandedKeys"
    :default-checked-keys="checkedKeys"
    @check="check"
  ></el-tree>
</template>

<script type="text/javascript">
export default {
  props: {
    params: {
      type: Object,
      default: () => ({})
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      props: {
        label: 'label',
        children: 'children',
        isLeaf: 'leaf'
      },
      expandedKeys: ['全部'],
      checkedKeys: []
    }
  },
  methods: {
    check (...argv) {
      this.$emit('check', ...argv)
    },
    resetChecked () {
      this.$refs.DepartmentTree.setCheckedKeys([])
    },
    getCheckedNodes () {
      const checkedNodes = this.$refs.DepartmentTree.getCheckedNodes()
      const all = checkedNodes.some(it => it.level === 0)
      return checkedNodes.reduce(
        (t, it) => {
          if (it.level === 1) {
            t.departments.push({ bm: it.label })
          }
          if (it.level === 2 && !all) {
            t.departments.some(c => c.bm === it.bm) ||
              t.staffs.push({ ygmc: it.ygmc, yggh: it.yggh })
          }
          return t
        },
        { departments: [], staffs: [], ...(all ? { all } : {}) }
      )
    },
    loadNode (node, resolve) {
      if (node.level === 0) {
        return resolve([{ label: '全部', level: 0 }])
      }
      if (node.level === 1) {
        return this.$api.getDepartment().then(({ res }) => {
          resolve(res.map(it => ({ label: it.bm, level: 1 })))
          this.checkedKeys.push('全部')
          // this.expandedKeys.push(...res.map(it => it.bm))
        })
      }
      if (node.level === 2) {
        const bm = node.data.label
        return this.$api.getStaffByDepartment({ bm, ...this.params }).then(({ res }) => {
          resolve(
            res.map(it => ({
              label: it.ygmc,
              ygmc: it.ygmc,
              yggh: it.yggh,
              bm,
              leaf: true,
              level: 2
            }))
          )
        })
      }
    }
  }
}
</script>
