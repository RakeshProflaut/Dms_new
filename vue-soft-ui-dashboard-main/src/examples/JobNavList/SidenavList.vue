<template>
  <div
    class="w-auto h-auto collapse navbar-collapse max-height-vh-100"
    id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">
      <li class="nav-item" v-for="(item, index) in sidenavItems" :key="index">
        <router-link
          class="nav-link"
          :to="{ name: 'JobPackCreation', params: { formId: item.formName.toLowerCase().replace(/\s+/g, '-') } }"
          :active="activeTab === item.formName"
          @click="setActiveTab(item.formName)"
          :style="getActiveStyle(item)"
        >
          <div
            class="text-center bg-white shadow icon icon-shape icon-sm border-radius-md d-flex align-items-center justify-content-center"
            :class="$store.state.isRTL ? ' ms-2' : 'me-2'"
          >
            <i style="color: #3a416f; font-size: 1.2rem" :class="item.icon"></i>
          </div>
          <span
            class="nav-link-text text-uppercase"
            :class="$store.state.isRTL ? ' me-1' : 'ms-1'"
          >
            {{ item.formName }}
          </span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SidenavList",
  computed: {
    ...mapGetters(["getFormData"]),
    formData() {
      return this.getFormData;
    }
  },
  data() {
    return {
      title: "Soft UI Dashboard PRO",
      controls: "dashboardsExamples",
      isActive: "active",
      sidenavItems: [],
      activeTab: null,
    };
  },

  created() {
    // Populate sidenavItems with form names
    this.sidenavItems = this.formData.map(item => ({
      formName:item.formName,
      icon:"mdi mdi-file-certificate", // You can set a default icon here
    }));
    this.activeTab = this.sidenavItems[0] ? this.sidenavItems[0].formName : null;
  },
  methods: {
    setActiveTab(tabName) {
      this.activeTab = tabName;
    },
    getActiveStyle(item) {
      if (this.activeTab === item.formName) {
        return {
          backgroundColor: "#fff",
          fontWeight: "600",
          boxShadow: "0 20px 27px 0 rgba(0, 0, 0, 0.05)",
          borderRadius: "0.5rem",
          color: "#55B6F6",
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

.nav-link:hover > div {
  background: #55b6f6 !important;
}

.nav-link:hover i {
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
