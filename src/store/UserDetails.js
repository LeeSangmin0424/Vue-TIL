import {defineStore} from 'pinia'

export  const useAuthStore = defineStore({
    id: 'userDetails',
    state:()=>({ // 저장으로 사용할 전역 변수 정의
        username:'ㅁㅁㅁ',
        role:'admin',
    }),

    getters:{
        username:(state)=> state.userDetails.username
    },

    actions:{
        getAuth(){
            return this.userDetails.username;
        },
        invalid(){
            this.userDetails.username = null; // 사용자 로그아웃
            this.userDetails.role = null;
        },
        setAuth(value){
            this.userDetails.username = value;
        }
    }

});
