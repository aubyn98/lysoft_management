<template>
  <div>
    <div v-for="item in formItems" :key="item.label" style="width:600px;margin:0 auto;">
      <div>{{ item.label }}</div>
      <auto-form :formItems="item.formItems" :disabled="disabled" ref="autoForm"/>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  props: {
    formItems: {
      type: Array,
      required: true
    },
    disabled: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    initForm (value, flag) {
      this.$refs.autoForm.forEach(p => {
        p.initForm(value, flag)
      })
    },
    submitForm () {
      return new Promise(resolve => {
        const arr = [];
        (async () => {
          const data = await this.$refs.autoForm.reduce(async (t, p) => {
            const data = await t
            data && arr.push(data)
            return p.submitForm()
          }, Promise.resolve())
          arr.push(data)
          resolve(arr.reduce((t, p) => ({ ...t, ...p }), {}))
        })()
      })
    }
  }
}
</script>
