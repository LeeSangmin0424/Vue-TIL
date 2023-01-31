<script>
export default{
    props:['aa','value','message','targetId'], // 값을 실어 나른다.
    emits:['ondlgclose'], // 함수를 호출한다.
    data(){
        return{
            open:false
        }
    },
    methods:{
        okClickHandler(e){
            e.targetId = this.targetId;
            e.isOk=true;
            this.open=false;
            // this.$props("")
            this.$emit('ondlgclose',e) // ondigclose을 호출(실행)하는데, 인자가 있으면 이벤트 객체를 전달 할 수 있다.
        },
        cancelClickHandler(e){
            e.targetId = this.targetId;
            e.isOk=false;
            this.open=false;
            this.$emit('ondlgclose',e)
        }
    },

}
</script>

<template>
    <input 
    :class="aa" 
    type="submit" 
    :value="value" 
    @click.prevent="open=true" />
        <Teleport to="body">
        <section v-if="open" class="modal-screen">
            <h1>대화상자</h1>
            <div class="modal-content">
            <!-- <p>{{message}}</p> -->
            <p><slot /></p>
            <!-- <button>예</button> -->
            <button @click=okClickHandler>예</button>
            <button @click=cancelClickHandler>아니오</button>
            </div>
        </section>
        </Teleport>
</template>

<style scoped>
.modal-screen{
   position:fixed;
   left:0;
   top:0;
   width: 100vw;
   height: 100vh;
   background-color: rgba(0, 0, 0, 0.563);

}

.modal-content{
   position:fixed;
   left:50vw;
   top:30vh;
   width:300px;
   margin-left:-150px;


   background-color: white;
   border:1px solid black;
   border-radius: 5px;
   padding: 20px;

}
</style>