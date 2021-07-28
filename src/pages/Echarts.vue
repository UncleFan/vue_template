<!--
 * @Description: Echarts示例
 * @Date: 2021-07-22 16:23:45
 * @page: 
-->
<template>
  <div>
    <div class="container">
      <el-row>
        <el-col :span="3">
          <el-menu
            :default-active="activeMenu"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item index="4" v-for="item in menu" :key="item.name">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.name }}</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="21">
          <tab-bar style="z-index: 1" @dragend="dragend" ref="tabbar"></tab-bar>
          <div class="content">
            <el-row>
              <el-col :span="24">
                <el-card>
                  <draggable
                    class="content-canvas"
                    id="dragbox"
                    :disabled="true"
                    style="
                      height: calc(100vh - 60px);
                      width: '1000px';
                      border: '1px solid red';
                      position: 'relative';
                      margin: '0 auto';
                    "
                  >
                    <vue-draggable-resizable
                      v-for="item in cloneCharts"
                      :key="item.chartsId"
                      :id="item.chartsId + '-chart'"
                      :w="item.w"
                      :h="item.h"
                      :parent="true"
                      :x="item.x"
                      :y="item.y"
                      :min-width="item.minWidth"
                      :min-height="item.minHeight"
                      :max-width="item.maxWidth"
                      :max-height="item.maxHeight"
                      :isConflictCheck="true"
                      :snap="true"
                      :grid="item.grid"
                      style="background-color: rgba(174, 213, 129, .5)"
                      @resizing="resizing"
                      @activated="getCurrentNodes(item.chartsId)"
                    >
                      <div :id="item.chartsId" class="chart"></div>
                      <!-- <span class="el-icon-close" @click="deleteChart"></span> -->
                    </vue-draggable-resizable>
                  </draggable>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-drawer
      title="展示位编辑"
      :visible.sync="drawer"
      :with-header="true"
    >
      <echart-form-modal>

      </echart-form-modal>
    </el-drawer>
  </div>
</template>

<script>
/* eslint-disable */
import TabBar from "@/pages/components/Tabs";
import draggable from "vuedraggable";
import EchartDraggableModal from "@/pages/components/Echart-Draggable-Modal";
import EchartFormModal from "@/pages/components/Echart-Form-Modal";
import VueDraggableResizable from "@/pages/components/vue-draggable-resizable";
import "vue-draggable-resizable/dist/VueDraggableResizable.css";
import * as echarts from "echarts";
const chartsJson = require("@/utils/charts.json")
import { debounce, deepClone } from "lodash"
export default {
  name: "Charts",
  data() {
    return {
      activeMenu: "1",
      menu: [{ icon: "el-icon-setting", name: "自定义图表" }],
      cloneCharts: [],
      chartsData: [],
      drawer: false,
      activeChart: ""  // 被选中的echarts
    };
  },

  components: {
    TabBar,
    EchartDraggableModal,
    draggable,
    VueDraggableResizable,
    EchartFormModal
  },

  mounted() {
    this.chartsData = chartsJson
    document.addEventListener("click", (target) => {
      if(target.path[0].id === "dragbox") {
        this.$nextTick(() => {
          if(this.$refs["tabbar"] && this.$refs["tabbar"].show){
             this.$refs["tabbar"].show = false
          }
        });
      }
    }, false)
  },

  methods: {
    renderChart(chart, options) {
      chart.setOption(options);
    },
    handleOpen() {},
    handleClose() {},
    
    dragend(nodes){
      const chartsId = this.createRandomId()
      const chartsType = nodes.item.dataset.type
      let target = nodes.originalEvent.path[0].id;
      if (target === "dragbox") {
        this.createBrefCharts(chartsId, chartsType);
      }
    },

    // 创建cloneCharts
    createBrefCharts(chartsId, chartsType){
      let currentChart = chartsJson.filter(item => {
        return +chartsType === item.typeId
      })
      currentChart[0]['chartsId'] = chartsId
      let options = Object.assign({}, {
        w: 400,
        h: 300,
        parent: true,
        x: 0,
        y: 0,
        debug: false,
        minWidth: 200,
        minHeight: 200,
        maxWidth: 400,
        maxHeight: 400,
        isConflictCheck: true,
        snap: true,
        grid: [10, 10],
      }, currentChart[0])
      this.cloneCharts.push(options)
      this.$nextTick(() => {
        const dom = echarts.init(document.getElementById(chartsId))
        dom.setOption(currentChart[0])
      })
    },

    // 生成随机不重复id
    createRandomId() {
      return (
        (Math.random() * 10000000).toString(16).substr(0, 4) +
        "-" +
        new Date().getTime() +
        "-" +
        Math.random().toString().substr(2, 5)
      );
    },

    // 缩放
    resizing:_.debounce(function(x, y, w, h){
      let currentChart = echarts.getInstanceByDom(document.getElementById(this.activeChart));
      if(currentChart === null){
        currentChart = echarts.init(document.getElementById(this.activeChart))
      }
      currentChart.getDom().style.height = h + "px";
      currentChart.getDom().style.width = w + "px";
      currentChart.resize();
    }, 30),

    // 删除echarts
    deleteChart(){
      console.log('deldete')
    },

    //
    getCurrentNodes(id){
      this.activeChart = id
      this.drawer = true
    },

    onChoose(){}

  },
};
</script>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  background-color: #e3e3e3;
}
.content {
  width: 100%;
  height: calc(100vh - 40px);
  padding: 10px;
  box-sizing: border-box;
}
.content >>> .el-card {
  height: 100%;
}
.content >>> .el-card__body {
  padding: 0;
}
.content-canvas {
  background: -webkit-linear-gradient(top, transparent 10px, #eeeeee 11px),
    -webkit-linear-gradient(left, transparent 10px, #eeeeee 11px);
  background-size: 11px 11px;
}
.el-menu-vertical-demo {
  height: 100vh;
}
.chart {
  width: 400px;
  height: 300px;
}
.flex {
  display: flex;
  justify-content: space-around;
}
.el-icon-close{
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
}
</style>
