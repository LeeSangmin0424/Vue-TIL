<template>
    <!-- <header>
        <nav>
            <h1>메인 메뉴</h1>
            <ul>
                <li><router-link to="/">home</router-link></li>
                <li><router-link to="/menu/list">menu list</router-link></li>
                <li><router-link to="/admin/index">admin menu list</router-link></li>
            </ul>
        </nav>
    </header> -->

    
    <header class="header">
        <div>
            <h1 class="header-title"><router-link to="/"><img class="logo" src="/image/logo-w.png" alt="알랜드"></router-link></h1>
            
            <ul class="main-menu d-none d-inline-flex-sm">
                <li><router-link to="/menu/list">카페메뉴</router-link></li>
                <li><router-link to="/notice/list">공지사항</router-link></li>
                <li><router-link to="/user/login">로그인</router-link></li>
            </ul>
            
            <div class="d-none-sm"><a class="icon icon-menu icon-white" href="?m=on">메뉴버튼</a></div>
        </div>
    </header>

</template>
