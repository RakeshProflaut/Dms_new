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
          <span class="mask bg-gradient-success opacity-6"></span>
        </div> -->
        <!-- <div class="mx-4 overflow-hidden card card-body blur shadow-blur mt-n6">
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
    -->
      <div class="mt-3 row"></div>
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card" style="height: 510px !important">
              <div v-show="viewFolderButton" class="newButton">
                <v-btn @click="openFolderDialogeBox = true">Create Folder</v-btn>
                <v-btn @click="getAllFolders">Back</v-btn>
              </div>
              <!-- <div class="card-header pb-0 text-uppercase">
                <h4>{{ this.currentFolderName }}</h4>
              </div> -->
              <div class="card-body px-0 pt-5 pb-2">
                <div class="table-responsive p-0">
                  <div class="tableContaier">
                    <table class="table align-items-center mb-0">
                      <thead class="table-header">
                        <tr>
                          <th
                          style="font-size: 0.7rem !important"
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
                      style="font-size: 0.9rem !important"
                      v-for="(data, rowIndex) in displayedData"
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
                          <template v-if="header.key === 'request'">
                            <v-btn
                            style="
                                font-size: 0.7rem !important;
                                height: 2rem !important;
                                "
                              @click="downloadlogfile(data['request'])"
                              class="text-secondary font-weight-bold text-xs"
                              >View</v-btn
                              >
                            </template>
                          <template v-else-if="header.key === 'response'">
                            <v-btn
                            style="
                                font-size: 0.7rem !important;
                                height: 2rem !important;
                              "
                              @click="downloadlogfile(data['response'])"
                              class="text-secondary font-weight-bold text-xs"
                            >
                              View</v-btn
                              >
                            </template>
  
                            <template v-else-if="header.key === 'sno'">
                            {{ rowIndex + 1 }}
                          </template>
                          
                          <template
                            v-else-if="
                              header.key === 'status'
                            "
                          >
                            <template v-if="data[header.key] === 'Success'">
                              <soft-badge
                                color="success"
                                variant="gradient"
                                style="
                                  background-image: linear-gradient(
                                    24deg,
                                    #17ad37 0%,
                                    #98ec2d 100%
                                    );
                                    "
                                size="sm"
                                >Success</soft-badge
                                >
                            </template>
                            <template v-else>
                              <soft-badge
                              color="secondary"
                              variant="gradient"
                              size="sm"
                              >Failure</soft-badge
                              >
                            </template>
                          </template>
                          <template v-else>
                            {{ data[header.key] }}
                          </template>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <v-pagination
                  v-model="page"
                  :length="pages"
                  @input="updateDisplayedData"
                  ></v-pagination>
                </div>
              </div>
              </div>
  
              <v-dialog v-model="openFolderDialogeBox" style="z-index: 1001">
                <v-card style="width: 28%; margin: 0 auto; border-radius: 3%">
                  <div>
                    <div class="folderContainer">
                      <div>
                        <button
                          class="closebtn"
                          @click="openFolderDialogeBox = false"
                        >
                          <i
                            class="bx bx-x"
                            style="position: relative; top: -40%"
                          ></i>
                        </button>
                      </div>
                      <div class="pt-10 text-center card-header">
                        <h5>Folder Name</h5>
                      </div>
                      <div class="card-body">
                        <form role="form">
                          <div class="mb-3">
                            <label>Name *</label>
                            <input
                              id="name"
                              type="text"
                              placeholder="Name"
                              aria-label="Name"
                              style="width: 100%"
                              v-model="enteredFolderName"
                            />
                          </div>
                          <div style="margin-right: 5%">
                            <label>Metadata Name *</label>
                            <v-select
                              variant="underlined"
                              style="width: 100%; font-size: 10px"
                              v-model="selectedMetaTable"
                              :items="metaTables"
                              item-title="tableName"
                              item-value="metaId"
                              label="Select items"
                              chipstabelName
                              small-chips
                              clearable
                            >
                            </v-select>
                          </div>
                          <div class="text-center">
                            <button @click="submitfolderDetails">Submit</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </v-card>
              </v-dialog>
            </div>
          </div>
        </div>
        <div v-if="showLoader" class="loader-overlay">
          <div v-if="showLoader" class="loader">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
          </div>
          <div class="bg"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import setNavPills from "@/assets/js/nav-pills.js";
  import SoftBadge from "@/components/SoftBadge.vue";
  import Swal from "sweetalert2";
  import setTooltip from "@/assets/js/tooltip.js";
  import axios from "axios";
  import ViewFolder from "./ViewFolder.vue";
  export default {
    name: "dms",
    components: {
      SoftBadge,
      ViewFolder,
    },
    data() {
      return {
        search: "",
        page: 1, // Current page
        itemsPerPage: 10, // Number of items per page
        showLoader: false,
        openDialogeBox: false,
        openFolderDialogeBox: false,
        enteredFolderName: "",
        viewFolderButton: false,
        selectedMetaTable: null,
        currentFolderName: "Directory",
        selectedFolderId: "",
        postfolderDetails: {},
        metaTables: [],
        headers: [
          {
            key: "sno",
            title: "S.No.",
          },
          {
            key: "transactionId",
            title: "TRANSACTION ID",
          },
          {
            key: "processingTime",
            title: "START TIME",
          },
          {
            key: "processingEndTime",
            title: "END TIME",
          },
          {
            key: "status",
            title: "STATUS",
          },
          {
            key: "request",
            title: "REQUEST",
          },
          {
            key: "response",
            title: "RESPONSE",
          }
        ],
        folders: [],
      };
    },
  
    mounted() {
      this.$store.state.isAbsolute = true;
      setNavPills();
      setTooltip(this.$store.state.bootstrap);
      this.getAllFolders();
      // this.getMetaData();
    },
    beforeUnmount() {
      this.$store.state.isAbsolute = false;
    },
  
    computed: {
      displayedData() {
        const start = (this.page - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
  
        return this.folders.slice(start, end);
      },
      pages() {
        return Math.ceil(this.folders.length / this.itemsPerPage);
      },
    },
  
    methods: {
      async downloadlogfile(fileName){
        axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
        const apiUrl = "http://localhost:61052/middleware/portal/downloadFile/"+fileName;
        const token = this.$store.getters.getUserToken;
        try {
          const response = await axios.get(apiUrl, {
            headers: {
              token: token,
            },
          });
  
          // this.folders = response.data;
         await this.downloadFileinlocal(response.data,fileName);
          // console.log("resposnseParen Fodlers", this.folders);
        } catch (error) {
          console.error("Error occured by", error);
        }  
      },


      
async downloadFileinlocal(base64,filename) {
   
    // console.log("Base",base64);
    try {
        let fileType='text/plain';
        let fileName = filename;

        // Determine the file type and filename based on the file extension
       

        // Construct a data URL with the base64-encoded file data
        const linkSource = `data:${fileType};base64,${base64}`;

        // Create a new <a> element to act as a download link
        const downloadLink = document.createElement("a");

        // Set the href attribute of the download link to the data URL
        downloadLink.href = linkSource;

        // Set the download attribute to specify the filename for the downloaded file
        downloadLink.download = fileName;

        // Programmatically click the download link to initiate the download
        downloadLink.click();
    } catch (error) {
        console.error('Error downloading file:', error);
    }
},

      async getAllFolders() {
        // this.currentFolderName='Directory'
        // this.viewFolderButton = false;
        axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
        const apiUrl = `http://localhost:61052/middleware/portal/getAll`;
        const token = this.$store.getters.getUserToken;
        try {
          const response = await axios.get(apiUrl, {
            headers: {
              token: token,
            },
          });
  
          this.folders = response.data;
          console.log("resposnseParen Fodlers", this.folders);
        } catch (error) {
          console.error("Error occured by", error);
        }
      },
  
      async getMetaData() {
        axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
        await axios
          .get(`http://localhost:61050/dms/meta/getAllAccessMetaTable`, {
            headers: {
              token: this.$store.getters.getUserToken,
            },
          })
          .then((response) => {
            this.metaTables = response.data;
            console.log("metaaaa", this.metaTables);
          })
          .catch((error) => console.error("Error occured by", error));
      },
  
      sendTableNameAndToggle(value) {
        console.log("selectedtoViewfodler", value);
        this.openDialogeBox = true;
        this.$router.push({
          name: "ViewFolder",
          query: {
            id: value.folderID,
            view: value.view,
            write: value.write,
            folderName: value.folderName,
            metaId: value.metaId,
          },
        });
      },
      async getSubFolders(value) {
        this.viewFolderButton = true;
        this.selectedFolderId = value;
        axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
        const apiUrl = `http://localhost:61050/dms/folder/getByParentId?parentFolderID=${value}`;
        const token = this.$store.getters.getUserToken;
        try {
          const response = await axios.get(apiUrl, {
            headers: {
              token: token,
            },
          });
          this.folders = response.data.subFolderPath;
          const renderFolderName=Array.from(response.data.subFolderPath);
          const currentFolder = renderFolderName.find(folder => folder.folderID === value);
          console.log("currentFolderrr", this.folders);
          // this.currentFolderName=renderFolderName[0].folderName;
        
        } catch (error) {
          Swal.fire({
            title: "No Sub Folders Present",
            text: "You Want to Create New Folder",
            icon: "info",
            showCancelButton: true,
            reverseButtons: true,
            customClass: {
              confirmButton: "swal2-confirm-custom",
              cancelButton: "swal2-cancel-custom",
            },
          }).then((result) => {
            if (result.isConfirmed) {
              this.openFolderDialogeBox = true;
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire("Cancelled", "Folder Creation Cancelled", "error");
            }
          });
        }
      },
      updateDisplayedData() {
        // Your logic to update displayed data based on the new page number
        const start = (this.page - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        this.displayedData = this.folders.slice(start, end);
      },
  
      async submitfolderDetails(event) {
        this.postfolderDetails = {
          parentFolderID: this.selectedFolderId,
          folderName: this.enteredFolderName,
          metaDataId: this.selectedMetaTable,
        };
        console.log("enteredFolderNmae", this.postfolderDetails);
        event.preventDefault();
        const apiUrl = "http://localhost:61050/dms/folder/create";
        const token = this.$store.getters.getUserToken;
        await axios
          .post(apiUrl, this.postfolderDetails, {
            headers: {
              token: token,
            },
          })
          .then(() => {
            this.openFolderDialogeBox = false;
            this.showLoader = true;
            setTimeout(() => {
              this.showLoader = false;
              this.getSubFolders(this.selectedFolderId);
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                background: "#4fb945",
                color: "white",
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                },
              });
              Toast.fire({
                icon: "success",
                title: "Folder Created successfully",
              });
            }, 3000);
          })
          .catch((error) => console.log("error occured by", error));
      },
    },
  };
  </script>
  
  <style scoped>
  body > div.v-overlay-container > div > div.v-overlay__content > div {
    height: 150%;
    width: 102%;
    margin-left: -10px;
  }
  .searchBar {
    border: 1px solid;
    margin-right: 10px;
    margin-left: 10px; /* Add margin for spacing between button and search bar */
    max-width: 25%; /* Set the maximum width to avoid elongation */
    display: block;
    height: 40px !important;
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
  
  .dmsHeader {
    display: flex;
    justify-content: flex-end;
    margin: 1% 0px;
  }
  .v-card-text {
    padding: 0;
  }
  .dmsHeader > .v-btn {
    background: #87e42e;
    transition: 0.5s ease;
  }
  .dmsHeader > .v-btn:hover {
    cursor: pointer;
    background-image: linear-gradient(70deg, #17ad37 0%, #98ec2d 100%);
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
  
  .min-height-300 {
    min-height: 75px !important;
  }
  
  .card .card-header {
    padding: 1rem !important;
  }
  .newButton {
    display: flex;
    justify-content: flex-end;
    margin: 1% 0px;
    margin-right: 2%;
  }
  .newButton > .v-btn {
    background-image: linear-gradient(
      310deg,
      #82d616 0%,
      #82d616 360%
    ) !important;
    color: #fff;
    transition: 0.5s ease;
    margin-left: 2%;
    font-weight: bold;
    font-size: 0.7rem !important;
    height: 2rem !important;
  }
  
  .newButton > .v-btn:hover {
    cursor: pointer;
  }
  
  .closebtn {
    position: relative;
    left: 4%;
    float: right;
    width: 22px;
    height: 22px;
    color: #d11313;
    font-size: 30px;
    opacity: 0.3;
  }
  
  .closebtn:hover {
    opacity: 1;
  }
  
  .container {
    position: relative;
    top: -15px;
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
  
  .text-center > button {
    color: #fff;
    border: 0;
    cursor: pointer;
    width: 50% !important;
    margin-bottom: 8px !important;
    letter-spacing: -0.025rem;
    text-transform: uppercase;
    background-size: 150%;
    background-position-x: 25%;
    background-image: linear-gradient(310deg, #141727 0%, #3a416f 100%);
    margin-top: 16px !important;
    border-radius: 1rem;
    padding: 8px 0px;
    box-shadow:
      0 4px 7px -1px rgba(0, 0, 0, 0.11),
      0 2px 4px -1px rgba(0, 0, 0, 0.07);
  }
  
  .folderContainer {
    height: 100%;
    width: 90%;
    margin: 0 auto;
  }
  
  .table-responsive {
  display: flex;
  flex-direction: column;    

}

  .tableContaier{
  position: relative;
  height: 432px;
  overflow-x: auto;
}
  
  .table-header {
    position: sticky;
    top: 0;
    z-index: 1;
    background: #fff;
  }
  
  .loader-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(1, 1, 1, 0.76);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }
  
  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 50px;
    height: 50px;
    margin: auto;
    background: var(--c), var(--r1), var(--r2), var(--c), var(--r1), var(--r2),
      var(--c), var(--r1), var(--r2);
    background-repeat: no-repeat;
    animation: l2 5s infinite alternate;
  }
  
  .loader .circle {
    position: absolute;
    width: 30px;
    height: 30px;
    opacity: 0;
    transform: rotate(225deg);
    animation-iteration-count: infinite;
    animation-name: orbit;
    animation-duration: 5.5s;
  }
  .loader .circle:after {
    content: "";
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 5px;
    background: #fff;
  }
  .loader .circle:nth-child(2) {
    animation-delay: 240ms;
  }
  .loader .circle:nth-child(3) {
    animation-delay: 480ms;
  }
  .loader .circle:nth-child(4) {
    animation-delay: 720ms;
  }
  .loader .circle:nth-child(5) {
    animation-delay: 960ms;
  }
  .loader .bg {
    position: absolute;
    width: 70px;
    height: 70px;
    margin-left: -16px;
    margin-top: -16px;
    border-radius: 13px;
    background-color: rgba(0, 153, 255, 0.69);
    animation: bgg 46087ms ease-in alternate infinite;
  }
  @keyframes orbit {
    0% {
      transform: rotate(225deg);
      opacity: 1;
      animation-timing-function: ease-out;
    }
    7% {
      transform: rotate(345deg);
      animation-timing-function: linear;
    }
    30% {
      transform: rotate(455deg);
      animation-timing-function: ease-in-out;
    }
    39% {
      transform: rotate(690deg);
      animation-timing-function: linear;
    }
    70% {
      transform: rotate(815deg);
      opacity: 1;
      animation-timing-function: ease-out;
    }
    75% {
      transform: rotate(945deg);
      animation-timing-function: ease-out;
    }
    76% {
      transform: rotate(945deg);
      opacity: 0;
    }
    100% {
      transform: rotate(945deg);
      opacity: 0;
    }
  }
  
  .swal2-confirm {
    background-color: #28a745 !important;
    color: #fff;
  }
  
  .swal2-cancel {
    background-color: #dc3545 !important;
    color: #fff;
  }
  </style>
  