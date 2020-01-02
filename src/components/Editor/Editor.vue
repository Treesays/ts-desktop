<template>
  <div id="editor"></div>
</template>

<script>
export default {
  name: 'Editor',
  data() {
    return {
      edit: {}
    }
  },
  methods: {
    getContent() {
      let data = this.edit.getData();
      this.$emit('on-result', data)
    }
  },
  mounted () {
    ClassicEditor
    .create(document.querySelector('#editor'))
    .then(edit => {
      this.edit = edit
    }).catch(error => {
      console.log(error)
    })
  },
}
</script>

<style>

</style>