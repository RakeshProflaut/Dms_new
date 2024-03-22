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
      </div>
    </div> -->
    <div class="mt-3 row"></div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card" style="height: 510px !important">
            <div style="display: flex; justify-content: space-between">
              <div class="card-header text-uppercase">
                <h4>OCR</h4>
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
                  <!-- <img id="iframeId1" class="iframe1" style="display: none" /> -->
                </div>
              </pane>
              <pane>
                <div
                  style="
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  "
                >
                  <div class="textContainer" v-if="openTextContainer">
                    <div v-for="(block, index) in blocks" :key="index">
                      <div
                        class="card-header"
                        style="
                          background-color: #f2f2f2 !important;
                          color: #5cc06e;
                          font-weight: 700;
                        "
                      >
                        Block{{ index + 1 }}
                      </div>
                      <div class="mb-1 card" style="width: 85%">
                        <div class="card-body" style="">
                          <div>
                            {{ block.sharpened_image }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
                    accept="image/png, image/jpeg, image/jpg"
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
      uploadedImage: "",
      uploadedImgExtenion: "",
      showLoader: false,
      sharpedImage: "",
      uploadedFileName: "",
      blocks: null,
      openTextContainer: false,
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

    async postImgAndGet(event) {
      event.preventDefault();
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

      try {
        this.showLoader = true;
        const response = await axios.post(
          `http://localhost:61050/dms/dashboard/ocrImage`,
          { image: this.uploadedImage },
          {
            headers: {
              token: this.$store.getters.getUserToken,
            },
          }
        );
        this.showLoader = false;
        console.log("resposneImage", response.data);
        this.blocks = response.data;
        this.openTextContainer = true;
        const iframe = document.getElementById("image");
        const clearBtn = document.getElementById("clearbtn");

        this.imageData =
          "data:image/" +
          this.uploadedImgExtenion +
          ";base64," +
          this.uploadedImage;
        iframe.style.display = "block";
        clearBtn.style.display = "block";
      } catch (error) {
        console.error("Error occured by", error);
      }
    },

    clearImg() {
      const iframe1 = document.getElementById("image");
      this.imageData = "";
      iframe1.style.display = "none";
      this.blocks = [];
      this.openTextContainer = false;
    },
  },
};
</script>

<style scoped>
.card .card-header {
  padding: 0.5rem !important;
}

.card .card-body {
  padding: 0.5rem;
}

.error-message {
  color: red;
  font-size: 12px;
}

.imageContainer {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.iframe1 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.uploadedImgBlock {
  padding: 2% 2%;
  display: flex;
  width: 100%;
  height: 100%;
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

/* .iframe1 {
  width: 100%;
  height: 95%;
  object-fit: cover;
} */

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

.textContainer {
  width: 80%;
  margin-top: 3%;
  margin-bottom: 3%;
  height: 20rem;
  padding: 0.2rem !important;
  overflow-y: auto !important;
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
