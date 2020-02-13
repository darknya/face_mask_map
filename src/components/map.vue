<template>
  <div id="map">
    <l-map :zoom="zoom" :center="pos">
      <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"></l-tile-layer>
      <l-marker :lat-lng="pos" >
        <l-popup><span>You are here</span></l-popup>
      </l-marker>
      <v-marker-cluster>
        <l-marker v-for="(item, index) in maskData" :key="index"
        :lat-lng="item.geometry.coordinates.slice().reverse()">
          <l-popup>
            <div class="popup-group">
              <div class="popup-title">
                {{ item.properties.name }}
              </div>
              <div class="conten">
                <div>{{ item.properties.address }}</div>
                <div>{{ item.properties.service_note }}</div>
                <div>{{ item.properties.phone }}</div>
                <div class="update">{{ item.properties.updated }}</div>
              </div>
              <div class="masks">
                <div class="mask adult">成人口罩 {{ item.properties.mask_adult }}個</div>
                <div class="mask child">兒童口罩 {{ item.properties.mask_child }}個</div>
              </div>
              <div class="gotogooglemap">
                <a :href="googleLinkHandler(pos, item)" target="_blank">Google 路線導航</a>
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
      pos: [23.840123, 120.963436],
      zoom: 15,
      maskData: [],
    };
  },
  created() {
    this.getViewPostion();
    this.getMaskData();
  },
  methods: {
    getViewPostion() {
      const vm = this;
      navigator.geolocation.getCurrentPosition(
        (position) => {
          vm.pos = [position.coords.latitude, position.coords.longitude];
        },
      );
    },
    getMaskData() {
      const vm = this;
      const maskAPI = 'https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json';
      vm.$http.get(maskAPI).then((response) => {
        vm.maskData = response.data.features;
      }).catch((error) => error);
    },
    googleLinkHandler(aPoint, bPoint) {
      return `https://www.google.com.tw/maps/dir/${aPoint.join(',')}/${bPoint.geometry.coordinates.slice().reverse().join(',')}/`;
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
  width: 247px;
  height: 219px;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  .popup-title {
    // height: 21px;
    text-align: left;
    font: Bold 16px/21px Roboto;
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
    .update {
      font: Regular 12px/16px Roboto;
      letter-spacing: 0;
      color: #CCCCCC;
      opacity: 1;
    }
  }

  .masks {
    .mask {
      display: flex;
      width: 109px;
      height: 35px;
      background: #FFD888 0% 0% no-repeat padding-box;
      border-radius: 10px;
      opacity: 0.2;
    }

    .adult {
        text-align: left;
        font: Regular 19px Roboto;
        letter-spacing: 0;
        color: #FF973B;
        opacity: 1;
      }
  }
  .gotogooglemap {
    a {
      padding: 20px 50px;
      text-decoration: none;
      font: 14px/19px Roboto;
      letter-spacing: 0;
      color: #FFFFFF;
      background: #68AF87 0% 0% no-repeat padding-box;
      border-radius: 10px;
      opacity: 1;
    }
  }
}
</style>
