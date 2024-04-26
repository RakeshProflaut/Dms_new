<template>
  <div>
    <div class="mt-3 row"></div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card" style="height: 510px !important">
            <div class="card-header text-uppercase">
              <h5>Browse your bookmarked Files/Folder</h5>
            </div>
            <div style="display: flex; justify-content: space-between">
              <div class="search-container">
                <v-text-field
                  v-model="searchQuery"
                  label="Search"
                  variant="outlined"
                  dense
                  hide-details
                  filled
                  class="search-input"
                ></v-text-field>
              </div>
              <div class="filterDropDown">
                <v-select
                  v-model="selectedFilter"
                  :items="filterOptions"
                  label="Filter"
                  variant="outlined"
                  dense
                  hide-details
                  filled
                  class="filter-select"
                ></v-select>
              </div>
            </div>

            <div class="card-body px-0 pt-0 pb-2">
              <div class="table-responsive p-0">
                <div class="tableContaier">
                  <table class="table align-items-center mb-0">
                    <thead class="table-header">
                      <tr>
                        <th
                          style="font-size: 0.7rem !important; text-align: left"
                          v-for="header in headers"
                          :key="header.key"
                          class="text-uppercase text-secondary text-xs font-weight-bolder opacity-10"
                        >
                          {{ header.title }}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        style="font-size: 0.9rem !important"
                        v-for="(data, rowIndex) in displayedData"
                        :key="rowIndex"
                      >
                        <td
                          v-for="(header, index) in headers"
                          :key="index"
                          :class="{
                            'pl-5': header.key !== 'write',
                            'font-weight-bolder text-uppercase':
                              header.key === 'fileName',
                          }"
                          style="text-align: left"
                        >
                          <template v-if="header.key === 'sno'">
                            {{ rowIndex + 1 }}
                          </template>
                          <template v-else>
                            {{ data[header.key] }}
                          </template>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <v-pagination
                    v-model="page"
                    :length="pages"
                    @input="updateDisplayedData"
                  ></v-pagination>
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
import axios from 'axios'
export default {
  name: 'Bookmark',
  data() {
    return {
      selectedFilter: 'Files',
      filterOptions: ['Files', 'Folders'],
      headers: [
        {
          key: 'sno',
          title: 'S.No',
        },
        {
          key: 'name',
          title: 'Name',
        },
        {
          key: 'size',
          title: 'Size',
        },
        {
          key: 'bookmarkedBy',
          title: 'Modified By',
        },
        {
          key: 'bookmarkDateAndTime',
          title: 'Modified On',
        },
      ],
      page: 1, // Current page
      itemsPerPage: 10, // Number of items per page
      bookmarkDetails: [],
      searchQuery: '',
    }
  },

  mounted() {
    this.$store.state.isAbsolute = true
    setNavPills()
    setTooltip(this.$store.state.bootstrap)
    this.getBookMarkData()
  },
  watch: {
    selectedFilter() {
      this.getBookMarkData()
    },
    searchQuery(newValue) {
      this.filterDisplayedData(newValue)
    },
  },
  computed: {
    displayedData() {
      const start = (this.page - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage

      return this.bookmarkDetails.slice(start, end)
    },
    pages() {
      return Math.ceil(this.bookmarkDetails.length / this.itemsPerPage)
    },
  },
  methods: {
    async getBookMarkData() {
      const apiUrl = 'http://localhost:61050/dms/home/getAllFilesAndFolders'
      const token = this.$store.getters.getUserToken

      await axios
        .get(apiUrl, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          console.log('API response:', response.data) // Log the response

          if (this.selectedFilter === 'Files') {
            this.bookmarkDetails = response.data.files
          } else if (this.selectedFilter === 'Folders') {
            this.bookmarkDetails = response.data.folders
          }
        })
        .catch((error) => console.log('Error occurred:', error))
    },

    filterDisplayedData(query) {
      console.log('Search Query:', query) // Log the search query
      // Filter the data based on the search query
      this.bookmarkDetails = this.bookmarkDetails.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      )
      console.log('displayedData :', this.displayedData)
    },

    updateDisplayedData() {
      // Your logic to update displayed data based on the new page number
      const start = (this.page - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      this.displayedData = this.bookmarkDetails.slice(start, end)
    },
  },
}
</script>

<style scoped>
* {
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Open Sans',
    'Helvetica Neue',
    sans-serif;
}
.min-height-300 {
  min-height: 75px !important;
}

.card .card-header {
  padding: 0.5rem !important;
}
.filterDropDown {
  display: flex;
  align-items: center;
}

.filterDropDown > * {
  margin-right: 10px;
}

.filter-select {
  width: 13rem; /* Adjust the width as needed */
}
.search-container {
  display: flex;
  align-items: center;
}

.search-input {
  width: 300px; /* Adjust the width as needed */
}

.search-container {
  display: flex;
  margin: 1% 0px;
  margin-left: 1%;
}
.search-container > .v-btn {
  margin-left: 0.5rem;
  background-image: linear-gradient(
    310deg,
    #82d616 0%,
    #82d616 360%
  ) !important;
  transition: 0.5s ease;
  font-weight: bold;
  color: #fff;
  font-weight: bold;
  font-size: 0.7rem !important;
  height: 2rem !important;
}
.search-container > .v-btn:hover {
  cursor: pointer;
}

.table-responsive {
  display: flex;
  flex-direction: column;
}

.tableContaier {
  position: relative;
  height: 330px;
  overflow-x: auto;
}

.table-header {
  position: sticky;
  top: 0;
  z-index: 1;
  background: #fff;
}
</style>
