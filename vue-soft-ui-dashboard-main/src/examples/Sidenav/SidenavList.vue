<!-- <template>
  <div
    class="w-auto h-auto collapse navbar-collapse max-height-vh-100"
    id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">
      <li class="nav-item">
        <sidenav-collapse navText="Dashboard" :to="{ name: 'Dashboard' }">
          <template #icon>
            <shop />
          </template>
        </sidenav-collapse>
      </li>
    
      <li class="nav-item">
        <sidenav-collapse navText="Directory" :to="{ name: 'Folders' }">
          <template #icon>
            <document />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Search" :to="{ name: 'Search' }">
          <template #icon>
            <document />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Portal" :to="{ name: 'Portal' }">
          <template #icon>
            <document />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Image Upscaling" :to="{ name: 'Image Upscaling' }">
          <template #icon>
            <document />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Ocr" :to="{ name: 'Ocr' }">
          <template #icon>
            <document />
          </template>
        </sidenav-collapse>
      </li>
    </ul>
  </div>
  
</template> -->

<template>
  <div
    class="w-auto h-auto collapse navbar-collapse max-height-vh-100"
    id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">
      <li class="nav-item" v-for="(item, index) in sidenavItems" :key="index">
        <sidenav-collapse
          :navText="item.text"
          :to="item.to"
          :active="activeTab === item.text"
          @click="setActiveTab(item.text)"
          :style="getActiveStyle(item)"
        >
          <template #icon>
            <component :is="item.icon" />
          </template>
        </sidenav-collapse>
      </li>
    </ul>
  </div>
</template>
<script>
import SidenavCollapse from "./SidenavCollapse.vue";
// import SidenavCard from "./SidenavCard.vue";
import Shop from "../../components/Icon/Shop.vue";
import Office from "../../components/Icon/Office.vue";
import CreditCard from "../../components/Icon/CreditCard.vue";
// import Box3d from "../../components/Icon/Box3d.vue";
import CustomerSupport from "../../components/Icon/CustomerSupport.vue";
import Document from "../../components/Icon/Document.vue";
import Spaceship from "../../components/Icon/Spaceship.vue";
import Search from "../../components/Icon/Search.vue";
import ImageUpscale from "../../components/Icon/ImageUpscale.vue";
import Ocr from "../../components/Icon/Ocr.vue";


// import Settings from "../../components/Icon/Settings.vue";

export default {
  name: "SidenavList",
  props: {
    cardBg: String,
  },
  data() {
    return {
      isActive: "active",
      sidenavItems: [
        { text: "Dashboard", to: { name: "Dashboard" }, icon: Shop },
        { text: "Directory", to: { name: "Folders" }, icon: Office },
        { text: "Search", to: { name: "Search" }, icon: Search },
        { text: "Portal", to: { name: "Portal" }, icon: CustomerSupport },
        {
          text: "Image Upscaling",
          to: { name: "Image Upscaling" },
          icon: ImageUpscale,
        },
        { text: "OCR", to: { name: "Ocr" }, icon: Ocr },
      ],
      activeTab: null,
    };
  },
  created() {
    // Set the activeTab to the name of the "User Information" tab
    this.activeTab = "Dashboard";
  },
  components: {
    SidenavCollapse,
    // SidenavCard,
    Shop,
    Office,
    Search,
    CreditCard,
    // Box3d,
    CustomerSupport,
    Ocr,
    Document,
    ImageUpscale,
    Spaceship,
    // Settings,
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
      if (this.activeTab === item.text) {
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

.navbar-vertical .navbar-nav .nav-link:hover {
  background-color: #fff;
  font-weight: 600;
  box-shadow: 0 20px 27px 0 rgba(0, 0, 0, 0.05);
  border-radius: 0.5rem;
}
</style>
