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
              <el-col :span="18">
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
                      style="background-color: rgb(174, 213, 129)"
                      @resizing="resizing"
                      @activated="getCurrentNodes(item.chartsId)"
                    >
                      <div :id="item.chartsId" class="chart"></div>
                    </vue-draggable-resizable>
                  </draggable>
                </el-card>
              </el-col>
              <el-col :span="6">
                form
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import TabBar from "@/pages/components/Tabs";
import draggable from "vuedraggable";
import EchartDraggableModal from "@/pages/components/Echart-Draggable-Modal";
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
      activeChart: ""  // 被选中的echarts
    };
  },

  components: {
    TabBar,
    EchartDraggableModal,
    draggable,
    VueDraggableResizable
  },

  computed: {
    // 普通柱状图
    options1() {
      const options = {
        title: {
          text: "普通柱状图", // 主标题
          left: "30%", // 位置
          subtext: "百度一下，你就知道", // 副标题
          sublink: "https://www.baidu.com", // 标题点击后的跳转链接
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
        ],
      };
      return options;
    },
    // 复杂柱状图
    options2() {
      const option = {
        tooltip: {
          show: true, // 显示提示浮框
          trigger: "item", // 触发条件
          axisPointer: {
            type: "shadow",
            axis: "auto",
          },
        },
        legend: {
          // 图例组件
          show: true,
          type: "plain",
          orient: "horizontal", // 图例排布
          data: [
            "直接访问",
            "邮件营销",
            "联盟广告",
            "视频广告",
            "搜索引擎",
            "百度",
            "谷歌",
            "必应",
            "其他",
          ],
        },
        xAxis: [
          {
            type: "category",
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "直接访问",
            type: "line",
            emphasis: {
              focus: "series",
            },
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "邮件营销",
            type: "line",
            stack: "广告",
            emphasis: {
              focus: "series",
            },
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "广告",
            emphasis: {
              focus: "series",
            },
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "视频广告",
            type: "line",
            stack: "广告",
            emphasis: {
              focus: "series",
            },
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "搜索引擎",
            type: "bar",
            data: [862, 1018, 964, 1026, 1679, 1600, 1570],
            emphasis: {
              focus: "series",
            },
            markLine: {
              lineStyle: {
                type: "dashed",
              },
              data: [[{ type: "min" }, { type: "max" }]],
            },
          },
          {
            name: "百度",
            type: "bar",
            barWidth: 5,
            stack: "搜索引擎",
            emphasis: {
              focus: "series",
            },
            data: [620, 732, 701, 734, 1090, 1130, 1120],
          },
          {
            name: "谷歌",
            type: "bar",
            stack: "搜索引擎",
            emphasis: {
              focus: "series",
            },
            data: [120, 132, 101, 134, 290, 230, 220],
          },
          {
            name: "必应",
            type: "bar",
            stack: "搜索引擎",
            emphasis: {
              focus: "series",
            },
            data: [60, 72, 71, 74, 190, 130, 110],
          },
          {
            name: "其他",
            type: "bar",
            stack: "搜索引擎",
            emphasis: {
              focus: "series",
            },
            data: [62, 82, 91, 84, 109, 110, 120],
          },
        ],
      };
      return option;
    },
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
      console.log(nodes)
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
      console.log(this.cloneCharts)
      this.$nextTick(() => {
        const dom = echarts.init(document.getElementById(chartsId))
        console.log(currentChart[0])
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

    //
    getCurrentNodes(id){
      this.activeChart = id
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
</style>
