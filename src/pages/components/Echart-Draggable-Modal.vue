<!--
 * @Description: 
 * @Date: 2021-07-26 10:58:43
 * @page: 
-->
<template>
  <div>
    <vue-draggable-resizable
      :w="datas.w"
      :h="datas.h"
      :parent="true"
      :x="datas.x"
      :y="datas.y"
      :min-width="datas.minWidth"
      :min-height="datas.minHeight"
      :max-width="datas.maxWidth"
      :max-height="datas.maxHeight"
      :isConflictCheck="true"
      :snap="true"
      :grid="datas.grid"
      style="background-color: rgb(174, 213, 129)"
      @resizing="resizing"
      @activated="getCurrentNodes('vue-draggable-resizable' + datas.id)"
    ></vue-draggable-resizable>
  </div>
</template>

<script>
/* eslint-disable */
import VueDraggableResizable from "@/pages/components/vue-draggable-resizable";
import "vue-draggable-resizable/dist/VueDraggableResizable.css";
import * as echarts from "echarts";
export default {
  props: {
    datas: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  data() {
    return {};
  },

  components: {
    VueDraggableResizable
  },

  methods: {
    resizing(){

    },
    getCurrentNodes(){
        console.log(this.datas)
    }
  },
};
</script>

<style scoped>
</style>
