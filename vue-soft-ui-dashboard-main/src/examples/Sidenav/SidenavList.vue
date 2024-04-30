<template>
  <div
    class="w-auto h-auto collapse navbar-collapse max-height-vh-100"
    id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">
      <li class="nav-item" v-for="(item, index) in sidenavItems" :key="index">
        <router-link
          class="nav-link"
          :to="item.to"
          @click="setActiveTab(item.to.name)"
          :style="getActiveStyle(item)"
        >
          <div
            class="text-center bg-white shadow icon icon-shape icon-sm border-radius-md d-flex align-items-center justify-content-center"
            :class="this.$store.state.isRTL ? ' ms-2' : 'me-2'"
          >
            <i style="color: #3a416f; font-size: 1.2rem" :class="item.icon"></i>
          </div>
          <span
            class="nav-link-text text-uppercase"
            :class="this.$store.state.isRTL ? ' me-1' : 'ms-1'"
            >{{ item.text }}</span
          >
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SidenavList',
  props: {
    cardBg: String,
  },
  data() {
    return {
      isActive: 'active',
      sidenavItems: [
        {
          text: 'Home',
          to: { name: 'Home' },
          icon: 'mdi mdi-home',
        },
        {
          text: 'Dashboard',
          to: { name: 'Dashboard' },
          icon: 'mdi mdi-view-dashboard',
        },
        { text: 'Directory', to: { name: 'Folders' }, icon: 'mdi mdi-folder' },
        { text: 'Browse', to: { name: 'Browse' }, icon: 'mdi mdi-folder' },
        { text: 'Search', to: { name: 'Search' }, icon: 'mdi mdi-magnify' },
        { text: 'Admin', to: { name: 'Admin' }, icon: 'mdi mdi-cog' },
        { text: 'Recent', to: { name: 'Recent' }, icon: 'mdi mdi-history' },
        {
          text: 'Bookmark',
          to: { name: 'Bookmark' },
          icon: 'mdi mdi-bookmark-outline',
        },
        {
          text: 'Recycle Bin',
          to: { name: 'RecycleBin' },
          icon: 'mdi mdi-recycle',
        },
        {
          text: 'Shared To you',
          to: { name: 'SharedToYou' },
          icon: 'mdi mdi-share',
        },
        {
          text: 'Shared By you',
          to: { name: 'SharedByYou' },
          icon: 'mdi mdi-share',
        },
      ],
      activeTab: null,
    }
  },
  created() {
    // Set the activeTab to the name of the "Home" tab by default
    this.activeTab = 'Home'
  },
  computed: {
    // Compute activeTab from Vuex store
    activeTab() {
      return this.$store.state.activeTab
    },
  },
  methods: {
    setActiveTab(tabName) {
      // Update activeTab when a tab is clicked
      this.activeTab = tabName
    },
    getActiveStyle(item) {
      // Apply style for active tab
      if (this.activeTab === item.to.name) {
        return {
          backgroundColor: '#fff',
          fontWeight: '600',
          boxShadow: '0 20px 27px 0 rgba(0, 0, 0, 0.05)',
          borderRadius: '0.5rem',
          color: '#53CA33',
        }
      }
      return {} // Return empty object for non-active items
    },
  },
}
</script>

<style scoped>
.navbar-vertical.navbar-expand-xs .navbar-nav > .nav-item:hover {
  color: #344767;
}

.nav-link:hover > div {
  background-image: linear-gradient(
    310deg,
    #82d616 0%,
    #82d616 360%
  ) !important;
}

.nav-link:hover i {
  color: #fff !important;
}

.navbar-vertical .navbar-nav .nav-link:hover {
  background-color: #fff;
  font-weight: 600;
  box-shadow: 0 20px 27px 0 rgba(0, 0, 0, 0.05);
  border-radius: 0.5rem;
}
</style>
