<!-- <script setup> // composition API
</script> -->

<script> // options API
export default{ // 객체를 만들어준다. // export 필요. // default안에는 API만 들어올 수 있다.
	data(){ 
		return{
			menus:[{id:1, name:"아메리카노"},{id:2, name:"카페라떼"},{},{}] // test : menus를 만들어 나오는지 확인

		};
	},
	methods:{ // 사용자가 정의한 함수 
		async fetchMenus(){ // 호출하면 비동기로 호출된다.
			// 동기처럼 순차적으로 실행되게 해준다.
			const response = await fetch("http://localhost:8080/menus");  // 다른 서버이기 때문에 절대 경로 사용 
			const json = await response.json(); 
			this.menus =json;
			console.log(json);
		}

		// async () => { // 호출하면 비동기로 호출된다.
	 	// // 동기처럼 순차적으로 실행되게 해준다.
		// const response = await fetch("http://localhost:8080/menus");  // 다른 서버이기 때문에 절대 경로 사용 
		// const json = await response.json(); 
		// console.log(json);
		// }
		

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

		// 다음 라인과 동시에 실행된다고 본다.
		this.fetchMenus();

		// (async () => {
		// 	const response = await fetch("http://localhost:8080/menus");  
		// 	const json = await response.json(); // 비동기 => 동기형식으로 처리해준다.
		// 	this.menus =json; // this. 붙여주기
		// 	console.log("mounted"+json);
		// })();

	},
	// 직관적으로 사용
		// async getMenus(){ // 호출하면 비동기로 호출된다.
		// 	// 동기처럼 실행되게 해준다.
		// 	const response = await fetch("http://localhost:8080/menus");  // 다른 서버이기 때문에 절대 경로 사용 
		// 	const json = response.json(); 
		// 	console.log(json);
		// },


		// await : 비동기로 빠지는 것을 동기화로 해준다 = 나 기다리겠다. ui thread 흐름이 멈춘다.
		// 그냥 사용하지 못하고 비동기 함수, 비동기 블럭에서 사용이 가능하다. 
		// const response = await fetch("http://localhost:8080/menus");  // 다른 서버이기 때문에 절대 경로 사용 
		// const josn = response.json(); // 동기화로 해준다.
		// console.log(json);


		// 비동기해준다. 
		// 
		// const promise = fetch("http://localhost:8080/menus") 
		// promise
		// .then(promise.json())
		// .then(json=>{
		// 	console.log(json); // 데이터가 오면 실행된다.
		// })

		// console.log(json);

		// (async function(){
		// 	const response = await fetch("http://localhost:8080/menus");  
		// 	const json = response.json(); 
		// 	console.log(json);
		// })();

		// async () =>{
		// 	const response = await fetch("http://localhost:8080/menus");  
		// 	const json = response.json(); 
		// 	console.log(json);
		// }

	// },	
	
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
   <section>
			<header class="search-header">
				<h1 class="text-title1-h1">알랜드 메뉴</h1>
				<form>
					<input type="text">
					<input type="submit" class="icon icon-find">
				</form>
			</header>
			<aside class="aside-bar">
				<h1>aside</h1>
				<section class="aside-bar-content">
					<h1>메인메뉴</h1>
					<ul class="mt-3">
						<li><a href="">카페메뉴</a></li>
						<li><a href="">공지사항</a></li>
						<li><a href="/user/login.html">로그인</a></li>
					</ul>
				</section>
			</aside>
			<nav class="menu-category">
				<div>
					<h1 class="text-normal-bold">메뉴분류</h1>
				</div>
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
				<div class="icon icon-basket icon-text">1</div>
			</section>

			<section class="menu-section">
		        <h1 class="d-none">메뉴목록</h1>
		        <div class="menu-list">
		            <section class="menu" v-for="m in menus">
		                <form class="">
		                    <h1>알랜드 커피</h1> 
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
		                        <input class="btn btn-fill btn-size-1 btn-size-1-lg" type="submit" value="담기">
		                        <input class="btn btn-line btn-size-1 btn-size-1-lg ml-1" type="submit" value="주문하기">
		                    </div>
		                </form>
		            </section>
		        </div>
		    </section>

			<div class="d-flex justify-content-center py-3">
				<a href="" class="btn btn-round w-100 w-50-md py-2">더보기(13+)</a>
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
</template>