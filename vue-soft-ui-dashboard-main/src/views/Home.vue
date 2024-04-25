<template>
  <div>
    <div class="mt-3 row"></div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card" style="height: 510px !important">
            <div style="display: flex; justify-content: space-between">
              <div class="card-header text-uppercase">
                <h4>Image UpScaling</h4>
              </div>
            </div>
            <!-- Loop through icons and create rows of 4 columns each -->
            <div
              v-for="(rowIcons, rowIndex) in iconRows"
              :key="rowIndex"
              style="padding: 0 1rem 0 0.8rem"
              class="row"
            >
              <!-- Loop through each row's icons -->
              <div v-for="(icon, index) in rowIcons" :key="index" class="col-3">
                <div class="iconContainer">
                  <div class="icons">
                    <i :class="icon.class"></i>
                  </div>
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
          title: 'Browser',
          subtitle: 'Browser your Files/Folder',
        },
        {
          class: 'mdi mdi-magnify',
          title: 'Search',
          subtitle: 'Search uploaded Files/Folder',
        },
        {
          class: 'mdi mdi-cog',
          title: 'Admin',
          subtitle: 'Manage user & group Metadata Definition',
        },
        {
          class: 'mdi mdi-history',
          title: 'Recent',
          subtitle: 'Show recently opened Folders and Documents',
        },
        {
          class: 'mdi mdi-bookmark-outline',
          title: 'Bookmark',
          subtitle: 'Show Bookmarked Folders and Documents',
        },
        {
          class: 'mdi mdi-recycle',
          title: 'Recycle Bin',
          subtitle: 'Show Recycled Documents',
        },
        {
          class: 'mdi mdi-share',
          title: 'Shared docs to you',
          subtitle: 'Show Shared Documents to You',
        },
        {
          class: 'mdi mdi-share',
          title: 'Shared docs by you',
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
  border-radius: 50%;
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
