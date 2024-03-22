<template>
    <div class="container-fluid ">
      <div
      class="mt-5 page-header min-height-300 border-radius-xl"
      :style="{
          backgroundImage:
          'url(' + require('@/assets/img/curved-images/curved14.jpg') + ')',
          backgroundPositionY: '50%',
        }"
      >
      <span v-if="!adminBoard" class="mask bg-gradient-success opacity-6"></span>
    </div>
  </div>
  <nav
    class="shadow-none navbar navbar-main navbar-expand-lg border-radius-xl sticky-top"
    v-bind="$attrs"
    id="navbarBlur"
    data-scroll="true"
  >
  <div class="px-3 py-1 container-fluid">
      <breadcrumbs :currentPage="currentRouteName" :textWhite="textWhite" />
      <div
      class="mt-2 collapse navbar-collapse mt-sm-0 me-md-0 me-sm-4"
      :class="this.$store.state.isRTL ? 'px-0' : 'me-sm-4'"
      id="navbar"
      >
      <div
      class="pe-md-3 d-flex align-items-center"
      :class="this.$store.state.isRTL ? 'me-md-auto' : 'ms-md-auto'"
      >
    </div>
        <ul class="navbar-nav justify-content-end">
          <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
            <a
              href="#"
              @click="toggleSidebar"
              class="p-0 nav-link text-body"
              >
              <div class="sidenav-toggler-inner">
                <i class="sidenav-toggler-line"></i>
                <i class="sidenav-toggler-line"></i>
                <i class="sidenav-toggler-line"></i>
              </div>
            </a>
          </li>
          <li class="px-3 nav-item d-flex align-items-center">
            <a
            class="p-0 nav-link"
              @click="toggleConfigurator"
              :class="textWhite ? textWhite : 'text-body'"
            >
            <i class="cursor-pointer fa fa-cog fixed-plugin-button-nav"></i>
          </a>
        </li>
          <li
          class="nav-item dropdown d-flex align-items-center"
            :class="this.$store.state.isRTL ? 'ps-2' : 'pe-2'"
          >
            <a
              href="#"
              class="p-0 nav-link"
              :class="[
                textWhite ? textWhite : 'text-body',
                showMenu ? 'show' : '',
              ]"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              @click="showMenu = !showMenu"
              >
              <i class="cursor-pointer fa fa-bell"></i>
            </a>
            <ul
              class="px-2 py-3 dropdown-menu dropdown-menu-end me-sm-n4"
              :class="showMenu ? 'show' : ''"
              aria-labelledby="dropdownMenuButton"
            >
              <li class="mb-2">
                <a class="dropdown-item border-radius-md" href="javascript:;">
                  <div class="py-1 d-flex">
                    <div class="my-auto">
                      <img
                        src="../../assets/img/team-2.jpg"
                        class="avatar avatar-sm me-3"
                        alt="user image"
                      />
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="mb-1 text-sm font-weight-normal">
                        <span class="font-weight-bold">New message</span> from
                        Laur
                      </h6>
                      <p class="mb-0 text-xs text-secondary">
                        <i class="fa fa-clock me-1"></i>
                        13 minutes ago
                      </p>
                    </div>
                  </div>
                </a>
              </li>
              <li class="mb-2">
                <a class="dropdown-item border-radius-md" href="javascript:;">
                  <div class="py-1 d-flex">
                    <div class="my-auto">
                      <img
                      src="../../assets/img/small-logos/logo-spotify.svg"
                      class="avatar avatar-sm bg-gradient-dark me-3"
                      alt="logo spotify"
                      />
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="mb-1 text-sm font-weight-normal">
                        <span class="font-weight-bold">New album</span> by
                        Travis Scott
                      </h6>
                      <p class="mb-0 text-xs text-secondary">
                        <i class="fa fa-clock me-1"></i>
                        1 day
                      </p>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a class="dropdown-item border-radius-md" href="javascript:;">
                  <div class="py-1 d-flex">
                    <div
                      class="my-auto avatar avatar-sm bg-gradient-secondary me-3"
                      >
                      <svg
                      width="12px"
                        height="12px"
                        viewBox="0 0 43 36"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        >
                        <title>credit-card</title>
                        <g
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                        >
                          <g
                            transform="translate(-2169.000000, -745.000000)"
                            fill="#FFFFFF"
                            fill-rule="nonzero"
                          >
                            <g transform="translate(1716.000000, 291.000000)">
                              <g transform="translate(453.000000, 454.000000)">
                                <path
                                class="color-background"
                                d="M43,10.7482083 L43,3.58333333 C43,1.60354167 41.3964583,0 39.4166667,0 L3.58333333,0 C1.60354167,0 0,1.60354167 0,3.58333333 L0,10.7482083 L43,10.7482083 Z"
                                opacity="0.593633743"
                                ></path>
                                <path
                                  class="color-background"
                                  d="M0,16.125 L0,32.25 C0,34.2297917 1.60354167,35.8333333 3.58333333,35.8333333 L39.4166667,35.8333333 C41.3964583,35.8333333 43,34.2297917 43,32.25 L43,16.125 L0,16.125 Z M19.7083333,26.875 L7.16666667,26.875 L7.16666667,23.2916667 L19.7083333,23.2916667 L19.7083333,26.875 Z M35.8333333,26.875 L28.6666667,26.875 L28.6666667,23.2916667 L35.8333333,23.2916667 L35.8333333,26.875 Z"
                                ></path>
                              </g>
                            </g>
                          </g>
                        </g>
                      </svg>
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="mb-1 text-sm font-weight-normal">
                        Payment successfully completed
                      </h6>
                      <p class="mb-0 text-xs text-secondary">
                        <i class="fa fa-clock me-1"></i>
                        2 days
                      </p>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </li>
          <li class="nav-item d-flex align-items-center">
            <div
              style="cursor: pointer"
              class="px-0 nav-link font-weight-bold"
              :class="textWhite ? textWhite : 'text-body'"
              >
              <template v-if="adminBoard">
              <router-link :to="{ name:'Admin Profile'}" class="nav-link" :class="textWhite ? textWhite : 'text-body'">
                <i style="font-size: 1.2rem;" class="mdi mdi-account"></i>
              </router-link>   
            </template>
            <template v-else>
              <router-link :to="{ name:'Profile' }" class="nav-link" :class="textWhite ? textWhite : 'text-body'">
                <i style="font-size: 1.2rem;" class="mdi mdi-account"></i>
              </router-link> 
            </template>
          </div>
          
        </li>
        <li class="nav-item d-flex align-items-center" @click="getLogout">
          <div
              style="cursor: pointer"
              class="px-0 nav-link font-weight-bold"
              :class="textWhite ? textWhite : 'text-body'"
              >
              <!-- <router-link
                :to="{ name: 'Sign In' }"
                
                > -->
                <i
                style="font-size: 1.2rem"
                class="mdi mdi-logout"
                :class="'me-sm-1'"
                ></i>
              </div>
              <!-- </router-link> -->
            </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import Breadcrumbs from "../Breadcrumbs.vue";
import { mapMutations, mapActions } from "vuex";
import SidenavCollapse from "../AdminSidenav/SidenavCollapse.vue";
import Swal from "sweetalert2";
import axios from "axios";
import setTooltip from "@/assets/js/tooltip.js";
import setNavPills from "@/assets/js/nav-pills.js";


export default {
  name: "navbar",
  mounted(){
    setNavPills();
    this.$store.state.isAbsolute = true;
    setTooltip(this.$store.state.bootstrap);
    window.addEventListener("popstate", this.handlePopstate);
    this.isAdmin(); 

  },
  data() {
    return {
      showMenu: false,
      adminBoard:null,
    };
  },
  components: {
    SidenavCollapse,
  },
  props: ["minNav", "textWhite"],
  created() {
    this.minNav;
  },
  beforeUnmount() {
    this.$store.state.isAbsolute = false;
    window.removeEventListener("popstate", this.handlePopstate);
  },

  methods: {
    ...mapMutations(["navbarMinimize", "toggleConfigurator"]),
    ...mapActions(["toggleSidebarColor"]),

    toggleSidebar() {
      console.log("Toggling sidebar...");
      this.toggleSidebarColor("bg-white");
      this.navbarMinimize();
    },
    isAdmin() {
      const templte =this.$store.getters.getTemplets;
      if(templte =='user'){
        this.adminBoard =false;
      }else{
        this.adminBoard=true;
      }
      console.log("adminBoard",this.adminBoard);
    },

 
    async getLogout() {
      const confirmed = await Swal.fire({
        title: "Are you sure you want to logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#5FC0FF",
        cancelButtonColor: "#C72E2E",
        confirmButtonText: "Yes, logout",
        timer: 2000,
        timerProgressBar: true,
      });

      if (confirmed.isConfirmed) {
        this.putLogout();
      }
    },

    async putLogout() {
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      console.log("token", this.$store.getters.getUserToken);
      console.log("userid", this.$store.getters.getUserId);
      console.log("templete", this.$store.getters.getTemplets);
      const templete = this.$store.getters.getTemplets;

      await axios
        .delete(
          `http://localhost:61050/dms/access/logout/${this.$store.getters.getUserId}`,
          {
            headers: {
              token: this.$store.getters.getUserToken,
            },
          }
        )
        .then(() => {
          setTimeout(() => {
            if (templete === "user") {
              this.$router.push({ name: "Sign In" });
            } else {
              this.$router.push({ name: "AdminSign In" });
            }
          }, 500);
        })
        .catch((error) => console.error("Error occured by", error));
    },
  },
  components: {
    Breadcrumbs,
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
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
</style>
