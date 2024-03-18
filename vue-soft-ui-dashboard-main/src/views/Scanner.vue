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
              <div  class="newButton">
                <v-btn @click="openUploadDialogeBox = true"> Upload </v-btn>
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
          <!-- <v-dialog v-model="docViewBox" style="z-index: 1001">
            <v-card style="width: 35%; margin: 0 auto; border-radius: 3%">
              <view-file
                :selectedDocId="selectedDocId"
                v-on:closeDocViewBox="closeDocViewBox"
              />
            </v-card>
          </v-dialog>
        -->
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
                  <label>Select Image to upscale</label>
                  <input
                    type="file"
                    id="fileUpload"
                    name="myfile"
                    @change="convertToBase64"
                    accept="application/pdf"
                  />
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
import ScannerUploadfile from './ScannerUploadfile.vue';
export default {
name:'Scanner',
mounted() {
  setNavPills();
  setTooltip(this.$store.state.bootstrap);    
  this.$store.state.isAbsolute = true;
  },
  components:{
    ScannerUploadfile
  },
  data(){
    return{
      openUploadDialogeBox:false,
    }
  },
  methods:{  
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
  }

}
</script>

<style scoped>

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
  opacity: 0.3;
}

.closebtn:hover {
  opacity: 1;
}

</style>