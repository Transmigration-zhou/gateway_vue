<template>
  <div class="mixin-components-container">
    <el-row>
      <el-form ref="form" :model="form" label-width="130px">
        <el-card class="box-card" style="margin-bottom:20px;">
          <div slot="header" class="clearfix">
            <span v-if="is_edit === false">创建租户</span>
            <span v-if="is_edit === true">修改租户</span>
          </div>
          <div>
            <el-form-item label="tenant_id" class="is-required">
              <el-input v-model="form.tenant_id" :disabled="is_edit === true" placeholder="6-128位字母数字下划线，必填" />
            </el-form-item>
            <el-form-item label="租户名称" class="is-required">
              <el-input v-model="form.name" placeholder="最多255字符，必填" />
            </el-form-item>
            <el-form-item label="32位密钥">
              <el-input v-model="form.secret" placeholder="32位字符串，非必填，自动生成" />
            </el-form-item>
            <el-form-item label="QPS限流">
              <el-input v-model="form.qps" placeholder="0表示无限制" />
            </el-form-item>
            <el-form-item label="日请求量限流">
              <el-input v-model="form.qpd" placeholder="0表示无限制" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" :loading="disableButton" @click="onSubmit">立即提交</el-button>
            </el-form-item>
          </div>
        </el-card>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import { tenantDetail, tenantAdd, tenantUpdate } from '@/api/tenant'
export default {
  components: {},
  data() {
    return {
      is_edit: false,
      disableButton: false,
      form: {
        id: '0',
        tenant_id: '',
        name: '',
        secret: '',
        white_ips: '',
        qps: '',
        qpd: ''
      }
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    if (id > 0) {
      this.is_edit = true
      this.fetchData(id)
    }
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    fetchData(id) {
      this.listLoading = true
      const query = {
        id: id
      }
      tenantDetail(query).then(response => {
        const formData = response.data
        this.form = formData
        this.listLoading = false
      })
    },
    onSubmit() {
      this.disableButton = true
      const formData = Object.assign({}, this.form)
      formData.id = Number(formData.id)
      formData.qps = Number(formData.qps)
      formData.qpd = Number(formData.qpd)

      if (this.is_edit) {
        tenantUpdate(formData).then(() => {
          this.disableButton = false
          this.$notify({
            title: 'Success',
            message: 'Submit Successfully',
            type: 'success',
            duration: 500
          })
        }, () => {
          this.disableButton = false
        })
      } else {
        tenantAdd(formData).then(() => {
          this.disableButton = false
          this.$notify({
            title: 'Success',
            message: 'Submit Successfully',
            type: 'success',
            duration: 500
          })
        }, () => {
          this.disableButton = false
        })
      }
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
