<template>
  <div class="home">
    <SideMenu/>
    <Map/>
  </div>
</template>

<script>
// @ is an alias to /src
import Map from '@/components/map.vue';
import SideMenu from '@/components/SideMenu.vue';

export default {
  name: 'Home',
  components: {
    Map,
    SideMenu,
  },
};
</script>
