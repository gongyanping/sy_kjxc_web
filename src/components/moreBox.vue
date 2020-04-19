<template>
  <div class="moreSearchBox">
    <div class="moreSearchDiv">
      <div class="left">
        <el-select disabled v-model="searchValue[index]" v-for="(item,index) in searchData" :key="index">
          <el-option
            v-for="item in searchData"
            :key="item.field"
            :label="item.name"
            :value="item.field">
          </el-option>
        </el-select>
      </div>
      <div class="right">
        <div v-for="(item,index) in  searchData" :key="index">
          <el-input clearable @change="changeInput" v-if="!item.isTime && !item.isSelect" :placeholder="'请输入'+item.name" v-model="item.value">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-date-picker
            @change="changeInput"
            v-if="item.isTime"
            v-model="item.value"
            type="date"
            :placeholder="'请输入'+item.name" >
            <!-- :pickerOptions="pickerOptions" -->
          </el-date-picker>
          <el-select filterable clearable :placeholder="'请选择'+item.name" v-model="item.value" v-if="item.isSelect"
                     @change="changeInput">
            <el-option v-for="(t) in item.selectData" :label="t.name" :value="t.value"
                       :key="t.value"></el-option>
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'moreBox',
  props: {
    searchData: {
      default: []
    }
  },
  data () {
    return {
      searchValue: []
    }
  },
  mounted () {
    this.searchData.forEach((t) => {
      this.$set(t, 'value', '')
      this.searchValue.push(t.field)
    })
  },
  methods: {
    restData () {
      this.searchData.map((t) => {
        t.value = ''
      });
    },
    changeInput () {
      let paramsData = {};
      this.searchData.forEach((t) => {
        if (t.value !== '' && t.value !== undefined && t.value !== null) {
          paramsData[t.field] = t.value
        }
      });
      if (paramsData.endTime) {
        paramsData.endTime = this.formatTime(paramsData.endTime)
      }
      if (paramsData.startTime) {
        paramsData.startTime = this.formatTime(paramsData.startTime)
      }
      if (paramsData.startTime > paramsData.endTime) {
        this.$message({
          message: '开始时间不能小于结束时间，请重新选择',
          type: 'warning'
        });
        paramsData.startTime = ''
        paramsData.endTime = ''
        this.searchData.forEach((t) => {
          if (t.field === 'startTime' || t.field === 'endTime') {
            t.value = ''
          }
        });
      }
      this.$emit('searchParams', paramsData); // params是传递的参数
    },
    /**
       * 格式化时间
       *
       * @param time
       *            长整型时间
       * @param fmt
       *            时间格式，默认：yyyy-MM-dd
       * @returns
       */
    formatTime (time, fmt) {
      if (time === null) {
        return;
      }
      fmt = fmt || 'yyyy-MM-dd';
      time = new Date(time);
      // eslint-disable-next-line no-unused-vars
      let z = {
        M: time.getMonth() + 1,
        d: time.getDate(),
        h: time.getHours(),
        m: time.getMinutes(),
        s: time.getSeconds()
      };
      fmt = fmt.replace(/(M+|d+|h+|m+|s+)/g, function (v) {
        // eslint-disable-next-line no-eval
        return ((v.length > 1 ? '0' : '') + eval('z.' + v.slice(-1))).slice(-2);
      });
      return fmt.replace(/(y+)/g, function (v) {
        return time.getFullYear().toString().slice(-v.length);
      });
    }
  }
}
</script>

<style>
  .moreSearchDiv .el-input__inner {
    width: 220px;
  }

  .moreSearchDiv .right > div {
    margin-bottom: 10px;
  }

  .moreSearchDiv {
    display: flex;
    justify-content: space-between;
  }
  .more-btns{
    display: flex;
    justify-content: flex-end;
    padding-bottom: 10px;
  }
  .moreSearchDiv .left .el-select{
    margin-bottom: 10px;
    display: flex;
  }
  .moreSearchDiv .el-select-dropdown__item.is-disabled:hover{
    color: #999 !important;
  }
  .moreSearchDiv .right>div{
    display: flex;
    justify-content: flex-end;
  }
  .moreSearchDiv .right button{
    margin-left: 10px;
  }
  .moreSearchDiv .el-input__inner{
    height: 30px;
  }
</style>
