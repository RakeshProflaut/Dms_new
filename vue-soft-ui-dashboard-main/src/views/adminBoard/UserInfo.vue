<template>
  <div class="card mb-4" style="height: 484px !important">
    <div class="newButton">
      <v-btn @click="openDialogeBox = true"> New </v-btn>
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
                v-for="header in headers"
                :key="header.key"
                class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-10"
              >
                {{ header.title }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, rowIndex) in displayedData" :key="rowIndex">
              <td
                :class="{
                  'font-weight-bolder text-uppercase':
                    header.key === 'userName',
                }"
                v-for="(header, index) in headers"
                :key="index"
                style="text-align: center"
              >
                <template
                  v-if="
                    header.key === 'adminAccesss' || header.key === 'webAccess'
                  "
                >
                  <template v-if="data[header.key] === 'Y'">
                    <soft-badge
                      color="success"
                      variant="gradient"
                      style="background: #5fc0ff !important"
                      size="sm"
                      >Enable</soft-badge
                    >
                  </template>
                  <template v-else>
                    <soft-badge color="secondary" variant="gradient" size="sm"
                      >Disable</soft-badge
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
        <v-pagination
          v-model="page"
          :length="pages"
          @input="updateDisplayedData"
        ></v-pagination>
      </div>
    </div>
    <v-dialog
      v-model="openDialogeBox"
      style="display: flex; padding-left: 73%; z-index: 1001"
    >
      <v-card style="width: 28%; border-radius: 3%">
        <user-signup
          @showLoader="handleShowLoader"
          v-on:closeDialogeBox="closeDialogeBox"
          :getUserInfo="getUserInfo"
        />
      </v-card>
    </v-dialog>
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
import UserSignup from "../adminBoard/UserSignUp.vue";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "table",
  created() {
    this.getUserInfo();
  },
  components: {
    SoftBadge,
    UserSignup,
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
        { key: "userId", title: "USER ID" },
        { key: "userName", title: "USER NAME" },
        { key: "email", title: "E-MAIL" },
        { key: "createdDate", title: "CREATED DATE" },
        { key: "webAccess", title: "WEB ACCESS" },
        { key: "adminAccesss", title: "ADMIN ACCESS" },
        // { key: "action", title: "Action" },
      ],
      openDialogeBox: false,
      userInfos: [],
      page: 1, // Current page
      itemsPerPage: 10, // Number of items per page
    };
  },
  methods: {
    async handleShowLoader(value) {
      // Update the isLoading data property based on the emitted value
      console.log("handleShowLoader", value);
      this.showLoader = value;
      if (value) {
        // If value is true (showLoader is true), wait for 3 seconds and then set showLoader to false
        setTimeout(() => {
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
            title: "User Added successfully",
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
      } catch (error) {
        console.error("Error occured by", error);
      }
    },
    closeDialogeBox(value) {
      this.openDialogeBox = value;
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
  background: #58bdff;
  transition: 0.5s ease;
  color: #fff;
}
.newButton > .v-btn:hover {
  cursor: pointer;
}

.table-responsive {
  height: 350px;
  position: relative;
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
</style>
