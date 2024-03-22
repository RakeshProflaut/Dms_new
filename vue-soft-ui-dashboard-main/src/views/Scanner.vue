<template>
  <div>
    <div class="mt-3 row"></div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card" style="height: 510px !important">
            <div style="display: flex; justify-content: flex-end">
              <div class="newButton">
                <v-btn @click="openUploadDialogeBox = true"> Scanner </v-btn>
              </div>
            </div>
            <div class="card-body px-0 pt-0 pb-0" style="overflow: hidden;">
              <v-container class="overflow-container">
                <v-row dense>
                  <v-col
                    v-for="(item, index) in items"
                    :key="index"
                    cols="12"
                    sm="6"
                    md="3"
                    lg="3"  
                  >
                    <v-card class="my-card">
                      <v-card-title class="headline my-card-title">{{
                        item.barcodeName
                      }}</v-card-title>
                      <iframe
                        :src="getPDFDataUrl(item.pdf)"
                        width="100%"
                        height="110"
                      ></iframe>
                      <v-card-actions class="my-card-actions">
                        <v-btn @click="openPdfViewer(item)">View PDF</v-btn>
                        <v-btn @click="downloadFile(item)">Download</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
              <v-dialog v-model="pdfViewerDialog" max-width="800px">
                <div style="position: relative; left: 100%">
                  <button class="closebtn" @click="pdfViewerDialog = false">
                    <i class="bx bx-x" style="position: relative; top: 20%"></i>
                  </button>
                </div>
                <v-card>
                  <v-card-title>{{ this.selectedBarCode }}</v-card-title>
                  <v-card-text>
                    <iframe
                      :src="selectedPdfUrl"
                      width="100%"
                      height="460"
                    ></iframe>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </div>
            <v-dialog
              v-model="openUploadDialogeBox"
              style="display: flex; padding-left: 73%; z-index: 1001"
            >
              <div style="position: relative; left: 27%">
                <button class="closebtn" @click="openUploadDialogeBox = false">
                  <i class="bx bx-x" style="position: relative; top: 20%"></i>
                </button>
              </div>
              <v-card style="width: 28%; border-radius: 3%">
                <div>
                  <div class="container" style="width: 100%; height: 100%">
                    <div class="card-body">
                      <form role="form">
                        <div class="mb-3">
                          <label>Document Name</label>
                          <input
                            type="text"
                            name="myfile"
                            placeholder="Enter Doc Name"
                            v-model="uploadDetails.parentDocName"
                          />
                        </div>
                        <div class="mb-3">
                          <label>Select File to Scan</label>
                          <input
                            type="file"
                            id="fileUpload"
                            name="myfile"
                            @change="handleFileChange($event)"
                            accept="application/pdf"
                          />
                        </div>
                        <div class="text-center">
                          <button @click="submitData">Submit</button>
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
        <loading-component  :progress="loadingProgress"/>
        <div class="bg"></div>
      </div>
    </div>
  </div>
</template>

<script>
import setTooltip from "@/assets/js/tooltip.js";
import setNavPills from "@/assets/js/nav-pills.js";
import ScannerUploadfile from "./ScannerUploadfile.vue";
import axios from "axios";
import Swal from "sweetalert2";
import LoadingComponent from "@/components/LoadingComponent.vue";
export default {
  name: "Scanner",
  mounted() {
    setNavPills();
    setTooltip(this.$store.state.bootstrap);
    this.$store.state.isAbsolute = true;
  },
  components: {
    ScannerUploadfile,
    LoadingComponent
  },
  data() {
    return {
      pdfViewerDialog: false,
      selectedPdfUrl: "",
      selectedBarCode: "",
      showLoader: false,
      uploadDetails: {
        parentDocName: "",
        pdf: "",
      },
      openUploadDialogeBox: false,
      items: [],
      loadingProgress: 0,
    };
  },
  methods: {
    getPDFDataUrl(base64String) {
      return "data:application/pdf;base64," + base64String;
    },

    openPdfViewer(item) {
      this.selectedPdfUrl = this.getPDFDataUrl(item.pdf);
      this.selectedBarCode = item.barcodeName;
      this.pdfViewerDialog = true;
    },
    async downloadFile(item) {
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      let fileName;

      fileType = "application/pdf";
      fileName = `${item.barcodeName}.pdf`;
      // Construct a data URL with the base64-encoded file data
      const linkSource = `data:pdf;base64,${item.pdf}`;

      // Create a new <a> element to act as a download link
      const downloadLink = document.createElement("a");

      // Set the href attribute of the download link to the data URL
      downloadLink.href = linkSource;

      // Set the download attribute to specify the filename for the downloaded file
      downloadLink.download = fileName;

      // Programmatically click the download link to initiate the download
      downloadLink.click();
    },

    handleFileChange(event) {
      const file = event.target.files[0]; // Assuming only one file is selected
      const maxSize = 10 * 1024 * 1024; // 6MB in bytes

      if (file && file.size > maxSize) {
        this.fileSizeError = "File size exceeds the limit of 6MB.";
        event.target.value = ""; // Clear the file input
      } else {
        this.fileSizeError = ""; // Reset error message if file size is within limit
        // Convert the file to base64
        this.convertToBase64(event);
      }
    },

    async convertToBase64(event) {
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.base64Data = reader.result;
        this.uploadDetails.pdf = this.base64Data.split(",")[1];
      };
    },

    async handleShowLoader(value) {
      // Update the isLoading data property based on the emitted value
      this.openUploadDialogeBox = false;
      this.showLoader = value;
      setTimeout(() => {
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
    async submitData(event) {
      event.preventDefault();
      const apiUrl = "http://localhost:61056/splitter/split/splitPdf";
      const token = this.$store.getters.getUserToken;
      if (Object.values(this.uploadDetails).every((value) => value !== "")) {
        this.openUploadDialogeBox = false;
        this.showLoader = true;
        await axios
          .post(apiUrl, this.uploadDetails, {
            headers: {
              token: token,
            },
          })
          .then((response) => {
            this.items = response.data;
          })
          .catch((error) =>
            Swal.fire({
              icon: "error",
              title: "Error",
              text: error.response.data.errorMessage,
            })
          )
          .finally(() => {
            // Hide loader when API call completes
            this.showLoader = false;
          });
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          customClass: "swal-wide",
          height: "30px",
          background: "hsl(0, 43%, 52%)",
          color: "white",
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "error",
          title: "Please Fill  the Fields!",
        });
      }
    },
  },
};
</script>

<style scoped>
.my-card {
  /* Adjusting margin to decrease the height of the card */
  margin-bottom: 5px;
}

.my-card-title {
  /* Adjusting padding to decrease the height of the card title */
  padding-bottom: 2%;
  background: #F7F8F9;
  font-weight: 700;

}

.my-card-actions {
  /* Adjusting margin to decrease the height of the card actions */
  margin-top: -5px;
  display: flex;
  justify-content: space-between !important;
  background: #F7F8F9;
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

.my-card-actions > .v-btn {
  background-image: linear-gradient(310deg, #82d616, #5cc06e) !important;
  transition: 0.5s ease;
  color: #fff;
  margin-left: 2%;
  font-weight: bold;
  font-size: 0.7rem !important;
  height: 2rem !important;
}
.my-card-actions > .v-btn:hover {
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

.overflow-container {
  overflow: auto;
  max-height: 485px; /* Adjust the maximum height as needed */
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
  background-image: linear-gradient(310deg, #82d616, #5cc06e) !important;
  margin-top: 16px !important;
  border-radius: 1rem;
  padding: 8px 0px;
  box-shadow:
    0 4px 7px -1px rgba(0, 0, 0, 0.11),
    0 2px 4px -1px rgba(0, 0, 0, 0.07);
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
  width: 22px;
  height: 22px;
  color: #d11313;
  font-size: 30px;
  opacity: 1;
}

.closebtn:hover {
  opacity: 0.5;
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
</style>
