<template>
  <div class="home">
    <SideMenu></SideMenu>
    <Map/>
  </div>
</template>

<script>
// @ is an alias to /src
import Map from '@/components/map.vue';
import SideMenu from '@/components/SideMenu.vue';
import Vue from 'vue';

Vue.prototype.$bus = new Vue();

export default {
  name: 'Home',
  components: {
    Map,
    SideMenu,
  },
  data() {
    return {
      viewPosition: [],
    };
  },
};
</script>
