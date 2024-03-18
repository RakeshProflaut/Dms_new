<template>
    <div class="folderContainer">
      <div>
        <button class="closebtn" @click="productDialogClose">
          <i class="bx bx-x" style="position: relative; top: 20%"></i>
        </button>
      </div>
      <div class="pt-2 text-center card-header text-uppercase">
        <!-- <h5>{{ this.selectedfolder.folderName }} Folder</h5> -->
      </div>
      <div class="card-body">
        <div>
          <label>Name *</label>
          <input
            type="text"
            style="width: 70%"
            placeholder="Document Name"
            required
          />
        </div>
        <div class="fileinput" >
          <label>Choose File *</label>
          <input
            type="file"
            name="myfile"
            id="fileUpload"
            style="width: 70%"
            @change="convertToBase64"
            accept="./pdf"
          />
        </div>          
        <div class="text-center">
          <button @click="submitData">Upload</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import Swal from "sweetalert2";
  export default {
    name: "ScannerUploadFile",
    mounted() {
    },
  
   
    data() {
      return {
       
      };
    },
    methods: {
      closeDialogeBox(value) {
        this.editdialogeToggle = value;
      },
  
    //   async convertToBase64(event) {
    //     axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
    //     const file = event.target.files[0];
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = () => {
    //       this.base64Data = reader.result;
    //       const fileName = file.name;
    //       const fileExtension = fileName.split('.').pop();
    //       this.uploadDetails.extention = fileExtension;
    //       this.uploadDetails.image = this.base64Data.split(",")[1];
    //     };
    //   }, 
  
  
      productDialogClose() {
        this.$emit("closeUploadDialogeBox", false);
      },
  
     
  
  
    //   async submitData() {
    //     this.uploadDetails.metadata[0].fields = this.fieldNames;
    //     this.uploadDetails.metadata[0].fileExtension =
    //       this.uploadDetails.extention;
    //     console.log("finaluploaddddddddddd", this.uploadDetails);
  
    //     const apiUrl = "http://localhost:61050/dms/file/upload";
    //     const token = this.$store.getters.getUserToken;
  
    //     const checkFiledsValue=this.fieldNames.every(ele=>ele.value !=='');
  
    //     if(Object.values(this.uploadDetails).every((value) => value !== "")&&checkFiledsValue)
    //     {
    //     await axios
    //       .post(apiUrl, this.uploadDetails, {
    //         headers: {
    //           token: token,
    //         },
    //       })
    //       .then((response) => {
    //         console.log("response", response.data);
    //         this.uploadedDocId = response.data.id;
    //         this.$emit('showLoader',true);
  
  
    //       })
    //       .catch((error) =>   Swal.fire({
    //           icon: "error",
    //           title: "Error",
    //           text: error.response.data.errorMessage,
    //         }));
    //   }else{
    //     const Toast = Swal.mixin({
    //         toast: true,
    //         position: "top-end",
    //         showConfirmButton: false,
    //         customClass: "swal-wide",
    //         height: "30px",
    //         background: "hsl(0, 43%, 52%)",
    //         color: "white",
    //         timer: 2000,
    //         timerProgressBar: true,
    //         didOpen: (toast) => {
    //           toast.onmouseenter = Swal.stopTimer;
    //           toast.onmouseleave = Swal.resumeTimer;
    //         },
  
    //       });
    //       Toast.fire({
    //         icon: "error",
    //         title: "Please Fill all the Fields!",
    //       });
    //   }
    // }
  }
  }
  </script>
  
  <style scoped>
  .card-body {
    width: 100%;
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
  
  input {
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
  
  .folderContainer {
    height: 100%;
    width: 90%;
    margin: 0 auto;
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
  
  .textFields {
    display: flex;
    column-gap: 5%;
    flex-wrap: wrap;
    overflow: auto;
    width: 100%;
    height: 200px; /* Adjust height as needed */
  }
  
  .textFields > div {
    flex-basis: 38%; /* Adjust the width of each field */
    margin-bottom: 10px; /* Adjust spacing between fields */
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
    color: #fff;
  }
  .newButton > .v-btn:hover {
    cursor: pointer;
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
    background: #d2d6da; /* color of the handle on hover */
  }
  </style>
  