<template>
  <div id="map">
    <l-map :zoom="zoom" :center="viewPos">
      <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"></l-tile-layer>
      <l-marker :lat-lng="yourPos" :icon="icon">
        <l-popup><span>You are here</span></l-popup>
      </l-marker>
      <v-marker-cluster>
        <l-marker v-for="(item, index) in maskData" :key="index"
        :lat-lng="item.geometry.coordinates.slice().reverse()"
        :icon="setIcon(item)">
          <l-popup>
            <div class="popup-group">
              <div class="popup-title">
                {{ item.properties.name }}
              </div>
              <div class="conten">
                <div class="conten-text">{{ item.properties.address }}</div>
                <div class="conten-text">
                  營業時間 | {{ item.properties.service_note || "無資訊，請致電詢問" }}
                </div>
                <div class="conten-text">聯絡電話 | {{ item.properties.phone }}</div>
                <div class="update conten-text">
                  資訊更新於 {{ item.properties.updated || "無資訊，請致電詢問" }}
                </div>
              </div>
              <div class="masks">
                <div class="mask adult">成人口罩 {{ item.properties.mask_adult }}個</div>
                <div class="mask child">兒童口罩 {{ item.properties.mask_child }}個</div>
              </div>
              <div class="gotogooglemap">
                <a :href="googleLinkHandler(yourPos, item)" target="_blank">Google 路線導航</a>
              </div>
            </div>
          </l-popup>
        </l-marker>
      </v-marker-cluster>
    </l-map>
  </div>
</template>

<script>
import {
  LMap, LTileLayer, LMarker, LPopup,
} from 'vue2-leaflet';
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster';
import L from 'leaflet';
import iconGreen from '../assets/Icon_location_green.svg';
import iconOrange from '../assets/Icon_location_orange.svg';
import iconRed from '../assets/Icon_location_red.svg';

export default {
  // name: 'map',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    'v-marker-cluster': Vue2LeafletMarkerCluster,
  },
  data() {
    return {
      map: null,
      yourPos: [23.840123, 120.963436],
      viewPos: [23.840123, 120.963436],
      zoom: 15,
      icon: new L.Icon({
        iconUrl: iconGreen,
        iconSize: [96, 104],
        iconAnchor: [36, 67],
        popupAnchor: [1, -34],
      }),
    };
  },
  props: {
    maskData: Array,
  },
  created() {
    this.getYourPostion();
  },
  mounted() {
    this.setViewPosition();
  },
  methods: {
    getYourPostion() {
      const vm = this;
      navigator.geolocation.getCurrentPosition(
        (position) => {
          vm.viewPos = [position.coords.latitude, position.coords.longitude];
          vm.yourPos = [position.coords.latitude, position.coords.longitude];
        },
      );
    },
    setViewPosition() {
      this.$bus.$on('setPosition', (position) => {
        this.viewPos = position;
        this.zoom = 30;
        // console.log('map', this.viewPos);
      });
    },
    googleLinkHandler(aPoint, bPoint) {
      return `https://www.google.com.tw/maps/dir/${aPoint.join(',')}/${bPoint.geometry.coordinates.slice().reverse().join(',')}/`;
    },
    setIcon(item) {
      const icon = new L.Icon({
        iconUrl: iconRed,
        iconSize: [96, 104],
        iconAnchor: [36, 67],
        popupAnchor: [1, -34],
      });
      if (item.properties.mask_adult + item.properties.mask_child > 100) {
        icon.options.iconUrl = iconOrange;
        return icon;
      }
      return icon;
    },
  },
};
</script>

<style lang="scss">
@import "~leaflet.markercluster/dist/MarkerCluster.css";
@import "~leaflet.markercluster/dist/MarkerCluster.Default.css";
@import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');
#map {
  position: absolute;
  left: 315px;
  top: 0;
  width: calc(100vw - 315px);
  height: 100%;
}

.popup-group {
  // display: flex inline-flex;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  .popup-title {
    // height: 21px;
    text-align: left;
    font: Bold 16px/21px 'Noto Sans TC';
    letter-spacing: 0;
    color: #333333;
    opacity: 1;
  }

  .conten {
    margin: 2px;
    text-align: left;
    font: 12px/16px Roboto;
    letter-spacing: 0;
    color: #666666;
    opacity: 1;
    .conten-text {
      margin: 5px 0;
    }
    .update {
      font: 12px/16px 'Roboto';
      letter-spacing: 0;
      color: #CCCCCC;
      opacity: 1;
    }
  }

  .masks {
    display: flex;
    justify-content: space-between;
    margin: 5px 0;
    .mask {
      width: 115px;
      height: 18px;
      padding: 10px 2px;
      border-radius: 10px;
    }
    .adult {
      text-align: center;
      font: 14px/19px Roboto;
      color: rgb(255, 151, 59);
      background: rgb(255, 151, 59, 0.2) 0% 0% no-repeat padding-box;
      opacity: 1;
    }
    .child {
      text-align: center;
      font: 14px/19px Roboto;
      color: #F8BE00;
      background: #FFDB4D33 0% 0% no-repeat padding-box;
      opacity: 1;
    }
  }
  .gotogooglemap {
    text-align: center;
    margin: 5px 0;
    padding: 10px 0;
    a {
      padding: 10px 72px;
      border-radius: 10px;
      background: #68AF87 0% 0% no-repeat padding-box;
      text-decoration: none;
      font: 14px/19px Roboto;
      letter-spacing: 0;
      color: #FFFFFF;
      opacity: 1;
    }
  }
}
</style>
