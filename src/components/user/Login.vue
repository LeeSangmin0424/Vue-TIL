

<script>
import {userAuthStore} from '../../store/UserDetails' 
import bcrypt from 'bcryptjs';
    export default{
        setup(){ // composition API를 optionAPI에서도 쓸 수 있게 지원
            const store = userAuthStore()

            return{

                store,
            }
        },
        inject:['userDetails'],
        data(){ // local 변수
            return {
                user:{uid:'',pwd:''},
                member:{},
                error:false,
            };
        },
        methods:{
            async getUser(uid){ 
            console.log(`http://localhost:8080/members/${uid}`);
            const response = await fetch(`http://localhost:8080/members/${uid}`)
           
            const json = await response.json();
       
            this.member = json;
    
        },
            loginHandler(){
                this.getUser(this.user.uid); //요청하고 이미 끝나버리기때문에 뒤에 뭘하든 쓸모x
                //로그인정보를 이용해서 인증처리


            }
        },
        watch:{
            member(newOne){
                //회원 정보를 가져와서 member값을 변경했다면 인증을 처리하자.
                bcrypt.compare(this.user.pwd, newOne.pwd, (err,res)=>{
                   if(res){// true or false
                        //인증상태를 저장하고
                        // console.log(this.userDetails);
                        console.log(this.store.userDetails.username);
                        console.log(this.store.username);
                        
                        //로그인 된 사용자페이지로 이동한다.
                        // this.userDetails.username = this.user.uid;
                        this.store.userDetails.username = this.user.uid;
                        console.log(this.store.username); // 바뀐 값이 잘 출력되는지
                       
                        if(this.$route.query.returnURL){
                            this.$router.push(this.$route.query.returnURL);
                                return;
                        }

                        // 관리자 홈페이지로 가도록
                        this.$router.push('/admin/index');
                            return;

                    } 

                   
                    this.error = true;

                });
            }
        }

    }
</script>



<template>
     <section>
            <header class="header-default">
                <h1 class="text-title1-h1">로그인</h1>
            </header>
            <section class="login">
                <h1 class="d-none">일반 로그인</h1>
                <div style="color:red; text-align:center; padding : 20px;" 
                    v-if="error">
                    아이디 또는 비밀번호가 일치하지 않습니다.
                </div>
                <form>
                    <div class="d-flex align-items-center">
                        <label class="d-none">아이디</label>
                        <input  v-model="user.uid" class="btn btn-cancel" type="text" placeholder="로그인 아이디를 입력하세요">
                    </div>
                    <div class="d-flex align-items-center">
                        <label class="d-none">비밀번호</label>
                        <input  v-model="user.pwd" class="btn btn-cancel" type="password" placeholder="비밀번호">
                    </div>

                    <div class="d-flex align-items-center justify-content-center">
                        <input type="checkbox">
                        <label>로그인 저장</label>
                    </div>
   
                    <div class="d-flex align-items-center justify-content-center">
                        <input type="hidden" name="returnURL" th:value="${param.returnURL}">
                        <input class="btn btn-default" type="submit" value="로그인" @click.prevent="loginHandler">
                        <a class="btn btn-cancel" href="">취소하기</a>
                    </div>
                </form>
            </section>

            <section class="register">
                <h1 class="d-none">회원가입</h1>
                <a href="signup.html">회원가입</a>
                <a href="">아이디 찾기</a>
                <a href="">비밀번호 찾기</a>
            </section>

            <section class="social-login">
                <h1 class="d-none">소셜 로그인</h1>
                <span>또는 다음으로 로그인</span>
                <div>
                    <a class="icon icon-naver mx-2" href="">네이버 로그인</a>
                    <a class="icon icon-kakao mx-2" href="">카카오 로그인</a>
                    <a class="icon icon-youtube mx-2" href="">구글 로그인</a>
                </div>
            </section>
        </section>

</template>

<style scoped>
input{
    color: black;
}
</style>