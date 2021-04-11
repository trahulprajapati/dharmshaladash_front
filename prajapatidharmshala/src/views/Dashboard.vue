<template>
  <div>
    <WidgetsDropdown/>
    <MainChartExample style="height:300px;margin-top:40px;"/>
  </div>
</template>

<script>
import MainChartExample from './charts/MainChartExample'
import WidgetsDropdown from './widgets/WidgetsDropdown'
export default {
  name: 'Dashboard',
  components: {
    MainChartExample,
    WidgetsDropdown
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
