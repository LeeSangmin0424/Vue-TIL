<script setup> // 코드 작성 //setup 은 root?
// 2종류 : 1.  2. 세더? 
import Header from './Header.vue';
import Footer from './Footer.vue';

</script>

<template>
    <Header />
        <router-view></router-view>
    <Footer />
</template>
