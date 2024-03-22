<template>
  <div class="workItemContainer">
    <div class="header">
      <div class="left">
        <div class="title">{{ id }}</div>
        <div class="item" style="color: #344767">{{}}</div>
      </div>
      <div class="right">
        <v-btn v-if="editdoc" :ripple="false" @click="updateDoc">Save</v-btn>
        <v-btn v-if="editOption" :ripple="false" @click="openEditDoc"
          >Edit PDF</v-btn
        >
        <v-btn v-if="imageView" :ripple="false" @click="openEditImage"
          >Edit Image</v-btn
        >
        <v-btn :ripple="false" @click="productDialogClose">Close</v-btn>
      </div>
    </div>
    <div class="body">
      <splitpanes class="default-theme" vertical>
        <pane style="">
          <div class="fileBlock">
            <div v-if="editdoc" class="editDoc">
              <web-viewer
                ref="upadateDocument"
                :fileDetails="docData"
                :initialDoc="fileData"
                @closeDocView="closeViewDoc"
              />
            </div>
            <div v-if="viewContainer" style="height: 100%; width: 100%">
              <div v-if="isImage" class="imageContainer">
                <a data-fancybox="gallery" :href="fileData">
                  <img class="viewImage" :src="fileData" />
                </a>
              </div>
              <iframe
                v-else
                id="iframeId"
                style="
                  display: none;
                  margin-left: 8%;
                  width: 100%;
                  height: 100%;
                "
              ></iframe>
            </div>
            <div v-if="editImage" style="height: 550p; width: 70px"></div>
          </div>
        </pane>
        <pane style="">
          <div class="card-body px-0 pt-0 pb-2">
            <div class="textFileds" style="flex-basis: 50%">
              <div class="tableExtension">
                <div>
                  <label for="name">Meta Name</label>
                  <input
                    type="text"
                    id="name"
                    v-model="metaDetails.tableName"
                    placeholder="Name"
                    readonly
                  />
                </div>
              </div>
              <div class="textFields">
                <div v-for="(fieldNam, index) in fieldNames" :key="index">
                  <label :for="fieldNam.fieldName">{{
                    fieldNam.fieldName
                  }}</label>
                  <input
                    :type="getFieldType(fieldNam.fieldType)"
                    :id="fieldNam.fieldName"
                    v-model="fieldNam.value"
                    style="width: 100%"
                    :readonly="isReadOnly"
                    :pattern="getFieldPattern(fieldNam)"
                    @input="validateField(fieldNam)"
                    class="extensionField"
                  />
                  <div class="warning-text">
                    {{ warnings[fieldNam.fieldName] }}
                  </div>
                </div>
              </div>
            </div>
            <div v-if="imageDetails.extention == 'pdf'" class="tabContainer">
              <DocTab />
            </div>
          </div>
        </pane>
      </splitpanes>
    </div>
  </div>
</template>
<script>
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
import Swal from "sweetalert2";
import axios from "axios";
import DocTab from "./DocTab.vue";
import WebViewer from "@/views/WebViewer.vue";
// import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

export default {
  name: "viewDocument",
  mounted() {
    this.showDocument();
  },
  components: {
    Splitpanes,
    Pane,
    DocTab,
    WebViewer,
    // 'ejs-imageeditor':ImageEditorComponent
  },

  props: {
    selectedDocId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      base64Data: null,
      docContent: "",
      isReadOnly: true,
      editOption: false,
      imageDetails: "",
      imageView: false,
      metaDetails: "",
      docData: null,
      fileData: "",
      fieldTypeWarnings: {
        integer: "Only accept Numbers",
        string: "Only accept Strings",
      },
      warnings: {},
      image: {
        url: "https://lipsum.app/id/1/1600x1200",
        thumbnail: "https://lipsum.app/id/1/200x150",
        caption: "Hello world",
      },

      isImage: false,
      fieldNames: [],
      viewer: null,
      editdoc: false,
      viewContainer: true,
      editImage: false,
      headers: [
        {
          key: "fieldName",
          title: "FIELD NAME",
        },
        {
          key: "fieldType",
          title: "FIELD TYPE",
        },
        {
          key: "mandatory",
          title: "MANDATORY",
        },
        {
          key: "maxLength",
          title: "MAXIMUM LENGTH",
        },
        {
          key: "value",
          title: "VALUE",
        },
      ],
    };
  },
  methods: {
    closeDialogeBox(value) {
      this.editdialogeToggle = value;
    },
    async showDocument() {  
        axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
        await axios
          .get(
            `http://localhost:61050/dms/file/downloadBy?id=${this.selectedDocId}`,
            {
              headers: {
                token: this.$store.getters.getUserToken,
              },
            }
          )
          .then((response) => {
            this.imageDetails = response.data.image;
            this.metaDetails = response.data.metaDetails;
            this.fieldNames = this.metaDetails.fieldNames;
            console.log("fieldNames", this.fieldNames);
            this.docData = response.data;
            if (
              this.imageDetails.extention == "pdf" ||
              this.imageDetails.extention == "docx"
            ) {
              this.editOption = true;
            }
            if (
              this.imageDetails.extention == "jpg" ||
              this.imageDetails.extention == "jpeg" ||
              this.imageDetails.extention == "png"
            ) {
              this.imageView = true;
            }

            const { image, extention } = this.imageDetails;
            const iframe = document.getElementById("iframeId");
            if (image && extention) {
              iframe.style.display = "block";
              if (extention === "pdf") {
                this.fileData = "data:application/pdf;base64," + image;
                iframe.src = "data:application/pdf;base64," + image;
              } else if (["jpg", "jpeg", "png"].includes(extention)) {
                this.fileData = "data:image/" + extention + ";base64," + image;
                this.isImage = true;
              } else if (extention === "docx") {
                this.fileData =
                  "data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64," +
                  image;
              } else {
                console.error("Unsupported file format");
              }
            }
          })
          .catch((error) => console.error("Error occured by", error));
      },
    updateDoc() {
      const hasWarnings = Object.values(this.warnings).every(
        (warning) => warning == ""
      );
      if (hasWarnings) {
      this.$refs.upadateDocument.sendDocumentToBackend();
      }
    },
    openEditDoc() {
      this.viewContainer = false;
      this.isReadOnly = false;
      this.editdoc = true;
    },
    openEditImage() {
      this.viewContainer = false;
      this.isReadOnly = false;
      this.editImage = true;
    },

    productDialogClose() {
      this.$emit("closeDocView", false);
    },
    closeViewDoc() {
      this.$emit("closeDocView", false);
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
        title: "Edited successfully",
      });
    },

    getFieldType(fieldType) {
      return fieldType === "integer"? "number"
        : fieldType === "date"
          ? "datetime-local"
          : "text";
    },

    getFieldPattern(fieldNam) {
      console.log("fieldNam.fieldType",fieldNam.fieldType);
      switch (fieldNam.fieldType) {
        case "integer":
          return "^[0-9]+$";
        case "string":
          return "^(?=.*[a-zA-Z])[a-zA-Z0-9: -_]+$";
      }
    },

    validateField(fieldNam) {
      const value = fieldNam.value;
      const pattern = this.getFieldPattern(fieldNam);
      const regex = new RegExp(pattern);
      if (regex.test(value)) {
        // Input matches the pattern
        this.warnings[fieldNam.fieldName] = ""; // Clear warning
      } else {
        // Input does not match the pattern
        const fieldTypeWarning = this.fieldTypeWarnings[fieldNam.fieldType];
        this.warnings[fieldNam.fieldName] = fieldTypeWarning;
      }
    },
  },
};
</script>

<style scoped>
/* @import "../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
@import "../node_modules/@syncfusion/ej2-lists/styles/material.css";
@import "../node_modules/@syncfusion/ej2-popups/styles/material.css";
@import "../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../node_modules/@syncfusion/ej2-navigations/styles/material.css";
@import "../node_modules/@syncfusion/ej2-image-editor/styles/material.css"; */

#image-editor {
  width: 550px !important;
  height: 350px !important;
}
.min-height-300 {
  min-height: 101px !important;
}
.workItemContainer {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  border-radius: 1rem;
  border: 0.5px solid #fff;
  background: #fff;
  box-shadow:
    inset 0 0px 1px 1px rgba(254, 254, 254, 0.9),
    0 20px 27px 0 rgba(0, 0, 0, 0.05) !important;
}

.editDoc {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 auto;
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

.warning-text {
  color: red;
  font-size: 10px;
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

/* .body {
  flex-basis: 90%;
  width: 100%;
  height: 100%;
} */

.body {
  flex: 1;
  display: flex;
  flex-direction: column;
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
  display: flex;
  flex-wrap: wrap;
  column-gap: 5%;
  overflow-y: auto;
  padding: 0 0 0 1%;
  width: 100%;
  height: 150px;
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

.fileBlock {
  display: flex;
  width: 100%;
  height: 100%;
}
.splitpanes__pane {
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Adjust alignment as needed */
  align-items: stretch; /* Ensures the child elements stretch to fill the container */
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}

.tabContainer {
  flex-basis: 50%;
  width: 100%;
  height: 100%;
}
.fileContainer {
  flex-basis: 60%;
  width: 100%;
  height: 100%;
  margin-right: 10%;
}

/* Additional styling for the fileEditbtn, if necessary */
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

.imageContainer {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 5% 0px;
}

.imageContainer > a > img {
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: contain;
}

.v-blur {
  z-index: 1;
  filter: blur(5px); /* Adjust the blur value as needed */
  transition: filter 0.3s ease;
}

.tableExtension > div > input {
  display: block;
  width: 100% !important;
}

.tableExtension {
  flex-basis: 20%;
  margin-top: 5%;
  display: flex;
  justify-content: flex-start;
  width: 100%;
}

.tableExtension > div {
  margin-left: 1%;
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

iframe {
  flex: 1; /* Occupy remaining space */
  width: 100%;
  height: 100%;
}

.card-body {
  flex-basis: 20% !important;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
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
