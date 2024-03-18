<template>
  <div style="display: flex; flex-direction: column">   
    <div class="pt-1 text-center card-header">
      <h5>Edit Access</h5>
    </div>
    <div class="card-body px-0 pt-0">
      <div>
        <form role="form" class="form">
          <div class="mb-3">
            <label>User ID</label>
            <v-select
              variant="outlined"
              :items="users"
              item-title="userName"
              item-value="userId"
              v-model="selectedUserIds"
              label="Select items"
              multiple
              chipstabelName
              small-chips
              clearable
            >
            </v-select>
          </div>
          <div class="mb-3">
            <label>Group ID</label>
            <v-select
              variant="outlined"
              v-model="selectedGroupIds"
              :items="groups"
              item-title="groupName"
              item-value="id"
              label="Select items"
              multiple
              chipstabelName
              small-chips
              clearable
            >
            </v-select>
          </div>
          <div class="mb-3">
            <label>Meta Data</label>
            <v-select
            v-model="selectedMetaId"
              variant="outlined"
              :items="metaDatas"
              item-title="name"
              item-value="id"
              label="Select"
            >
            </v-select>
          </div>
          <div class="mb-3 switch">
            <div
              style="
                display: flex;
                justify-content: flex-start;
                align-items: center;
              "
            >
              <span>Write Access</span>
            </div>
            <div>
              <v-switch
                v-model="accessDetails.write"
                hide-details
                true-value="Yes"
                false-value="N0"
                color="blue"
                inset
                class="custom-switch"
              ></v-switch>
            </div>
          </div>
          <div class="mb-3 switch">
            <div
              style="
                display: flex;
                justify-content: flex-start;
                align-items: center;
              "
            >
              <span>View Access</span>
            </div>
            <div>
              <v-switch
                v-model="accessDetails.view"
                hide-details
                true-value="Yes"
                false-value="N0"
                color="blue"
                inset
                class="custom-switch"
              ></v-switch>
            </div>
          </div>
          <div class="text-center">
            <button @click="postAccess">Save</button>
          </div>
        </form>
      </div>
      <div>
        <div class="tablecontainer">
          <div class="table-responsive p-0">
            <table class="table align-items-center mb-0">
              <thead class="table-header">
                <tr>
                  <th
                    v-for="header in userHeaders"
                    :key="header.key"
                    class="text-uppercase text-secondary text-xs font-weight-bolder opacity-10"
                    :style="{
                      'text-align': header.key === 'action' ? 'center' : 'left',
                    }"
                  >
                    {{ header.title }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, rowIndex) in assignedUsers" :key="rowIndex">
                  <td
                    v-for="(header, index) in userHeaders"
                    :key="index"
                    :class="{
                      'pl-5': header.key !== 'action',
                      'font-weight-bolder text-uppercase':
                        header.key === 'userName',
                    }"
                    :style="{
                      'text-align': header.key === 'action' ? 'center' : 'left',
                    }"
                  >
                    <template v-if="header.key == 'action'">
                      <div @click="openUserDeleteOption(data.userId)">
                        <span
                          style="font-size: 1.2rem; color: red; cursor: pointer"
                          class="mdi mdi-delete"
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
          <div class="table-responsive p-0">
            <table class="table align-items-center mb-0">
              <thead class="table-header">
                <tr>
                  <th
                    v-for="header in groupHeaders"
                    :key="header.key"
                    class="text-uppercase text-secondary text-xs font-weight-bolder opacity-10"
                    :style="{
                      'text-align': header.key === 'action' ? 'center' : 'left',
                    }"
                  >
                    {{ header.title }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, rowIndex) in assignedGroups" :key="rowIndex">
                  <td
                    v-for="(header, index) in groupHeaders"
                    :key="index"
                    :class="{
                      'pl-5': header.key !== 'action',
                      'font-weight-bolder text-uppercase':
                        header.key === 'userName',
                    }"
                    :style="{
                      'text-align': header.key === 'action' ? 'center' : 'left',
                    }"
                  >
                    <template v-if="header.key == 'action'">
                      <div @click="openGroupDeleteOption(data.groupId)">
                        <span
                          style="font-size: 1.2rem; color: red; cursor: pointer"
                          class="mdi mdi-delete"
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "editAccess",
  props: {
    accessDetails: Object,
  },
  data() {
    return {
      showLoader: false,
      selectedGroupIds: [],
      selectedUserIds: [],
      users: [],
      groups: [],
      metaDatas: [],
      assignedGroups: [],
      assignedUsers: [],
      selectedMetaId:null,
      userHeaders: [
        {
          key: "userName",
          title: " USER NAME",
        },
        {
          key: "action",
          title: " ACTION",
        },
      ],
      groupHeaders: [
        {
          key: "groupName",
          title: "GROUP NAME",
        },
        {
          key: "action",
          title: "ACTION",
        },
      ],
    };
  },

  mounted() {
    this.getUserIdsAndName();
    this.getGroupIdsAndName();
    this.getMetaData();
    this.getTableData();
  },
  methods: {
    async getUserIdsAndName() {
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      await axios
        .get(
          `http://localhost:61050/dms/access/getAllNotAccessUsers/${this.accessDetails.id}`,
          {
            headers: {
              token: this.$store.getters.getUserToken,
            },
          }
        )
        .then((response) => {
          this.users = response.data;
        })
        .catch((error) => console.error("Error occured by", error));
    },

    async getGroupIdsAndName() {
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      await axios
        .get(
          `http://localhost:61050/dms/access/getAllNotAccessGroups/${this.accessDetails.id}`,
          {
            headers: {
              token: this.$store.getters.getUserToken,
            },
          }
        )
        .then((response) => {
          this.groups = response.data;
        })
        .catch((error) => console.error("Error occured by", error));
    },

    async getMetaData() {
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      await axios
        .get(`http://localhost:61050/dms/meta/getAllMetaEntity`, {
          headers: {
            token: this.$store.getters.getUserToken,
          },
        })
        .then((response) => {
          this.metaDatas = response.data;
          console.log("metaDats",this.metaDatas);
        })
        .catch((error) => console.error("Error occured by", error));
    },

    async getTableData() {
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      await axios
        .get(
          `http://localhost:61050/dms/access/getAccessById?id=${this.accessDetails.id}`,
          {
            headers: {
              token: this.$store.getters.getUserToken,
            },
          }
        )
        .then((response) => {
          console.log("resssponse", response.data);
          console.log("group", response.data.group);

          this.assignedUsers = response.data.user;
          this.assignedGroups = response.data.group;
        })
        .catch((error) => console.error("Error occured by", error));
    },

    openUserDeleteOption(value) {
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
          this.toMakeDeleteUserData(value);
        }
      });
    },

    async toMakeDeleteUserData(value) {
      const apiUrl = `http://localhost:61050/dms/access/deleteUserAccess?userId=${value}&accessId=${this.accessDetails.id}`;
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
          this.getTableData();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        })
        .catch((error) =>
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.response.data.errorMessage,
          })
        );
    },

    openGroupDeleteOption(value) {
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
          this.toMakeDeletegroupData(value);
        }
      });
    },

    async toMakeDeletegroupData(value) {
      const apiUrl = `http://localhost:61050/dms/access/deleteGroupAccess?groupId=${value}&accessId=${this.accessDetails.id}`;
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
          this.getTableData();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        })
        .catch((error) =>
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.response.data.errorMessage,
          })
        );
    },

 
    
    getSelectedgroups() {
      const selectedGroups = this.groups
        .filter((ele) => this.selectedGroupIds.includes(ele.id))
        .map(({ id, groupName }) => ({ groupId: id, groupName }));
        console.log('selectedGroups',selectedGroups);
      return selectedGroups;
    },
    getSelectedUsers() {
      const selectedUsers = this.users
        .filter((ele) => this.selectedUserIds.includes(ele.userId))
        .map(({ userId, userName }) => ({ userId, userName }));
        console.log('selectedUsers',selectedUsers);

      return selectedUsers;
    },
    getSelectedMetaId(){
      if(this.selectedMetaId == null){
        return this.accessDetails.metaId
      }else{
        return this.selectedMetaId;
      }
    },
    async postAccess(event) {
      event.preventDefault();
      const token = this.$store.getters.getUserToken;
      const postDetails = {
        group: this.getSelectedgroups(),
        user: this.getSelectedUsers(),
        metaId: this.getSelectedMetaId(),
        view: this.accessDetails.view,
        write: this.accessDetails.write,
        createdBy: this.$store.getters.getAdminName,
      };

console.log("post detaisl",postDetails);
      await axios
        .put(
          `http://localhost:61050/dms/access/updateAccess/${this.accessDetails.id}`,
          postDetails,
          {
            headers: {
              token: token,
            },
          }
        )
        .then(() => {
          this.$emit("update-access-table", true);
          this.$emit("dialogeBox", false);
          this.$emit("showLoader", true);
        })
        .catch((error) => {
          console.error("API There was an error!", error);
        });
    },
  },
};
</script>

<style scoped>


.mb-3 {
  margin-bottom: 2px !important;
  width: 56%;
}

.switch {
  display: flex;
  width: 56%;
  justify-content: space-between;
}

.switch > div {
  flex-basis: 50%;
}

.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.form > div {
  flex-basis: 10%;
}

.card-body {
  display: flex;
  padding: 0px 0px !important;
}
.card-body > div {
  flex-basis: 50%;
}

.table-responsive {
  height: 250px;
  width: 100%;
  position: relative;
  overflow-y: auto;
}

.table-header {
  position: sticky;
  top: 0;
  z-index: 1;
  background: #fff;
}
.text-center {
  width: 100%;
}
.text-center > button {
  color: #fff;
  border: 0;
  cursor: pointer;
  width: 30% !important;
  text-transform: uppercase;
  background-size: 150%;
  background-position-x: 25%;
  background-image: linear-gradient(310deg, #141727 0%, #3a416f 100%);
  border-radius: 1rem;
  padding: 8px 0px;
  box-shadow:
    0 4px 7px -1px rgba(0, 0, 0, 0.11),
    0 2px 4px -1px rgba(0, 0, 0, 0.07);
}

/* Width */
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
  background: #9cccca; /* color of the handle */
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #d2d6da; /* color of the handle on hover */
}
</style>
