<template>
  <div style="display: flex; flex-direction: column">
    <div class="pt-1 text-center card-header">
      <h5>Access Right Creation</h5>
    </div>
    <div class="addButton">
      <!-- <v-btn @click="addEmptyRow"> Add </v-btn> -->
      <v-btn @click="checkAndPost"> Save </v-btn>
    </div>

    <div class="card-body px-0 pt-0 pb-2">
      <div class="form">
        <div>
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
        <div>
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
        <div>
          <label for="">Meta Data</label>
          <v-select
            variant="outlined"
            v-model="selectedMetaId"
            :items="metaDatas"
            item-title="name"
            item-value="id"
            label="Select"
          >
          </v-select>
        </div>
        <div>
          <div class="checkbox-wrapper-34">
            <span>Write</span>
            <input
              class="tgl tgl-ios"
              id="toggle-34"
              type="checkbox"
              @change="updateWriteAccess"
            />
            <label class="tgl-btn" for="toggle-34"></label>
          </div>
        </div>
        <div>
          <div class="checkbox-wrapper-35">
            <span>View</span>
            <input
              class="tgl tgl-ios"
              id="toggle-35"
              type="checkbox"
              @change="updateViewAccess"
            />
            <label class="tgl-btn" for="toggle-35"></label>
          </div>
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
import Swal from "sweetalert2";

export default {
  name: "accessCreation",

  data() {
    return {
      selectedGroupIds: [],
      selectedUserIds: [],
      selectedMetaId: null,
      users: [],
      groups: [],
      metaDatas: [],
      showLoader: false,
      fields: [],
      viewAccess: "No",
      writeAccess: "No",
      headers: [
        {
          key: "userId",
          title: "User Id",
        },
        {
          key: "groupId",
          title: "Group ID",
        },
        {
          key: "metaId",
          title: "META ID",
        },
        {
          key: "view",
          title: "VIEW",
        },
        {
          key: "write",
          title: "WRITE",
        },
      ],
    };
  },
  mounted() {
    this.getUserIdsAndName();
    this.getGroupIdsAndName();
    this.getMetaData();
  },

  methods: {
    addEmptyRow() {
      const emptyRow = {};
      this.headers.forEach((header) => {
        emptyRow[header.key] = "";
      });
      this.fields.push(emptyRow);
    },

    dialogeBoxtoggle() {
      this.$emit("dialogeBox", false);
    },

    async getUserIdsAndName() {
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      await axios
        .get("http://localhost:61050/dms/group/getAllUsers", {
          headers: {
            token: this.$store.getters.getUserToken,
          },
        })
        .then((response) => {
          this.users = response.data;
          console.log("users", response.data);
        })
        .catch((error) => console.error("Error occured by", error));
    },

    async getGroupIdsAndName() {
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      await axios
        .get("http://localhost:61050/dms/group/getAllGroup", {
          headers: {
            token: this.$store.getters.getUserToken,
          },
        })
        .then((response) => {
          this.groups = response.data;
        })
        .catch((error) => console.error("Error occured by", error));
    },

    async getMetaData() {
      console.log("dms token", this.$store.getters.getUserToken);
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      await axios
        .get("http://localhost:61050/dms/meta/getAllMetaEntity", {
          headers: {
            token: this.$store.getters.getUserToken,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.metaDatas = response.data;
        })
        .catch((error) => console.error("Error occured by", error));
    },

    async checkAndPost(event) {
      const checkGroupAndName =
        this.selectedUserIds.length > 0 && this.selectedGroupIds.length > 0;
      if (
        checkGroupAndName &&
        this.selectedMetaId &&
        this.viewAccess &&
        this.writeAccess != ""
      ) {
        if (this.viewAccess == "Yes" || this.writeAccess == "Yes") {
          this.postAccess(event);
        } else {
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
            title: "Please Give Access to  View or Write!",
          });
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
          title: "Please Fill all the Fields!",
        });
      }
    },
    async postAccess(event) {
      const token = this.$store.getters.getUserToken;
      const postDetails = {
        group: this.getSelectedgroups(),
        user: this.getSelectedUsers(),
        metaId: this.selectedMetaId,
        view: this.viewAccess,
        write: this.writeAccess,
        createdBy: this.$store.getters.getAdminName,
      };

      event.preventDefault();
      await axios
        .post("http://localhost:61050/dms/access/saveAccess", postDetails, {
          headers: {
            token: token,
          },
        })
        .then(() => {
          this.$emit("update-access-table", true);
          this.$emit("dialogeBox", false);
          this.$emit("showLoader", true);
        })
        .catch((error) => {
          console.error("API There was an error!", error);
        });
    },

    getSelectedgroups() {
      const selectedGroups = this.groups
        .filter((ele) => this.selectedGroupIds.includes(ele.id))
        .map(({ id, groupName }) => ({ groupId: id, groupName }));
      return selectedGroups;
    },
    getSelectedUsers() {
      const selectedUsers = this.users
        .filter((ele) => this.selectedUserIds.includes(ele.userId))
        .map(({ userId, userName }) => ({ userId, userName }));
      return selectedUsers;
    },

    updateViewAccess() {
      this.viewAccess = this.viewAccess === "No" ? "Yes" : "No";
    },
    updateWriteAccess() {
      this.writeAccess = this.writeAccess === "No" ? "Yes" : "No";
    },
  },
};
</script>

<style scoped>


.form {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.form > div {
  margin-top: 1%;
  width: 100%;
  display: flex;
  flex-direction: column;
}




.extensionField {
  width: 49%;
  padding: 0.5rem 0.45rem;
  font-size: 15px !important;
  font-weight: 400;
  text-align: left;
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

.card-body {
  height: 100%;
  width: 80%;
  margin: 0 auto;
}

.addButton {
  display: flex;
  justify-content: flex-end;
  margin: 1% 0px;
  margin-right: 2%;
}
.addButton > .v-btn {
  margin-left: 3%;
  background: #58bdff;
  color: #fff;
  transition: 0.5s ease;
}
.addButton > .v-btn:hover {
  cursor: pointer;
}

.checkbox-wrapper-35 {
  display: flex;
  width: 80%;
  justify-content: space-between;
  --blue: #55b6f6;
  --g08: #e1e5eb;
  --g04: #848ea1;
}

.checkbox-wrapper-35 > span {
  flex-basis: 50%;
  font-size: 0.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #344767;
  margin-left: 0.25rem;
}

.checkbox-wrapper-35 .tgl {
  display: none;
}
.checkbox-wrapper-35 .tgl,
.checkbox-wrapper-35 .tgl:after,
.checkbox-wrapper-35 .tgl:before,
.checkbox-wrapper-35 .tgl *,
.checkbox-wrapper-35 .tgl *:after,
.checkbox-wrapper-35 .tgl *:before,
.checkbox-wrapper-35 .tgl + .tgl-btn {
  box-sizing: border-box;
}
.checkbox-wrapper-35 .tgl::selection,
.checkbox-wrapper-35 .tgl:after::selection,
.checkbox-wrapper-35 .tgl:before::selection,
.checkbox-wrapper-35 .tgl *::selection,
.checkbox-wrapper-35 .tgl *:after::selection,
.checkbox-wrapper-35 .tgl *:before::selection,
.checkbox-wrapper-35 .tgl + .tgl-btn::selection {
  background: none;
}
.checkbox-wrapper-35 .tgl + .tgl-btn {
  outline: 0;
  display: block;
  width: 57px;
  height: 27px;
  position: relative;
  cursor: pointer;
  user-select: none;
  font-size: 12px;
  font-weight: 400;
  color: #fff;
}
.checkbox-wrapper-35 .tgl + .tgl-btn:after,
.checkbox-wrapper-35 .tgl + .tgl-btn:before {
  position: relative;
  display: block;
  content: "";
  width: 44%;
  height: 100%;
}
.checkbox-wrapper-35 .tgl + .tgl-btn:after {
  left: 0;
}
.checkbox-wrapper-35 .tgl + .tgl-btn:before {
  display: inline;
  position: absolute;
  top: 7px;
}
.checkbox-wrapper-35 .tgl:checked + .tgl-btn:after {
  left: 56.5%;
}

.checkbox-wrapper-35 .tgl-ios + .tgl-btn {
  background: var(--g08);
  border-radius: 20rem;
  padding: 2px;
  transition: all 0.4s ease;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
}
.checkbox-wrapper-35 .tgl-ios + .tgl-btn:after {
  border-radius: 2em;
  background: #fff;
  transition:
    left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
    padding 0.3s ease,
    margin 0.3s ease;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
}
.checkbox-wrapper-35 .tgl-ios + .tgl-btn:before {
  content: "No";
  left: 28px;
  color: var(--g04);
  transition: left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.checkbox-wrapper-35 .tgl-ios + .tgl-btn:active {
  box-shadow: inset 0 0 0 30px rgba(0, 0, 0, 0.1);
}
.checkbox-wrapper-35 .tgl-ios + .tgl-btn:active:after {
  padding-right: 0.4em;
}
.checkbox-wrapper-35 .tgl-ios:checked + .tgl-btn {
  background: var(--blue);
}
.checkbox-wrapper-35 .tgl-ios:checked + .tgl-btn:active {
  box-shadow: inset 0 0 0 30px rgba(0, 0, 0, 0.1);
}
.checkbox-wrapper-35 .tgl-ios:checked + .tgl-btn:active:after {
  margin-left: -0.4em;
}
.checkbox-wrapper-35 .tgl-ios:checked + .tgl-btn:before {
  content: "Yes";
  left: 4px;
  color: #fff;
}

.checkbox-wrapper-34 {
  display: flex;
  width: 80%;
  justify-content: space-between;
  --blue: #55b6f6;
  --g08: #e1e5eb;
  --g04: #848ea1;
}

.checkbox-wrapper-34 > span {
  flex-basis: 50%;
  font-size: 0.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #344767;
  margin-left: 0.25rem;
}

.checkbox-wrapper-34 .tgl {
  display: none;
}
.checkbox-wrapper-34 .tgl,
.checkbox-wrapper-34 .tgl:after,
.checkbox-wrapper-34 .tgl:before,
.checkbox-wrapper-34 .tgl *,
.checkbox-wrapper-34 .tgl *:after,
.checkbox-wrapper-34 .tgl *:before,
.checkbox-wrapper-34 .tgl + .tgl-btn {
  box-sizing: border-box;
}
.checkbox-wrapper-34 .tgl::selection,
.checkbox-wrapper-34 .tgl:after::selection,
.checkbox-wrapper-34 .tgl:before::selection,
.checkbox-wrapper-34 .tgl *::selection,
.checkbox-wrapper-34 .tgl *:after::selection,
.checkbox-wrapper-34 .tgl *:before::selection,
.checkbox-wrapper-34 .tgl + .tgl-btn::selection {
  background: none;
}
.checkbox-wrapper-34 .tgl + .tgl-btn {
  outline: 0;
  display: block;
  width: 57px;
  height: 27px;
  position: relative;
  cursor: pointer;
  user-select: none;
  font-size: 12px;
  font-weight: 400;
  color: #fff;
}
.checkbox-wrapper-34 .tgl + .tgl-btn:after,
.checkbox-wrapper-34 .tgl + .tgl-btn:before {
  position: relative;
  display: block;
  content: "";
  width: 44%;
  height: 100%;
}
.checkbox-wrapper-34 .tgl + .tgl-btn:after {
  left: 0;
}
.checkbox-wrapper-34 .tgl + .tgl-btn:before {
  display: inline;
  position: absolute;
  top: 7px;
}
.checkbox-wrapper-34 .tgl:checked + .tgl-btn:after {
  left: 56.5%;
}

.checkbox-wrapper-34 .tgl-ios + .tgl-btn {
  background: var(--g08);
  border-radius: 20rem;
  padding: 2px;
  transition: all 0.4s ease;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
}
.checkbox-wrapper-34 .tgl-ios + .tgl-btn:after {
  border-radius: 2em;
  background: #fff;
  transition:
    left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
    padding 0.3s ease,
    margin 0.3s ease;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
}
.checkbox-wrapper-34 .tgl-ios + .tgl-btn:before {
  content: "No";
  left: 28px;
  color: var(--g04);
  transition: left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.checkbox-wrapper-34 .tgl-ios + .tgl-btn:active {
  box-shadow: inset 0 0 0 30px rgba(0, 0, 0, 0.1);
}
.checkbox-wrapper-34 .tgl-ios + .tgl-btn:active:after {
  padding-right: 0.4em;
}
.checkbox-wrapper-34 .tgl-ios:checked + .tgl-btn {
  background: var(--blue);
}
.checkbox-wrapper-34 .tgl-ios:checked + .tgl-btn:active {
  box-shadow: inset 0 0 0 30px rgba(0, 0, 0, 0.1);
}
.checkbox-wrapper-34 .tgl-ios:checked + .tgl-btn:active:after {
  margin-left: -0.4em;
}
.checkbox-wrapper-34 .tgl-ios:checked + .tgl-btn:before {
  content: "Yes";
  left: 4px;
  color: #fff;
}
</style>
