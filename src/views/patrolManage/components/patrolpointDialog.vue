 <template>
  <div class="patrolpointDialog">
    <el-dialog title="请选择点位类型" :visible.sync="visible" width="35%" @close="onCancelPoint" custom-class="light">
      <el-form ref="patrolForm" :model="patrolForm" label-width="120px" :rules="rules">
        <el-form-item label="任务名称" prop="lineId">
          <el-select
            v-model="patrolForm.lineId"
            placeholder="请选择任务列表"
            clearable
            style="width: 100%"
            :disabled="isFromTask"
          >
            <el-option key="uniqued0000" label="未知" value />
            <el-option
              v-for="item in lineOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="点位名称" prop="name">
          <el-input v-model="patrolForm.name" placeholder="请输入点位名称" clearable style="width: 100%" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input
            v-model="patrolForm.address"
            placeholder="地址"
            clearable
            style="width: 100%"
            disabled
          />
        </el-form-item>
        <el-form-item label="坐标" prop="lon">
          <el-col class="line" :span="3" style="text-align:center;">经度</el-col>
          <el-col :span="8">
            <el-input v-model="patrolForm.lon" disabled />
          </el-col>
          <el-col class="line" :span="2" style="text-align:center;">-</el-col>
          <el-col class="line" :span="3" style="text-align:center;">维度</el-col>
          <el-col :span="8">
            <el-input v-model="patrolForm.lat" disabled />
          </el-col>
        </el-form-item>
        <el-form-item label="点位类型" prop="type">
          <el-select v-model="patrolForm.type" placeholder="请选择点位类型" clearable style="width: 100%">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间" prop="time" v-if="patrolForm.type !== '1'">
          <el-time-picker format="HH:mm" value-format="HH:mm" v-model="patrolForm.time" placeholder="请选择时间点"></el-time-picker>
        </el-form-item>
        <el-form-item label="绑定指纹机" prop="equID">
          <el-select v-model="patrolForm.equID" placeholder="请选择点位类型" clearable style="width: 100%">
            <el-option
              v-for="item in equOptions"
              :key="item.id"
              :label="item.equName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onCancelPoint">取 消</el-button>
        <el-button type="primary" @click="onSavePoint">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'patrolpoint-dialog',
  props: ['dialogVisible', 'curId', 'form', 'typeOptions', 'isFromTask', 'lineOptions', 'equOptions'],
  data () {
    return {
      visible: false,
      pointId: '',
      rules: {
        name: [{ required: true, message: '请输入点位名称', trigger: 'blur' }]
      },
      patrolForm: {}
    };
  },
  watch: {
    dialogVisible: function (newValue) {
      this.visible = newValue;
    },
    curId: function (newValue) {
      this.pointId = newValue;
      if (this.visible && this.pointId) {
        this.initData();
      }
    },
    form: function (newValue) {
      this.patrolForm = newValue;
    }
  },
  created () {
    this.patrolForm = this.form;
  },
  methods: {
    initData () {
      this.$api.patrolPoint
        .getOne(this.$qs.stringify({ id: this.pointId }))
        .then(res => {
          this.patrolForm = res.data.data;
        });
    },
    onSavePoint () {
      this.$refs['patrolForm'].validate(valid => {
        if (valid) {
          let params = this.$qs.stringify(this.patrolForm);
          this.$api.patrolPoint.saveOrUpdate(params).then(res => {
            if (res.data.code === 0) {
              this.$message.success((this.curId ? '修改' : '新增') + '巡逻点成功');
              this.$emit('getList')
            }
            this.onCancelPoint();
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 关闭弹出框
    onCancelPoint () {
      this.visible = false;
      this.$emit('closeDialog');
      this.$refs['patrolForm'].resetFields();
    }
  }
};
</script>
