import request from '@/utils/request'

export function tenantList(query) {
  return request({
    url: '/tenant/tenant_list',
    method: 'get',
    params: query
  })
}

export function tenantDetail(query) {
  return request({
    url: '/tenant/tenant_detail',
    method: 'get',
    params: query
  })
}

export function tenantStatistics(query) {
  return request({
    url: '/tenant/tenant_statistics',
    method: 'get',
    params: query
  })
}

export function tenantDelete(query) {
  return request({
    url: '/tenant/tenant_delete',
    method: 'get',
    params: query
  })
}

export function tenantAdd(data) {
  return request({
    url: '/tenant/tenant_add',
    method: 'post',
    data
  })
}

export function tenantUpdate(data) {
  return request({
    url: '/tenant/tenant_update',
    method: 'post',
    data
  })
}
