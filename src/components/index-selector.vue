<template>
  <table class='table table-striped'>
    <thead>
      <tr>
        <th></th>
        <th>名称</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for='index in indexes'>
        <td><input type='radio' name='r-index' v-bind:value='index.index_id' v-model='selected' v-on:change='selectedChange' /></td>
        <td>{{ index.name }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { getIndexes } from '../indexes'

export default {
  data: function () {
    return {
      selected: '',
      indexes: []
    }
  },
  created: function () {
    getIndexes().then(indexes => {
      this.indexes = indexes.map(index => {
        return {
          index_id: index.index_id,
          name: index.name,
          selected: false
        }
      })
    })
  },
  methods: {
    selectedChange: function () {
      this.$emit('change', this.selected)
    }
  }
}
</script>
