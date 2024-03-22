<template>
  <div>
    <div class="container-fluid">
    <!--
      <div
        class="mt-4 page-header min-height-300 border-radius-xl"
        :style="{
          backgroundImage:
            'url(' + require('@/assets/img/curved-images/curved14.jpg') + ')',
          backgroundPositionY: '50%',
        }"
      ></div>
    -->
    </div> 
    <div class="container-fluid">
      <div class="row" style="margin-top: 0.5rem !important">
        <div class="col-12">
          <div class="card" style="height: 514px !important">
            <div style="display: flex; justify-content: space-between">
              <div class="card-header text-uppercase">
                <h4>Group Information</h4>
              </div>
              <div class="newButton">
                <v-btn @click="openDialogeBox = true">New</v-btn>
              </div>
            </div>
            <div class="card-body px-0 pt-1 pb-2">
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
                              header.key === 'user' || header.key === 'action' || header.key === 'delete'
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
                            'pl-6':
                              header.key !== 'user' && header.key !== 'action'&& header.key !== 'delete',
                            'font-weight-bolder text-uppercase':
                              header.key === 'groupName',
                          }"
                          :style="{
                            'text-align':
                              header.key === 'user' || header.key === 'action' || header.key === 'delete'
                                ? 'center'
                                : 'left',
                          }"
                        >
                          <template v-if="header.key === 'action'">
                            <div
                              style="
                                font-size: 0.7rem !important;
                                height: 2rem !important;
                              "
                              class="font-weight-bold text-xs"
                            >
                              <span
                              @click="getOpenEditBox(data)"
                                class="mdi mdi-pencil"
                                style="
                                  font-size: 1.2rem;
                                  cursor: pointer;
                                  color: #234375;
                                "
                              ></span>
                            </div>
                          </template>
                          <template v-else-if="header.key === 'sno'">
                            {{ rowIndex + 1 }}
                          </template>
                          <template v-else-if="header.key === 'user'">
                            <div
                              @click="openAccess(data['id'])"
                              style="
                                font-size: 0.7rem !important;
                                height: 2rem !important;
                              "
                              class="text-secondary font-weight-bold text-xs"
                            >
                              <span
                                style="
                                  font-size: 1.5rem;
                                  cursor: pointer;
                                  color: #234375;
                                "
                                class="mdi mdi-account-multiple-plus-outline"
                              ></span>
                            </div>
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
            <v-dialog
              v-model="openDialogeBox"
              style="display: flex; padding-left: 73%; z-index: 1001"
            >
            <div style="position: relative; left: 27%">
        <button class="closebtn" @click="openDialogeBox = false">
          <i class="bx bx-x" style="position: relative; top: 20%"></i>
        </button>
      </div>
              <v-card style="width: 28%; border-radius: 3%">
                <div>
                  <div class="container" style="width: 100%; height: 100%">                  
                    <div class="pt-10 text-center card-header">
                      <h5>Group Registration</h5>
                    </div>
                    <div class="card-body">
                      <form role="form">
                        <div class="mb-3">
                          <input
                            id="name"
                            type="text"
                            placeholder="Name"
                            aria-label="Name"
                            v-model="enteredGroupName"
                          />
                        </div>
                        <div class="text-center">
                          <button @click="submitGroupName">Submit</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </v-card>
            </v-dialog>
            <v-dialog
              v-model="openEditbox"
              style="display: flex; padding-left: 73%; z-index: 1001"
            >
            <div style="position: relative; left: 27%">
        <button class="closebtn" @click="openEditbox = false">
          <i class="bx bx-x" style="position: relative; top: 20%"></i>
        </button>
      </div>
            <edit-group-info
              @showLoader="handleEditShowLoader"
              v-on:closeEditBox="closeEditBox"
              :groupDetails="selectedGroupDetails" 
            />

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
                      <h5>Assign Users</h5>
                    </div>
                    <div class="card-body">
                      <div>
                        <label>User Name</label>
                        <v-select
                          variant="outlined"
                          v-model="selectedUserId"
                          :items="accessUsers"
                          item-title="userName"
                          item-value="userId"
                          label="Select items"
                          multiple
                          chipstabelName
                          small-chips
                          clearable
                        >
                        </v-select>
                      </div>
                      <div class="text-center">
                        <button @click="submitUserAccess">Submit</button>
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
                                User Name
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
                              v-for="(data, rowIndex) in assignedUsers"
                              :key="rowIndex"
                            >
                              <td>
                                <div
                                  style="text-align: center"
                                  class="text-center d-flex flex-column justify-content-center"
                                >
                                  {{ data.userName }}
                                </div>
                              </td>
                              <td>
                                <div
                                  @click="openDeleteOption(data.userId)"
                                  style="text-align: center"
                                >
                                  <span
                                    style="
                                      font-size: 1.2rem;
                                      color: red;
                                      cursor: pointer;
                                    "
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
import axios from "axios";
import Swal from "sweetalert2";
import setNavPills from "@/assets/js/nav-pills.js";
import setTooltip from "@/assets/js/tooltip.js";
import EditGroupInfo from "./EditGroupInfo.vue";
export default {
  name: "groupInfo",
  data() {
    return {
      page: 1, // Current page
      itemsPerPage: 10, // Number of items per page
      headers: [
      {
          key: "sno",
          title: "S.No",
        },
        { key: "groupName", title: "GROUP NAME" },
        { key: "createdBy", title: "CREATED BY" },
        { key: "createdAt", title: "CREATED AT" },
        { key: "action", title: "ACTION" },
        { key: "user", title: "USER" },
      ],
      openDialogeBox: false,
      openAccessBox: false,
      groupDatas: [],
      enteredGroupName: "",
      openEditbox:false,
      assignedUsers: [],
      showLoader: false,
      selectedUserId: [],
      accessUsers: [],
      selectedGroupId: null,
      selectedGroupDetails:null,
      
    };
  },
  components:{
    EditGroupInfo,
  },
  mounted() {
    this.getGroupData();
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
      console.log("start", start);
      const end = start + this.itemsPerPage;
      console.log("end", start);

      return this.groupDatas.slice(start, end);
    },
    pages() {
      console.log(Math.ceil(this.groupDatas.length / this.itemsPerPage));
      return Math.ceil(this.groupDatas.length / this.itemsPerPage);
    },
  },
  methods: {
    updateDisplayedData() {
      // Your logic to update displayed data based on the new page number
      const start = (this.page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      this.displayedData = this.groupDatas.slice(start, end);
    },
    async getGroupData() {
      console.log(
        "group Mangament user token",
        this.$store.getters.getUserToken
      );
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      const apiUrl = `http://localhost:61050/dms/group/getAllGroup`;
      const token = this.$store.getters.getUserToken;
      await axios
        .get(apiUrl, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          console.log("res", response.data);
          this.groupDatas = response.data;
        })
        .catch((error) => console.error("Error occured by", error));
    },

    async submitGroupName(event) {
      if (this.enteredGroupName !== "") {
        const token = this.$store.getters.getUserToken;
        event.preventDefault();
        const groupData = {
          createdBy: this.$store.getters.getAdminName,
          groupName: this.enteredGroupName,
        };
        console.log("group Data", groupData);

        try {
          const response = axios.post(
            "http://localhost:61050/dms/group/createGroupInfo?=",
            groupData,
            {
              headers: {
                token: token,
              },
            }
          );

          this.openDialogeBox = false;
          this.showLoader = true;
          setTimeout(() => {
            this.getGroupData();
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
              title: "Group Added successfully",
            });
          }, 3000);
          (this.enteredGroupName = ""), this.getGroupData();
        } catch (error) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            customClass: "swal-wide",
            height: "30px",
            background: "hsl(0, 43%, 52%)",
            color: "white",
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "warning",
            title: "Group Name Already Exist!",
          });
          console.error("API There was an error!", error);
          // }
        }
      } else {
        event.preventDefault();
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          customClass: "swal-wide",
          height: "30px",
          background: "hsl(0, 43%, 52%)",
          color: "white",
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "error",
          title: "Please Fill the Fields!",
        });
      }
    },

    async openAccess(value) {
      this.selectedGroupId = value;
      const apiUrl = `http://localhost:61050/dms/group/getAllUsers`;
      const token = this.$store.getters.getUserToken;
      await axios
        .get(apiUrl, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          this.accessUsers = response.data;
          this.assignedUsers = [];
          this.getAssignedUsers();
          this.getAssignedUsers().then(() => {
            this.getFilterAccessUser();
          });
          this.openAccessBox = true;
        })
        .catch((error) => console.log("error occured by", error));
    },

    getFilterAccessUser() {
      this.accessUsers = this.accessUsers.filter(
        (item) =>
          !this.assignedUsers.some(
            (assignedItem) => assignedItem.userId === item.userId
          )
      );
    },

    async submitUserAccess() {
      const apiUrl = `http://localhost:61050/dms/group/assignUser`;
      const userName = this.$store.getters.getAdminName;
      const userDetails = {
        groupId: this.selectedGroupId,
        userId: this.selectedUserId,
        mappedBy: userName,
      };
      const token = this.$store.getters.getUserToken;
      await axios
        .post(apiUrl, userDetails, {
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
            (this.selectedUserId = []),
              this.getAssignedUsers().then(() => {
                this.getFilterAccessUser();
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
              title: "User Assigned successfully",
            });
          }, 3000);
        })
        .catch((error) => console.log("error occured by", error));
    },

    async getAssignedUsers() {
      const apiUrl = `http://localhost:61050/dms/group/getAssignUserInfo/${this.selectedGroupId}`;
      const token = this.$store.getters.getUserToken;
      await axios
        .get(apiUrl, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          this.assignedUsers = response.data;
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
      const apiUrl = `http://localhost:61050/dms/group/deleteAssignUser?groupId=${this.selectedGroupId}&userId=${value} `;
      const token = this.$store.getters.getUserToken;
      await axios
        .delete(apiUrl, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          this.assignedUsers = [];
          this.getAssignedUsers();
        })
        .catch((error) => console.log("error occured by", error));
    },

    getOpenEditBox(value){
      this.openEditbox=true;
      this.selectedGroupDetails=value;
    },
    
    closeEditBox(value) {
      this.openEditbox = value;
      this.getGroupData();
    },


    async handleEditShowLoader(value) {
      this.openEditbox = false;
      this.showLoader = value;
      if (value) {
        setTimeout(() => {
          this.showLoader = false;
          this.getGroupData();
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
            title: "Group Edited Successfully",
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
  top: -15px;
}

.closebtn {
  width: 22px;
  height: 22px;
  color: #d11313;
  font-size: 30px;
  opacity:1;
}

.closebtn:hover {
  opacity: .3;
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

.table-responsive {
  display: flex;
  flex-direction: column;
}

.tableContaier {
  position: relative;
  height: 363px;
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
