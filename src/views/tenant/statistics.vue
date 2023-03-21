<template>
  <div class="chart-container">
    <chart height="100%" width="100%" :data="chartData" />
  </div>
</template>

<script>
import Chart from '@/components/Charts/LineStatistics'
import { tenantStatistics, tenantDetail } from '@/api/tenant'

export default {
  name: 'TenantStatistics',
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
    fetchStat(id) {
      const query = { 'id': id }
      tenantStatistics(query).then(response1 => {
        tenantDetail(query).then(response2 => {
          this.chartData = {
            'title': response2.data.name + '租户统计',
            'today': response1.data.today,
            'yesterday': response1.data.yesterday
          }
          console.log(this.chartData)
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
  background-color: #fff;
  height: calc(100vh - 84px);
}
</style>
