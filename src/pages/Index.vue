<!--
 * @Description: 
 * @Date: 2021-06-04 09:42:10
 * @page: 
-->
<template>
    <div>
        <input type="text" v-model="message" />
        <custom-model v-model="message"></custom-model>
    </div>
</template>

<script>
import CustomModel from './components/Model.vue'
export default {
    name: 'Index',
    data(){
        return {
            message: ''
        }
    },

    components: { CustomModel }
}
</script>

<style scoped>

</style>