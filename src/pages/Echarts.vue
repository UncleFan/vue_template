<!--
 * @Description: Echarts示例
 * @Date: 2021-07-22 16:23:45
 * @page: 
-->
<template>
  <div>
    <div class="container">
      <el-row >
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
            <el-row :gutter="10">
              <el-col :span="16">
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
                      <span class="el-icon-edit" @click="editChart">编辑</span>
                    </vue-draggable-resizable>
                  </draggable>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card>
                  <echart-form-modal ref="form"></echart-form-modal>
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
      <echart-form-modal></echart-form-modal>
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
const hunan = require("@/assets/province/hunan.json")
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
      let type = chartsType.substring(0, 3)
      if (target === "dragbox") {
        // 区分生成地图还是普通echarts
        if(type !== "map"){
          this.createBrefCharts(chartsId, chartsType);
        }else{
          this.createMapCharts(chartsId, chartsType);
        }
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
        grid: [1, 1],
      }, currentChart[0])
      this.cloneCharts.push(options)
      this.$nextTick(() => {
        const dom = echarts.init(document.getElementById(chartsId))
        dom.setOption(currentChart[0])
      })
    },

    // 创建地图
    createMapCharts(id, typeId){
      var data = [
          {name: '海门', value: 9},
          {name: '鄂尔多斯', value: 12},
          {name: '招远', value: 12},
          {name: '舟山', value: 12},
          {name: '齐齐哈尔', value: 14},
          {name: '盐城', value: 15},
          {name: '赤峰', value: 16},
          {name: '青岛', value: 18},
          {name: '乳山', value: 18},
          {name: '金昌', value: 19},
          {name: '泉州', value: 21},
          {name: '莱西', value: 21},
          {name: '日照', value: 21},
          {name: '胶南', value: 22},
          {name: '南通', value: 23},
          {name: '拉萨', value: 24},
          {name: '云浮', value: 24},
          {name: '梅州', value: 25},
          {name: '文登', value: 25},
          {name: '上海', value: 25},
          {name: '攀枝花', value: 25},
          {name: '威海', value: 25},
          {name: '承德', value: 25},
          {name: '厦门', value: 26},
          {name: '汕尾', value: 26},
          {name: '潮州', value: 26},
          {name: '丹东', value: 27},
          {name: '太仓', value: 27},
          {name: '曲靖', value: 27},
          {name: '烟台', value: 28},
          {name: '福州', value: 29},
          {name: '瓦房店', value: 30},
          {name: '即墨', value: 30},
          {name: '抚顺', value: 31},
          {name: '玉溪', value: 31},
          {name: '张家口', value: 31},
          {name: '阳泉', value: 31},
          {name: '莱州', value: 32},
          {name: '湖州', value: 32},
          {name: '汕头', value: 32},
          {name: '昆山', value: 33},
          {name: '宁波', value: 33},
          {name: '湛江', value: 33},
          {name: '揭阳', value: 34},
          {name: '荣成', value: 34},
          {name: '连云港', value: 35},
          {name: '葫芦岛', value: 35},
          {name: '常熟', value: 36},
          {name: '东莞', value: 36},
          {name: '河源', value: 36},
          {name: '淮安', value: 36},
          {name: '泰州', value: 36},
          {name: '南宁', value: 37},
          {name: '营口', value: 37},
          {name: '惠州', value: 37},
          {name: '江阴', value: 37},
          {name: '蓬莱', value: 37},
          {name: '韶关', value: 38},
          {name: '嘉峪关', value: 38},
          {name: '广州', value: 38},
          {name: '延安', value: 38},
          {name: '太原', value: 39},
          {name: '清远', value: 39},
          {name: '中山', value: 39},
          {name: '昆明', value: 39},
          {name: '寿光', value: 40},
          {name: '盘锦', value: 40},
          {name: '长治', value: 41},
          {name: '深圳', value: 41},
          {name: '珠海', value: 42},
          {name: '宿迁', value: 43},
          {name: '咸阳', value: 43},
          {name: '铜川', value: 44},
          {name: '平度', value: 44},
          {name: '佛山', value: 44},
          {name: '海口', value: 44},
          {name: '江门', value: 45},
          {name: '章丘', value: 45},
          {name: '肇庆', value: 46},
          {name: '大连', value: 47},
          {name: '临汾', value: 47},
          {name: '吴江', value: 47},
          {name: '石嘴山', value: 49},
          {name: '沈阳', value: 50},
          {name: '苏州', value: 50},
          {name: '茂名', value: 50},
          {name: '嘉兴', value: 51},
          {name: '长春', value: 51},
          {name: '胶州', value: 52},
          {name: '银川', value: 52},
          {name: '张家港', value: 52},
          {name: '三门峡', value: 53},
          {name: '锦州', value: 54},
          {name: '南昌', value: 54},
          {name: '柳州', value: 54},
          {name: '三亚', value: 54},
          {name: '自贡', value: 56},
          {name: '吉林', value: 56},
          {name: '阳江', value: 57},
          {name: '泸州', value: 57},
          {name: '西宁', value: 57},
          {name: '宜宾', value: 58},
          {name: '呼和浩特', value: 58},
          {name: '成都', value: 58},
          {name: '大同', value: 58},
          {name: '镇江', value: 59},
          {name: '桂林', value: 59},
          {name: '张家界', value: 59},
          {name: '宜兴', value: 59},
          {name: '北海', value: 60},
          {name: '西安', value: 61},
          {name: '金坛', value: 62},
          {name: '东营', value: 62},
          {name: '牡丹江', value: 63},
          {name: '遵义', value: 63},
          {name: '绍兴', value: 63},
          {name: '扬州', value: 64},
          {name: '常州', value: 64},
          {name: '潍坊', value: 65},
          {name: '重庆', value: 66},
          {name: '台州', value: 67},
          {name: '南京', value: 67},
          {name: '滨州', value: 70},
          {name: '贵阳', value: 71},
          {name: '无锡', value: 71},
          {name: '本溪', value: 71},
          {name: '克拉玛依', value: 72},
          {name: '渭南', value: 72},
          {name: '马鞍山', value: 72},
          {name: '宝鸡', value: 72},
          {name: '焦作', value: 75},
          {name: '句容', value: 75},
          {name: '北京', value: 79},
          {name: '徐州', value: 79},
          {name: '衡水', value: 80},
          {name: '包头', value: 80},
          {name: '绵阳', value: 80},
          {name: '乌鲁木齐', value: 84},
          {name: '枣庄', value: 84},
          {name: '杭州', value: 84},
          {name: '淄博', value: 85},
          {name: '鞍山', value: 86},
          {name: '溧阳', value: 86},
          {name: '库尔勒', value: 86},
          {name: '安阳', value: 90},
          {name: '开封', value: 90},
          {name: '济南', value: 92},
          {name: '德阳', value: 93},
          {name: '温州', value: 95},
          {name: '九江', value: 96},
          {name: '邯郸', value: 98},
          {name: '临安', value: 99},
          {name: '兰州', value: 99},
          {name: '沧州', value: 100},
          {name: '临沂', value: 103},
          {name: '南充', value: 104},
          {name: '天津', value: 105},
          {name: '富阳', value: 106},
          {name: '泰安', value: 112},
          {name: '诸暨', value: 112},
          {name: '郑州', value: 113},
          {name: '哈尔滨', value: 114},
          {name: '聊城', value: 116},
          {name: '芜湖', value: 117},
          {name: '唐山', value: 119},
          {name: '平顶山', value: 119},
          {name: '邢台', value: 119},
          {name: '德州', value: 120},
          {name: '济宁', value: 120},
          {name: '荆州', value: 127},
          {name: '宜昌', value: 130},
          {name: '义乌', value: 132},
          {name: '丽水', value: 133},
          {name: '洛阳', value: 134},
          {name: '秦皇岛', value: 136},
          {name: '株洲', value: 143},
          {name: '石家庄', value: 147},
          {name: '莱芜', value: 148},
          {name: '常德', value: 152},
          {name: '保定', value: 153},
          {name: '湘潭', value: 154},
          {name: '金华', value: 157},
          {name: '岳阳', value: 169},
          {name: '长沙', value: 175},
          {name: '衢州', value: 177},
          {name: '廊坊', value: 193},
          {name: '菏泽', value: 194},
          {name: '合肥', value: 229},
          {name: '武汉', value: 273},
          {name: '大庆', value: 279}
      ];
      let mapJson = require(`../assets/province/${typeId.substr(4, typeId.length)}.json`)
      const geoCoordMap = mapJson;
      echarts.registerMap(`${typeId.substr(4, typeId.length)}`, mapJson)
      let mapData = Object.assign({}, {
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
      },{
        // 地图参数
        
        title : {
            text: '全国数据请求量',
            subtext: 'Show Data',
            left: 'center',
            top: 'top',
            textStyle: {
                color: '#fff'
            }
        },
        tooltip: {},
        legend: {
            left: 'left',
            data: ['强', '中', '弱'],
            textStyle: {
                color: '#ccc'
            }
        },
        backgroundColor: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 1,
            colorStops: [{
                offset: 0, color: '#0f2c70' // 0% 处的颜色
            }, {
                offset: 1, color: '#091732' // 100% 处的颜色
            }],
            globalCoord: false // 缺省为 false
        },
        geo: {
            map: 'china',
            show: true,
            roam: true,
            label: {
                emphasis: {
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    areaColor: '#091632',
                    borderColor: '#1773c3',
                    shadowColor: '#1773c3',
                    shadowBlur: 20
                }
            }
        },
        series: [
            {
                type: 'map',
                map: 'china',
                geoIndex: 1,
                aspectScale: 0.75, //长宽比
                showLegendSymbol: true, // 存在legend时显示
                label: {
                    normal: {
                        show: false,
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: '#031525',
                        borderColor: '#3B5077',
                        borderWidth: 1
                    },
                    emphasis: {
                        areaColor: '#0f2c70'
                    }
                },
                data:[
                    {name: '北京',value: 21300 }
                ]
            },
            {
                name: '城市',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: this.convertData(data, geoCoordMap),
                symbolSize: function (val) {
                    return val[2] / 20;
                },
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#ddb926'
                    }
                }
            },
            {
                name: '前5',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: this.convertData(data.sort(function (a, b) {
                    return b.value - a.value;
                }).slice(0, 6), geoCoordMap),
                symbolSize: function (val) {
                    return val[2] / 20;
                },
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#f4e925',
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                zlevel: 1
            }
        ]

      })
      mapData['chartsId'] = id
      this.cloneCharts.push(mapData)


      this.$nextTick(() => {
        const dom = echarts.init(document.getElementById(id))
        dom.setOption(mapData)
      })
      
      // console.log(url)
      // let mapJson = ""
      // new Promise((resolve, reject) => {
      //   if(url){
      //     resolve(url)
      //   }
      // }).then(url => {
      //   mapJson = require(url)
      //   console.log(mapJson)
      // }).catch(err => console.log(err))
      // let mapJson = require(url)
      // let currentChart = chartsJson.filter(item => {
      //   return +typeId === item.typeId
      // })
      
      return
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
    },

    convertData(data, geoCoordMap) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
        return res;
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
    editChart(){
      this.drawer = true
    },

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
.el-icon-edit{
  position: absolute;
  top: 2px;
  right: 2px;
  cursor: pointer;
  color: #409EFF;
}
</style>
