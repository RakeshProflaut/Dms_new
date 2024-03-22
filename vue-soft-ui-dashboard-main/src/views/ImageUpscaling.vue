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
              <div class="newButton">
                <v-btn @click="openDialogeBox = true"> Upload </v-btn>
                <v-btn id="clearbtn" style="display: none" @click="clearImg">
                  Clear
                </v-btn>
              </div>
            </div>
            <splitpanes class="default-theme" vertical>
              <pane class="uploadedImgBlock">
                <div class="imageContainer">
                  <a data-fancybox="gallery" :href="imageData">
                    <img
                      class="iframe1"
                      id="image"
                      style="display: none"
                      :src="imageData"
                    />
                  </a>                 
                </div>
                <div class="sparkle">
                  <span
                    @click="openUpscaledImage"
                    style="display: none"
                    class="mdi mdi-creation-outline"
                    id="sparkles"
                  ></span>
                </div>
              </pane>
              <pane class="downloadedImgBlock">
                <div class="imageContainer">

                  <a data-fancybox="gallery" :href="upscaledImage">
                    <img
                      class="iframe1"
                      id="upscaleImage"
                      style="display: none"
                      :src="upscaledImage"
                    />
                  </a>      
                  <!-- <img class="iframe1" id="upscaleImage" style="display: none" /> -->
                </div>
                <div class="download">
                  <span
                    @click="downloadImage"
                    style="display: none"
                    class="mdi mdi-download"
                    id="download"
                  ></span>
                </div>
              </pane>
            </splitpanes>
          </div>
        </div>
      </div>
    </div>
    <v-dialog
      v-model="openDialogeBox"
      style="display: flex; padding-left: 73%; z-index: 1001"
    >
      <div style="position: relative; left: 27%">
        <button class="closebtn" @click="openDialogeBox = false">
          <i class="bx bx-x" style="position: relative; top: 20%"></i>
        </button>
      </div>
      <v-card style="width: 28%; border-radius: 3%">
        <div>
          <div class="container" style="width: 100%; height: 100%">
            <div class="card-body">
              <form role="form">
                <div class="mb-3">
                  <label>Select Image to upscale</label>
                  <input
                    type="file"
                    id="fileUpload"
                    name="myfile"
                    @change="handleFileChange($event)"
                    accept="image/png,image/jpeg,image/jpg"
                  />
                  <span v-if="fileSizeError" class="error-message">{{
                    fileSizeError
                  }}</span>
                </div>
                <div class="text-center">
                  <button @click="submitImg">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
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
import Swal from "sweetalert2";
import { Splitpanes, Pane } from "splitpanes";
import axios from "axios";
export default {
  name: "imageUpScaling",
  components: {
    Splitpanes,
    Pane,
  },
  data() {
    return {
      openDialogeBox: false,
      fileSizeError: "",
      imageData: "",
      upscaledImage:"",
      uploadedImage: "",
      uploadedImgExtenion: "",
      showLoader: false,
      sharpedImage: "",
      uploadedFileName: "",
    };
  },
  mounted() {
    this.$store.state.isAbsolute = true;
    setNavPills();
    setTooltip(this.$store.state.bootstrap);
  },
  methods: {
    submitImg(event) {
      if (
        this.uploadedImgExtenion === "png" ||
        this.uploadedImgExtenion === "jpg" ||
        this.uploadedImgExtenion === "jpeg"
      ) {
        this.postImgAndGet(event);
      } else {
        event.preventDefault();
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
          onBeforeOpen: (toast) => {
            toast.style.zIndex = 10000;
          },
        });
        Toast.fire({
          icon: "error",
          title: "Please Select  Images!",
        });
      }
      this.openDialogeBox = false;
    },

    async convertToBase64(event) {
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.base64Data = reader.result;
        const fileName = file.name;
        this.uploadedFileName = fileName;
        const fileExtension = fileName.split(".").pop();
        this.uploadedImgExtenion = fileExtension;
        this.uploadedImage = this.base64Data.split(",")[1];
        console.log("uploadedImg", this.uploadedImage);
      };
    },

    handleFileChange(event) {
      const file = event.target.files[0]; // Assuming only one file is selected
      const maxSize = 6 * 1024 * 1024; // 6MB in bytes

      if (file && file.size > maxSize) {
        this.fileSizeError = "File size exceeds the limit of 6MB.";
        event.target.value = ""; // Clear the file input
      } else {
        this.fileSizeError = ""; // Reset error message if file size is within limit
        // Convert the file to base64
        this.convertToBase64(event);
      }
    },

    async postImgAndGet(event) {
      event.preventDefault();
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      await axios
        .post(
          `http://localhost:61050/dms/file/sharpenedImage`,
          {
            image: this.uploadedImage,
          },
          {
            headers: {
              token: this.$store.getters.getUserToken,
            },
          }
        )
        .then((response) => {
          console.log("resposneImage", response.data);
          this.sharpedImage = response.data.sharpened_image;
          console.log("sparpeddImage", this.sharpedImage);
          const iframe = document.getElementById("image");
          const sparkles = document.getElementById("sparkles");
          const clearBtn = document.getElementById("clearbtn");

          this.imageData =
            "data:image/" +
            this.uploadedImgExtenion +
            ";base64," +
            this.uploadedImage;
          iframe.style.display = "block";
          sparkles.style.display = "block";
          clearBtn.style.display = "block";
        })
        .catch((error) => console.error("Error occured by", error));
    },
    openUpscaledImage() {
      this.showLoader = true;
      setTimeout(() => {
        this.showLoader = false;
        const iframe = document.getElementById("upscaleImage");
        const download = document.getElementById("download");
        this.upscaledImage = this.upscaledImage =
        "data:image/" +
            this.uploadedImgExtenion +
            ";base64," +
            this.sharpedImage; 
        iframe.style.display = "block";
        download.style.display = "flex";
      }, 3000);
    },
    downloadImage() {
      console.log("dowlpadfile extenion", this.uploadedImgExtenion);
      console.log("dowlpadfile name", this.uploadedFileName);
      try {
        let fileType;
        let fileName;

        // Determine the file type and filename based on the file extension
        if (["jpg", "jpeg"].includes(this.uploadedImgExtenion)) {
          fileType = "image/jpeg";
          fileName = `${this.uploadedFileName}.jpg`;
        } else if (this.uploadedImgExtenion === "png") {
          fileType = "image/png";
          fileName = `${this.uploadedFileName}.png`;
        } else {
          throw new Error("Unsupported file type");
        }

        const linkSource = `data:${fileType};base64,${this.sharpedImage}`;
        const downloadLink = document.createElement("a");
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
      } catch (error) {
        console.error("Error downloading file:", error);
      }
    },
    clearImg() {
      const uploadedImg = document.getElementById("image");
      const downloadedImg = document.getElementById("upscaleImage");
      downloadedImg.src = "";
      downloadedImg.style.display = "none";
      uploadedImg.style.display = "none";
      uploadedImg.src = "";
      const download = document.getElementById("download");
      download.style.display = "none";
      const sparkles = document.getElementById("sparkles");
      sparkles.style.display = "none";
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

.imageContainer {
  flex-basis: 90%;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.uploadedImgBlock {
  padding: 2% 0;
  display: flex;
  gap: 2%;
  flex-direction: column;
}

.sparkle {
  flex-basis: 10%;
  display: flex;
  justify-content: flex-end;
  padding-right: 2%;
  margin-bottom: 2%;
  width: 100%;
}

.iframe1 {
  position: absolute;
  top: 0;
  left: 0;
  width: 90%;
  height: 100%;
  object-fit: contain;
}

.downloadedImgBlock {
  padding: 2% 0;
  display: flex;
  flex-direction: column;
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
  font-weight: bold;
  margin-left: 2%;
  color: #fff;
  height: 2rem !important;
  font-size: 0.7rem !important;
}
.newButton > .v-btn:hover {
  cursor: pointer;
}

.sparkle > span {
  background-image: linear-gradient(310deg, #82d616, #5cc06e) !important;
  transition: 0.5s ease;
  font-weight: bold;
  width: 15%;
  /* padding: 0% 7%; */
  border-radius: 1.2rem;
  color: #fff;
  margin-bottom: 2%;
  height: 2rem !important;
  font-size: 1.4rem !important;
  text-align: center;
  display: flex;
  justify-content: center;
}

.sparkle > span:hover {
  cursor: pointer;
}

.download {
  flex-basis: 10%;
  display: flex;
  justify-content: flex-end;
  padding-right: 2%;
  margin-bottom: 2%;
  width: 100%;
}
.download > span {
  justify-content: center;
  align-items: center;
  padding-top: 1%;
  background-image: linear-gradient(310deg, #82d616, #5cc06e) !important;
  transition: 0.5s ease;
  font-weight: bold;
  width: 15%;
  border-radius: 1.2rem;
  color: #fff;
  margin-bottom: 2%;
  height: 2rem !important;
  font-size: 1.4rem !important;
}

.download > span:hover {
  cursor: pointer;
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

.error-message {
  color: red;
  font-size: 12px;
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
</style>
