<!-- <template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <authors-table />
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: "tables",

};
</script> -->

<template>
  <div class="card mb-4">
    <div class="newButton">
      <v-btn @click="openDialogeBox =true"> New </v-btn>
    </div>
    <div class="card-header pb-0">
      <h6>User Information table</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                v-for="(header, index) in headers"
                :key="header.key"
                :class="{
                  'text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2':
                    index === 1,
                  'text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7':
                    index === 2,
                  'text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7':
                    index === 3,
                  'text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7':
                    index === 4,
                  'text-secondary opacity-7': index === 5,
                }"
              >
                {{ header.title }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="userInfo in userInfos" :key="userInfo.userId">
              <td>
                <div class="d-flex px-2 py-1">
                  <div class="d-flex flex-column justify-content-center">
                    {{ userInfo.userId }}
                  </div>
                </div>
              </td>
              <td>
                <div class="d-flex px-2 py-1">
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ userInfo.userName }}</h6>
                  </div>
                </div>
              </td>

              <td>
                <div class="d-flex px-2 py-1">
                  <div class="d-flex flex-column justify-content-center">
                    {{ userInfo.createdDate }}
                  </div>
                </div>
              </td>
              <!-- <td class="align-middle text-center text-sm">
                <soft-badge color="success" variant="gradient" size="sm"
                  >Online</soft-badge
                >
              </td> -->
              <!-- <td
                class="status-cell align-middle text-center text-sm"
              >
                <soft-badge
                  variant="gradient"
                  size="sm"
                  >{{
                    user.webAccess === "Y" ? "Online" : "Offline"
                  }}</soft-badge
                >
              </td>
              <td
                class="status-cell align-middle text-center text-sm"
              >
                <soft-badge
                  variant="gradient"
                  size="sm"
                  >{{
                    user.adminAccess === "Y" ? "Online" : "Offline"
                  }}</soft-badge
                >
              </td> -->
              <td class="align-middle">
                <a
                  href="javascript:;"
                  class="text-secondary font-weight-bold text-xs"
                  data-toggle="tooltip"
                  data-original-title="Edit user"
                  >Edit</a
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <v-dialog v-model="openDialogeBox">
      <v-card>
        <user-signup v-on:closeDialogeBox="closeDialogeBox" />
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
  mounted(){
   this.getUserInfo()
  },
  data() {
    return {
      openDialogeBox: false,
    };
  },
  components: {
    SoftBadge,
    UserSignup,
  },
  data() {
    return {
      headers: [
        { key: "userId", title: "USER ID" },
        { key: "userName", title: "USER NAME" },
        { key: "email", title: "E-MAIL" },
        { key: "createdDate", title: "CREATED DATE" },
        { key: "webAccess", title: "WEB ACCESS" },
        { key: "adminAccess", title: "ADMIN ACCESS" },
        { key: "action", title: "Action" },
      ],
      userInfos: [],
    };
  },
  methods: {
    async getUserInfo() {
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
          console.log(response.data);
          console.log("date",response.data.createdDate);    
          console.log("web",response.data.webAccess);
          console.log("admin",response.data.adminAccess);

          this.userInfos = response.data;
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
}
.newButton > .v-btn:hover {
  cursor: pointer;
}
</style>

<!-- <tr v-for="(user, index) in users" :key="index">
  <td :class="{ 'special-user': user.special }">
    <div class="d-flex px-2 py-1">                
      <div class="d-flex flex-column justify-content-center">
        <h6 class="mb-0 text-sm">{{ user.name }}</h6>
        Additional data rendering if needed -->
<!--
      </div>
    </div>
  </td>
  <td class="position-cell">
    <p class="text-xs font-weight-bold mb-0">{{ user.position }}</p>
  </td>
  <td class="status-cell align-middle text-center text-sm">
    <soft-badge :color="user.statusColor" variant="gradient" size="sm">{{ user.status }}</soft-badge>
  </td>
  <td class="date-cell align-middle text-center">
    <span class="text-secondary text-xs font-weight-bold">{{ user.date }}</span>
  </td>
  <td class="edit-cell align-middle">
    <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">Edit</a>
  </td>
</tr> -->

<!-- <td class="status-cell align-middle text-center text-sm" :class="getStatusClass(user.webAccess)">
  <soft-badge :color="getBadgeColor(user.webAccess)" variant="gradient" size="sm">{{ user.webAccess === 'Y' ? 'Online' : 'Offline' }}</soft-badge>
</td>
<td class="status-cell align-middle text-center text-sm" :class="getStatusClass(user.clientAccess)">
  <soft-badge :color="getBadgeColor(user.clientAccess)" variant="gradient" size="sm">{{ user.clientAccess === 'Y' ? 'Online' : 'Offline' }}</soft-badge>
</td>
<td class="date-cell align-middle text-center">
  <span class="text-secondary text-xs font-weight-bold">{{ user.date }}</span>
</td>
<td class="edit-cell align-middle">
  <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">Edit</a>
</td> -->
