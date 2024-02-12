<template>
  <div>
    <div class="container-fluid">
      <div
        class="mt-4 page-header min-height-300 border-radius-xl"
        :style="{
          backgroundImage:
            'url(' + require('@/assets/img/curved-images/curved14.jpg') + ')',
          backgroundPositionY: '50%',
        }"
      >
        <span class="mask bg-gradient-success opacity-6"></span>
      </div>
      <div class="mx-4 overflow-hidden card card-body blur shadow-blur mt-n6">
        <div class="row gx-4">
          <div class="col-auto">
            <div class="avatar avatar-xl position-relative">
              <img
                src="@/assets/img/user.png"
                alt="profile_image"
                class="shadow-sm w-100 border-radius-lg"
              />
            </div>
          </div>
          <div class="col-auto my-auto">
            <div class="h-100">
              <h5 class="mb-1">{{ this.$store.getters.getUserName }}</h5>
              <p class="mb-0 text-sm font-weight-bold">
                User Id-{{ this.$store.getters.getUserId }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="mt-3 row"></div>
      <div class="mt-4 row">
        <div class="col-12">        
          <div class="card mb-4" style="height: 484px !important">
            <div v-if="folders.write === 'Yes'" class="newButton">
              <v-btn @click="openDialogeBox = true"> Upload </v-btn>
            </div>
            <div class="card-header pb-0">
              <h3>Files</h3>
            </div>
            <div class="card-body px-0 pt-0 pb-2">
              <div class="table-responsive p-0">
                <table class="table align-items-center mb-0">
                  <thead class="table-header">
                    <tr>
                      <th
                        v-for="header in headers"
                        :key="header.key"
                        class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-10"
                      >
                        {{ header.title }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(data, rowIndex) in files"
                      :key="rowIndex"
                    >
                      <td
                        :class="{
                          'font-weight-bolder text-uppercase':
                            header.key === 'folderName',
                        }"
                        v-for="(header, index) in headers"
                        :key="index"
                        style="text-align: center"
                      >
                        <template v-if="header.key === 'action'">
                          <v-btn
                            @click="openDocViewBox(data['id'])"
                            class="text-secondary font-weight-bold text-xs"
                            >View</v-btn
                          >
                        </template>

                        <template v-if="header.key === 'sno'">
                          {{ rowIndex+1 }}
                        </template>                   
                        <template v-else>
                          {{ data[header.key] }}
                        </template>
                      </td>
                    </tr>
                  </tbody>
                </table>                
              </div>
            </div>
            <v-pagination
                  v-model="page"
                  :length="pages"
                  @input="updateDisplayedData"
                ></v-pagination>
          </div>
        </div>
        <v-dialog v-model="docViewBox">
        <v-card>
          <view-document-vue
          :selectedDocId="selectedDocId"
          v-on:closeDocViewBox="closeDocViewBox"
          />
        </v-card>
      </v-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import setTooltip from "@/assets/js/tooltip.js";
import setNavPills from "@/assets/js/nav-pills.js";
import axios from "axios";
import ViewDocumentVue from './ViewDocument.vue';
export default {
    name:'viewFolder',
    components:{
      ViewDocumentVue
    },
    data(){
      return{
        folderId:this.id,
        files:[],
        folders:[],
        docViewBox:false,
        selectedDocId:"",
        selectedfolders:[],
        headers:[
          {
            key:'sno',
            title:'SNO'
          },
          {
            key:'docName',
            title:'FILE NAME'
          },
          {
            key:'createdBy',
            title:'CREATED BY'
          },
          {
            key:'createdAt',
            title:'CREATED AT'
          },
          {
            key:'action',
            title:'Action'
          },         
        ]
      }
    },
    props: ['id'],
    mounted() {
      console.log("folderrrIIIDdd", this.id);
    this.$store.state.isAbsolute = true;
    setNavPills();
    setTooltip(this.$store.state.bootstrap);
    this.getAllFiles();
    this.getFolderDetails();
  },
  beforeUnmount() {
    this.$store.state.isAbsolute = false;
  },
  methods:{
    async getFolderDetails() {
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      const apiUrl = `http://localhost:61050/dms/folder/getAllParentFolders`;
      const token = this.$store.getters.getUserToken;
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            token: token,
          },
        });
        this.folders =response.data.folder[0];

      } catch (error) {
        console.error("Error occured by", error);
      } 
    },




    async getAllFiles() {
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      const apiUrl = `http://localhost:61050/dms/folder/getById/${this.folderId}`;
      const token = this.$store.getters.getUserToken;
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            token: token,
          },
        });
        console.log("ressssponse",response.data.files);
        this.files = response.data.files;
      } catch (error) {
        console.error("Error occured by", error);
      }
    },

    closeDocViewBox(value) {
      this.docViewBox = value;
    },

    openDocViewBox(value){
      this.docViewBox=true;
      this.selectedDocId=value;
    }
  }
}
</script>

<style scoped>

.min-height-300 {
  min-height: 101px !important;
}

#app
  > div
  > div.dashboard
  > div.content
  > div
  > div
  > div.v-card-text.card-text {
  flex: 1 1 auto;
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: 0.0178571429em;
  padding: 0.5px;
  text-transform: none;
}

.newButton {
  display: flex;
  justify-content: flex-end;
  margin: 1% 0px;
  margin-right: 2%;
}
.newButton > .v-btn {
  background: #58bdff;
  transition: 0.5s ease;
  color: #fff;
}
.newButton > .v-btn:hover {
  cursor: pointer;
}


</style>