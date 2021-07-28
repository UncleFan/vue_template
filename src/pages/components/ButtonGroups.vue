<!--
 * @Description: button-groups
 * @Date: 2021-07-27 11:40:32
 * @page: ButtonGroups.vue
-->
<template>
    <div>
        <el-button size="small"
            v-for="item in groups" :key="item.chartsId"
            @click="chooseRoles(item.chartsId)"
            :type="item.chartsId === activeId?'primary':'default'" 
        >
            {{item.title}} ---- {{item.chartsId}} ---- {{activeId}}
        </el-button>
    </div>
</template>

<script>
export default {
    props: {
        groups: {
            type: Array,
            default: () => {
                return []
            }
        }
    },

    data(){
        return{
            activeId: this.$props['groups'][0].chartsId
        }
    },

    methods: {
        chooseRoles(id){
            this.activeId = id
            this.$emit('handleButton', id)
        }
    }
}
</script>