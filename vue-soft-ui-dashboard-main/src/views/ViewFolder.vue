<template>
  <div>
    <!-- <div class="container-fluid">
      <div
        class="mt-4 page-header min-height-300 border-radius-xl"
        :style="{
          backgroundImage:
            'url(' + require('@/assets/img/curved-images/curved14.jpg') + ')',
          backgroundPositionY: '50%',
        }"
      >
        <span class="mask bg-gradient-success opacity-6"></span>
      </div> -->
      <!-- <div class="mx-4 overflow-hidden card card-body blur shadow-blur mt-n6">
        <div class="row gx-4">
          <div class="col-auto">
            <div class="avatar avatar-xl position-relative">
              <img
                src="@/assets/img/user.png"
                alt="profile_image"
                class="shadow-sm w-100 border-radius-lg"
              />
            </div>
          </div>
          <div class="col-auto my-auto">
            <div class="h-100">
              <h5 class="mb-1">{{ this.$store.getters.getUserName }}</h5>
              <p class="mb-0 text-sm font-weight-bold">
                User Id-{{ this.$store.getters.getUserId }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  -->
    <div class="mt-3 row"></div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card" style="height: 510px !important">
            <div style="display: flex; justify-content: space-between">
              <div class="card-header text-uppercase">
                <h4>{{ this.folderName }}</h4>
              </div>
              <div v-if="this.write === 'Yes'" class="newButton">
                <v-btn @click="openUploadDialogeBox = true"> Upload </v-btn>
                <v-btn @click="navigateBack">Back</v-btn>
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
                              header.key === 'action' || header.key === 'send'
                                ? 'center'
                                : 'left',
                          }"
                        >
                          {{ header.title }}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(data, rowIndex) in displayedData"
                        :key="rowIndex"
                        style="font-size: 0.9rem !important"
                      >
                        <td
                          v-for="(header, index) in headers"
                          :key="index"
                          :class="{
                            'pl-5':
                              header.key !== 'action' && header.key !== 'send',
                            'font-weight-bolder text-uppercase':
                              header.key === 'folderName',
                          }"
                          :style="{
                            'text-align':
                              header.key === 'action' || header.key === 'send'
                                ? 'center'
                                : 'left',
                          }"
                        >
                          <template v-if="header.key === 'action'">
                            <div
                              style="
                                font-size: 0.7rem !important;
                                height: 2rem !important;
                              "
                              @click="openDocViewBox(data['id'])"
                              class="text-secondary font-weight-bold text-xs"
                            >
                              <span
                                style="
                                  font-size: 1.8rem;
                                  cursor: pointer;
                                  color: #234375;
                                "
                                class="mdi mdi-archive-eye-outline"
                              ></span>
                            </div>
                          </template>
                          <template v-if="header.key === 'send'">
                            <div
                              style="
                                font-size: 0.7rem !important;
                                height: 2rem !important;
                              "
                              @click="getSendMailBox(data['id'])"
                              class="text-secondary font-weight-bold text-xs"
                            >
                              <span
                                style="
                                  font-size: 1.8rem;
                                  cursor: pointer;
                                  color: #234375;
                                "
                                class="mdi mdi-send"
                              ></span>
                            </div>
                          </template>
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
          <v-dialog v-model="docViewBox" style="z-index: 1001">
            <v-card style="width: 35%; margin: 0 auto; border-radius: 3%">
              <view-file
                :selectedDocId="selectedDocId"
                v-on:closeDocViewBox="closeDocViewBox"
              />
            </v-card>
          </v-dialog>
          <v-dialog v-model="openUploadDialogeBox" style="z-index: 1001">
            <v-card style="width: 35%; margin: 0 auto; border-radius: 3%">
              <upload-file
                :selectedfolder="selectedfolder"
                v-on:closeUploadDialogeBox="closeUploadDialogeBox"
                @showLoader="handleShowLoader"
              />
            </v-card>
          </v-dialog>
          <v-dialog
            v-model="openDialogeBox"
            style="display: flex; padding-left: 73%; z-index: 1001"
          >
            <v-card style="width: 28%; border-radius: 3%">
              <div>
                <div class="container" style="width: 100%; height: 100%">
                  <div>
                    <button class="closebtn" @click="openDialogeBox = false">
                      <i
                        class="bx bx-x"
                        style="position: relative; top: 20%"
                      ></i>
                    </button>
                  </div>
                  <div class="pt-10 text-center card-header">
                    <h5>Group Registration</h5>
                  </div>
                  <div class="card-body">
                    <form role="form">
                      <div class="mb-3">
                        <input
                          id="name"
                          type="text"
                          placeholder="Name"
                          aria-label="Name"
                          v-model="enteredGroupName"
                        />
                      </div>
                      <div class="text-center">
                        <button @click="submitGroupName">Submit</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </v-card>
          </v-dialog>

          <v-dialog
            v-model="openMailBox"
            style="display: flex; padding-left: 73%; z-index: 1001"
          >
            <v-card style="width: 28%; border-radius: 3%">
              <div>
                <div class="container" style="width: 100%; height: 100%">
                  <div>
                    <button class="closebtn" @click="openMailBox = false">
                      <i
                        class="bx bx-x"
                        style="position: relative; top: 20%"
                      ></i>
                    </button>
                  </div>
                  <div class="pt-10 text-center card-header">
                    <h5>Receiver Mail</h5>
                  </div>
                  <div class="card-body">
                    <form role="form">
                      <div class="mb-3">
                        <!-- <label for="mail">To</label> -->
                        <input
                          id="mail"
                          type="email"
                          placeholder="Enter Mail"
                          aria-label="Mail"
                          v-model="enteredMail"
                        />
                      </div>
                      <div class="text-center">
                        <button @click="postMail">Submit</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </v-card>
          </v-dialog>
        </div>
      </div>
    </div>
    <div v-if="showLoader" class="loader-overlay">
      <div v-if="showLoader" class="loader">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
      </div>
      <div class="bg"></div>
    </div>
  </div>
</template>

<script>
import setTooltip from "@/assets/js/tooltip.js";
import setNavPills from "@/assets/js/nav-pills.js";
import axios from "axios";
import ViewFile from "./ViewFile.vue";
import UploadFile from "./UploadFile.vue";
import Swal from "sweetalert2";

export default {
  name: "viewFolder",
  components: {
    ViewFile,
    UploadFile,
  },
  data() {
    return {
      folderId: this.id,
      page: 1, // Current page
      itemsPerPage: 10, // Number of items per page
      files: [],
      docViewBox: false,
      showLoader: false,
      metaid: "",
      enteredMail: "",
      selectedDocId: "",
      selectedfileId: "",
      openUploadDialogeBox: false,
      openMailBox: false,
      selectedfolder: {
        folderId: this.id,
        view: this.view,
        write: this.write,
        folderName: this.folderName,
        metaId: this.metaId,
      },
      headers: [
        {
          key: "sno",
          title: "S.NO",
        },
        {
          key: "docName",
          title: "FILE NAME",
        },
        {
          key: "createdBy",
          title: "CREATED BY",
        },
        {
          key: "createdAt",
          title: "CREATED AT",
        },
        {
          key: "send",
          title: "Send",
        },
        {
          key: "action",
          title: "Action",
        },
      ],
    };
  },
  props: ["id", "view", "write", "folderName", "metaId"],
  mounted() {
    this.$store.state.isAbsolute = true;
    setNavPills();
    setTooltip(this.$store.state.bootstrap);
    this.getAllFiles();
  },

  computed: {
    displayedData() {
      const start = (this.page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;

      return this.files.slice(start, end);
    },
    pages() {
      return Math.ceil(this.files.length / this.itemsPerPage);
    },
  },
  beforeUnmount() {
    this.$store.state.isAbsolute = false;
  },
  methods: {
    navigateBack() {
      // Emitting router push to go back
      this.$router.push("/folders");
    },

    updateDisplayedData() {
      // Your logic to update displayed data based on the new page number
      const start = (this.page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      this.displayedData = this.files.slice(start, end);
    },

    async getAllFiles() {
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      const apiUrl = `http://localhost:61050/dms/folder/getById/${this.id}`;
      const token = this.$store.getters.getUserToken;
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            token: token,
          },
        });
        console.log("getAllfiles", response.data);
        this.metaid = response.data.metaId;
        this.folderId = response.data.folderId;
        this.files = response.data.files;
      } catch (error) {
        console.error("Error occured by", error);
      }
    },

    async handleShowLoader(value) {
      // Update the isLoading data property based on the emitted value
      this.openUploadDialogeBox = false;
      this.showLoader = value;
      setTimeout(() => {
        this.getAllFiles();
        this.showLoader = false;
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
          title: "Uploaded successfully",
        });
      }, 3000);
    },

    closeDocViewBox(value) {
      this.docViewBox = value;
    },

    closeUploadDialogeBox(value) {
      this.openUploadDialogeBox = value;
      this.getAllFiles();
    },

    openDocViewBox(value) {
      this.docViewBox = true;
      this.selectedDocId = value;
      this.getAllFiles();
    },

    // async getSendMailBox(id) {
    //   const { value: email } = await Swal.fire({
    //     title: "Receiver email address",
    //     input: "email",
    //     confirmButtonText: "Submit",
    //     cancelButtonText: "Cancel",
    //     confirmButtonColor: "#5FC0FF",
    //     cancelButtoncolor: "#C72E2E",
    //     inputPlaceholder: "To",
    //     didOpen: () => {
    //   Swal.showLoading(); // Show loading indicator when the modal is opened
    // },
    //   });
    //   if (email) {
    //     this.postMail(email, id);
    //     Swal.fire(`Entered email: ${email}`);
    //   }
    // },

    async getSendMailBox(id) {
      this.openMailBox = true;
      this.selectedfileId = id;
    },

    async postMail(event) {
      const id = this.selectedfileId;
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      event.preventDefault();
      const selectedFile = this.files.find((ele) => ele.id == id);
      const apiUrl = `http://localhost:61050/dms/file/share`;
      const token = this.$store.getters.getUserToken;
      const postDetails = {
        from: "sathishkumar@proflaut.com",
        to: this.enteredMail,
        docName: selectedFile.docName,
        docId: selectedFile.id,
      };
      try {
        this.showLoader = true;
        const response = await axios.post(apiUrl, postDetails, {
          headers: {
            token: token,
          },
        });

        this.openMailBox = false;
        setTimeout(() => {
          this.showLoader = false;
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            background: "#4fb945",
            color: "white",
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "success",
            title: "Mail Sent  successfully",
          });
        }, 2000);
      } catch (error) {
        console.error("Error occured by", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to send email",
        });
      }
    },
  },
};
</script>

<style scoped>
.min-height-300 {
  min-height: 75px !important;
}

.card .card-header {
  padding: 0.5rem !important;
}

#app
  > div
  > div.dashboard
  > div.content
  > div
  > div
  > div.v-card-text.card-text {
  flex: 1 1 auto;
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: 0.0178571429em;
  padding: 0.5px;
  text-transform: none;
}

.newButton {
  display: flex;
  justify-content: flex-end;
  margin: 1% 0px;
  margin-right: 2%;
}
.newButton > .v-btn {
  background-image: linear-gradient(310deg, #82d616, #5cc06e) !important;
  transition: 0.5s ease;
  color: #fff;
  margin-left: 2%;
  font-weight: bold;
  font-size: 0.7rem !important;
  height: 2rem !important;
}
.newButton > .v-btn:hover {
  cursor: pointer;
}

.table-responsive {
  display: flex;
  flex-direction: column;
}
.tableContaier {
  position: relative;
  height: 395px;
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
  width: 65px;
  height: 65px;
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
  background: #5cc06e; /* color of the handle */
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #5cc06e; /* color of the handle on hover */
}

.custom-input-class {
  /* Add your custom CSS rules for the input field here */
  border: 2px solid #ff0000; /* Example border color */
  border-radius: 5px; /* Example border radius */
  padding: 10px; /* Example padding */
}

.closebtn {
  position: relative;
  left: 6%;
  float: right;
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
  margin-bottom: 8px !important;
  letter-spacing: -0.025rem;
  text-transform: uppercase;
  background-size: 150%;
  background-position-x: 25%;
  background: #5cc06e;
  margin-top: 16px !important;
  border-radius: 1rem;
  padding: 8px 0px;
  box-shadow:
    0 4px 7px -1px rgba(0, 0, 0, 0.11),
    0 2px 4px -1px rgba(0, 0, 0, 0.07);
}

.container {
  position: relative;
  top: -15px;
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
</style>
