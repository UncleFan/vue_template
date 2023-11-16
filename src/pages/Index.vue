<!--
 * @Description: 
 * @Date: 2021-06-04 09:42:10
 * @page: 
-->
<template>
  <div id="three">
    <el-form size="mini" inline>
        <el-form-item label="摄像机x轴">
            <el-input v-model="x" type="number"></el-input>
        </el-form-item>
        <el-form-item label="摄像机y轴">
            <el-input v-model="y" type="number"></el-input>
        </el-form-item>
        <el-form-item label="摄像机z轴">
            <el-input v-model="z" type="number"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="save" size="mini">保存</el-button>
        </el-form-item>
    </el-form>
  </div>
  
</template>

<script>
// import CustomModel from './components/Model.vue'
import Lesson1 from './components/three/lesson1'
export default {
  name: "Index",
  data() {
    return {
      x: 0,
      y: 0,
      z: 5,
      threePlus: null
    };
  },
  mounted() {
    const el = document.getElementById("three");
    this.threePlus = new Lesson1(el, {
        x: this.x,
        y: this.y,
        z: this.z
    });
    this.threePlus.init();
  },
  methods: {
    save() {
      console.log(this.x, this.y, this.z);
      // 更新camera坐标
      this.threePlus.updateProjectionMatrix(this.x, this.y, this.z)
    },
  },
};
</script>

<style scoped>
#three {
  width: 800px;
  height: 600px;
}
</style>
