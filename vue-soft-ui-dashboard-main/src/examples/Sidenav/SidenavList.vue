<template>
  <div class="w-auto h-auto collapse navbar-collapse max-height-vh-100" id="sidenav-collapse-main">
    <ul class="navbar-nav">
      <li class="nav-item" v-for="(item, index) in sidenavItems" :key="index">
        <router-link class="nav-link"       
         :to="item.to"
         :active="activeTab === item.to.name"
         @click="setActiveTab(item.to.name)"
         :style="getActiveStyle(item)"
        >
        <div
      class="text-center bg-white shadow icon icon-shape icon-sm border-radius-md d-flex align-items-center justify-content-center"
      :class="this.$store.state.isRTL ? ' ms-2' : 'me-2'"
    >
        <i style="color: #3A416F;font-size: 1.2rem;" :class="item.icon"></i>
    </div>
    <span
      class="nav-link-text text-uppercase"
      :class="this.$store.state.isRTL ? ' me-1' : 'ms-1'"
      >{{ item.text }}</span
    >
        </router-link >
      </li>
    </ul>
  </div>
</template>
<script>


export default {
  name: "SidenavList",
  props:{
    cardBg:String,
  },
  data(){
    return {
      isActive: "active",
      sidenavItems: [
        { text: "Dashboard", to: { name: "Dashboard" }, icon: "mdi mdi-view-dashboard" },
        { text: "Directory", to: { name: "Folders" }, icon: "mdi mdi-folder" },
        { text: "Search", to: { name: "Search" }, icon: "mdi mdi-magnify" },
        { text: "Scanner", to: { name: "Scanner" }, icon: 'mdi mdi-scanner'},
        {
          text: "Image Upscaling",
          to: { name: "Image Upscaling" },
          icon: "mdi mdi-image-filter-center-focus",
        },
        { text: "Job Pack Generation",to: { name: "JobPack" },icon:'mdi mdi-file-table-box-multiple'},
        { text: "OCR", to: { name: "Ocr" }, icon: 'mdi mdi-text-recognition' },
        { text: "Portal", to: { name: "Portal" }, icon: 'mdi mdi-door' }, 
      ],
      activeTab: null,
    };
  },
  created() {
    // Set the activeTab to the name of the "User Information" tab
    this.activeTab = "Dashboard";
  },

  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    },

    setActiveTab(tabName) {
      this.activeTab = tabName;
    },
    getActiveStyle(item) {
      if (this.activeTab === item.to.name) {
        return {
          backgroundColor: "#fff",
          fontWeight: "600",
          boxShadow: "0 20px 27px 0 rgba(0, 0, 0, 0.05)",
          borderRadius: "0.5rem",
          color: "#53CA33",
        };
      }
      return {}; // Return empty object for non-active items
    },
  },
};
</script>

<style scoped>
.navbar-vertical.navbar-expand-xs .navbar-nav > .nav-item:hover {
  color: #344767;
}

.nav-link:hover >div{
  background-image: linear-gradient(310deg, #82d616 0%, #82d616 360%) !important;
}

.nav-link:hover i{
  color: #fff !important;
}

.navbar-vertical .navbar-nav .nav-link:hover {
  background-color: #fff;
  font-weight: 600;
  box-shadow: 0 20px 27px 0 rgba(0, 0, 0, 0.05);
  border-radius: 0.5rem;
}
</style>
