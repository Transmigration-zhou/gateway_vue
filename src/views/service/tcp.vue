<template>
  <div class="mixin-components-container">
    <el-row>
      <el-form ref="form" :model="form" label-width="130px">
        <el-card class="box-card" style="margin-bottom:20px;">
          <div slot="header" class="clearfix">
            <span v-if="isEdit === false">创建TCP服务</span>
            <span v-if="isEdit === true">修改TCP服务</span>
          </div>
          <div>
            <el-form-item label="服务名称" class="is-required">
              <el-input v-model="form.service_name" :disabled="isEdit===true" placeholder="6-128位字母数字下划线" />
            </el-form-item>
            <el-form-item label="服务描述" class="is-required">
              <el-input v-model="form.service_desc" placeholder="最多255字符，必填" />
            </el-form-item>
            <el-form-item label="端口" class="is-required">
              <el-input v-model="form.port" :disabled="isEdit===true" placeholder="需要设置8001-8999范围内数字，必填" />
            </el-form-item>
            <el-form-item label="开启验证">
              <el-switch
                v-model="form.open_auth"
                :active-value="1"
                :inactive-value="0"
              />
            </el-form-item>
            <el-form-item label="IP白名单">
              <el-input v-model="form.white_list" placeholder="格式: 127.0.0.1 多条换行，白名单优先级高于黑名单" type="textarea" :autosize="{ minRows: 2, maxRows: 20}" />
            </el-form-item>
            <el-form-item label="IP黑名单">
              <el-input v-model="form.black_list" placeholder="格式: 127.0.0.1 多条换行" type="textarea" :autosize="{ minRows: 2, maxRows: 20}" />
            </el-form-item>
            <el-form-item label="客户端限流">
              <el-input v-model="form.client_ip_flow_limit" placeholder="0表示无限制" />
            </el-form-item>
            <el-form-item label="服务端限流">
              <el-input v-model="form.service_flow_limit" placeholder="0表示无限制" />
            </el-form-item>
            <el-form-item label="轮询方式">
              <el-radio v-model="form.round_type" :label="0">random</el-radio>
              <el-radio v-model="form.round_type" :label="1">round-robin</el-radio>
              <el-radio v-model="form.round_type" :label="2">weight_round-robin</el-radio>
              <el-radio v-model="form.round_type" :label="3">ip_hash</el-radio>
            </el-form-item>
            <el-form-item label="IP列表" class="is-required">
              <el-input v-model="form.ip_list" placeholder="格式: 127.0.0.1:80 多条换行" type="textarea" :autosize="{ minRows: 2, maxRows: 20}" />
            </el-form-item>
            <el-form-item label="权重列表" class="is-required">
              <el-input v-model="form.weight_list" placeholder="格式: 50 多条换行" type="textarea" :autosize="{ minRows: 2, maxRows: 20}" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" :loading="submitDisabled" @click="handleSubmit">立即提交</el-button>
            </el-form-item>
          </div>
        </el-card>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import { serviceDetail, serviceAddTcp, serviceUpdateTcp } from '@/api/service'
export default {
  data() {
    return {
      isEdit: false,
      submitDisabled: false,
      form: {
        service_name: '',
        service_desc: '',
        port: '',
        open_auth: 0,
        white_list: '',
        black_list: '',
        client_ip_flow_limit: '',
        service_flow_limit: '',
        round_type: 0,
        ip_list: '',
        weight_list: ''
      }
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    if (id > 0) {
      this.isEdit = true
      this.fetchData(id)
    }
  },
  methods: {
    handleSubmit() {
      this.submitDisabled = true
      const formData = Object.assign({}, this.form)
      console.log(formData)
      formData.port = Number(formData.port)
      formData.white_list = formData.white_list.replace(/\n/g, ',')
      formData.black_list = formData.black_list.replace(/\n/g, ',')
      formData.client_ip_flow_limit = Number(formData.client_ip_flow_limit)
      formData.service_flow_limit = Number(formData.service_flow_limit)
      formData.ip_list = formData.ip_list.replace(/\n/g, ',')
      formData.weight_list = formData.weight_list.replace(/\n/g, ',')
      if (this.isEdit) {
        serviceUpdateTcp(formData).then(_response => {
          this.submitDisabled = false
          this.$notify({
            title: 'Success',
            message: '修改成功',
            type: 'success',
            duration: 2000
          })
        }).catch(() => {
          this.submitDisabled = false
        })
      } else {
        serviceAddTcp(formData).then(_response => {
          this.submitDisabled = false
          this.$notify({
            title: 'Success',
            message: '添加成功',
            type: 'success',
            duration: 2000
          })
        }).catch(() => {
          this.submitDisabled = false
        })
      }
    },
    fetchData(id) {
      const query = { 'id': id }
      serviceDetail(query).then(response => {
        this.form.id = response.data.info.id
        this.form.service_name = response.data.info.service_name
        this.form.service_desc = response.data.info.service_desc
        this.form.port = response.data.tcp_rule.port
        this.form.open_auth = response.data.access_control.open_auth
        this.form.white_list = response.data.access_control.white_list.replace(/,/g, '\n')
        this.form.black_list = response.data.access_control.black_list.replace(/,/g, '\n')
        this.form.client_ip_flow_limit = response.data.access_control.client_ip_flow_limit
        this.form.service_flow_limit = response.data.access_control.service_flow_limit
        this.form.round_type = response.data.load_balance.round_type
        this.form.ip_list = response.data.load_balance.ip_list.replace(/,/g, '\n')
        this.form.weight_list = response.data.load_balance.weight_list.replace(/,/g, '\n')
      })
    }
  }
}
</script>

<style scoped>
.mixin-components-container {
  background-color: #f0f2f5;
  padding: 30px;
  min-height: calc(100vh - 84px);
}
</style>
