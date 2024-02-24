<template>
  <div class="workItemContainer">
    <div class="header">
      <div class="left">
        <div class="title">{{ id }}</div>
        <div v-if="showFirstPane === true" class="item" style="color: #344767">
          {{ this.uploadDetails.docName }}
        </div>
      </div>
      <div class="right">
        <!-- <v-btn :ripple="false" @click="editItem(item)">Upload</v-btn>
            <v-btn :ripple="false" @click="sendUpdatedData">Save</v-btn> -->
        <v-btn
          :ripple="false"
          @click="submitData"
          v-if="showFirstPane === false"
          >Submit</v-btn
        >
        <v-btn :ripple="false" @click="productDialogClose">Close</v-btn>
      </div>
    </div>
    <div class="body">
      <splitpanes class="default-theme" vertical>
        <pane class="fileBlock" v-show="showFirstPane">
          <!-- <div class="fileEditbtn">
            <v-btn @click="editdialogeToggle = true">Edit</v-btn>
            <v-dialog v-model="editdialogeToggle">
              <v-card>
                <edit-item v-on:closeDialogeBox="closeDialogeBox" />
              </v-card>
            </v-dialog>
          </div> -->
          <div style="flex-basis: 95%">
            <iframe
              style="display: none; width: 153%; margin-left: 8%; height: 93%"
              :src="imageSrc"
              id="iframeId"
              height="80%"
              width="90%"
            ></iframe>
            <!-- <div id="pspdfkit"></div> -->
          </div>
        </pane>
        <pane>
          <div class="card-body">
            <div class="uploadContainer">
              <div class="uploadBox">
                <div class="uploadInput">
                  <label> Document Name *</label>
                  <input
                    type="text"
                    style="width: 40%"
                    v-model="uploadDetails.docName"
                    placeholder="Document Name"
                    required
                    :readonly="showFirstPane"
                  />
                </div>
                <div style="margin-right: 5%" v-if="showFirstPane === false">
                  <label>File Extensions*</label>
                  <v-select
                    variant="underlined"
                    style="width: 40%; font-size: 10px"
                    v-model="uploadDetails.extention"
                    :items="selectedOptions"
                    item-title="text"
                    label="Select items"
                    chipstabelName
                    small-chips
                    clearable
                    class="custom-select"
                  >
                  </v-select>
                </div>
                <div class="fileinput" v-if="showFirstPane === false">
                  <input
                    type="file"
                    name="myfile"
                    id="fileUpload"
                    style="width: 40%"
                    @change="convertToBase64"
                  />
                </div>
              </div>
            </div>
            <div class="textFields">
              <div v-for="(fieldNam, index) in fieldNames" :key="index">
                <label :for="fieldNam.fieldName">{{
                  fieldNam.fieldName
                }}</label>
                <input
                  :type="fieldNam.fieldType === 'Integer' ? 'number' : 'text'"
                  :id="fieldNam.fieldName"
                  v-model="fieldNam.value"
                  style="width: 80%"
                  :required="true"
                  :readonly="showFirstPane"
                />
              </div>
            </div>
          </div>
        </pane>
      </splitpanes>
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
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "uploadDocument",

  mounted() {
    // this.showDocument();
    this.getFields();
    this.getMetaData();
  },
  components: {
    Splitpanes,
    Pane,
  },

  props: {
    metaId: {
      type: String,
      required: true,
    },
    folderid: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      base64Data: null,
      docContent: "",
      imageDetails: "",
      metaDetails: "",
      fieldNames: [],
      selectedMetaTable: [],
      metaTables: [],
      showFirstPane: false,
      showLoader: false,
      uploadedDocId: "",
      uploadDetails: {
        folderId: this.folderId,
        docName: "",
        extention: "",
        image: "",
        metadata: [
          {
            metadataId: this.metaId,
            fileExtension: "",
            tableName: "",
            fields: [],
          },
        ],
      },
      selectedOptions: [
        {
          text: "Word",
          value: "doc",
        },
        {
          text: "PDF",
          value: "pdf",
        },
        {
          text: "Text",
          value: "txt",
        },
        {
          text: "Excel(xls)",
          value: "xls",
        },
        {
          text: "Excel(xlsx)",
          value: "xlsx",
        },
        {
          text: "JPG",
          value: "jpg",
        },
        {
          text: "JPEG",
          value: "jpeg",
        },
        {
          text: "PNG",
          value: "png",
        },
      ],
    };
  },
  computed: {
    imageSrc() {
      return this.imageDetails.image
        ? `data:image/png;base64,${this.imageDetails.image}`
        : "";
    },
  },
  methods: {
    closeDialogeBox(value) {
      this.editdialogeToggle = value;
    },

    async convertToBase64(event) {
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.base64Data = reader.result;
        this.uploadDetails.image = this.base64Data.split(",")[1];
      };
    },

    async showDocument() {
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      await axios
        .get(
          `http://localhost:61050/dms/file/downloadBy?id=${this.uploadedDocId}`,
          {
            headers: {
              token: this.$store.getters.getUserToken,
            },
          }
        )
        .then((response) => {
          this.imageDetails = response.data.image;
        })
        .catch((error) => console.error("Error occured by", error));

      // if (this.imageDetails.image !== "") {
      //   document.getElementById("iframeId").style.display = "block";
      // } else {
      //   document.getElementById("iframeId").style.display = "none";
      // }

      if (this.imageDetails.image != "") {
        console.log("dOCUmENT", this.imageDetails.image);
        document.getElementById("iframeId").style.display = "block";
        document.getElementById("iframeId").src =
          "data:image/jpg;base64," + this.imageDetails.image;
      } else {
        document.getElementById("iframeId").style.display = "none";
      }
    },

    productDialogClose() {
      this.$emit("closeUploadDialogeBox", false);
    },

    async getFields() {
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      await axios
        .get(`http://localhost:61050/dms/meta/getAllTables?id=${this.metaId}`, {
          headers: {
            token: this.$store.getters.getUserToken,
          },
        })
        .then((response) => {
          const filterdfiledNames = response.data.fieldNames.filter(
            (ele) => ele.fieldName !== "id" && ele.fieldName !== "doc_id"
          );
          const removevalues = filterdfiledNames.map((ele) => ({
            ...ele,
            value: "",
          }));
          this.fieldNames = removevalues;
          this.uploadDetails.folderId = this.folderid;
          this.uploadDetails.metadata[0].tableName = response.data.tableName;
        })
        .catch((error) => console.error("Error occured by", error));
    },

    async getMetaData() {
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      await axios
        .get(`http://localhost:61050/dms/meta/getAllAccessMetaTable`, {
          headers: {
            token: this.$store.getters.getUserToken,
          },
        })
        .then((response) => {
          this.metaTables = response.data;
        })
        .catch((error) => console.error("Error occured by", error));
    },

    async submitData() {
      this.uploadDetails.metadata[0].fields = this.fieldNames;
      this.uploadDetails.metadata[0].fileExtension =
        this.uploadDetails.extention;
      console.log("finalupload", this.uploadDetails);
      const apiUrl = "http://localhost:61050/dms/file/upload";
      const token = this.$store.getters.getUserToken;
      await axios
        .post(apiUrl, this.uploadDetails, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          console.log("response", response.data);
          this.uploadedDocId = response.data.id;
          this.showLoader = true;
          setTimeout(() => {
            this.showLoader = false;
            this.showDocument();
            this.showFirstPane = true;
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
              title: "Uploaed successfully",
            });
          }, 3000);
        })
        .catch((error) => console.log("error occured by", error));
    },
  },
};
</script>

<style scoped>
.min-height-300 {
  min-height: 101px !important;
}
.workItemContainer {
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  border-radius: 1rem;
  border: 0.5px solid #fff;
  background: #fff;
  box-shadow:
    inset 0 0px 1px 1px rgba(254, 254, 254, 0.9),
    0 20px 27px 0 rgba(0, 0, 0, 0.05) !important;
}

.header {
  flex-basis: 10%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  display: flex;
  font-weight: 600;
  /* border-bottom: 1px solid; */
  color: black;
  padding-left: 2%;
}

.left {
  flex-basis: 50%;
  display: flex;
}
.right {
  flex-basis: 50%;
  display: flex;
  justify-content: flex-end;
  padding-right: 5%;
}
.right > .v-btn {
  margin-left: 2%;
  color: #fff;
  font-weight: bold;
  background: #87e42e;
  transition: 0.5s ease;
  box-shadow:
    0 0.25rem 0.375rem -0.0625rem rgba(20, 20, 20, 0.12),
    0 0.125rem 0.25rem -0.0625rem rgba(20, 20, 20, 0.07) !important;
}

.right > .v-btn:hover {
  cursor: pointer;
  color: #344767;
  background-image: linear-gradient(270deg, #17ad37 0%, #98ec2d 100%);
}

.viewBtn {
  margin-left: 2%;
  color: #fff;
  font-weight: bold;
  background: #87e42e;
  transition: 0.5s ease;
  box-shadow:
    0 0.25rem 0.375rem -0.0625rem rgba(20, 20, 20, 0.12),
    0 0.125rem 0.25rem -0.0625rem rgba(20, 20, 20, 0.07) !important;
}

.viewBtn:hover {
  cursor: pointer;
  color: #344767;
  background-image: linear-gradient(270deg, #17ad37 0%, #98ec2d 100%);
}
.document > button {
  /* padding: 8px;
   margin-left: 200%;
   */
  position: relative;
  /* left: 500px; */
  background-image: linear-gradient(270deg, #17ad37 0%, #98ec2d 100%);
  width: 30%;
  height: 36px;
  border-radius: 8px;
  border: none;
  color: white;
  box-shadow:
    0px 3px 1px -2px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
    0px 2px 2px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
    0px 1px 5px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12));
}

.title {
  font-size: 18px;
  margin-right: 5%;
  color: #344767;
}

.item {
  font-size: 18px;
}
.mdi-chevron-right:before {
  color: red;
}

.body {
  flex-basis: 90%;
  width: 100%;
  height: 100%;
  background: #f2f2f2;
}

.dashboard1 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}

.tabsContent {
  flex-basis: 90%;
  padding: 5% 0 0 3%;
  display: grid;
  /* grid-template-columns: 25% 25% 25% 25%; */
  /* grid-template-rows: 20% 20%; */
  color: black;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

input {
  display: block;
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

.textFields {
  padding: 5% 0 0 0%;
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(150px, 0.5fr)
  ); /* Adjust the minmax values as needed */
  grid-auto-rows: 100px;
  grid-column-gap: 10px; /* Adjust the gap between columns */
  grid-row-gap: 0px; /* Adjust the gap between rows */
  color: black;
  width: 100%;
  height: 100%;
}

.v-slide-group__next {
  background: blue;
}
select {
  width: 80%;
  height: 50%;
  border: 0;
  font-weight: 600;

  outline: 0;
  padding: 0.3rem 0;
  border-bottom: 2px solid #d3d3d3;
  box-shadow: none;
  color: #111;
}

label {
  text-transform: uppercase;
}

.btn {
  margin-right: 3%;
  color: #fff;
  font-weight: bold;
  background: #87e42e;
  transition: 0.5s ease;
  box-shadow:
    0 0.25rem 0.375rem -0.0625rem rgba(20, 20, 20, 0.12),
    0 0.125rem 0.25rem -0.0625rem rgba(20, 20, 20, 0.07) !important;
}

.btn:hover {
  cursor: pointer;
  color: #344767;
  background-image: linear-gradient(270deg, #17ad37 0%, #98ec2d 100%);
}

.dialogeBox {
  padding-left: 50%;
  /* width:200px;
  height: 150px; */
}

.splitpanes__pane {
  justify-content: center;
  align-items: center;
  display: flex;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease; /* Added transition */
}

.fileBlock {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}

.fileEditbtn {
  flex-basis: 10%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 3%;
  width: 100%;
  height: 100%;
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

.v-blur {
  z-index: 1;
  filter: blur(5px); /* Adjust the blur value as needed */
  transition: filter 0.3s ease;
}

.tableExtension > input {
  display: block;
  width: 100% !important;
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

.tableExtension {
  flex-basis: 20%;
  margin-top: 5%;
  display: flex;
  justify-content: flex-start;
  width: 100%;
}

.tableExtension > div {
  margin-left: 3%;

  display: flex;
  flex-direction: column;
}

.extensionField {
  width: 100%;
  padding: 0.5rem 0.45rem;
  font-size: 15px !important;
  font-weight: 400;
  text-align: left;
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

.card-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 80%;
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

