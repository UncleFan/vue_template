<!--
 * @Description: 图标修改、保存表单
 * @Date: 2021-07-28 15:41:39
 * @page: Echart-Form-Modal组件
-->
<template>
  <div class="form">
    <el-form ref="form" :model="formData" label-width="100px">
      <el-form-item label="展示位名称" placeholder="请填写展示位名称">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="时间筛选" align="left">
        <el-select v-model="formData.region" placeholder="请选择活动区域">
          <el-option label="校历周" value="week"></el-option>
          <el-option label="自然月" value="mounth"></el-option>
          <el-option label="学期" value="semester"></el-option>
          <el-option label="自然年" value="year"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label=" " align="left">
        <el-date-picker
          v-model="formData.date"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00']"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="地区筛选" align="left">
        <el-cascader
          v-model="formData.area"
          :options="options"
          @change="handleChange"
        ></el-cascader>
      </el-form-item>
      <div v-for="item in formData.modal" :key="item.id">
          <h4>模型{{item.id}}</h4>
          <el-form-item label="模型名称" align="left">
              <el-input v-model="item.modalName"></el-input>
          </el-form-item>
          <el-form-item label="数据标题" align="left">
              <el-input v-model="item.modalTitle"></el-input>
          </el-form-item>
          <el-form-item label="x轴" align="left">
              <el-input v-model="item.data.xAxis"></el-input>
          </el-form-item>
          <el-form-item label="y轴" align="left">
              <el-input v-model="item.data.yAxis"></el-input>
          </el-form-item>
      </div>
      <span class="add-icon" @click="addModalData">
          <span class="el-icon-circle-plus"></span><span class="text">新增模型</span>
      </span>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: "",
        region: "",
        date: "",
        area: "",
        modal: [
            {
                id: 1,
                modalName: "",
                modalTitle: "",
                type: "line",
                // 维度、指标
                data: {
                    xAxis: "",
                    yAxis: ""
                }
            }
        ]
      },
      options: [
        {
          value: "quanguo",
          label: "全国",
          children: [
            {
              value: "hunan",
              label: "湖南",
              children: [
                {
                  value: "changsha",
                  label: "长沙",
                },
                {
                  value: "yiyang",
                  label: "益阳",
                },
              ]
            }
          ]
        }
      ]
    }
  },

  methods: {
    handleChange(e){
        console.log(e)
    },
    addModalData(){
        if(this.formData.modal.length >= 2){
            return this.$message.error({
                message: "最多使用两个模型",
                duration: 1500
            })
        }
        this.formData.modal.push({
            id: 2,
            modalName: "",
            modalTitle: "",
            type: "line",
            // 维度、指标
            data: {
                xAxis: "",
                yAxis: ""
            }
        })
    }
  }
};
</script>

<style scoped>
.form {
  width: 100%;
  padding: 10px 20px;
  line-height: 24px;
  box-sizing: border-box;
}
.add-icon{
    color: #409EFF;
    cursor: pointer;
}
.add-icon .text{
    display: inline-block;
    line-height: 24px;
}
.add-icon .el-icon-circle-plus{
    font-size: 24px;
    vertical-align: top;
}
</style>
