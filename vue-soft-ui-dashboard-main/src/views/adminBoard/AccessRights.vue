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
      ></div> -->
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
    <div class="container-fluid">
      <div class="row" style="margin-top: 0.5rem !important">
        <div class="col-12">
          <div class="card" style="height: 514px !important">
            <div style="display: flex; justify-content: space-between">
              <div class="card-header text-uppercase">
                <h4>Access Rights</h4>
              </div>
              <div class="newButton">
                <v-btn @click="openDialogeBox = true"> New </v-btn>
              </div>
            </div>
            <div class="card-body px-0 pt-0 pb-1">
              <div class="table-responsive p-0">
                <div class="tableContaier">
                  <table class="table align-items-center mb-0">
                    <thead class="table-header">
                      <tr>
                        <th
                          style="font-size: 0.7rem !important"
                          v-for="header in headers"
                          :key="header.key"
                          class="text-uppercase text-secondary text-xs font-weight-bolder opacity-10"
                          :class="{
                            'text-secondary opacity-7': header.key === 'action',
                          }"
                          :style="{
                            'text-align':
                              header.key === 'view' ||
                              header.key === 'accessView' ||
                              header.key === 'write' ||
                              header.key === 'action'
                                ? 'center'
                                : 'left',
                          }"
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
                          v-for="(header, index) in headers"
                          :key="index"
                          :class="{
                            'pl-5':
                              header.key !== 'action' &&
                              header.key !== 'accessView' &&
                              header.key !== 'view' &&
                              header.key !== 'write',
                            'font-weight-bolder text-uppercase':
                              header.key === 'userName',
                          }"
                          :style="{
                            'text-align':
                              header.key === 'view' ||
                              header.key === 'accessView' ||
                              header.key === 'write' ||
                              header.key === 'action'
                                ? 'center'
                                : 'left',
                          }"
                        >
                          <template v-if="header.key === 'accessView'">
                            <div
                              style="
                                font-size: 0.7rem !important;
                                height: 2rem !important;
                              "
                              @click="sendTableNameAndToggle(data['id'])"
                              class="text-secondary font-weight-bold text-xs"
                            >
                              <span
                                style="
                                  font-size: 1.7rem;
                                  cursor: pointer;
                                  color: #234375;
                                "
                                class="mdi mdi-archive-eye-outline"
                              ></span>
                            </div>
                          </template>
                          <template v-else-if="header.key === 'action'">
                            <div
                              style="
                                font-size: 0.7rem !important;
                                height: 2rem !important;
                              "
                              class="text-secondary font-weight-bold text-xs"
                            >
                              <span
                                @click="getOpenEditBox(data)"
                                class="mdi mdi-pencil"
                                style="
                                  color: #234375;
                                  font-size: 1.2rem;
                                  cursor: pointer;
                                "
                              ></span>
                            </div>
                          </template>
                          <template v-else-if="header.key === 'sno'">
                            {{ rowIndex + 1 }}
                          </template>
                          <template
                            v-else-if="
                              header.key === 'view' || header.key === 'write'
                            "
                          >
                            <template v-if="data[header.key] === 'Yes'">
                              <soft-badge
                                color="success"
                                variant="gradient"
                                style=" 
                              color:#596195;                     
                              background: rgb(228,243,227);
                              background: linear-gradient(270deg, rgba(228,243,227,1) 0%, rgba(88,189,255,1) 95%);
                              
                              !important"
                                size="sm"
                                >Enable</soft-badge
                              >
                            </template>                       
                            <template v-else>
                              <soft-badge
                                color="secondary"
                                variant="gradient"
                                size="sm"
                                >Disable</soft-badge
                              >
                            </template>                            
                          </template>                      
                          <template v-else>
                            <div
                              :class="{
                                'font-weight-bolder':
                                  header.key === 'tablename',
                              }"
                            >
                              {{ data[header.key] }}
                            </div>
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
          </div>
          <v-dialog v-model="openDialogeBox" style="z-index: 1001">
            <div style="position: relative; left: 64%">
        <button class="closebtn" @click="openDialogeBox = false">
          <i class="bx bx-x" style="position: relative; top: 20%"></i>
        </button>
      </div>
            <v-card style="width: 28%; border-radius: 3%; margin: 0 auto">
              <access-creation
                @showLoader="handleShowLoader"
                v-on:dialogeBox="listnerDialogBox"
                v-on:selectedMetaData="selectedMetaData"
                @update-access-table="handleUpdateAccessTable"
              />
            </v-card>
          </v-dialog>
          <v-dialog v-model="openTAccessDialoge" style="z-index: 1001">
            <div style="position: relative; left: 70%">
        <button class="closebtn" @click="openTAccessDialoge = false">
          <i class="bx bx-x" style="position: relative; top: 20%"></i>
        </button>
      </div>
            <v-card style="width: 40%; border-radius: 3%; margin: 0 auto">
              <view-access-vue
                v-on:dialogeBox="userTableDialogBox"
                :selectedAccessId="selectedAccessId"
              />
            </v-card>
          </v-dialog>
          <v-dialog v-model="openEditbox" style="z-index: 1001">
            <div style="position: relative; left: 79%">
        <button class="closebtn" @click="openEditbox = false">
          <i class="bx bx-x" style="position: relative; top: 10%"></i>
        </button>
      </div>
            <v-card style="width: 60%; border-radius: 3%; margin: 0 auto;">
              <edit-access
              @showLoader="handleEditShowLoader"
              v-on:closeEditBox="closeEditBox"
              :accessDetails="selectedAccessDetails" 
              />
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
</template>

<script>
import axios from "axios";
import AccessCreation from "../adminBoard/AccessCreation.vue";
import SoftBadge from "@/components/SoftBadge.vue";
import ViewAccessVue from "./ViewAccess.vue";
import setNavPills from "@/assets/js/nav-pills.js";
import setTooltip from "@/assets/js/tooltip.js";
import Swal from "sweetalert2";
import EditAccess from "./EditAccess.vue";

export default {
  name: "accessRights",
  components: {
    AccessCreation,
    SoftBadge,
    ViewAccessVue,
    EditAccess
  },
  data() {
    return {
      openDialogeBox: false,
      openTAccessDialoge: false,
      selectedAccessId: "",
      showLoader: false,
      openEditbox:false,
      selectedAccessDetails:null,
      page: 1,
      itemsPerPage: 10,
      headers: [
        {
          key: "sno",
          title: "S.No",
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
        { key: "action", title: "ACTION" },
        { key: "accessView", title: "VIEW" },
      ],
      tableDatas: [],
    };
  },

  mounted() {
    this.$store.state.isAbsolute = true;
    setNavPills();
    setTooltip(this.$store.state.bootstrap);
    this.getTableEntity();
  },
  beforeUnmount() {
    this.$store.state.isAbsolute = false;
  },
  watch: {
    page(newValue, oldValue) {
      console.log("Page changed to:", newValue);
      this.updateDisplayedData();
    },
  },
  computed: {
    displayedData() {
      console.log("displa data rendering");
      const start = (this.page - 1) * this.itemsPerPage;
      console.log("start", start);
      const end = start + this.itemsPerPage;
      console.log("end", start);

      return this.tableDatas.slice(start, end);
    },
    pages() {
      console.log(Math.ceil(this.tableDatas.length / this.itemsPerPage));
      return Math.ceil(this.tableDatas.length / this.itemsPerPage);
    },
  },
  methods: {
    async handleShowLoader() {
      this.openDialogeBox = false;
      this.showLoader = true;
      setTimeout(() => {
        this.getTableEntity();
        this.showLoader = false;
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
          title: "Access created successfully",
        });
      }, 3000);
    },
    updateDisplayedData() {
      // Your logic to update displayed data based on the new page number
      const start = (this.page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      this.displayedData = this.tableDatas.slice(start, end);
    },

    sendTableNameAndToggle(value) {
      this.selectedAccessId = value;
      this.openTAccessDialoge = true;
    },

    listnerDialogBox(value) {
      this.openDialogeBox = value;
    },

    userTableDialogBox(value) {
      this.openTAccessDialoge = value;
    },

    async getTableEntity() {
      console.log("dms token", this.$store.getters.getUserToken);
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      await axios
        .get(
          "http://localhost:61050/dms/access/getAllAccess",

          {
            headers: {
              token: this.$store.getters.getUserToken,
            },
          }
        )
        .then((response) => {
          console.log("responseeeeeeeee", response.data);

          this.tableDatas = response.data;
        })
        .catch((error) => console.error("Error occured by", error));
    },
    handleUpdateAccessTable() {
      this.getTableEntity();
    },
    getOpenEditBox(value){
      this.openEditbox=true;
      this.selectedAccessDetails=value;
    },
    closeEditBox(value) {
      this.openEditbox = value;
    },
    async handleEditShowLoader(value) {
      this.openEditbox = false;
      this.showLoader = value;
      if (value) {
        setTimeout(() => {
          this.showLoader = false;
          this.getTableEntity();
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
            title: "Access Edited successfully",
          });
        }, 3000);
      }
    },   
  },
};
</script>

<style scoped>
.min-height-300 {
  min-height: 75px !important;
}

.newButton {
  display: flex;
  justify-content: flex-end;
  margin: 1% 0px;
  margin-right: 2%;
}
.newButton > .v-btn {
  background: #58bdff;
  color: #fff;
  transition: 0.5s ease;
  font-weight: bold;
  height: 2rem !important;
  font-size: 0.7rem !important;
}

.newButton > .v-btn:hover {
  cursor: pointer;
}

.card .card-header {
  padding: 1rem !important;
}
.table-responsive {
  display: flex;
  flex-direction: column;
}
.tableContaier {
  position: relative;
  height: 380px;
  overflow-x: auto;
}

.table-header {
  position: sticky;
  top: 0;
  z-index: 1;
  background: #fff;
}


.closebtn {
  width: 22px;
  height: 22px;
  color: #d11313;
  font-size: 30px;
  opacity: 1;
}

.closebtn:hover {
  opacity: .3;
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
  width: 65px;
  height: 65px;
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

::-webkit-scrollbar {
  width: 3px; /* width of the scrollbar */
  border-radius: 13px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; /* color of the track */
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #65c2fc; /* color of the handle */
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #65c2fc; /* color of the handle on hover */
}
</style>
