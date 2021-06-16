<!--
 * @Description: 自定义v-model
 * @Date: 2021-06-16 09:56:58
 * 
-->
<template>
  <div>
    <p>{{ msg }}</p>
    <button @click="changValue">按钮aaa</button>
  </div>
</template>

<script lang="ts">
export default {
  name: "Model",
  model: {
    prop: "msg", //指向props的参数名
    event: "change", //事件名称
  },
  props: {
    msg: {
      type: String,
      default: "",
    },
  },

  methods: {
    changeMsg(value) {
      this.$emit("change", value);
    },
    changValue() {
      this.$emit("change", "aaa");
    },
  },
};
</script>
