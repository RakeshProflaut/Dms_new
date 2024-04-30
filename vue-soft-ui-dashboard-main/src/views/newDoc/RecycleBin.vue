<template>
  <div>
    <div class="mt-3 row"></div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card" style="height: 510px !important">
            <div class="card-header text-uppercase">
              <h5>Recycle Bin</h5>
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
                          style="font-size: 0.7rem !important"
                          v-for="header in headers"
                          :key="header.key"
                          class="text-uppercase text-secondary text-xs font-weight-bolder opacity-10"
                          :style="{
                            'text-align':
                              header.key === 'options' ? 'center' : 'left',
                          }"
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
                            'pl-5': header.key !== 'options',
                            'font-weight-bolder text-uppercase':
                              header.key === 'folderName',
                          }"
                          :style="{
                            'text-align':
                              header.key === 'options' ? 'center' : 'left',
                          }"
                        >
                          <template v-if="header.key == 'options'">
                            <v-menu
                              v-model="menus[rowIndex]"
                              :close-on-content-click="false"
                            >
                              <template v-slot:activator="{ props }">
                                <div v-bind="props">
                                  <i
                                    class="mdi mdi-dots-vertical"
                                    style="
                                      font-size: 1.8rem;
                                      cursor: pointer;
                                      color: #234375;
                                    "
                                  ></i>
                                </div>
                              </template>
                              <v-card min-width="200">
                                <v-list>
                                  <v-list-item
                                    title="Restore"
                                    @click="restoreData(data)"
                                  >
                                    <template v-slot:append>
                                      <i
                                        class="mdi mdi-restore"
                                        style="
                                          font-size: 1.8rem;
                                          cursor: pointer;
                                          color: #234375;
                                        "
                                      ></i>
                                    </template>
                                  </v-list-item>
                                  <v-list-item
                                    title="Delete"
                                    @click="deleteData(data)"
                                  >
                                    <template v-slot:append>
                                      <i
                                        :class="[
                                          'mdi',
                                          data.bookmark === 'YES'
                                            ? 'mdi-delete'
                                            : 'mdi-delete-outline',
                                        ]"
                                        style="
                                          font-size: 1.8rem;
                                          cursor: pointer;
                                          color: red;
                                        "
                                      ></i>
                                    </template>
                                  </v-list-item>
                                </v-list>
                              </v-card>
                            </v-menu>

                            <!-- <div
                              style="height: 2.5rem !important"
                              @click="toggleBookmark(data)"
                            >
                              <i
                                :class="[
                                  'mdi',
                                  data.bookmark === 'YES'
                                    ? 'mdi-bookmark'
                                    : 'mdi-bookmark-outline',
                                ]"
                                style="
                                  font-size: 1.8rem;
                                  cursor: pointer;
                                  color: #234375;
                                "
                              ></i>
                            </div> -->
                          </template>

                          <template v-else-if="header.key === 'sno'">
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
import Swal from 'sweetalert2'

export default {
  name: 'Recycle',
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
          title: ' NAME',
        },
        {
          key: 'createdBy',
          title: 'CREATED BY',
        },
        {
          key: 'createdAt',
          title: 'CREATED AT',
        },

        {
          key: 'options',
          title: 'Options',
        },
      ],
      page: 1, // Current page
      itemsPerPage: 10, // Number of items per page
      deletedFiles: [],
      searchQuery: '',
      menus: [],
    }
  },

  mounted() {
    this.$store.state.isAbsolute = true
    setNavPills()
    setTooltip(this.$store.state.bootstrap)
    this.getDeletedDetails()
  },
  watch: {
    selectedFilter() {
      this.getDeletedDetails()
    },
    searchQuery(newValue) {
      this.filterDisplayedData(newValue)
    },
  },
  computed: {
    displayedData() {
      const start = (this.page - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage

      return this.deletedFiles.slice(start, end)
    },
    pages() {
      return Math.ceil(this.deletedFiles.length / this.itemsPerPage)
    },
  },
  methods: {
    async getDeletedDetails() {
      const apiUrl =
        this.selectedFilter === 'Folders'
          ? 'http://localhost:61050/dms/home/getAllInActiveFolders'
          : 'http://localhost:61050/dms/home/getAllInActiveFiles'

      const token = this.$store.getters.getUserToken
      console.log(apiUrl, 'apiUrl')
      await axios
        .get(apiUrl, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          console.log('API response:', response.data) // Log the response

          this.deletedFiles = response.data
        })
        .catch((error) => console.log('Error occurred:', error))
    },
    filterDisplayedData(query) {
      console.log('Search Query:', query) // Log the search query
      // Filter the data based on the search query
      this.deletedFiles = this.deletedFiles.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      )
      console.log('displayedData :', this.displayedData)
    },

    updateDisplayedData() {
      // Your logic to update displayed data based on the new page number
      const start = (this.page - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      this.displayedData = this.deletedFiles.slice(start, end)
    },
    restoreData(value) {
      console.log('Valueeee', value)
      Swal.fire({
        title: 'Are you sure?',
        text: 'You want be restore this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.toMakeRestoreData(value)
          Swal.fire({
            title: 'Restored!',
            text: 'Your file has been restored.',
            icon: 'success',
          })
        }
      })
    },
    async toMakeRestoreData(value) {
      console.log('fodlerId', this.selectedFilter)
      const apiUrl =
        this.selectedFilter === 'Folders'
          ? `http://localhost:61050/dms/home/updateInactiveFolder?id=${value.folderID}&status=A`
          : `http://localhost:61050/dms/home/updateInactiveFile?id=${value.id}&status=A`

      const token = this.$store.getters.getUserToken
      console.log(token)
      await axios
        .put(
          apiUrl,
          {},
          {
            headers: {
              token: token,
            },
          }
        )
        .then((response) => {
          this.getDeletedDetails()
        })
        .catch((error) => console.log('error occured by', error))
    },

    deleteData(value) {
      console.log('Valueeee', value)
      Swal.fire({
        title: 'Are you sure?',
        text: 'You want be Delete this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.toMakeDeleteData(value)
          Swal.fire({
            title: 'Deleted!',
            text: 'Your file has been Deleted',
            icon: 'success',
          })
        }
      })
    },
    async toMakeDeleteData(value) {
      const apiUrl =
        this.selectedFilter === 'Folder'
          ? `http://localhost:61050/dms/home/updateInactiveFile?id=${value.id}&status=D `
          : `http://localhost:61050/dms/home/updateInactiveFolder?id=${value.folderID}&status=D `

      const token = this.$store.getters.getUserToken
      console.log(token)
      await axios
        .put(
          apiUrl,
          {},
          {
            headers: {
              token: token,
            },
          }
        )
        .then((response) => {
          this.getDeletedDetails()
        })
        .catch((error) => console.log('error occured by', error))
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

.search-input {
  width: 300px; /* Adjust the width as needed */
}

.search-container {
  display: flex;
  margin: 1% 0px;
  margin-left: 1%;
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
