<!--
 * @Description: svg地图
 * @Date: 2021-07-20 10:21:08
 * @page: 
-->
<template>
  <div>
    <div id="map"></div>
    <!-- <a
      href="https://gallery.echartsjs.com/asset/get/s/data-1528971808162-BkOXf61WX.json"
      >https://gallery.echartsjs.com/asset/get/s/data-1528971808162-BkOXf61WX.json</a
    >var uploadedDataURL = &quot;<a
      href='https://gallery.echartsjs.com/asset/get/s/data-1528971808162-BkOXf61WX.json"'
      >https://gallery.echartsjs.com/asset/get/s/data-1528971808162-BkOXf61WX.json&quot;</a
    > -->
  </div>
</template>

<script>
import $ from "jquery";
const echarts = require("echarts");

export default {
  name: "Map",
  data() {
    return {};
  },

  mounted() {
    // var uploadedDataURL =
    //   "https://gallery.echartsjs.com/asset/get/s/data-1528969802719-HyXIqhk-m.json";
    var myChart = echarts.init(document.getElementById("map"));
    /*
喜欢作品的可以关注csdn https://blog.csdn.net/qq_47410017
*/

    //定义一个全局变量，用来统计每个省有几个市
    // let num = 0;
    //1.中国地图
    var chinaMap = require("@/assets/china.json");
    //2.台湾省地图
    var taiWanMap = "/asset/province/taiwan.json";
    //3.海南省地图
    var haiNanMap = "/asset/province/hainan.json";
    //4.安徽省地图
    var anHuiMap = "/asset/province/anhui.json";
    //5.江西省地图
    var jiangXiMap = "/asset/province/jiangxi.json";
    //6.湖南省地图
    var huNanMap = "/asset/province/hunan.json";
    //7.云南省地图
    var yunNanMap = "/asset/province/yunnan.json";
    //8.贵州省地图
    var guiZhouMap = "/asset/province/guizhou.json";
    //9.广东省地图
    var guangDongMap = "/asset/province/guangdong.json";
    //10.福建省地图
    var fuJianMap = "/asset/province/fujian.json";
    //11.浙江省地图
    var zheJiangMap = "/asset/province/zhejiang.json";
    //12.江苏省地图
    var jiangSuMap = "/asset/province/jiangsu.json";
    //13.四川省地图
    var siChuanMap = "/asset/province/sichuan.json";
    //14.重庆市市地图
    var chongQingMap = "/asset/province/chongqing.json";
    //15.湖北省地图
    var huBeiMap = "/asset/province/hubei.json";
    //16.河南省地图
    var heNanMap = "/asset/province/henan.json";
    //17.山东省地图
    var shanDongMap = "/asset/province/shandong.json";
    //18.吉林省地图
    var jiLinMap = "/asset/province/jilin.json";
    //19.辽宁省地图
    var liaoNingMap = "/asset/province/liaolin.json";
    //20.天津市市地图
    var tianJinMap = "/asset/province/tianjin.json";
    //21.北京市市地图
    var beiJingMap = "/asset/province/beijing.json";
    //22.河北省地图
    var heBeiMap = "/asset/province/hebei.json";
    //23.山西省地图
    var shanXiMap = "/asset/province/shanxi.json";
    //24.陕西省地图
    var shanXi2Map = "/asset/province/shanxi1.json";
    //25.宁夏回族自治区省地图
    var ningXiaMap = "/asset/province/ningxia.json";
    //26.青海省地图
    var qingHaiMap = "/asset/province/qinghai.json";
    //27.西藏自治区地图
    var xiZangMap = "/asset/province/xizang.json";
    //28.黑龙江省地图
    var heiLongJiangMap = "/asset/province/heilongjiang.json";
    //29.内蒙古自治区地图
    var neimengGuMap = "/asset/province/neimenggu.json";
    //30.甘肃省地图
    var ganSuMap = "/asset/province/gansu.json";
    //31.新疆维吾尔自治区省地图
    var xinJiangMap = "/asset/province/xinjiang.json";
    //32.广西壮族自治区地图
    var guangxiMap = "/asset/province/guangxi.json";
    //33.香港特别行政区
    var xianggangMap = "/assets/province/xianggang.json";
    //34.香港特别行政区
    var aomenMap = "/assets/province/aomen.json";
    //设置初始地图
    var mapname = chinaMap;
    //设置省份的json 这里注意名字要和中国地图上的名字一致
    var mapJson = [
      {
        name: "台湾",
        json: taiWanMap,
      },
      {
        name: "海南",
        json: haiNanMap,
      },
      {
        name: "安徽",
        json: anHuiMap,
      },
      {
        name: "江西",
        json: jiangXiMap,
      },
      {
        name: "湖南",
        json: huNanMap,
      },
      {
        name: "云南",
        json: yunNanMap,
      },
      {
        name: "贵州",
        json: guiZhouMap,
      },
      {
        name: "广东",
        json: guangDongMap,
      },
      {
        name: "福建",
        json: fuJianMap,
      },
      {
        name: "浙江",
        json: zheJiangMap,
      },
      {
        name: "江苏",
        json: jiangSuMap,
      },
      {
        name: "四川",
        json: siChuanMap,
      },
      {
        name: "重庆",
        json: chongQingMap,
      },
      {
        name: "湖北",
        json: huBeiMap,
      },
      {
        name: "河南",
        json: heNanMap,
      },
      {
        name: "山东",
        json: shanDongMap,
      },
      {
        name: "吉林",
        json: jiLinMap,
      },
      {
        name: "辽宁",
        json: liaoNingMap,
      },
      {
        name: "天津",
        json: tianJinMap,
      },
      {
        name: "北京",
        json: beiJingMap,
      },
      {
        name: "河北",
        json: heBeiMap,
      },
      {
        name: "山西",
        json: shanXiMap,
      },
      {
        name: "陕西",
        json: shanXi2Map,
      },
      {
        name: "宁夏",
        json: ningXiaMap,
      },
      {
        name: "青海",
        json: qingHaiMap,
      },
      {
        name: "西藏",
        json: xiZangMap,
      },
      {
        name: "黑龙江",
        json: heiLongJiangMap,
      },
      {
        name: "内蒙古",
        json: neimengGuMap,
      },
      {
        name: "甘肃",
        json: ganSuMap,
      },
      {
        name: "新疆",
        json: xinJiangMap,
      },
      {
        name: "广西",
        json: guangxiMap,
      },
      {
        name: "香港",
        json: xianggangMap
      },
      {
        name: "澳门",
        json: aomenMap
      }
    ];
    //提取自动播放的代码
    function timing() {
      // 取消高亮指定的数据图形
      myChart.dispatchAction({
        type: "downplay",
        seriesIndex: 0,
        dataIndex: index,
      });
      // 高亮指定的数据图形
      // myChart.dispatchAction({
      //   type: "highlight",
      //   seriesIndex: 0,
      //   dataIndex: index + 1,
      // });
      // index++;
      // //判断长度是否和城市的长度一样，如果一样重新播放
      // if (index > num) {
      //   index = -1;
      // }
    }
    //加载时的文字提示
    myChart.showLoading({ text: "正在加载数据" }); //增加等待提示
    //设置开始位置（播放的位置）
    let index = -1;
    //定时播放
    var timer = setInterval(function () {
      //调用定时播放代码
      timing();
    }, 1500);

    //鼠标移入
    myChart.on("mousemove", function (e) {
      
      //取消定时
      clearInterval(timer);
      //取消高亮
      myChart.dispatchAction({
        type: "downplay",
        seriesIndex: 0,
      });
      //高亮鼠标移入的位置
      myChart.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: e.dataIndex,
      });
    });
    //鼠标移出
    myChart.on("mouseout", function (e) {
      //取消定时
      clearInterval(timer);
      //取消高亮
      myChart.dispatchAction({
        type: "downplay",
        seriesIndex: 0,
        dataIndex: e.dataIndex,
      });
      //重新开始定时播放
      timer = setInterval(function () {
        //调用定时播放代码
        timing();
      }, 1500);
    });
    //点击事件
    myChart.on("click", function (e) {
      //过滤 这里是es6语法 filter函数可以看成是一个过滤函数，返回符合条件的元素的数组
      var chooseName = mapJson.filter((item) => {
        //我们根据名字来判断是否选择一种
        return item.name == e.name;
      });
      //这里的chooseName是一个数组，我们需要获取到json 有兴趣可以打印
      //{name: "新疆维吾尔自治区", json: "json/新疆维吾尔自治区.json"}
      mapname = chooseName[0].json;

      //添加一个返回按键
      $('<div class="back">返回中国地图</div>').appendTo($("#chart-panel"));
      //给返回按键设置样式
      $(".back").css({
        position: "absolute", //绝对地位
        left: "20px", //设置位置
        top: "20px", //设置位置 
        color: "pink", //设置字体颜色
        "font-size": "20px", //设置字体大小
        cursor: "pointer", //变小手
      });
      //设置返回按钮的点击事件
      $(".back").click(function () {
        //地图重新设置为中国地图
        mapname = chinaMap;
        //隐藏按钮
        $(".back").css({
          opacity: 0,
        });
        //绘制地图
        mapInit();
        //重新开始定时播放
        timer = setInterval(function () {
          //调用定时播放代码
          timing();
        }, 1500);
      });
      //绘制地图
      mapInit();
      //定时播放
      timer = setInterval(function () {
        //调用定时播放代码
        timing();
      }, 1500);
    });
    //设置初始化时间
    setTimeout(function () {
      mapInit();
    }, 500);

    //创建地图
    var mapInit = () => {
        //require引入中国地图（同步）
        let geoJson = require('@/assets/china.json')
        //获取到长度（每个省里有几个市）
        // num = geoJson.features.length;
        //调用我们通过json对象注册的地图
        echarts.registerMap("China", geoJson);
        //文件加载的动画
        myChart.hideLoading();
        //判断是否为祖国地图
        if (mapname === chinaMap) {
          //设置小黄点
          var geoCoordMap = {
            台湾: [122, 23],
            黑龙江: [129, 51],
            内蒙古: [110.3467, 41.4899],
            吉林: [125.8154, 44.2584],
            北京市: [116.4551, 40.2539],
            辽宁: [123.1238, 42.1216],
            河北: [114.4995, 38.1006],
            天津: [117.4219, 39.4189],
            山西: [112.3352, 37.9413],
            陕西: [109.1162, 34.2004],
            甘肃: [103.5901, 36.3043],
            宁夏: [106.3586, 38.1775],
            青海: [101.4038, 36.8207],
            新疆: [87.9236, 43.5883],
            西藏: [88.388277, 31.56375],
            四川: [103.9526, 30.7617],
            重庆: [108.384366, 30.439702],
            山东: [117.1582, 36.8701],
            河南: [113.4668, 34.6234],
            江苏: [118.8062, 31.9208],
            安徽: [117.29, 32.0581],
            湖北: [114.3896, 30.6628],
            浙江: [119.5313, 29.8773],
            福建: [119.4543, 25.9222],
            江西: [116.0046, 28.6633],
            湖南: [113.0823, 28.2568],
            贵州: [106.6992, 26.7682],
            云南: [102.9199, 25.4663],
            广东: [113.12244, 23.009505],
            广西: [108.479, 23.1152],
            海南: [110.3893, 19.8516],
            上海: [121.4648, 31.2891],
          };
          //设置每个区域的值
          var data = [
            { name: "台湾", value: 1 },
            { name: "北京", value: 2 },
            { name: "天津", value: 3 },
            { name: "河北", value: 4 },
            { name: "山西", value: 5 },
            { name: "内蒙古", value: 6 },
            { name: "辽宁", value: 7 },
            { name: "吉林", value: 8 },
            { name: "黑龙江", value: 9 },
            { name: "上海", value: 10 },
            { name: "江苏", value: 11 },
            { name: "浙江", value: 12 },
            { name: "安徽", value: 13 },
            { name: "福建", value: 14 },
            { name: "江西", value: 15 },
            { name: "山东", value: 16 },
            { name: "河南", value: 17 },
            { name: "湖北", value: 18 },
            { name: "湖南", value: 19 },
            { name: "重庆", value: 20 },
            { name: "四川", value: 21 },
            { name: "贵州", value: 22 },
            { name: "云南", value: 23 },
            { name: "西藏", value: 24 },
            { name: "陕西", value: 25 },
            { name: "甘肃", value: 26 },
            { name: "青海", value: 27 },
            { name: "宁夏", value: 28 },
            { name: "新疆", value: 29 },
            { name: "广东", value: 30 },
            { name: "广西", value: 31 },
            { name: "海南", value: 32 },
          ];
          //给每个地区赋值
          var convertData = function (data) {
            //定义一个数组
            var res = [];
            //循环遍历每个区域值
            for (var i = 0; i < data.length; i++) {
              //获取坐标
              var geoCoord = geoCoordMap[data[i].name];
              //判断是否有坐标
              if (geoCoord) {
                //往数组里设置值
                res.push({
                  name: data[i].name,
                  value: geoCoord.concat(data[i].value),
                });
              }
            }
            return res;
          };
        } else {
          //这里不为中国地图所以先不设置（后面需要对市区进行标记在设置）

          //设置小黄点
          geoCoordMap = {};
          //设置每个区域的值
          data = [];
          //给每个地区赋值
          convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
              var geoCoord = geoCoordMap[data[i].name];
              if (geoCoord) {
                res.push({
                  name: data[i].name,
                  value: geoCoord.concat(data[i].value),
                });
              }
            }
            return res;
          };
        }

        //地图开始
        var option = {
          //设置背景颜色
          backgroundColor: "#020933",
          tooltip: {
            formatter: function(params) {
                return params.name + '<br>' + '视频数:' + '<br>';
            }
          },
          geo: {
            map: "China", //地图为刚刚设置的China
            aspectScale: 0.75, //长宽比
            zoom: 1.1, //当前视角的缩放比例
            roam: false, //是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
            itemStyle: {
              //地图区域的多边形 图形样式
              normal: {
                areaColor: "#013C62", //地区颜色
                shadowColor: "#182f68", //阴影颜色
                shadowOffsetX: 0, //阴影偏移量
                shadowOffsetY: 0, //阴影偏移量
              },
              emphasis: {
                areaColor: "#2AB8FF", //地区颜色
                label: {
                  show: false, //是否在高亮状态下显示标签
                },
              },
            },
          },
          series: [
            //数据系列
            {
              type: "map", //地图类型
              //地图上文字
              label: {
                normal: {
                  show: true, //是否显示标签
                  textStyle: {
                    color: "#fff",
                  },
                },
                emphasis: {
                  textStyle: {
                    color: "#fff",
                  },
                },
              },
              //地图区域的多边形 图形样式
              itemStyle: {
                normal: {
                  borderColor: "#2ab8ff",
                  borderWidth: 1.5,
                  areaColor: "#12235c",
                },
                emphasis: {
                  areaColor: "#2AB8FF",
                  borderWidth: 0,
                },
              },
              zoom: 1.1, //当前视角的缩放比例
              //是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
              roam: false,
              map: "China", //使用中国地图
            },
            {
              //设置为分散点
              type: "scatter",
              //series坐标系类型
              coordinateSystem: "geo",
              //设置图形 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
              symbol: "circle",
              // //标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10
              symbolSize: [40, 40],
              //气泡字体设置
              label: {
                normal: {
                  show: false, //是否显示
                  textStyle: {
                    color: "#fff", //字体颜色
                    fontSize: 8, //字体大小
                  },
                  //返回气泡数据
                  formatter(value) {
                    return value.data.value[2];
                  },
                },
              },
              itemStyle: {
                normal: {
                  color: "#1E90FF", //标志颜色
                },
              },
              //给区域赋值
              data: convertData(data),
              showEffectOn: "render", //配置何时显示特效。可选：'render' 绘制完成后显示特效。'emphasis' 高亮（hover）的时候显示特效。
              rippleEffect: {
                //涟漪特效相关配置。
                brushType: "fill", //波纹的绘制方式，可选 'stroke' 和 'fill'
              },
              hoverAnimation: true, //是否开启鼠标 hover 的提示动画效果。
              zlevel: 1, //所属图形的 zlevel 值
            },
          ],
        };
        myChart.setOption(option);
      // });
    };
  },

  methods: {},
};
</script>

<style scoped>
#map {
  width: 800px;
  height: 800px;
}
</style>
