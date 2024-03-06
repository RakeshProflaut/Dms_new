<!-- <template>
  <div
    class="w-auto h-auto collapse navbar-collapse max-height-vh-100"
    id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">
      <li class="nav-item">
        <sidenav-collapse navText="User Information" :to="{ name: 'User Information' }">
          <template #icon>
            <shop />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Group Information" :to="{ name: 'Group Information' }">
          <template #icon>
            <document />
          </template>
        </sidenav-collapse>
      </li>      
      <li class="nav-item">
        <sidenav-collapse navText="Meta Data" :to="{name: 'Meta Data'}">
          <template #icon>
            <document/>
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Access Rights" :to="{name: 'Access Rights'}">
          <template #icon>
            <document/>
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Licence Management" :to="{ name: 'Licence Management' }">
          <template #icon>
            <document />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Worlflow Management" :to="{ name: 'Worlflow Management' }">
          <template #icon>
            <document />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="CKYC" :to="{ name: 'CKYC' }">
          <template #icon>
            <document />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="DC-DR Configure" :to="{ name: 'DCDR Configure' }">
          <template #icon>
            <document />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Digital Signature" :to="{ name: 'Digital Signature' }">
          <template #icon>
            <document />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Mount Points" :to="{ name:'Mount Points'}">
          <template #icon>
            <document />
          </template>
        </sidenav-collapse>
      </li>    
    </ul>
  </div>

</template> -->

<template>
  <div class="w-auto h-auto collapse navbar-collapse max-height-vh-100" id="sidenav-collapse-main">
    <ul class="navbar-nav">
      <li class="nav-item" v-for="(item, index) in sidenavItems" :key="index">
        <sidenav-collapse :navText="item.navText" :to="item.to" :active="activeTab === item.to.name" @click="setActiveTab(item.to.name)"
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
import Shop from "../../components/Icon/Shop.vue";
import Office from "../../components/Icon/Office.vue";
import CreditCard from "../../components/Icon/CreditCard.vue";
import CustomerSupport from "../../components/Icon/CustomerSupport.vue";
import Document from "../../components/Icon/Document.vue";
import Spaceship from "../../components/Icon/Spaceship.vue";

export default {
  name: "SidenavList",
  data() {
    return {
      title: "Soft UI Dashboard PRO",
      controls: "dashboardsExamples",
      isActive: "active",
      sidenavItems: [
        { navText: 'User Information', to: { name: 'User Information' }, icon: Shop },
        { navText: 'Group Information', to: { name: 'Group Information' }, icon: Document },
        { navText: 'Meta Data', to: { name: 'Meta Data' }, icon: Document },
        { navText: 'Access Rights', to: { name: 'Access Rights' }, icon: Document },
        { navText: 'Licence Management', to: { name: 'Licence Management' }, icon: Document },
        { navText: 'Worlflow Management', to: { name: 'Worlflow Management' }, icon: Document },
        { navText: 'CKYC', to: { name: 'CKYC' }, icon: Document },
        { navText: 'DC-DR Configuration', to: { name: 'DCDR Configure' }, icon: Document },
        { navText: 'Digital Signature', to: { name: 'Digital Signature' }, icon: Document },
        { navText: 'Mount Points', to: { name: 'Mount Points' }, icon: Document }
      ],
      activeTab: null    
    };
  },
  components: {
    SidenavCollapse,
    // SidenavCard,
    Shop,
    Office,
    CreditCard,
    // Box3d,
    CustomerSupport,
    Document,
    Spaceship,
    // Settings,
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