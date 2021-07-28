<!--
 * @Description: 
 * @Date: 2021-07-26 16:55:24
 * @page: 
-->
<template>
  <div class="tabbar" @click="mouseenter">
    <div class="tab" :class="item.active?'active':''" v-for="item in tabs" :key="item.type" @click="setActiveTabs(item)">{{ item.name }}</div>
    <el-collapse-transition>
      <div class="tab-content" v-show="show">
        <draggable
          @end="dragend"
          @choose="onChoose"
          :options="{
            group: { name: 'itxst', pull: 'clone' },
            sort: false,
          }"
        >
          <transition-group>
            <div
              v-for="item in tabContent"
              :key="item.id"
              :data-type="item.id"
              class="item forbid"
            >
              <img :src="item.icon" class="icon" />
              <span class="text">{{ item.name }}</span>
            </div>
          </transition-group>
        </draggable>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "Tabs",
  data() {
    return {
      show: false,
      tabs: [
        {
          type: "map",
          name: "地图",
          active: false
        },
        {
          type: "echarts",
          name: "图表",
          active: false
        },
        {
          type: "components",
          name: "组件",
          active: false
        },
        {
          type: "relations",
          name: "关系",
          active: false
        },
        {
          type: "canvas",
          name: "画布",
          active: false
        },
      ],
      // tab详情
      tabContent: [
        { name: "中国地图", icon: require("@/assets/china.png"), id: "1" },
        { name: "黑龙江省", icon: require("@/assets/china.png"), id: "2" },
        { name: "湖南省", icon: require("@/assets/china.png"), id: "3" },
        { name: "吉林省", icon: require("@/assets/china.png"), id: "4" },
      ],
    };
  },

  components: {
    draggable
  },
  methods: {
    mouseenter() {
      this.active = "map"
      this.show = true
    },
    mouseover(){
        this.show = false
    },
    setActiveTabs(item){
      this.tabs.forEach(o => {
        o.active = false
        if(o.name === item.name){
          o.active = true
        }
      })
    },
    dragend(node){ this.$emit("dragend", node)},
    onChoose(){}
  },
};
</script>

<style scoped>
.tabbar {
  width: 100%;
  height: 40px;
  background-color: cornflowerblue;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
  position: relative;
}
.tab {
  width: 100px;
  height: 100%;
  line-height: 40px;
  background-color: cornflowerblue;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
}
.tab.active {
  background-color: #409eff;
}
.tab-content {
  width: 100%;
  height: 120px;
  padding: 10px;
  position: absolute;
  top: 40px;
  left: 0;
  background-color: #fff;
  display: flex;
  box-sizing: border-box;
}
.tab-content>div{
  width: 100%;
}
.tab-content>div>span{
  display: flex;
}

.item {
  width: 120px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;
}
.icon {
  width: 60px;
}
.text {
  font-size: 12px;
  line-height: 20px;
  font-weight: bold;
}
</style>
