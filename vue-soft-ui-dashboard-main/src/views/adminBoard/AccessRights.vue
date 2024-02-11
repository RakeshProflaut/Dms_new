<template>  
    <div>
        <div class="card mb-4" style="height: 484px !important;">
        <div class="newButton">
          <v-btn @click="openDialogeBox =true"> New </v-btn>
        </div>
        <div class="card-header pb-0">
          <h3>Access Rights</h3>
        </div>
        <div class="card-body px-0 pt-0 pb-1" >
          <div class="table-responsive p-0">
            <table class="table align-items-center mb-0">
              <thead class="table-header">
                <tr>
                  <th
                    v-for="(header) in headers"
                    :key="header.key"
                    class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-10"
                    :class="{'text-secondary opacity-7': header.key === 'action'}"
                  >
                    {{ header.title }}
                  </th>
                </tr>
              </thead>
              <tbody>
        <tr v-for="(data, rowIndex) in displayedData " :key="rowIndex" >
          <td v-for="(header, index) in headers" :key="index"  style="text-align: center;">
            <template v-if="header.key ==='action'">
                <v-btn
                style=""
                @click="sendTableNameAndToggle(data['id'])"
                      class="text-secondary font-weight-bold text-xs"
                      >View</v-btn
                    >
            </template>    
            <template v-else-if="header.key === 'view' || header.key ==='write' ">
              <template v-if="data[header.key] === 'Yes'">
              <soft-badge color="success" variant="gradient"  style="background:#5FC0FF !important;"  size="sm">Enable</soft-badge>
          </template>
          <template v-else>
              <soft-badge color="secondary" variant="gradient" size="sm">Disable</soft-badge>
          </template>

            </template>
            <template v-else>
                      <div 
                      style="text-align: center;"  
                      :class="{  'font-weight-bolder':
                    header.key === 'tablename',}"                   
                      class=" text-center d-flex flex-column justify-content-center">
            {{ data[header.key] }}
            </div>
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
        <v-dialog v-model="openDialogeBox"  style="z-index: 1001;">
          <v-card style="width: 28%;border-radius: 3%;margin: 0 auto;">
            <access-creation
            v-on:dialogeBox="listnerDialogBox"
           v-on:selectedMetaData="selectedMetaData"
            @update-access-table="handleUpdateAccessTable"
            />
          </v-card>
        </v-dialog>
    
        <v-dialog v-model="openTAccessDialoge"  style="z-index: 1001;">
          <v-card style="width: 40%;border-radius: 3%;margin: 0 auto;">
            <view-access-vue
            v-on:dialogeBox="userTableDialogBox"
            :selectedAccessId="selectedAccessId"
            />
          </v-card>
        </v-dialog>
      </div>
      </div>
    </template>

<script>
import axios from 'axios';
import AccessCreation from '../adminBoard/AccessCreation.vue';
import SoftBadge from "@/components/SoftBadge.vue";
import ViewAccessVue from './ViewAccess.vue';

export default {
 name:'accessRights',
 components:{
    AccessCreation,
    SoftBadge,
    ViewAccessVue
 },
 data(){
  return{
    openDialogeBox:false,
    openTAccessDialoge:false,
    selectedAccessId:"",
    page:1, 
    itemsPerPage:10,
    headers: [
        {
          key: "id",
          title: "ID",
        },      
               {
          key: "tablename",
          title: "META NAME",
        },
        {
          key: "view",
          title: "VIEW",
        },
        {
          key: "write",
          title: "WRITE",
        },
        {
          key: "createdAt",
          title: "CREATED AT",
        },
        {
          key: "createdBy",
          title: "CREATED BY",
        },
        { key: 'action', title: 'ACTION' },
     
      ],
      tableDatas:[],
  }
},
mounted(){
  this.getTableEntity();
},
watch: {
    page(newValue, oldValue) {
        console.log('Page changed to:',newValue);
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

    return this.tableDatas.slice(start, end);
  },
  pages() {
    console.log(Math.ceil(this.tableDatas.length /this.itemsPerPage));
    return Math.ceil(this.tableDatas.length / this.itemsPerPage);
  },
    
  },
methods:{
  updateDisplayedData() {
    // Your logic to update displayed data based on the new page number
    const start = (this.page - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.displayedData = this.tableDatas.slice(start, end);
  },

  sendTableNameAndToggle(value){
    this.selectedAccessId=value;
    this.openTAccessDialoge=true;    
  },


  
  listnerDialogBox(value) {
      this.openDialogeBox = value;
    },

    userTableDialogBox(value){
      this.openTAccessDialoge=value
    },

    async getTableEntity() {
      console.log("dms token", this.$store.getters.getUserToken);
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      await axios
        .get('http://localhost:61050/dms/access/getAllAccess',

          {
            headers: {
              token: this.$store.getters.getUserToken,
            },
          }
        )
        .then((response) =>{
          console.log("responseeeeeeeee",response.data);

          (this.tableDatas = response.data)
        } 
        )
        .catch((error) => console.error("Error occured by", error));
    },
    handleUpdateAccessTable(){
      this.getTableEntity();
    }
}
}
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
   color:#fff;
  transition: 0.5s ease;
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