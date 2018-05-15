<template>
  <div id="hello">
    <h1>vue-kindedtior demo</h1>
    <editor id="editor_id" height="300px" width="500px" :content="editorText"
            :afterChange="afterChange()"
            pluginsPath="/static/kindeditor/plugins/"
            :loadStyleMode="false"
            @on-content-change="onContentChange"></editor>
    <h1>vue-kindedtior demo</h1>
    <editor id="editor_id2" height="300px" width="500px" :content="editorText"
            :afterChange="afterChange()"
            pluginsPath="/static/kindeditor/plugins/"
            :loadStyleMode="false"
            @on-content-change="onContentChange2"></editor>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  export default {
    name: 'hello',
    data () {
      return {
        editorText: '',
        editorText2: ''
      }
    },
    computed:{
      ...mapGetters([

      ]),

    },
    mounted(){

    },
    methods: {
      ...mapActions([
        'popoverAlert'
      ]),
      onContentChange (val) {
        this.editorText = val
      },
      onContentChange2 (val) {
        this.editorText2 = val
      },
      afterChange () {
      }
    }
  }
</script>

<style lang="scss">
  #hello {
    float: left;
  }
</style>
