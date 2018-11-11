<template>
  <div class="container main-wrapper" id="app">
    <Header />
    <div class="main-content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header/Header';

export default {
  name: 'App',
  components: {
    Header,
  },
};
</script>

<style>
.main-wrapper {
  padding-top: 15px;
  padding-bottom: 25px;
}
.main-content {
  padding: 10px 15px;
  border: 1px solid rgba(0,0,0, 0.1);
  border-radius: 5px;
}
</style>
