<template>
  <div class="home">
    <SideMenu/>
    <Map/>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import Map from '@/components/map.vue';
import SideMenu from '@/components/SideMenu.vue';

export default {
  name: 'Home',
  components: {
    // HelloWorld,
    Map,
    SideMenu,
  },
};
</script>
