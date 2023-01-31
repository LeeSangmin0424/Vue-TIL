<!-- <script setup> // composition API
</script> -->

<script> // options API
import ConfirmButton from '../../ConfirmButton.vue';
import ConfirmDlg from '../../ConfirmDlg.vue';

export default{ // 객체를 만들어준다. // export 필요. // default안에는 API만 들어올 수 있다.
   // import {  } from "module";
   inject:['userDetails'],
	data(){ 
		return{
			menus:[], // test : menus를 만들어 나오는지 확인
         displayNone:'d-none', // 변수화해서 값으로 표시
         hideRegForm : true, // boolean 값으로 표시
         showRegForm : false, // v-if 
         // 서버에 전송하려면 (업로드 단위) / input태그에 v-model="menu.name"
         menu:{name:'',price:0},
         query:'',
         open:false,
         openDlg:false,
         error : false, // error 없으면 false

		};
	},
   components: {ConfirmButton,ConfirmDlg},
	methods:{ 
		async fetchMenus(){ // 메뉴 가져오기
	 
         try{
            const response = await fetch(`http://localhost:8080/menus?q=${this.query}`);  // 다른 서버이기 때문에 절대 경로 사용 
            const json = await response.json(); 
            this.menus=json;
            console.log(json);
         }catch(error){
            this.error = error; // error변수 선언
         }finally{

         }

		},
      async removeMenu(id){ // 메뉴 삭제
	 
         try{
            const response = await fetch(`http://localhost:8080/menus/${id}`,{
               method: 'DELETE'}); // 호출될때 전달되는 id 
            
               // this.fetchMenus(); //  삭제하고 새로고침 안해도 바로 삭제된 메뉴 빼고 나옴
         }catch(error){
            this.error = error; // error변수 선언
         }finally{

         }

      },
      async postMenu(){ // 새로운 메뉴 보내기 fetch
	 
         const response = await fetch(`http://localhost:8080/menus`,{
            method : 'POST',
            headers: { // header 구조(형식)으로 간다
               Accept: 'application/json',
               'Content-Type' : 'application/json'
            },
            body: JSON.stringify(this.menu) // this.menu는 js객체이다. JSON.stringify : js객체를 JSON형식으로 바꿈
      
         });         

         const json = await response.json();  // return 받은 json을 javascript Object로 바꿔준다.
         console.log(json);

         // this.menus=json; // 추가된 메뉴를 이런식으로 보여주면 큰일
         // this.menus.push(json); // 앞에 넣기 // 메뉴 끝에 보임
         this.menus.unshift(json); // 뒤에 넣기 // 메뉴 앞에 보임
         this.showRegForm = false; // 메뉴 등록하고 추가하는 태그 사라지게
         // this.fetchMenus();


      },
      addMenuBtnHandler(){
         console.log();
         this.displayNone='';
         this.hideRegForm = !this.hideRegForm;
         this.showRegForm =  !this.showRegForm ;
      },
      dlgCloseHandler(e){
         if(e.isOk){
            this.showRegForm=false;
            console.log("OKey 취소할랩");
         }

         console.log('예든 아니오든 대화상자 닫힘');
      },
      createMenuHandler(e){
         this.postMenu(); // 호출
         // this.
      },
      removeDlgCloseHandler(e){
         if(e.isOk){
            console.log("e.targetId"+e.targetId);
            this.removeMenu(e.targetId);
         }
      },
	},
   
   computed:{ // 함수가 안쪽에서 사용하는 모델(this.menu.price)에서 변화(+500)를 얻게 되면 자동으로 변하게 된다. // 계산된 결과값을 주게 된다.
      // 함수명처럼 보이지만 속성으로 사용된다. v-model="ice" 처럼
      // 속성 목록 // 속성의 계산 값, 출력 값 // 무조건 return 사용한다.
      ice(){
         return parseInt(this.menu.price)+500;
      },
      
   },

   // 어떤 속성이 바뀌면 속성에 따라 실행되는 함수를 정의한다.
   // 함수 목록
   // 값이 바뀌면 어떤 일을 해야 한다. 검색창에 글을 쓰면(''에서 값이 변하기 때문에) test가 나온다.
   // 지켜보다가 검색된 데이터를 가져오게 // 검색에 따라 메뉴 목록이 달라지게..
   // 
   watch:{
      query(){ // 속성과 같은 함수명 만들기
         this.fetchMenus();
      }
   },

	beforeCreate(){
		console.log("beforeCreate");
	},
	created(){
		console.log("created");
	},	
	beforeMount(){
		console.log("beforeMount");
	},
	mounted(){
		console.log("mounted");
      // inject는 mount된 다음에 사용
      // if(this.userDetails.username == null){
      //    alert("권한이 없어서 로그인 페이지로 이동합니다.");

      //    // 쿼리를 받을 때 : $route
      //    // console.log(this.$route.query.returnURL);


      //    // if()// reutrn URL을 가지고 있다면
      //    //    this.$router.push({path:'/user/login',query:{returnURL:'admin/menu/list'}}); // 쿼리 전달
      //    // else
      //    //    // 기본값
      //    this.$router.push({path:'/user/login', query:{returnURL:'/admin/menu/list'}}); // 쿼리 전달
      //    return;   
      // }
		this.fetchMenus(); 		// 다음 라인과 동시에 실행된다고 본다.
      // 검색어가 다시 fetch되도록 const response = await fetch(`http://localhost:8080/menus?q=${query}`);

	},

	
	beforeUpdate(){
		console.log("beforeUpdate");
	},
	updated(){
		console.log("updated");
	},	
	beforeUnmount(){
		console.log("beforeUnmount");
	},
	unmounted(){
		console.log("unmounted");
	}

}
</script>

<template>
    <main>
        <section>
         <header class="search-header">
            <h1 class="text-title1-h1">알랜드 메뉴</h1>
            <form>
               <input type="text" v-model="query" />
               <input type="submit" class="icon icon-find" />
            </form>
         </header>

         <nav class="menu-category">
            <header class="d-flex">
               <h1 class="text-normal-bold">메뉴분류</h1>
               <div>                  
                  <a class="btn btn-mini bg-blue" href="">분류추가</a>
               </div>
            </header>
            <ul>
               <li class="menu-selected">
                  <a href="/menu/list">전체</a>
               </li>
               <li>
                  <a href="">커피음료</a>
               </li>
               <li>
                  <a href="">수제청</a>
               </li>
               <li>
                  <a href="">샌드위치</a>
               </li>
               <li>
                  <a href="">쿠키</a>
               </li>
            </ul>
         </nav>

         <section class="cart-section">
            <h1 class="d-none">장바구니</h1>
            <span class="text-title3">커피음료</span>            
            <a class="btn btn-mini bg-blue" href="" @click.prevent ="addMenuBtnHandler">메뉴추가</a>            
         </section>

      
         <section class="menu-section" >
            <div v-if="error" style="color : red; text-align:center;">
               오류가 발생하였습니다 <br>
               {{ error }} 
            </div>
              <h1 class="d-none">메뉴목록</h1>
              <div class="menu-list" >
               <Transition name="reg-form">
                  <section class="menu menu-reg-section border-bottom border-color-1 " v-if="showRegForm"> 
                      <form class="overflow-hidden">
                          <h1><input type="text" class="input w-75 w-100-md" name="titile" 
                              v-model="menu.name" placeholder="메뉴 이름을 입력하세요."></h1> 
                          <div class="menu-img-box">
                        <img src="/image/product/blank-img.png" class="img-input">
                        <input type="file" class="d-none">
                          </div>
                          <div class="menu-price">
                           <input class="w-75 w-50-md input ml-0 ml-1-md" type="text" 
                              v-model="menu.price" placeholder="가격을 입력하세요"> 원</div>
                          <div class="menu-option-list">
                              <span class="menu-option">
                                  <input class="menu-option-input" type="checkbox">
                                  <label>ICED</label>
                                  <input style="width:50px;" v-model="ice">
                              </span>
                              <span class="menu-option ml-2">
                                  <input class="menu-option-input" type="checkbox">
                                  <label>Large</label>
                              </span>
                          </div>
                          <div class="menu-button-list">                        
                           <ConfirmButton 
                              aa="btn btn-line btn-round btn-size-1 btn-bd-blue rounded-0-md" 
                              value="취소할래욥"
                              @ondlgclose="dlgCloseHandler" >
                              <!-- ondlgclose : Button.vue에서 해결 / dlgCloseHandler : List.vue 작성?? -->
                              <span style="color:red;">정말 취소할꺼야?</span>
                              <!-- message="정말 삭제하시겠습니까?"/> -->
                           <!-- <confirm-button /> -->
                           </ConfirmButton>
                              <input 
                                 class="btn btn-fill btn-round rounded-0-md btn-size-1 btn-bd-blue btn-color-blue ml-1" 
                                 type="submit" 
                                 value="저장" 
                                 @click.prevent="createMenuHandler"
                              />

                          </div>
                      </form>
                  </section>
               </Transition>
                  <section class="menu border-bottom border-color-1" v-for="m in menus">
                      <form class="">
                          <h1>{{m.name}}</h1> 
                          <div class="menu-img-box">
                              <a href="detail.html"><img class="menu-img" src="/image/product/12.png"></a>
                          </div>    
                          <div class="menu-price">4500 원</div>
                          <div class="menu-option-list">
                              <span class="menu-option">
                                  <input class="menu-option-input" type="checkbox">
                                  <label>ICED</label>
                              </span>
                              <span class="menu-option ml-2">
                                  <input class="menu-option-input" type="checkbox">
                                  <label>Large</label>
                              </span>
                          </div>
                     <div class="menu-button-list">
                           <input class="btn btn-line btn-round btn-size-1 rounded-0-md" type="submit" value="수정">
                           <!-- <input 
                           class="btn btn-fill btn-round rounded-0-md btn-size-1 ml-1" 
                           type="submit" 
                           value="삭제" 
                           @click.prevent="openDlg=true"> -->

                           <!-- <ConfirmDlg v-if="openDlg" @clickOk="" @clickCancel="" /> -->
                           <ConfirmButton 
                              aa="btn btn-line btn-round btn-size-1 btn-bd-blue rounded-0-md" 
                              value="삭제"
                              :targetId="m.id"
                              @ondlgclose = "removeDlgCloseHandler">

                              <!-- @ondlgclose="dlgCloseHandler" > -->
                              <!-- ondlgclose : Button.vue에서 해결 / dlgCloseHandler : List.vue 작성?? -->
                              <span style="color:red;">정말 삭제할꺼야?</span>
                              <!-- message="정말 삭제하시겠습니까?"/> -->
                           <!-- <confirm-button /> -->
                           </ConfirmButton>

                          </div>
                      </form>
                  </section>
                  
              </div>
          </section>

         <div class="d-flex justify-content-center py-3">
            <a href="" class="btn btn-line btn-round w-100 w-50-md py-2">더보기(13+)</a>
         </div>

         <section class="new-menu menu-section-p">
            <h1 class="d-none">신메뉴 목록</h1>
            <!-- <ul>
                    <li>
                    </li>
                </ul>  -->
            <div class="list">
               <span>신규로 출시된 메뉴가 없습니다.</span>
            </div>
         </section>

      </section>
    </main>
</template>

<style scoped>

/* css animaion */
/* 내가 만든 애니메이션 */
@keyframes bound-in { 
   /* 시작 */
  0% { 
      transform: scale(0);
  }

  50%{
      transform: scale(1.5);
  }
  /* 끝날때 */
  to { 
   /* opacity:1; */
   transform: scale(1);
  }
}


/* <Transition> */
.reg-form-enter-active
/* .reg-form-leave-active { */
{
  /* transition: opacity 0.5s ease; */

   /* 들어올때 효과를 주겠다 */
   animation: bound-in 0.5s;

}
/* 사라질때 나타나는 액션 */
.reg-form-leave-active
{
  /* transition: opacity 0.5s ease; */

   /* 들어올때 효과를 주겠다 */
   animation: bound-in 0.5s reverse;

}

.reg-form-leave-to {
   opacity: 0;
}

/* .reg-form-enter-from,
.reg-form-leave-to {
  opacity: 0;
} */

</style>