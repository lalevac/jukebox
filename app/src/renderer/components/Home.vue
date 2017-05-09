<template>
  <div id='home'>
    <ul>
      <li v-for='item in items'>{{ item }}</li>
    </ul>
    <div class='row'>
      <div class='col-xs-4'>
        <input type='text' class='form-control' v-model='currentItem'>
      </div>
      <div class='col-xs-8'>
        <button class='btn btn-primary' @click='addItem'>Add!</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => {
      return {
        items: ['hello'],
        currentItem: ''
      }
    },

    methods: {
      addItem(event) {
        this.items.push(this.currentItem);
        this.currentItem = '';
      }
    }
  }
</script>

<style lang='scss'>

</style>
