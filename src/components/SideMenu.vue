<template>
  <div id="menu">
    <div class="menu-title">
      <div>2020/2/13</div>
      <div>星期四</div>
      <div>身分證末一碼 <span>{{text}}</span> 字號者可購買口罩</div>
      <div>※一週限購一次，每次一人限購兩片</div>
    </div>
    <div class="filter">
      <input type="text">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '偶數',
    };
  },
};
</script>

<style lang="scss">

#menu {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 315px;
  height: 100vh;
  .menu-title {
    background: no-repeat url("../assets/img_bg_orange.svg");
    width: 100%;
    height: 100%;
  }
}

</style>
