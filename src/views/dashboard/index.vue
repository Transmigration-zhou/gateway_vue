<template>
  <div class="dashboard-editor-container">
    <panel-group :data="panelGroupData" />
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="16">
        <div class="chart-wrapper">
          <line-chart :chart-data="lineChartData" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart :chart-data="pieChartData" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import PieChart from './components/PieChart'
import { panelGroupData, flowStatistics, serviceStatistics } from '@/api/dashboard'

export default {
  name: 'Dashboard',
  components: { PanelGroup, LineChart, PieChart },
  data() {
    return {
      panelGroupData: {
        'service_num': 0,
        'tenant_num': 0,
        'current_qps': 0,
        'today_request_num': 0
      },
      lineChartData: {
        'title': '今日流量统计',
        'today': [],
        'yesterday': []
      },
      pieChartData: {
        'title': '服务类型占比',
        'legend': ['HTTP', 'TCP', 'GRPC'],
        'series': [
          { value: 0, name: 'HTTP' },
          { value: 0, name: 'TCP' },
          { value: 0, name: 'GRPC' }
        ]
      }
    }
  },
  created() {
    this.fetchPanelGroupData()
    this.fetchFlowStatistics()
    this.fetchServiceStatistics()
  },
  methods: {
    fetchPanelGroupData() {
      panelGroupData().then(response => {
        this.panelGroupData = response.data
      })
    },
    fetchFlowStatistics() {
      flowStatistics().then(response => {
        this.lineChartData.yesterday = response.data.yesterday
        this.lineChartData.today = response.data.today
      })
    },
    fetchServiceStatistics() {
      serviceStatistics().then(response => {
        console.log(response)
        this.pieChartData.legend = response.data.legend
        this.pieChartData.series = response.data.series
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
