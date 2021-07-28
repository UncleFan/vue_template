<!--
 * @Description: Echarts Demo
 * @Date: 2021-07-27 10:51:46
 * @page: Demo.vue
-->
<template>
  <div>
    <div class="charts">
      <div
        class="echarts"
        v-for="(item, index) in currentData"
        :key="item.chartsId"
      >
        <div>
          <button-groups
            :groups="chartsData[index].data"
            @handleButton="handleButton"
          ></button-groups>
          <div :id="item.chartsId" class="charts-demo"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import groups from "@/utils/data.js";
import ButtonGroups from "@/pages/components/ButtonGroups";
import * as echarts from "echarts";
export default {
  name: "Demo",
  data() {
    return {
      chartsData: [],
      currentData: [],
      currentID: "",
      buttonGroupsData: [],
    };
  },

  components: {
    ButtonGroups,
  },

  mounted() {
    this.chartsData = groups;
    groups.forEach((item) => {
      if (item.data.length > 0) {
        this.currentData.push(item.data[0]);
      }
    });
    this.currentData.forEach((item) => {
      this.renderCharts(item);
    });
  },

  methods: {
    renderCharts(item) {
      const options = this.createOptions(item);
      this.$nextTick(() => {
        let dom = echarts.init(document.getElementById(item.chartsId))
        dom.setOption(options)
      })
    },
    createOptions(item) {
      let options = {
        title: {
          text: item.chartsTitle,
          subtext: "纯属虚构",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: item.series,
        xAxis: item.xAxis,
        yAxis: item.yAxis,
        radar: item.radar,
        toolbox: item.toolbox
      };
      return options;
    },
    handleButton(id) {
      this.currentID = id;
      let k = 0;
      let item = {};
      // 重组currentData, k 为currentData的第k项
      for(let i = 0; i < this.chartsData.length; i ++){
          if(this.chartsData[i].data.length > 0){
              for(let j = 0; j < this.chartsData[i].data.length; j++){
                if(this.chartsData[i].data[j].chartsId === id){
                    k = i
                    item = this.chartsData[i].data[j]
                }
              }
          }
      }
      this.currentData.splice(k, 1, item)
      this.currentData.forEach((o) => {
        this.renderCharts(o);
      });
    },
  },
};
</script>

<style scoped>
.charts {
  width: 100vw;
  height: 100vh;
  background: -webkit-linear-gradient(top, transparent 10px, #eeeeee 11px),
    -webkit-linear-gradient(left, transparent 10px, #eeeeee 11px);
  background-size: 11px 11px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 50px 10%;
  box-sizing: border-box;
}
.charts > div {
  width: 35%;
}

.charts-demo {
  width: 400px;
  height: 300px;
}
</style>
