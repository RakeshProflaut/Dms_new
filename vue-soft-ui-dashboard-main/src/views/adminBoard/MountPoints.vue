side

<script>
import setTooltip from "@/assets/js/tooltip.js";
import setNavPills from "@/assets/js/nav-pills.js";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "mountPoints",
  data() {
    return {
      page: 1, // Current page
      itemsPerPage: 10, // Number of items per page
      headers: [
        { key: "id", title: "ID" },
        { key: "path", title: "PATH" },
        { key: "createdBy", title: "CREATED BY" },
        { key: "createdAt", title: "CREATED AT" },
        { key: "action", title: "ACTION" },
        { key: "assign", title: "ASSIGN" },
      ],
      openDialogeBox: false,
      openAccessBox: false,
      mountData: [],
      selectedFolders: [],
      enteredPath: "",
      assignedFolders: [],
      showLoader: false,
      selectedUserId: [],
      readfolderPath: "",
      allocatedFolders: [],
      selectedMountId: null,
    };
  },
  mounted() {
    this.getMountData();
    this.$store.state.isAbsolute = true;
    setNavPills();
    setTooltip(this.$store.state.bootstrap);
  },
  beforeUnmount() {
    this.$store.state.isAbsolute = false;
  },
  computed: {
    displayedData() {
      console.log("displa data rendering");
      const start = (this.page - 1) * this.itemsPerPage;
      console.log("start", start);
      const end = start + this.itemsPerPage;
      console.log("end", start);

      return this.mountData.slice(start, end);
    },
    pages() {
      console.log(Math.ceil(this.mountData.length / this.itemsPerPage));
      return Math.ceil(this.mountData.length / this.itemsPerPage);
    },
  },
  methods: {
    updateDisplayedData() {
      // Your logic to update displayed data based on the new page number
      const start = (this.page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      this.displayedData = this.mountData.slice(start, end);
    },

    async submitPathDetails(event) {
      event.preventDefault();
      const apiUrl = `http://localhost:61050/dms/mount/saveMountPoint`;
      const pathDetails = {
        path: this.enteredPath,
      };
      const token = this.$store.getters.getUserToken;
      console.log("userDetaissss", pathDetails);
      await axios
        .post(apiUrl, pathDetails, {
          headers: {
            token: token,
          },
        })
        .then(() => {
          this.openAccessBox = false;
          this.showLoader = true;

          setTimeout(() => {
            this.showLoader = false;
            this.openAccessBox = true;
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              background: "#4fb945",
              color: "white",
              timer: 2000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              },
            });
            Toast.fire({
              icon: "success",
              title: "User Assigned successfully",
            });
          }, 3000);
        })
        .catch((error) => console.log("error occured by", error));
    },

    async getMountData() {
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      const apiUrl = `http://localhost:61050/dms/mount/getAllMountPoint`;
      const token = this.$store.getters.getUserToken;
      await axios
        .get(apiUrl, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          this.mountData = response.data;
          console.log("mountData", this.mountData);
        })
        .catch((error) => console.error("Error occured by", error));
    },

    async openAllocateBox(value) {
      this.selectedMountId = value;
      this.readfolderPath = this.mountData.find(
        (ele) => ele.id === this.selectedMountId
      ).path;
      this.openAccessBox = true;
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      await axios
        .get(
          `http://localhost:61050/dms/mount/getAllNotAllocateFolders/${this.selectedMountId}`,
          {
            headers: {
              token: this.$store.getters.getUserToken,
            },
          }
        )
        .then((response) => {
          this.allocatedFolders = response.data;
          this.assignedFolders = [];
          this.getAssigendFolders();
          this.getAssigendFolders().then(() => {
            this.getFilterAllocatedFolders();
          });
        })
        .catch((error) => console.error("Error occured by", error));
    },

    async submitAllocateFolders() {
      const apiUrl = `http://localhost:61050/dms/mount/saveMountMapping`;
      const userDetails = {
        mountPointId: this.selectedMountId,
        folderId: this.selectedFolders,
      };
      const token = this.$store.getters.getUserToken;
      console.log("allocatedDetailsss", userDetails);
      await axios
        .post(apiUrl, userDetails, {
          headers: {
            token: token,
          },
        })
        .then(() => {
          this.openAccessBox = false;
          this.showLoader = true;

          setTimeout(() => {
            this.showLoader = false;
            this.openAccessBox = true;
            (this.selectedFolders = []),
              this.getAssigendFolders().then(() => {
                this.getFilterAllocatedFolders();
              });

            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              background: "#4fb945",
              color: "white",
              timer: 2000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              },
            });
            Toast.fire({
              icon: "success",
              title: "Folders Allocated successfully",
            });
          }, 3000);
        })
        .catch((error) => console.log("error occured by", error));
    },
    async getAssigendFolders() {
      const apiUrl = `http://localhost:61050/dms/mount/getAllAllocateFolders/${this.selectedMountId}`;
      const token = this.$store.getters.getUserToken;
      await axios
        .get(apiUrl, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          this.assignedFolders = response.data;
          console.log("assignedFolders", this.assignedFolders);
        })
        .catch((error) => console.log("error occured by", error));
    },

    getFilterAllocatedFolders() {
      this.allocatedFolders = this.allocatedFolders.filter(
        (item) =>
          !this.assignedFolders.some(
            (assignedItem) => assignedItem.folderID === item.folderID
          )
      );
      console.log("allocatedFolders", this.allocatedFolders);
      console.log("assignedFolders List", this.assignedFolders);
      console.log("allocatedFolders list", this.allocatedFolders);
    },

    openDeleteOption(value) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.toMakeDeleteData(value);
        }
      });
    },

    async toMakeDeleteData(value) {
      const apiUrl = `http://localhost:61050/dms/mount/unAllocateFolders?folderId=${value}&mountId=${this.selectedMountId} `;
      const token = this.$store.getters.getUserToken;
      console.log(token);
      await axios
        .delete(apiUrl, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          console.log("respondedelte", response.data.status);
          this.assignedFolders = [];
          this.getAssigendFolders();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        })
        .catch((error) =>
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.response.data.errorMessage,
          })
        );
    },

  
   
  },
};
</script>

<style scoped>
.min-height-300 {
  min-height: 75px !important;
}

.newButton {
  display: flex;
  justify-content: flex-end;
  margin: 1% 0px;
  margin-right: 2%;
}
.newButton > .v-btn {
  background: #58bdff;
  transition: 0.5s ease;
  font-weight: bold;
  color: #fff;
  height: 2rem !important;
  font-size: 0.7rem !important;
}
.newButton > .v-btn:hover {
  cursor: pointer;
}

.mb-3 > input {
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.4rem;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #d2d6da;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0.5rem;
  transition:
    box-shadow 0.15s ease,
    border-color 0.15s ease;
}

.container {
  position: relative;
  top: -15px;
}

.closebtn {
  width: 22px;
  height: 22px;
  color: #d11313;
  font-size: 30px;
  opacity: 0.3;
}

.closebtn:hover {
  opacity: 1;
}


.text-center > button {
  color: #fff;
  border: 0;
  cursor: pointer;
  width: 50% !important;
  letter-spacing: -0.025rem;
  text-transform: uppercase;
  background-size: 150%;
  background-position-x: 25%;
  background-image: linear-gradient(310deg, #141727 0%, #3a416f 100%);
  border-radius: 1rem;
  padding: 8px 0px;
  box-shadow:
    0 4px 7px -1px rgba(0, 0, 0, 0.11),
    0 2px 4px -1px rgba(0, 0, 0, 0.07);
}

.table-responsive {
  display: flex;
  flex-direction: column;
}

.tableContaier {
  position: relative;
  height: 360px;
  overflow-x: auto;
}
.table-header {
  position: sticky;
  top: 0;
  z-index: 1;
  background: #fff;
}

.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(1, 1, 1, 0.76);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 50px;
  height: 50px;
  margin: auto;
  background: var(--c), var(--r1), var(--r2), var(--c), var(--r1), var(--r2),
    var(--c), var(--r1), var(--r2);
  background-repeat: no-repeat;
  animation: l2 5s infinite alternate;
}

.loader .circle {
  position: absolute;
  width: 30px;
  height: 30px;
  opacity: 0;
  transform: rotate(225deg);
  animation-iteration-count: infinite;
  animation-name: orbit;
  animation-duration: 5.5s;
}
.loader .circle:after {
  content: "";
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 5px;
  background: #fff;
}
.loader .circle:nth-child(2) {
  animation-delay: 240ms;
}
.loader .circle:nth-child(3) {
  animation-delay: 480ms;
}
.loader .circle:nth-child(4) {
  animation-delay: 720ms;
}
.loader .circle:nth-child(5) {
  animation-delay: 960ms;
}
.loader .bg {
  position: absolute;
  width: 70px;
  height: 70px;
  margin-left: -16px;
  margin-top: -16px;
  border-radius: 13px;
  background-color: rgba(0, 153, 255, 0.69);
  animation: bgg 46087ms ease-in alternate infinite;
}
@keyframes orbit {
  0% {
    transform: rotate(225deg);
    opacity: 1;
    animation-timing-function: ease-out;
  }
  7% {
    transform: rotate(345deg);
    animation-timing-function: linear;
  }
  30% {
    transform: rotate(455deg);
    animation-timing-function: ease-in-out;
  }
  39% {
    transform: rotate(690deg);
    animation-timing-function: linear;
  }
  70% {
    transform: rotate(815deg);
    opacity: 1;
    animation-timing-function: ease-out;
  }
  75% {
    transform: rotate(945deg);
    animation-timing-function: ease-out;
  }
  76% {
    transform: rotate(945deg);
    opacity: 0;
  }
  100% {
    transform: rotate(945deg);
    opacity: 0;
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
  background: #65c2fc; /* color of the handle */
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #65c2fc; /* color of the handle on hover */
}
</style>
