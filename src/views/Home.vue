<template>
  <div class="home">
    <SideMenu :mask-data="maskData"></SideMenu>
    <Map :mask-data="maskData"/>
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
      maskData: [],
    };
  },
  created() {
    this.getMaskData();
  },
  methods: {
    getMaskData() {
      const vm = this;
      const maskAPI = 'https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json';
      vm.$http.get(maskAPI).then((response) => {
        vm.maskData = response.data.features;
        // console.log(vm.maskData);
      }).catch((error) => error);
    },
  },
};
</script>
