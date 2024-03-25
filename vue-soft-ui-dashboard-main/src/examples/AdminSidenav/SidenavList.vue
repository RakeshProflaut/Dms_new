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
      >{{ item.navText }}</span
    >
        </router-link >
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "SidenavList",
  data() {
    return {
      title: "Soft UI Dashboard PRO",
      controls: "dashboardsExamples",
      isActive: "active",
      sidenavItems: [
        { navText: 'User Information', to: { name: 'User Information' }, icon:'mdi mdi-account' },
        { navText: 'Group Information', to: { name: 'Group Information' }, icon: 'mdi mdi-account-group' },
        { navText: 'Meta Data', to: { name: 'Meta Data' }, icon: 'mdi mdi-file-document' },
        { navText: 'Access Rights', to: { name: 'Access Rights' }, icon: 'mdi mdi-lock' },
        { navText: 'Licence Management', to: { name: 'Licence Management' }, icon: 'mdi mdi-key-variant' },
        { navText: 'Worlflow Management', to: { name: 'Worlflow Management' }, icon: 'mdi mdi-cog-sync' },
        { navText: 'CKYC', to: { name: 'CKYC' }, icon: 'mdi mdi-account-check' },
        { navText: 'DC-DR Configuration', to: { name: 'DCDR Configure' }, icon: 'mdi mdi-server-network' },
        { navText: 'Digital Signature', to: { name: 'Digital Signature' }, icon: "mdi mdi-draw" },
        { navText: 'Mount Points', to: { name: 'Mount Points' }, icon: 'mdi mdi-usb-flash-drive' }
      ],
      activeTab: null    
    };
  },
 
  created() {
    // Set the activeTab to the name of the "User Information" tab
    this.activeTab = 'User Information';
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
          backgroundColor: '#fff',
          fontWeight: '600',
          boxShadow: '0 20px 27px 0 rgba(0, 0, 0, 0.05)',
          borderRadius: '0.5rem',
          color: '#55B6F6'
        };
      }
      return {}; // Return empty object for non-active items
    }
  },
};
</script>

<style scoped>
.navbar-vertical.navbar-expand-xs .navbar-nav > .nav-item:hover {
  color: #344767;
}

.nav-link:hover >div{
  background: #55B6F6 !important;
}

.nav-link:hover i{
  color: white !important;
}

.navbar-vertical .navbar-nav .nav-link:hover {
  background-color: #fff;
    font-weight: 600;
    box-shadow: 0 20px 27px 0 rgba(0, 0, 0, 0.05);
    border-radius: 0.5rem;
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
  background: #9cccca; /* color of the handle */
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #d2d6da; /* color of the handle on hover */
}



</style>