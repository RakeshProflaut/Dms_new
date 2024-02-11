<template>
  <div class="card mb-4"  style="height: 484px !important;">
    <div class="newButton">
      <v-btn @click="openDialogeBox =true"> New </v-btn>
    </div>
    <div class="card-header pb-0">
      <h3>User Information</h3>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead class="table-header">
            <tr>
              <th
                v-for="(header) in headers"
                :key="header.key"
                class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-10"
              >
                {{ header.title }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, rowIndex) in displayedData " :key="rowIndex" >
          <td 
          
          :class="{  'font-weight-bolder text-uppercase':
                    header.key === 'userName',}" 
          v-for="(header, index) in headers" :key="index"  style="text-align: center;">  
            <template v-if="header.key === 'adminAccesss' || header.key ==='webAccess' ">
              <template v-if=" data[header.key] === 'Y'">
              <soft-badge color="success" variant="gradient"  style="background:#5FC0FF !important;"  size="sm">Enable</soft-badge>
          </template>
          <template v-else>
              <soft-badge color="secondary" variant="gradient" size="sm">Disable</soft-badge>
          </template>

            </template>
            <template v-else>
            {{ data[header.key] }}
            </template>        
          </td>    
        </tr>
          </tbody>
        </table>
        <v-pagination
      v-model="page"
      :length="pages"
      @input="updateDisplayedData"
    ></v-pagination>
      </div>
    </div> 
    <v-dialog v-model="openDialogeBox"  style="display: flex;padding-left: 73%;z-index: 1001;">
      <v-card style="width: 28%;border-radius: 3%;">
        <user-signup 
        v-on:closeDialogeBox="closeDialogeBox"
        :getUserInfo="getUserInfo"  
        
        />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import SoftBadge from "@/components/SoftBadge.vue";
import UserSignup from "../adminBoard/UserSignUp.vue";
import axios from "axios";


export default {
  name: "table",
  created(){
    this.getUserInfo()
  },
  components: {
    SoftBadge,
    UserSignup,
  },

  watch: {
    page(newValue, oldValue) {
        console.log('Page changed to:', newValue);
        this.updateDisplayedData();
    }
},
computed: {
  displayedData() {
    console.log("displa data rendering");
    const start = (this.page - 1) * this.itemsPerPage;
    console.log("start",start);
    const end = start + this.itemsPerPage;
    console.log("end",start);

    return this.userInfos.slice(start, end);
  },
  pages() {
    console.log(Math.ceil(this.userInfos.length /this.itemsPerPage));
    return Math.ceil(this.userInfos.length / this.itemsPerPage);
  },
    
  },
  data() {
    return {
      headers: [
        { key: "userId", title: "USER ID" },
        { key: "userName", title: "USER NAME" },
        { key: "email", title: "E-MAIL" },
        { key: "createdDate", title: "CREATED DATE" },
        { key: "webAccess", title: "WEB ACCESS" },
        { key: "adminAccesss", title: "ADMIN ACCESS" },
        // { key: "action", title: "Action" },
      ],
      openDialogeBox: false,
      userInfos:[],
      page: 1, // Current page
    itemsPerPage:10, // Number of items per page
  }
},
  methods: {

    updateDisplayedData() {
    // Your logic to update displayed data based on the new page number
    const start = (this.page - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.displayedData = this.userInfos.slice(start, end);
  },
    async getUserInfo(){
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      const apiUrl = `http://localhost:61050/dms/group/getAllUsers`;
      const token = this.$store.getters.getUserToken;
      await axios
        .get(apiUrl, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          this.userInfos = response.data;
          console.log("response",response.data);

        })
        .catch((error) => console.error("Error occured by", error));
    },
    closeDialogeBox(value){
      this.openDialogeBox=value;
    },
  
  },
};
</script>

<style scoped>
.newButton {
  display: flex;
  justify-content: flex-end;
  margin: 1% 0px;
  margin-right: 2%;
}
.newButton > .v-btn {
   background: #58BDFF;
  transition: 0.5s ease;
  color: #fff;
}
.newButton > .v-btn:hover {
  cursor: pointer;
}

.table-responsive{
  height:350px;
  position: relative;
  overflow-x: auto;

}

.table-header {
  position: sticky;
  top: 0;
  z-index: 1;
  background: #fff;
}

</style>

