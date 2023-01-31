<script>
import {computed} from 'vue'

export default{
    data(){
        return {
            userDetails:{username:null}
        }
    },


    provide(){ // 내 자손에게 물려주는 데이터
        return{
            userDetails:computed(()=>this.userDetails) // injection한다.
        }
    },

}

</script>

<template>
    <router-view></router-view>
</template>

