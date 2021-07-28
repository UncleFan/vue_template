<!--
 * @Description: 
 * @Date: 2021-07-26 10:12:35
 * @page: 
-->
<template>
    <div>
        <h4>测试</h4>
        <div class="box" style="width: 600px;height: 600px">
            <div class="avue-grid"></div>
            <avue-draggable @blur="changePosition">
                <div style="width:200px;height:200px;background:red"></div>
            </avue-draggable>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        changePosition(e){
            console.log(e)
        },
        changeSize(e){
            console.log(e)
        }
    }
}
</script>

<style scoped>
.box{
    border: 1px dashed #000;
    margin: 0 auto;
    position: relative;
}
</style>