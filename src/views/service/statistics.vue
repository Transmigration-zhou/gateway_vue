<template>
  <div class="chart-container">
    <chart height="100%" width="100%" :data="chartData" />
  </div>
</template>

<script>
import Chart from './components/LineStatistics'
import { serviceStatistics, serviceDetail } from '@/api/service'

export default {
  name: 'ServiceStatistics',
  components: { Chart },
  data() {
    return {
      chartData: {
        'title': '',
        'today': [],
        'yesterday': []
      }
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    this.fetchStatistics(id)
  },
  methods: {
    fetchStatistics(id) {
      const query = { 'id': id }
      serviceStatistics(query).then(response1 => {
        serviceDetail(query).then(response2 => {
          this.chartData = {
            'title': response2.data.info.service_name + '服务统计',
            'today': response1.data.today,
            'yesterday': response1.data.yesterday
          }
        })
      })
    }
  }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>
