<template>
  <div>
    <el-header>
      <div><i class="el-icon-edit"></i>拖拽</div>
    </el-header>
    <div>
      <el-row :gutter="20" class="itxst">
        <el-col :span="4">
          <div class="charts-col">
            <el-row>
              <draggable
                @end="dragend"
                @choose="onChoose"
                :options="{
                  group: { name: 'itxst', pull: 'clone' },
                  sort: false,
                }"
              >
                <transition-group>
                  <el-col
                    :span="24"
                    v-for="item in charts"
                    :key="item.id"
                    :id="'charts' + item.id"
                    :data-type="item.type"
                    class="item forbid"
                  >
                    <div class="charts">
                      {{ item.name }}
                    </div>
                  </el-col>
                </transition-group>
              </draggable>
            </el-row>
          </div>
        </el-col>
        <el-col :span="20">
          <draggable
            class="dragbox"
            id="dragbox"
            :disabled="true"
            :style="{
              height: currentHeight + 'px',
              width: '1000px',
              border: '1px solid red',
              position: 'relative',
              margin: '0 auto',
            }"
          >
            <!-- <div  v-for="item in cloneCharts"
              :key="item.id"></div> -->
            <vue-draggable-resizable
              v-for="item in cloneCharts"
              :key="item.id"
              :id="'vue-draggable-resizable' + item.id"
              ref="drag"
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
              @activated="getCurrentNodes('vue-draggable-resizable' + item.id)"
            >
            </vue-draggable-resizable>
          </draggable>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import draggable from "vuedraggable";
import VueDraggableResizable from "@/pages/components/vue-draggable-resizable";
import "vue-draggable-resizable/dist/VueDraggableResizable.css";
import * as echarts from "echarts";
export default {
  data() {
    return {
      box: {
        x: 0,
        y: 0,
        width: 100,
        height: 100,
      },
      charts: [
        { id: "charts1", name: "charts1", type: "bar" },
        { id: "charts2", name: "charts2", type: "line" },
        { id: "charts3", name: "charts3" },
        { id: "charts4", name: "charts4" },
        { id: "charts5", name: "charts5" },
      ],
      chartsNum: 0,   // 右边echarts的数量
      chartsType: "",  // 需要渲染出来的图表类型
      picChart: "",
      cloneCharts: [],
      moveId: -1,
      currentHeight: 300,
      parentWidth: 1000, // 父元素的宽度
    };
  },
  components: {
    draggable,
    VueDraggableResizable,
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
    // 普通折线图
    options2(){
      const options = {
        title: {
          text: "普通折线图图", // 主标题
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
            type: "line",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
        ],
      };
      return options;
    }
  },
  mounted() {},
  methods: {
    resizing(x, y, w, h) {
      this.picChart.getDom().style.height = h + "px";
      this.picChart.getDom().style.width = w + "px";
      this.picChart.resize();
    },
    // 添加图表
    createBrefCharts() {
      let options = this.getCurrentOptions()
      const id = this.createRandomId()
      if (this.cloneCharts.length === 0) {
        // 第一次生成
        this.cloneCharts.push({
          id: 1,
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
        });
        
        this.$nextTick(() => {
          this.renderChart(id, options);
        });
        return;
      }
      // const charts = this.cloneCharts; // 数组深拷贝
      // console.log(this.cloneCharts)
      let newIndex = this.cloneCharts.length;
      // 添加新的图标到cloneCharts
      // 判断是水平放置还是垂直放置

      this.cloneCharts.push({
        id: this.cloneCharts[newIndex - 1].id + 1,
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
      });
      this.$nextTick(() => {
        this.renderChart(id, options);
      });
      this.changeParentsHeight();
    },

    // 修改父元素的高度
    changeParentsHeight() {
      // 父元素的高度为cloneCharts中y值最大的一项加上此项的maxHeight + 10
      // @遍历
      let maxY = this.greater(this.cloneCharts);
      // console.log("旧容器当前高度：", this.currentHeight);
      if (this.currentHeight < maxY.y + maxY.maxHeight + 10) {
        this.currentHeight = maxY.y + maxY.maxHeight + 10;
        // console.log("新容器当前高度：", this.currentHeight);
      }

      // 更新组件中获取的父元素的高度的值
      this.$nextTick(() => {
        this.$refs["drag"].forEach((item) => item.checkParentSize());
      });
    },
    // 获取最大值
    greater(arr) {
      return arr
        .sort((a, b) => a - b)
        .slice()
        .pop();
    },

    // 拖拽结束
    dragend(nodes) {      // 拖拽结束时获取的node节点, id对应图标类型
      let id = nodes.item.id
      this.chartsType = nodes.item.dataset.type
      let target = nodes.originalEvent.path[0].id;
      if (target === "dragbox") {
        this.createBrefCharts();
      }
    },

    clickDrag(e){
      console.log('click', e)
    },

    // 拖拽移动
    onMove(e){
      console.log(e)
    },

    // 选中要拖拽的组件事件
    onChoose(e){
      console.log(e)
    },

    // 单击组件时触发
    getCurrentNodes(id){
      let nodes = document.getElementById(id)
      let chart = nodes.querySelector('.pic-chart')
      this.picChart = echarts.init(document.getElementById(chart.id))
    },

    // 图标渲染
    renderChart(chart, options) {
      let currentNodes = document.getElementById("dragbox").children
      let childrens = [ ...currentNodes ]
      let currentChild = childrens[this.chartsNum];
      let currentChart = document.createElement('div')
      currentChart.id = chart
      currentChart.className = 'pic-chart'
      currentChart.style.width = '400px'
      currentChart.style.height = '300px'
      currentChild.append(currentChart)
      // console.log(childrens[this.chartsNum])
      const picChart = echarts.init(
        document.getElementById(chart)
      );
      this.picChart = picChart;
      this.picChart.setOption(options)
      this.chartsNum++
    },

    // 需要渲染的图表
    getCurrentOptions(){
      let options = ""
      switch (this.chartsType) {
        case 'bar':
          options = this.options1
          break;
      
        default: options = this.options2
          break;
      }
      return options
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
  },
};
</script>

<style scoped>
.charts {
  width: 100px;
  height: 100px;
  border-radius: 4px;
  background-color: antiquewhite;
  margin: 10px auto;
  cursor: pointer;
  line-height: 100px;
}
.charts-col {
  width: 100%;
  border-right: 1px solid antiquewhite;
}
.itxst {
  height: auto;
}
.pic-chart {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
}
</style>
