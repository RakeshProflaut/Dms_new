<template>
  <div>
    <!-- <div class="container-fluid">
      <div
        class="mt-4 page-header min-height-300 border-radius-xl"
        :style="{
          backgroundImage:
          'url(' + require('@/assets/img/curved-images/curved14.jpg') + ')',
          backgroundPositionY: '50%',
        }"
      >
    </div>
  </div> -->
  <div class="container-fluid">
      <div class="row" style="margin-top: 0.5rem !important;">
        <div class="col-12">
          <div class="card mb-4" style="height: 465px !important;background-color: #76b7d173;">
            <v-card style="width: 30%; border-radius: 3%;">
                <div>
                  <div class="container" style="width: 100%; height: 90%;padding-right: 0;">                 
                    <!-- <div class="pt-10 text-center card-header">
                      <h5>Licence Management</h5>
                    </div> -->
                    <div class="card-body">
                        <div class="mb-3">
                          <label >Licence Key</label>
                          <input
                            type="text"
                            v-model="licenceKey"
                            readonly
                          />
                        </div>
                        <div class="mb-3">
                          <label>Expiry Date</label>
                          <input
                            type="text"
                            v-model="expiryData"
                            readonly
                          />
                        </div>                    
                    </div>
                  </div>
                </div>
              </v-card>
            </div>
        </div>
        </div>
        </div>
    </div>
</template>

<script>
import setTooltip from "@/assets/js/tooltip.js";
import setNavPills from "@/assets/js/nav-pills.js";
import axios from "axios";
export default {
name:'licenceManagement',
mounted() {
  this.getLicenceData();
    this.$store.state.isAbsolute = true;
    setNavPills();
    setTooltip(this.$store.state.bootstrap);
  },
  beforeUnmount() {
    this.$store.state.isAbsolute = false;
  },
  data(){
    return{
      expiryData:'',
      licenceKey:'',
    }
  },
  methods:{
    async getLicenceData() {    
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      const apiUrl = `http://localhost:61050/dms/licence/getLicenceKey`;
      const token = this.$store.getters.getUserToken;
      await axios
        .get(apiUrl, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          this.licenceKey=response.data[0].licenceKey;
          this.expiryData=response.data[0].expiryData;

        })
        .catch((error) => console.error("Error occured by", error));
    },

  }

}
</script>

<style scoped>
.min-height-300 {
  min-height: 75px !important;
}

.card{
  display: flex;
  justify-content: center;
  align-items: center;
}


.mb-3 > input {
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.4rem;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #d2d6da;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0.5rem;
  transition:
    box-shadow 0.15s ease,
    border-color 0.15s ease;
}

.container {
  position: relative;
  height: 100%;
}

.card-header{
  background: none !important;
}

.card-body{
  width: 90%;
}

</style>