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
            <!-- <div class="newButton">
              <v-btn @click="openDialogeBox = true"> New </v-btn>
            </div> -->
            <div class="card-header pb-0">
              <h3>Folders</h3>
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
                        <template v-if="header.key === 'action'">
                          <v-btn
                            @click="sendTableNameAndToggle(data['name'])"
                            class="text-secondary font-weight-bold text-xs"
                            >View</v-btn
                          >
                        </template>

                        <template v-else-if="header.key === 'sno'">
                          {{ rowIndex+1 }}
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
                              style="background: #5fc0ff !important"
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import setNavPills from "@/assets/js/nav-pills.js";
import SoftBadge from "@/components/SoftBadge.vue";

import setTooltip from "@/assets/js/tooltip.js";
import axios from "axios";
export default {
  name: "dms",
  components:{
    SoftBadge,
  },
  data() {
    return {
      search: "",
      page: 1, // Current page
      itemsPerPage: 10, // Number of items per page
      headers: [
        {
          key: "sno",
          title: "SNo",
        },
        {
          key: "folderName",
          title: "FOLDER NAME",
        },
        {
          key: "folderPath",
          title: "FOLDER PATH",
        },
        {
          key: "createdBy",
          title: "CREATED BY",
        },
        {
          key: "createdAt",
          title: "CREATED AT",
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
          key: "action",
          title: "Action",
        },
      ],
      folders: [],
    };
  },

  mounted() {
    this.$store.state.isAbsolute = true;
    setNavPills();
    setTooltip(this.$store.state.bootstrap);
    this.getAllFolders();
  },
  beforeUnmount() {
    this.$store.state.isAbsolute = false;
  },

  computed: {
    displayedData() {
      console.log("displa data rendering");
      const start = (this.page - 1) * this.itemsPerPage;
      console.log("start", start);
      const end = start + this.itemsPerPage;
      console.log("end", start);

      return this.folders.slice(start, end);
    },
    pages() {
      console.log(Math.ceil(this.folders.length / this.itemsPerPage));
      return Math.ceil(this.folders.length / this.itemsPerPage);
    },
  },

  methods: {
    async getAllFolders() {
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      const apiUrl = `http://localhost:61050/dms/folder/getAllfolders`;
      const token = this.$store.getters.getUserToken;
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            token: token,
          },
        });
        this.folders = response.data.folder;
        console.log("data", response.data);
        console.log("folders", this.folders);
      } catch (error) {
        console.error("Error occured by", error);
      }
    },

    updateDisplayedData() {
      // Your logic to update displayed data based on the new page number
      const start = (this.page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      this.displayedData = this.folders.slice(start, end);
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
  min-height: 101px !important;
}
</style>
