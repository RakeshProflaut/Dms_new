<template>
  <div>
    <div class="mt-3 row"></div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card" style="height: 510px !important">
            <div
              v-for="(rowIcons, rowIndex) in iconRows"
              :key="rowIndex"
              style="padding: 1rem 1rem 0 0.8rem"
              class="row"
            >
              <!-- Loop through each row's icons -->
              <div v-for="(icon, index) in rowIcons" :key="index" class="col-3">
                <div class="iconContainer">
                  <router-link :to="icon.route">
                    <div class="icons" @click="setActiveTab(icon.title)">
                      <i :class="icon.class"></i>
                    </div>
                  </router-link>
                  <h5 class="mt-3">{{ icon.title }}</h5>
                  <p>{{ icon.subtitle }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import setTooltip from '@/assets/js/tooltip.js'
import setNavPills from '@/assets/js/nav-pills.js'
export default {
  name: 'Home',
  data() {
    return {
      icons: [
        {
          class: 'mdi mdi-folder',
          title: 'Browse',
          route: '/browse',
          subtitle: 'Browse your Files/Folder',
        },
        {
          class: 'mdi mdi-magnify',
          title: 'Search',
          route: '/search',
          subtitle: 'Search uploaded Files/Folder',
        },
        {
          class: 'mdi mdi-cog',
          title: 'Admin',
          route: '/admin',
          subtitle: 'Manage user & group Metadata Definition',
        },
        {
          class: 'mdi mdi-history',
          title: 'Recent',
          route: '/recent',
          subtitle: 'Show recently opened Folders and Documents',
        },
        {
          class: 'mdi mdi-bookmark-outline',
          title: 'Bookmark',
          route: '/bookmark',
          subtitle: 'Show Bookmarked Folders and Documents',
        },
        {
          class: 'mdi mdi-recycle',
          title: 'Recycle Bin',
          route: '/recycleBin',
          subtitle: 'Show Recycled Documents',
        },
        {
          class: 'mdi mdi-share',
          title: 'Shared docs to you',
          route: '/sharedToYou',
          subtitle: 'Show Shared Documents to You',
        },
        {
          class: 'mdi mdi-share',
          title: 'Shared docs by you',
          route: '/sharedByYou',
          subtitle: 'Show Shared Documents by You',
        },
        // Add more icons as needed
      ],
    }
  },
  computed: {
    // Compute icon rows with 4 icons each
    iconRows() {
      const rows = []
      const chunkSize = 4 // Number of icons per row
      for (let i = 0; i < this.icons.length; i += chunkSize) {
        rows.push(this.icons.slice(i, i + chunkSize))
      }
      return rows
    },
  },
  mounted() {
    this.$store.state.isAbsolute = true
    setNavPills()
    setTooltip(this.$store.state.bootstrap)
  },
  methods: {
    setActiveTab(tabName) {
      this.$store.commit('setActiveTab', tabName)
    },
  },
}
</script>

<style scoped>
.min-height-300 {
  min-height: 75px !important;
}

.card .card-header {
  padding: 0.5rem !important;
}

.iconContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.icons {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #2c792c;
  height: 6rem;
  width: 6rem;
  transition:
    transform 0.3s ease-in-out,
    box-shadow 0.3s ease-in-out; /* Add box-shadow transition */
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); /* Add box shadow */
}

.icons:hover {
  cursor: pointer;
  transform: scale(1.2);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.6); /* Change box shadow on hover */
}

.icons > i {
  font-size: 3rem;
  color: #fff;
}
.iconContainer > p {
  font-size: 15px;
  text-align: center;
}
</style>
