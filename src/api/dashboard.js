import request from '@/utils/request'

export function panelGroupData() {
  return request({
    url: '/dashboard/panel_group_data',
    method: 'get'
  })
}

export function flowStatistics() {
  return request({
    url: '/dashboard/flow_statistics',
    method: 'get'
  })
}

export function serviceStatistics() {
  return request({
    url: '/dashboard/service_statistics',
    method: 'get'
  })
}
