<template>
    <div
         class="sidebarContainer"
    id="sidenav-main" style="margin-bottom: 0 !important;"
  >
    <div class="sidenav-header" style="padding-left: 3.7rem;
    padding-top: 2.2rem;">
        <span style="font-size: 19px;" class="ms-1 font-weight-bold">Actions</span>
    </div>
    <hr class="mt-0 horizontal dark" />
      <div class="sidebar">   
        <div v-for="(tab, index) in tabs" :key="index" class="sidebar-link" :class="{ 'sidebar-link': true, 'active': activeTab === tab.name }" @click="setActiveTab(tab.name)">
          {{ tab.name }}
        </div>
      </div>      
    </div>
</template>

<script>
export default {
  name:'docTab',
  data() {
    return {
      sidebarOpen: false,
      tabs: [
        { name: 'Edit Pdf', route: '/tab1' },
        { name: 'Remove Watermark', route: '/tab2' },
        { name: 'Tab 3', route: '/tab3' },
        { name: 'Tab 4', route: '/tab4' },
        { name: 'Tab 5', route: '/tab5' }
      ],
      activeTab: null
    };
  },
  methods: {
    setActiveTab(tabName) {
      this.activeTab = tabName;
    }
  }

};
</script>

<style>

.sidebarContainer{
  transition: width 0.3s ease;
  width: 80%;
  margin: 15% 15%;
  box-shadow: 0 20px 27px 0 rgba(0, 0, 0, 0.05);
  background: #694242;
  height: 95%;
    box-shadow: none;
    border-width: 0 !important;
    border-style: solid !important;
    border-color: rgba(var(--v-border-color), var(--v-border-opacity)) !important;
    margin-inline-start: 12px !important;
    margin-top: 12px !important;
    margin-bottom: 12px !important;
    background-color: #FFFFFF !important;
    color: #000000 !important;
    transition: all 0.2s ease-in-out;
        border-radius: 1rem;
}

.sidebar{
  margin-left:4%;
  height: 11rem;
  overflow:auto !important;
}




.sidebar-header {
  padding: 10px;
  font-size: 1.5rem;
  font-weight: bold;
}

.sidebar-toggle-btn {
  background: none;
  border: none;
  color: #67748e;
  font-size: 1.5rem;
  cursor: pointer;
  display: block;
  margin-left: auto;
}

.sidebar-link {
  display: block;
  padding: 10px;
  color: #67748e;
  text-decoration: none;
  transition: padding-left 0.3s ease;
}
.sidebar-link.active {
  background-color: #fff;
  font-weight: 600;
  box-shadow: 0 20px 27px 0 rgba(0, 0, 0, 0.05);
  border-radius: 0.5rem;
  color: #53CA33;
}

.sidebar-link:hover {  
    background-color: #fff;
    font-weight: 600;
    box-shadow: 0 20px 27px 0 rgba(0, 0, 0, 0.05);
    border-radius: 0.5rem;
    color:#53CA33
}

/* Main content styles */
.content {
  margin-left: 200px; /* Adjust this value according to sidebar width */
  transition: margin-left 0.3s ease;
}

@media (max-width: 768px) {
  .content {
    margin-left: 50px; /* Adjust this value according to collapsed sidebar width */
  }
  
  .sidebar-link {
    padding-left: 20px; /* Adjust this value according to collapsed sidebar width */
  }
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
  background: #5cc06e; /* color of the handle */
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #5cc06e; /* color of the handle on hover */
}
</style>
