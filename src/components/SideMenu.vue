<template>
  <div class="menu">
    <div class="menu-title">
      <div class="date">{{date.year}} - {{date.month}} - {{date.day}}</div>
      <div class="weekday">{{date.weekday}}</div>
      <div class="tips"><div class="inline">身分證末一碼 <span>{{text}}數</span> 字號者可購買口罩</div></div>
      <div class="tips-two">※一週限購一次，每次一人限購兩片</div>
    </div>
    <div class="filter-box">
      <div class="search">
        <input class="input" type="text" v-model="inputValue" placeholder="搜尋區域 , 地址 , 藥局">
        <img src="../assets/Icon_search.svg" alt="">
      </div>
      <div class="botton-group">
        <div class="all-active botton">所有口罩</div>
        <div class="adlut-active botton">成人口罩</div>
        <div class="child-active botton">兒童口罩</div>
      </div>
    </div>
    <div class="results-box">
      <div v-for="(item, index) in masksFliter" :key="index" class="results"
      @click="setViewPosition(item.geometry.coordinates.slice().reverse())">
        <div :class="(item.properties.mask_adult + item.properties.mask_child) > 100
          ? 'mark-orange' : 'mark-red'"></div>
        <div class="title">{{ item.properties.name }}</div>
        <div class="address">{{ item.properties.address }}</div>
        <div class="note">營業時間 | {{ item.properties.note }}</div>
        <div class="masks-num">
          <div v-if="(item.properties.mask_adult + item.properties.mask_child)" class="adlut">
            成人口罩 {{ item.properties.mask_adult }}個
          </div>
          <div v-if="(item.properties.mask_adult + item.properties.mask_child)" class="child">
            兒童口罩 {{ item.properties.mask_child }}個
          </div>
          <div v-if="!(item.properties.mask_adult + item.properties.mask_child)" class="masks-none">
            口罩缺貨中
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '',
      inputValue: '',
      date: {
        year: 0,
        month: 0,
        day: 0,
        weekday: '',
      },
    };
  },
  props: ['maskData'],
  created() {
    this.getDate();
  },
  methods: {
    getDate() {
      const date = new Date();
      this.date.year = date.getFullYear();
      this.date.month = date.getMonth() + 1;
      this.date.day = date.getDate();
      this.date.weekday = date.toLocaleDateString('zh-TW', { weekday: 'long' });
      if (!date.getDay()) {
        this.text = '偶、奇';
      } else if (date.getDay() % 2) {
        this.text = '奇';
      } else {
        this.text = '偶';
      }
    },
    getMaskData() {
      const vm = this;
      const maskAPI = 'https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json';
      vm.$http.get(maskAPI).then((response) => {
        vm.maskData = response.data.features;
      }).catch((error) => error);
    },
    setViewPosition(position) {
      this.$bus.$emit('setPosition', position);
      // console.log('sideMenu', position);
    },
  },
  computed: {
    masksFliter() {
      const vm = this;
      function search(data, input) {
        const prop = data.properties;
        return prop.name.includes(input)
        || prop.address.includes(input) || prop.cunli.includes(input);
      }
      return vm.maskData.filter((item) => search(item, vm.inputValue));
    },
  },
};
</script>

<style lang="scss">

.menu {
  width: 315px;
  height: 100vh;
  .menu-title {
    background: no-repeat url("../assets/img_bg_orange.svg");
    padding: 8px 20px 14px 20px;
    text-align: left;
    .date {
      text-align: left;
      font: 14px/19px Roboto;
      color: #FFFFFF;
      text-shadow: 0px 3px 6px #00000029;
    }
    .weekday {
      font: Bold 36px/48px 'Noto Sans TC';
      color: #FFFFFF;
      text-shadow: 0px 3px 6px #00000029;
    }
    .tips {
      display: flex;
      .inline {
        background: #ffd279;
        width: auto;
        font: 14px/19px 'Noto Sans TC';
        margin-top: 8px;
        color: #000000;
        span {
          color:#C80000;
        }
      }
    }
    .tips-two {
      margin-top: 4px;
      text-align: left;
      font: 12px/16px 'Noto Sans TC';
      color: #FFFFFF;
    }
  }

  .filter-box {
    padding: 16px 20px 13px 20px;
    border-bottom: .5px solid #00000029;
    .search {
      position: relative;
      .input {
        font: 16px/21px 'Noto Sans TC';
        color: #333333;
        border-radius: 10px;
        box-shadow: 0px 0px 6px #00000029;
        border: 0;
        padding: 10px 52px 10px 16px;
        height: 20px;
      }
      img {
        position: absolute;
        transform: translateY(-50%);
        top: 50%;
        right: 16px;
      }
    }
    .botton-group {
      display: flex;
      justify-content: space-between;
      font: 14px/19px 'Noto Sans TC';
      color: #CCCCCC;
      padding-top: 16px;
      .botton {
        padding: 9px 14px;
        border: 1px solid #CCCCCC;
        border-radius: 7px;
      }
      .all-active {
        background-color: #D65600;
        color: #FFFFFF;
        border-color: #FFFFFF;
      }
      .adlut-active {
        background-color: #FF973B;
        color: #FFFFFF;
        border-color: #FFFFFF;
      }
      .child-active {
        background-color: #F8BE00;
        color: #FFFFFF;
        border-color: #FFFFFF;
      }
    }
  }

  .results-box {
    height: calc(100vh - 262px);
    overflow-y: auto;
    .results {
      border-bottom: .5px solid #00000029;
      padding: 8px 20px;
      text-align: left;
      position: relative;
      .title {
        font: Bold 16px/21px 'Noto Sans TC';
        color: #333333;
        padding: 4px 0;
      }
      .address {
        font: 14px/19px Roboto;
        color: #666666;
        padding-bottom: 4px;
      }
      .note {
        font: 12px/16px Roboto;
        color: #666666;
        padding-bottom: 8px;
      }
      .masks-num {
        display: flex;
        justify-content: space-between;
        text-align: center;
        font: 14px/19px Roboto;
        .adlut {
          background-color: #ff963b33;
          color: #FF973B;
          padding: 8px 16px;
          border-radius: 10px;
        }
        .child {
          background-color: #f8be0033;
          color: #F8BE00;
          padding: 8px 16px;
          border-radius: 10px;
        }
        .masks-none {
          background-color: #F9F9F9;
          color: #CCCCCC;
          padding: 8px 16px;
          border-radius: 10px;
        }
      }
      .mark-orange {
        position: absolute;
        background: no-repeat url("../assets/mark_orange.svg");
        width: 24px;
        height: 24px;
        left: 0;
        top: 0;
      }
      .mark-red {
        position: absolute;
        background: no-repeat url("../assets/mark_red.svg");
        width: 24px;
        height: 24px;
        left: 0;
        top: 0;
      }
    }
  }
}

</style>
