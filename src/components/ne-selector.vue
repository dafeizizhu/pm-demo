<template>
  <table class='table table-striped'>
    <thead>
      <tr>
        <th></th>
        <th>名称</th>
        <th>描述</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for='ne in nes'>
        <td><input type='radio' name='r-ne' v-bind:value='ne.ne_id' v-model='selected' v-on:change='selectedChange' /></td>
        <td>{{ ne.name }}</td>
        <td>{{ ne.description }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { getNes } from '../nes'

export default {
  data: function () {
    return {
      selected: '',
      nes: []
    }
  },
  created: function () {
    getNes().then(nes => {
      this.nes = nes.map(ne => {
        return {
          ne_id: ne.ne_id,
          name: ne.name,
          description: ne.description,
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
