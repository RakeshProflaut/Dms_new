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
                src="@/assets/img/bruce-mars.jpg"
                alt="profile_image"
                class="shadow-sm w-100 border-radius-lg"
              />
            </div>
          </div>
          <div class="col-auto my-auto">
            <div class="h-100">
              <h5 class="mb-1">{{this.$store.getters.getUserName}}</h5>
              <p class="mb-0 text-sm font-weight-bold">User Id-{{ this.$store.getters.getUserId }}</p>
            </div>
          </div>
          <div
            class="mx-auto mt-3 col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0"
          >
            <div class="nav-wrapper position-relative end-0">
              <ul
                class="p-1 bg-transparent nav nav-pills nav-fill"
                role="tablist"
              >
                <li v-for="tab in tabs" v-bind:key="tab.value" class="nav-item">
                  <a
                    class="px-0 py-1 mb-0 nav-link active"
                    @click="selectedTab(tab.value)"
                    data-bs-toggle="tab"
                    href="javascript:;"
                    role="tab"
                    aria-selected="true"
                  >
                    <svg
                      class="text-dark"
                      width="16px"
                      height="16px"
                      viewBox="0 0 42 42"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                    ></svg>
                    <span class="ms-1">{{ tab.title }}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="mt-3 row"></div>
      <div class="mt-4 row">
        <div class="col-12">
          <!-- 
          <div class="mb-4 card">
            <div class="py-4 container-fluid">
              <div class="row">
                <div class="col-12">
                  <div class="card-body px-0 pt-0 pb-2"> -->
                    <v-card style="max-height: 100%; overflow: auto;border-radius: 1rem;
                    box-shadow: inset 0 0px 1px 1px rgba(254, 254, 254, 0.9), 0 20px 27px 0 rgba(0, 0, 0, 0.05)">
                      <div class="dmsHeader">
                        <v-btn
                        v-if="selectedTabValue === 'maker'"
        :ripple="false"
        style="color: black; height: 30px"
        @click="checkRendering"
                          >New</v-btn
                        >
                        <input
                          type="text"
                          v-model="search"
                          label="Search"
                          placeholder="Filter"
                          single-line
                          style="height: 30px !important"
                          variant="outlined"
                          hide-details
                          class="searchBar"
                        />
                        <!-- </input> -->
                      </div>
                      <v-card
                        style="width: 100%; height: 450px; overflow: hidden"
                      >
                        <v-data-table
                          :headers="headers"
                          :items="
                            (propertiesTable = tabsValue[selectedTabValue])
                          "
                          :item-key="'customerId'"
                          :search="search"
                          style="height: 456px; overflow-y: auto"
                        >
                          <template v-slot:[`item.action`]="{ item }">
                            <v-icon
                              size="small"
                              class="mdi mdi-open-in-new"
                              @click="openWorkItem(item)"
                            >
                            </v-icon>
                          </template>
                        </v-data-table>
                      </v-card>
                    </v-card>
                  </div>
                </div>
              </div>
            </div>
            <!-- 
          </div>
        </div>
      </div>
    </div>
  </div> -->
</template>

<script>
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

import setNavPills from "@/assets/js/nav-pills.js";
import setTooltip from "@/assets/js/tooltip.js";
import axios from "axios";

export default {
  name: "dms",
  data() {
    return {
      search: "",
      selectedTabValue: "maker",
      dialogDelete: false,
      selectedTabs: null,
      propertiesTable: [],
      prospectId: "",
      faFacebook,
      faTwitter,
      faInstagram,
      tabs: [
              {value:'maker',title:'Maker'},
              {value:'checker',title:'Checker'}
            ],
      tabsValue: {
        maker: [
          {
            customerId: "1234",
            name: "SATHISH",
            accountNumber: "50100364789651",
            branchName: "Ambattur",
            branchCode: "1486",
            ifsc: "2100",
            prospectId: "DMS_0589",
          },
        ],
        checker: [
          {
            customerId: "5678",
            name: "RAKESH",
            accountNumber: "50100364789651",
            branchName: "Ambattur",
            branchCode: "1486",
            ifsc: "2100",
            prospectId: "DMS_0589",
          },
          {
            customerId: "5678",
            name: "RAKESH",
            accountNumber: "50100364789651",
            branchName: "Ambattur",
            branchCode: "1486",
            ifsc: "2100",
            prospectId: "DMS_0589",
          },
        ],
      },
      headers: [
        {
          align: "start",
          key: "prospectId",
          sortable: false,
          title: "PROSPECT ID",
        },
        { key: "customerId", title: "CUSTOMER ID" },
        { key: "name", title: "NAME" },
        { key: "accountNumber", title: "ACCOUNT NUMBER" },
        { key: "branchName", title: "BRANCH NAME" },
        { key: "branchCode", title: "BRANCH CODE" },
        { key: "ifsc", title: "IFSC" },
        { title: "Action", key: "action", sortable: false },
      ],
    };
  },

  mounted() {
    this.$store.state.isAbsolute = true;
    setNavPills();
    setTooltip(this.$store.state.bootstrap);
    // this.getDmsTabs();
    // this.renderNewData(this.selectedTabValue);  
  },
  beforeUnmount() {
    this.$store.state.isAbsolute = false;
  },
  methods: {
    selectedTab(value) {
      this.selectedTabValue = value;
    },


    // async renderNewData() {
    //   axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
    //   const apiUrl =
    //     "http://localhost:8081/dms/transaction/getExecutions?key=maker&userId=1";
    //   const token = this.$store.getters.getUserToken;
    //   const tabKey = this.selectedTabValue;
    //   console.log("tabkey",tabKey);
    //   await axios
    //     .get(apiUrl, {
    //       headers: {
    //         token: token,
    //       },
    //     })
    //     .then((response) => {
    //       this.headers = response.data.headers;
    //       this.propertitabsValueesMenu = {
    //         [tabKey]: response.data[tabKey],
    //       };
    //     })
    //     .catch((error) => console.error("Error occured by", error));
    // },
    // async getDmsTabs() {
    //   console.log("dms token",this.$store.getters.getUserToken);
    //   axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
    //   await axios
    //     .get(
    //       `http://localhost:8081/dms/transaction/retrieve/1`
          
    //       // ,{
    //       //   headers: {
    //       //     token:  this.$store.getters.getUserToken              
    //       //   }
    //       // }
    //     )
    //     .then((response) => (this.tabs = console.log(response.data)))
    //     .catch((error) => console.error("Error occured by", error));
    // },
    openWorkItem(item) {
      console.log("item",item);
      // let userData = {
      //   prospectId: item.prospectId,
      //   title: this.selectedTabValue,
      // };

      this.$router.push({
        name: "Work Item",
        query: {
      id: item.prospectId,
      name: this.selectedTabValue,
    },
      });
    },
    // async checkRendering() {
    //   const apiUrl = `http://localhost:8081/dms/transaction/saveExecution?userId=1&activityName=maker`;
    //   alert(this.$store.getters.getUserToken);
    //   const token = this.$store.getters.getUserToken;
    //   await axios
    //     .post(
    //       apiUrl,
    //       {},
    //       {
    //         headers: {
    //           token: token,
    //         },
    //       }
    //     )
    //     .then((response) => {
    //       if (response.data.status) {
    //         this.renderNewData("maker");
    //       }
    //     })
    //     .catch((error) => console.error("Error occured by", error));
    // },
    // handleUpdateDataTable() {
    //   this.renderNewData(this.menuLabel.key);   
    // },
  },
};
</script>

<style scoped>
.v-pagination__first,
.v-pagination__prev,
.v-pagination__item,
.v-pagination__item--is-active,
.v-pagination__next,
.v-pagination__last {
  color: rgb(211, 15, 15) !important;
}
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

#app
  > div
  > div.dashboard
  > div.content
  > div
  > div
  > div.v-card-text.card-text
  > div
  > div
  > div.v-window-item.v-window-item--active
  > div
  > div.v-card.v-theme--light.v-card--density-default.v-card--variant-elevated
  > div.v-table.v-table--fixed-header.v-table--has-top.v-table--has-bottom.v-theme--light.v-table--density-default.v-data-table
  > div.v-data-table-footer
  > div.v-data-table-footer__pagination
  > nav
  > ul
  > li.v-pagination__first
  > button
  > span.v-btn__content
  > i {
  color: #ce1212;
}

.min-height-300 {
  min-height: 101px !important;
}
</style>
