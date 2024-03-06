<template>
  <div class="workItemContainer">
    <div class="header">
      <div class="left">
        <div class="title">{{ id  }}</div>
        <div class="item" style="color: #344767">{{  }}</div>
      </div>
      <div class="right">
        <!-- <v-btn :ripple="false" @click="editItem(item)">Upload</v-btn>  
          <v-btn :ripple="false" @click="sendUpdatedData">Save</v-btn> -->        
          <v-btn v-if="imageDetails.extention =='pdf'" :ripple="false"  @click="openEditDoc">Edit</v-btn>
        <v-btn :ripple="false" @click="productDialogClose">Close</v-btn>
      </div>
    </div>
    <div class="body">
      <splitpanes class="default-theme" vertical>
        <pane style="">
          <div class="fileBlock">           
            <!-- <div class="fileContainer"> -->
            <!-- <div class="fileEditbtn">
              <v-btn @click="editdialogeToggle = true">Edit</v-btn>
              <v-dialog v-model="editdialogeToggle">
                <v-card>
                  <edit-item v-on:closeDialogeBox="closeDialogeBox" />
                </v-card>
              </v-dialog>
            </div> -->
            <div v-if="editdoc">
              <div id="webviewer" ref="viewer"></div>
            </div>
            <div v-else style="flex-basis: 95%;height: 100%;width: 100%;">            
              <iframe
              id="iframeId"
              style="display: none;margin-left: 8%"
              ></iframe>
            </div>
          </div>
          <!-- </div> -->
        </pane>
        <pane style="">
          <div class="card-body px-0 pt-0 pb-2">
            <div class="textFileds" style="flex-basis:50%;">
              <div class="tableExtension">
                <div>
                  <label for="name">Meta Name</label>
                <input
                  type="text"
                  id="name"
                  v-model="metaDetails.tableName"
                  placeholder="Name"
                />
              </div>
              <!-- <div style="margin-right: 5%">
                <label>File Extensions</label>
                <textarea
                  v-model="metaDetails.fileExtention"
                  placeholder="Extensions"
                  class="extensionField"
                  >
                </textarea>
              </div> -->
            </div>
            <div class="textFields">
              <div v-for="(fieldNam, index) in fieldNames" :key="index">
                <label :for="fieldNam.fieldName">{{
                  fieldNam.fieldName
                }}</label>
                  <input
                  :type='text'
                  :id="fieldNam.fieldName"
                  v-model="fieldNam.value"
                  style="width: 100%"
                  :required="true"
                  readonly
                  class="extensionField"
                  />
                </div>
              </div>
            </div>
            <div v-if="imageDetails.extention =='pdf'" class="tabContainer">
              <DocTab/>
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
import axios from "axios";
import DocTab from "./DocTab.vue";
import { ref, onMounted } from "vue";
  import WebViewer from "@pdftron/webviewer";


export default {
  name: "viewDocument",
  mounted() {
    this.showDocument();
    const path = `${process.env.BASE_URL}webviewer`;
    WebViewer({ 
      path, 
      enableOfficeEditing:true,
      initialDoc: this.imageDetails.image, 
      licenseKey: 'demo:1709638961050:7f255e8c03000000003f037e7ea52f75245cf1967d95fa3948ed0d4065'
    }, this.$refs.viewer).then((instance) => {
      console.log("WebViewer instance created:", instance);
    }).catch(error => {
      console.error("Error initializing WebViewer:", error);
    });
  },
  components: {
    Splitpanes,
    Pane,
    DocTab,
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
      imageDetails: "",
      metaDetails: "",
      fieldNames: [],
      viewer:null,
      editdoc:false,
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
  // watch: {
  //   'imageDetails.image'(newVal) {
  //     if (newVal) {
  //       this.displayDocument();
  //     } else {
  //       this.hideDocument();
  //     }
  //   }
  // },

  
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
          console.log("fieldsss", response.data);

          const { image, extention } = this.imageDetails; 
          const iframe = document.getElementById("iframeId");
         if (image && extention) {
          iframe.style.display = "block";
        if (extention === 'pdf') {
          iframe.src = "data:application/pdf;base64," + image;
        } else if (['jpg', 'jpeg', 'png'].includes(extention)) {
          iframe.src = "data:image/" + extention + ";base64," + image;
        }
        else if (extention === 'doc') {
          // Handle displaying .docx file
          this.convertDocxToPdf(image, iframe);
        }  else {
          // Handle other file types if needed
          console.error("Unsupported file format");
        }
      }       
        })
        .catch((error) => console.error("Error occured by", error));

   


    },
    openEditDoc(){
      this.editdoc =true;
      if (this.viewer) {
        // Access this.viewer properties here
        console.log("Viewer is ready:", this.viewer);
      } else {
        console.error("Viewer is not yet initialized");
      }
    },   

    productDialogClose() {
      this.$emit("closeDocView", false);
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

/* .splitpanes__pane {
  justify-content: center;
  align-items: center;
  display: flex;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease; /* Added transition */
/* } */ 


/* .splitpanes__pane {
  display: flex;
  flex-direction: column;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  transition: background-color 0.3s ease, transform 0.3s ease;
} */



/* 

.fileEditbtn {
  flex-basis: 10%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 3%;
  width: 100%;
  height: 100%;
} */

/* .fileEditbtn > .v-btn {
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
} */

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


.tabContainer{
  flex-basis:50%;
  width: 100%;
  height: 100%;
}
.fileContainer{
  flex-basis: 60%;
  width: 100%;
  height: 100%;
  margin-right:10%;
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

.v-blur {
  z-index: 1;
  filter: blur(5px); /* Adjust the blur value as needed */
  transition: filter 0.3s ease;
}

.tableExtension > div >input {
  display: block;
  width: 100% !important;
 
}

.tableExtension {
  flex-basis: 20%;
  margin-top: 5%;
  display: flex;
  justify-content:flex-start;
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
