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
              <draggable @choose="dragStart" @end="dragend" :options="{group:{name: 'itxst',pull:'clone'},sort: false}">
                <transition-group>
                  <el-col
                    :span="24"
                    v-for="item in charts"
                    :key="item.id"
                    :id="'charts' + item.id"
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
            :style="{
              height: currentHeight + 'px',
              width: '1000px',
              border: '1px solid red',
              position: 'relative',
              margin: '0 auto',
            }"
          >
            <vue-draggable-resizable
              v-for="item in cloneCharts"
              :key="item.id"
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
        { id: "charts1", name: "charts1" },
        { id: "charts2", name: "charts2" },
        { id: "charts3", name: "charts3" },
        { id: "charts4", name: "charts4" },
        { id: "charts5", name: "charts5" },
      ],
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
  mounted() {},
  methods: {
    // 添加图表
    createBrefCharts() {
      if (this.cloneCharts.length === 0) {
        // 第一次生成
        this.cloneCharts.push({
          id: 1,
          w: 400,
          h: 200,
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
        return;
      }
      // const charts = this.cloneCharts; // 数组深拷贝
      // console.log(this.cloneCharts)
      let newIndex = this.cloneCharts.length;
      // 添加新的图标到cloneCharts
      this.cloneCharts.push({
        id: this.cloneCharts[newIndex - 1].id + 1,
        w: 400,
        h: 200,
        parent: true,
        x: 0,
        y: this.cloneCharts[newIndex - 1].y + 10 + 200,
        debug: false,
        minWidth: 200,
        minHeight: 200,
        maxWidth: 400,
        maxHeight: 400,
        isConflictCheck: true,
        snap: true,
        grid: [10, 10],
      });
      this.changeParentsHeight();
    },

    // 修改父元素的高度
    changeParentsHeight() {
      // 父元素的高度为cloneCharts中y值最大的一项加上此项的maxHeight + 10
      // @遍历
      let maxY = this.greater(this.cloneCharts);
      console.log("旧容器当前高度：", this.currentHeight);
      if (this.currentHeight < maxY.y + maxY.maxHeight + 10) {
        this.currentHeight = maxY.y + maxY.maxHeight + 10;
        console.log("新容器当前高度：", this.currentHeight);
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
    dragend(nodes) {
      // 拖拽结束时获取的node节点, id对应图标类型
      let id = nodes.item.id;
      let target = nodes.originalEvent.path[0].id;
      if (target === "dragbox") {
        this.createBrefCharts();
      }
    },

    // onMove拖拽进行
    onMove(evt) {
      console.log(evt)
      // if (e.relatedContext.element.className == "forbid") return false;
    },

    // 拖拽开始前
    dragStart(e) {console.log(e)},
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
</style>
