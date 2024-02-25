<template>
    <div>
      <div class="container-fluid">
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
     
      </div>
      <div class="mt-3 row"></div>
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card mb-4" style="height: 489px !important">
              <div style="display: flex;justify-content: space-between;">
              <div class="card-header text-uppercase">
                <h4>Image UpScaling</h4>
              </div>
              <div class="newButton">
                <v-btn @click="openDialogeBox = true"> Upload </v-btn>
              </div>              
            </div>
                <splitpanes class="default-theme" vertical>
        <pane class="fileBlock">       
          <div style="flex-basis: 95%">
              <iframe
              class="iframe1"
              id="iframeId1"
              style="display: none;margin-left: 8%"
              ></iframe>
            <div class="sparkle">
              <span
              @click="openUpscaledImage" 
              style="display: none;"
              class="mdi mdi-creation-outline" id="sparkles"></span>
            </div>            
          </div>
        </pane>
        <pane>
            <div style="flex-basis: 95%;width: 100%;">
              <iframe
              class="iframe1"
              id="iframeId2"
              style="display: none;margin-left: 8%"
              ></iframe>                     
          </div>
          <div class="download">
              <span
              @click="downloadImage" 
              style="display: none;"
              class="mdi mdi-download-box-outline" id="download"></span>
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
            <div style="position: relative;left: 27%;">
                      <button class="closebtn" @click="openDialogeBox = false">
                        <i
                          class="bx bx-x"
                          style="position: relative; top: 20%"
                        ></i>
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
                            accept="image/png, image/jpeg, image/jpg"
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
import { Splitpanes, Pane } from "splitpanes";
import axios from "axios";
export default {
name:'imageUpScaling',
components:{
  Splitpanes,
  Pane,
},
data(){
  return{
    openDialogeBox:false,
    uploadedImage:'',
    uploadedImgExtenion:'',
    showLoader: false,
    sharpedImage:'',
    uploadedFileName:'',
  }
},
mounted() {
    this.$store.state.isAbsolute = true;
    setNavPills();
    setTooltip(this.$store.state.bootstrap);
  },
  methods:{
    submitImg(event){
      this.openDialogeBox=false;
      this.postImgAndGet(event);
    },
    async convertToBase64(event) {
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.base64Data = reader.result;
        const fileName = file.name;
        this.uploadedFileName=fileName;
        const fileExtension = fileName.split('.').pop();
        this.uploadedImgExtenion=fileExtension;
        this.uploadedImage = this.base64Data.split(",")[1];
      };
     
    },

    async postImgAndGet(event) {
      event.preventDefault();
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      await axios
        .post(
          `http://localhost:61050/dms/file/sharpenedImage`,
          {
            image:this.uploadedImage
          },
          {
            headers: {
              token: this.$store.getters.getUserToken,
            },
          }
        )
        .then((response) => {
          console.log("resposneImage",response.data);
          this.sharpedImage=response.data.sharpened_image;
          const iframe = document.getElementById("iframeId1");
          const sparkles=document.getElementById("sparkles");
          iframe.style.display = "block";
          sparkles.style.display = "block";
          iframe.src = "data:image/" + this.uploadedImgExtenion + ";base64,"+this.uploadedImage;         
        })
        .catch((error) => console.error("Error occured by", error));
    },
    
    openUpscaledImage(){
      this.showLoader = true;
          setTimeout(() => {
            this.showLoader = false;
          const iframe = document.getElementById("iframeId2");
          const download=document.getElementById("download");
          iframe.style.display = "block";
          download.style.display = "block";
          iframe.src = "data:image/" + this.uploadedImgExtenion + ";base64,"+this.sharpedImage;           
          }, 3000);

    },
    downloadImage(){
    console.log("dowlpadfile extenion",this.uploadedImgExtenion);
    console.log("dowlpadfile name",this.uploadedFileName);
    try {
    let fileType;
    let fileName;

    // Determine the file type and filename based on the file extension
    if (['jpg', 'jpeg'].includes(this.uploadedImgExtenion)) {
        fileType = 'image/jpeg';
        fileName = `${this.uploadedFileName}.jpg`;
    } else if (this.uploadedImgExtenion === 'png') {
        fileType = 'image/png';
        fileName = `${this.uploadedFileName}.png`;
    } else {
        throw new Error('Unsupported file type');
    }

    const linkSource = `data:${fileType};base64,${this.sharpedImage}`;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
} catch (error) {
    console.error('Error downloading file:', error);
}
}

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

.splitpanes__pane {
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Adjust alignment as needed */
  align-items: stretch; /* Ensures the child elements stretch to fill the container */
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}

.fileBlock {
  flex: 1; /* Allow the fileBlock to grow and shrink as needed */
}

.fileEditbtn {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 3%;
  width: 100%;
  margin-bottom: 2%;
}

.fileEditbtn > .v-btn {
  color: #fff;
  font-weight: bold;
  background: #87e42e;
  transition: 0.5s ease;
  box-shadow:
    0 0.25rem 0.375rem -0.0625rem rgba(20, 20, 20, 0.12),
    0 0.125rem 0.25rem -0.0625rem rgba(20, 20, 20, 0.07) !important;
}

.fileEditbtn > .v-btn:hover {
  cursor: pointer;
  color: #344767;
  background-image: linear-gradient(270deg, #17ad37 0%, #98ec2d 100%);
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
  color: #fff;
  height: 2rem !important;
  font-size: 0.7rem !important;
}
.newButton > .v-btn:hover {
  cursor: pointer;
}


.sparkle{
  display: flex;
  justify-content: flex-end;
  padding-right: 2%;
  margin-bottom: 2%;
  width: 100%;
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
  display: flex;
  justify-content: flex-end;
  padding-right: 2%;
  width: 100%;
}
.download >span{
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

.text-center >button{
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

.iframe1{
  width: 100%;
  height: 95%;
  object-fit: cover;
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