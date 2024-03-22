<template>
  <div>
    <!-- <div
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
     -->
    <div class="container-fluid">
      <div class="row" style="margin-top: 0.5rem !important">
        <div class="col-12">
          <div class="card" style="height: 514px !important">
            <div style="display: flex; justify-content: space-between">
              <div class="card-header text-uppercase">
                <h4>User Information</h4>
              </div>
              <div class="newButton">
                <v-btn @click="openDialogeBox = true"> New </v-btn>
              </div>
            </div>
            <div class="card-body px-0 pt-0 pb-2">
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
                          :style="{
                            'text-align':
                              header.key === 'webAccess' ||
                              header.key === 'delete' ||
                              header.key === 'adminAccess' ||
                              header.key === 'action' ||
                              header.key === 'group'
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
                              header.key !== 'group' &&
                              header.key !== 'action' &&
                              header.key !== 'delete' &&
                              header.key !== 'webAccess' &&
                              header.key !== 'ldap' &&
                              header.key !== 'adminAccess',
                            'font-weight-bolder text-uppercase':
                              header.key === 'userName',
                          }"
                          :style="{
                            'text-align':
                              header.key == 'delete' ||
                              header.key === 'webAccess' ||
                              header.key === 'adminAccess' ||
                              header.key == 'ldap' ||
                              header.key === 'group' ||
                              header.key === 'action'
                                ? 'center'
                                : 'left',
                            padding: getCellPadding(data[header.key]),
                          }"
                        >
                          <template
                            v-if="
                              header.key === 'adminAccess' ||
                              header.key === 'webAccess' ||
                              header.key === 'ldap'
                            "
                          >
                            <template v-if="data[header.key] === 'Y'">
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
                          <template v-else-if="header.key === 'action'">
                            <div
                              style="
                                font-size: 0.5rem !important;
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
                          <template v-else-if="header.key === 'group'">
                            <div
                              @click="openAccess(data['userId'])"
                              style="
                                font-size: 0.5rem !important;
                                height: 2rem !important;
                              "
                              class="text-secondary font-weight-bold text-xs"
                            >
                              <span
                                style="
                                  color: #234375;
                                  font-size: 1.5rem;
                                  cursor: pointer;
                                "
                                class="mdi mdi-account-multiple-plus-outline"
                              ></span>
                            </div>
                          </template>
                          <template v-else-if="header.key === 'delete'">
                              <button @click="deleteUser(data)">
                                <i
                                  style="color: red;font-size: 1.1rem;"
                                  class="fas fa-trash-alt"
                                ></i>
                              </button>
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
          </div>
        </div>
        <v-dialog v-model="openDialogeBox" style="z-index: 1001">
          <div style="position: relative; left: 64%">
            <button class="closebtn" @click="openDialogeBox = false">
              <i class="bx bx-x" style="position: relative; top: 20%"></i>
            </button>
          </div>
          <v-card style="width: 28%; border-radius: 3%; margin: 0 auto">
            <user-signup
              @showLoader="handleShowLoader"
              v-on:closeDialogeBox="closeDialogeBox"
            />
          </v-card>
        </v-dialog>
        <v-dialog v-model="openEditbox" style="z-index: 1001">
          <div style="position: relative; left: 64%">
            <button class="closebtn" @click="openEditbox = false">
              <i class="bx bx-x" style="position: relative; top: 20%"></i>
            </button>
          </div>
          <v-card style="width: 28%; border-radius: 3%; margin: 0 auto">
            <edit-user-info-vue
              @showLoader="handleEditShowLoader"
              v-on:closeEditBox="closeEditBox"
              :userDetails="selectedUserDetails"
            />
          </v-card>
        </v-dialog>
        <v-dialog
          v-model="openAccessBox"
          style="display: flex; padding-left: 73%; z-index: 1001"
        >
          <div style="position: relative; left: 27%">
            <button class="closebtn" @click="openAccessBox = false">
              <i class="bx bx-x" style="position: relative; top: 20%"></i>
            </button>
          </div>
          <v-card style="width: 28%; border-radius: 3%">
            <div>
              <div class="container" style="width: 100%; height: 100%">
                <div class="pt-10 text-center card-header">
                  <h5>Assign Group</h5>
                </div>
                <div class="card-body">
                  <div>
                    <label>Group Name</label>
                    <v-select
                      variant="outlined"
                      :items="accessGroups"
                      item-title="groupName"
                      item-value="id"
                      v-model="selectedGroupId"
                      label="Select items"
                      multiple
                      chipstabelName
                      small-chips
                      clearable
                    >
                    </v-select>
                  </div>
                  <div class="text-center">
                    <button @click="submitGroupAccess">Submit</button>
                  </div>

                  <div
                    class="table-responsive p-0"
                    style="height: 250px !important"
                  >
                    <table class="table align-items-center mb-0">
                      <thead class="table-header">
                        <tr>
                          <th
                            class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-10"
                          >
                            Group Name
                          </th>
                          <th
                            class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-10"
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(data, rowIndex) in assignedGroups"
                          :key="rowIndex"
                        >
                          <td>
                            <div
                              class="text-center d-flex flex-column justify-content-center"
                            >
                              {{ data.groupName }}
                            </div>
                          </td>
                          <td>
                            <div
                              @click="openDeleteOption(data.id)"
                              style="text-align: center"
                            >
                              <span
                                style="
                                  font-size: 1.2rem;
                                  color: red;
                                  cursor: pointer;
                                "
                                @click="openAccess(data['userId'])"
                                class="mdi mdi-delete"
                              ></span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </v-card>
        </v-dialog>
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
import SoftBadge from "@/components/SoftBadge.vue";
import setNavPills from "@/assets/js/nav-pills.js";
import setTooltip from "@/assets/js/tooltip.js";
import UserSignup from "../adminBoard/UserSignUp.vue";
import axios from "axios";
import Swal from "sweetalert2";
import EditUserInfoVue from "./EditUserInfo.vue";

export default {
  name: "table",
  created() {
    this.getUserInfo();
  },
  components: {
    SoftBadge,
    UserSignup,
    EditUserInfoVue,
  },

  mounted() {
    this.$store.state.isAbsolute = true;
    setNavPills();
    setTooltip(this.$store.state.bootstrap);
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
      const end = start + this.itemsPerPage;
      return this.userInfos.slice(start, end);
    },
    pages() {
      console.log(Math.ceil(this.userInfos.length / this.itemsPerPage));
      return Math.ceil(this.userInfos.length / this.itemsPerPage);
    },
  },
  data() {
    return {
      showLoader: false,
      headers: [
        {
          key: "sno",
          title: "S.No",
        },
        { key: "userName", title: "USER NAME" },
        { key: "email", title: "E-MAIL" },
        { key: "createdDate", title: "CREATED At" },
        { key: "webAccess", title: "WEB ACCESS" },
        { key: "adminAccess", title: "ADMIN ACCESS" },
        { key: "ldap", title: "LDAP" },

        { key: "action", title: "ACTION" },
        { key: "group", title: "GROUP" },
      ],
      openDialogeBox: false,
      openEditbox: false,
      openAccessBox: false,
      assignedGroups: [],
      userInfos: [],
      selectedUserDetails: null,
      accessGroups: [],
      selectedGroupId: [],
      selectedUserId: null,
      page: 1, // Current page
      itemsPerPage: 10, // Number of items per page
    };
  },
  methods: {
    getCellPadding(content) {
      const maxWidth = 12.8;
      const contentLength = content ? content.length : 0;
      const horizontalPadding =
        contentLength > maxWidth
          ? `${Math.max(0.5, 1 - (contentLength - maxWidth))}px`
          : "0px";
      const verticalPadding =
        contentLength > maxWidth
          ? `${Math.max(1, 1 - (contentLength - maxWidth))}px`
          : "10px";
      return `${verticalPadding} ${horizontalPadding}`;
    },
    async handleShowLoader(value) {
      // Update the isLoading data property based on the emitted value
      this.openDialogeBox = false;
      this.showLoader = value;
      if (value) {
        // If value is true (showLoader is true), wait for 3 seconds and then set showLoader to false
        setTimeout(() => {
          this.showLoader = false;
          this.getUserInfo();
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
            title: "User Added successfully",
          });
        }, 3000);
      }
    },

    async handleEditShowLoader(value) {
      this.openEditbox = false;
      this.showLoader = value;
      if (value) {
        setTimeout(() => {
          this.showLoader = false;
          this.getUserInfo();
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
            title: "User Edited successfully",
          });
        }, 3000);
      }
    },

    updateDisplayedData() {
      // Your logic to update displayed data based on the new page number
      const start = (this.page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      this.displayedData = this.userInfos.slice(start, end);
    },
    async getUserInfo() {
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      const apiUrl = `http://localhost:61050/dms/group/getAllUsers`;
      const token = this.$store.getters.getUserToken;
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            token: token,
          },
        });
        this.userInfos = response.data;
        console.log(response.data);
      } catch (error) {
        console.error("Error occured by", error);
      }
    },
    closeDialogeBox(value) {
      this.openDialogeBox = value;
    },

    closeEditBox(value) {
      this.openEditbox = value;
      this.getUserInfo();
    },

    async openAccess(value) {
      this.selectedUserId = value;
      const apiUrl = `http://localhost:61050/dms/group/getAllGroup`;
      const token = this.$store.getters.getUserToken;
      await axios
        .get(apiUrl, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          this.accessGroups = response.data;
          this.assignedGroups = [];
          this.getAssignedgroups();
          this.getAssignedgroups().then(() => {
            this.getFilterAccessGroup();
          });
          this.openAccessBox = true;
        })
        .catch((error) =>
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.response.data[0].errorMessage,
          })
        );
    },
    getFilterAccessGroup() {
      this.accessGroups = this.accessGroups.filter(
        (item) =>
          !this.assignedGroups.some(
            (assignedItem) => assignedItem.id === item.id
          )
      );
      console.log("filterlist", this.accessGroups);
      console.log("assignedGroups List", this.assignedGroups);
      console.log("accessGroups list", this.accessGroups);
    },

    async submitGroupAccess() {
      const apiUrl = `http://localhost:61050/dms/group/assignGroup`;
      const userName = this.$store.getters.getAdminName;
      const groupDetails = {
        groupId: this.selectedGroupId,
        userId: this.selectedUserId,
        mappedBy: userName,
      };
      const token = this.$store.getters.getUserToken;
      console.log(groupDetails);
      await axios
        .post(apiUrl, groupDetails, {
          headers: {
            token: token,
          },
        })
        .then(() => {
          this.openAccessBox = false;
          this.showLoader = true;

          setTimeout(() => {
            this.showLoader = false;
            this.openAccessBox = true;
            (this.selectedGroupId = []),
              this.getAssignedgroups().then(() => {
                this.getFilterAccessGroup();
              });
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
              title: "Group Assigned successfully",
            });
          }, 3000);
        })
        .catch((error) => console.log("error occured by", error));
    },

    async getAssignedgroups() {
      const apiUrl = `http://localhost:61050/dms/group/getAssignGroupinfo/${this.selectedUserId}`;
      const token = this.$store.getters.getUserToken;
      await axios
        .get(apiUrl, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          this.assignedGroups = response.data;
        })
        .catch((error) => console.log("error occured by", error));
    },

    openDeleteOption(value) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.toMakeDeleteData(value);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      });
    },
    async toMakeDeleteData(value) {
      const apiUrl = `http://localhost:61050/dms/group/deleteAssignGroup?groupId=${value}&userId=${this.selectedUserId} `;
      const token = this.$store.getters.getUserToken;
      console.log(token);
      await axios
        .delete(apiUrl, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          console.log("respondedelte", response.data.status);
          this.assignedGroups = [];
          this.getAssignedgroups();
        })
        .catch((error) => console.log("error occured by", error));
    },

    getOpenEditBox(value) {
      this.openEditbox = true;
      this.selectedUserDetails = value;
    },

    
  },
};
</script>

<style scoped>
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
  background: #58bdff;
  transition: 0.5s ease;
  font-weight: bold;
  color: #fff;
  height: 2rem !important;
  font-size: 0.7rem !important;
}
.newButton > .v-btn:hover {
  cursor: pointer;
}

.table-responsive {
  display: flex;
  flex-direction: column;
}
.tableContaier {
  position: relative;
  height: 383px;
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

.container {
  position: relative;
  top: -15px;
}
.closebtn {
  width: 22px;
  height: 22px;
  color: #d11313;
  font-size: 30px;
  opacity: 1;
}

.closebtn:hover {
  opacity: 0.3;
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
  height: 30px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #d2d6da; /* color of the handle on hover */
}
</style>
