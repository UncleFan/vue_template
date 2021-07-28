<!--
 * @Description: 
 * @Date: 2021-06-04 09:42:10
 * @page: 
-->
<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
    console.log(this.$route)
    this.storage.set("testKey");
    this.storage.set("data", {a: 1, b: 2})
    const data = this.storage.get("data")
    const testKey = this.storage.get("testKey");
    console.log(data,testKey)
  }
}
</script>

<style>
html,body{
  width: 100%;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
